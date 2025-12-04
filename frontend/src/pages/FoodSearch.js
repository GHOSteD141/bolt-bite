import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Loading from '../components/Loading';
import { useLocation, useNavigate } from 'react-router-dom';

const MENU_API = 'http://localhost:3005/api/menu';

function FoodSearch() {
  const [allItems, setAllItems] = useState([]);
  const [results, setResults] = useState([]);
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const q = new URLSearchParams(location.search).get('q') || '';
    setQuery(q);
    fetchMenu(q);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.search]);

  const fetchMenu = async (initialQuery = '') => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get(MENU_API);
      const menu = res.data && res.data.menu ? res.data.menu : {};
      // Flatten menu (object of categories -> arrays)
      const flattened = Object.keys(menu).flatMap((cat) =>
        (menu[cat] || []).map((item) => ({ ...item, _category: cat }))
      );
      setAllItems(flattened);
      if (initialQuery) {
        const filtered = filterItems(flattened, initialQuery);
        setResults(filtered);
      } else {
        setResults(flattened.slice(0, 30));
      }
    } catch (err) {
      setError('Failed to load menu');
    } finally {
      setLoading(false);
    }
  };

  const filterItems = (items, q) => {
    if (!q) return items;
    const term = q.toLowerCase();
    return items.filter((it) => (it.name || '').toLowerCase().includes(term));
  };

  const onSearch = (e) => {
    e.preventDefault();
    const next = filterItems(allItems, query);
    setResults(next);
    navigate(`/food-search?q=${encodeURIComponent(query)}`, { replace: true });
  };

  if (loading) return <Loading />;
  if (error) return <div className="container mt-4">Error: {error}</div>;

  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <h2 className="text-2xl font-bold mb-4">Food Search (current DB)</h2>

      <form onSubmit={onSearch} className="flex gap-2 mb-6">
        <input
          className="flex-1 border rounded px-3 py-2"
          placeholder="Search food items by name (e.g. pizza)"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button className="px-4 py-2 bg-orange-500 text-white rounded">Search</button>
      </form>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {results.length === 0 && <div className="text-gray-500">No items found.</div>}
        {results.map((item, idx) => (
          <div key={`${item.name}-${idx}`} className="border rounded p-3 flex gap-3 items-center">
            {item.image ? (
              <img src={item.image} alt={item.name} className="w-24 h-16 object-cover rounded" />
            ) : (
              <div className="w-24 h-16 bg-gray-100 rounded" />
            )}
            <div className="flex-1">
              <div className="font-semibold">{item.name}</div>
              <div className="text-sm text-gray-600">{item.description}</div>
              <div className="mt-2 flex items-center justify-between">
                <div className="text-orange-600 font-bold">₹{item.price}</div>
                <div className="text-xs text-gray-500">{item._category}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FoodSearch;
