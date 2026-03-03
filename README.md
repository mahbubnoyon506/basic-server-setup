# create-basic-server

**A lightweight, opinionated CLI to scaffold professional Node.js backend services in seconds.**

Stop wasting time setting up folder structures, authentication, and database connections. Get straight to building your business logic.

## Features

- **Zero Config Scaffolding**: Standardized folder structure (Controllers, Models, Routes, Middleware).
- **Database Flexibility**: Choose between **PostgreSQL (Sequelize)** or **MongoDB (Mongoose)**.
- **Built-in Authentication**: Pre-configured JWT middleware and bcrypt password hashing.
- **Production Ready**: Includes `.env` configuration, CORS, and security best practices.
- **Auto-Install**: Automatically runs `npm install` so you don't have to.

---

## Quick Start

You don't even need to install it globally. Just run it using `npx`:

```bash
npx create-basic-server

```

### Or, if you prefer global installation:

```bash
npm install -g create-basic-server
create-basic-server

```

---

## Generated Structure

The tool creates a clean, scalable architecture inspired by industry best practices:

```text
my-api/
├── src/
│   ├── config/          # Database connection logic
│   ├── controllers/     # Request handlers
│   ├── middleware/      # Auth & Error handling
│   ├── models/          # Database schemas (User, etc.)
│   ├── routes/          # API endpoints
│   └── app.js           # Express entry point
├── .env.example         # Environment variable template
├── .gitignore           # Standard node ignore list
└── package.json         # Scripts and dependencies

```

---

## Prerequisites

- **Node.js**: v16.0.0 or higher
- **Database**: A running instance of MongoDB or PostgreSQL (locally or cloud-hosted).

---

## Environment Variables

After generation, create a `.env` file in the root directory and add:

```env
PORT=5000
JWT_SECRET=your_random_secret_string
DATABASE_URL=your_connection_string

```

---

## Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/mahbubnoyon506/basic-server-setup/issues).

---
