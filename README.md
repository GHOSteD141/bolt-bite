# Bolt-Bite

Bolt-Bite is a full-stack web application (backend + frontend) that provides a seamless experience for customers to browse restaurants, view menus, add items to cart, and proceed to checkout with multiple payment options. This README documents setup, development, and deployment instructions so contributors and operators can get started quickly.

## Table of contents
- Project overview
- Features
- Tech stack
- Prerequisites
- Repository layout
- Environment variables
- Installation
- Run / Development
- Database seeding
- Tests & linting
- Production build & deployment notes
- Contributing
- License & contact

## Project overview
Bolt-Bite is designed to manage food delivery orders, display restaurant menus, and handle user authentication. The codebase is split into two primary parts:
- backend: API, data models, seeding and business logic
- frontend: UI and client-side routing

## Features
- RESTful API endpoints for core resources
- User authentication and role handling
- Responsive frontend built with modern web stack
- Database seeding script for initial data
- Clear separation of frontend and backend for independent development
- AI-powered customer support and intelligent food pairing recommendations

## Tech stack
- Backend: Node.js, Express, MongoDB
- Frontend: React, build tooling (npm/Yarn)
- Other: dotenv for configuration, testing libs as appropriate

## Prerequisites
- Node.js (v14+ recommended)
- npm (v6+) or Yarn
- MongoDB configured and running
- Git

## Repository layout
- /backend — server code, package.json, seed script (seed.js)
- /frontend — client app, package.json
- .dist/run.txt — helper run commands (dev convenience)

## Environment variables
Create a `.env` file in the backend (and frontend if required) with required keys. Example backend `.env`:
```
PORT=5000
DATABASE_URL=your_database_connection_string
JWT_SECRET=your_jwt_secret
NODE_ENV=development
```
Adjust the names/values to match configuration used in the code. Do not commit secrets.

## Installation
1. Clone the repository
   - git clone <repo-url>
2. Install backend dependencies:
   - cd backend
   - npm install
3. Install frontend dependencies:
   - cd ../frontend
   - npm install

## Run / Development
The repository includes convenience commands. From repository root you can start each part independently.

Backend:
- cd "c:\Users\SHREYAJIT BEURA\OneDrive\Documents\GitHub\bolt-bite\backend"
- npm start

Frontend:
- cd "c:\Users\SHREYAJIT BEURA\OneDrive\Documents\GitHub\bolt-bite\frontend"
- npm start

You may also run the seed script after the backend dependencies are installed to populate initial data:
- cd "c:\Users\SHREYAJIT BEURA\OneDrive\Documents\GitHub\bolt-bite\backend"
- node seed.js

Tip: The file `.dist\run.txt` contains those commands for quick copy/paste.

## Database seeding
Run the included seeding script to populate example data:
- cd backend
- node seed.js

Confirm seed success by checking logs or hitting the relevant API endpoints.

## Tests & linting
- Tests: run `npm test` in backend and frontend if test scripts are defined in package.json.
- Lint: run `npm run lint` if available.

Add or update test suites before merging major changes.

## Production build & deployment notes
- Frontend: build the production bundle (e.g., `npm run build`) and serve via static hosting or integrate with backend static serving.
- Backend: ensure environment variables are set in your hosting environment (PORT, DATABASE_URL, JWT_SECRET).
- Use process managers (PM2, systemd) or containers for production reliability.
- Secure secrets using environment or secret managers.

## Contributing
- Fork the repository and create a topic branch per change.
- Run linters and tests before opening a pull request.
- Keep commit messages descriptive.
- For significant changes open an issue first to discuss design.

## Troubleshooting
- If the server fails to connect to DB, check DATABASE_URL and that DB is reachable.
- If ports collide, adjust PORT environment variable.
- Review logs printed by npm start for detailed errors.

## License
Specify the project license here (e.g., MIT). Update the LICENSE file accordingly.

## Contact
For questions or issues, open an issue in the repo or contact the maintainers as appropriate.
