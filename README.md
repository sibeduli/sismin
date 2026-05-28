# Sismin

A modern web application built with Laravel 11 and Inertia.js (React).

## Tech Stack

- **Backend**: Laravel 11 (PHP 8.2+)
- **Frontend**: React 19 with Inertia.js
- **Styling**: TailwindCSS 4
- **Database**: SQLite (default)
- **Build Tool**: Vite 8
- **Icons**: Lucide React

## Prerequisites

Before you begin, ensure you have the following installed:

- PHP 8.2 or higher
- Composer
- Node.js 18+ and npm
- SQLite PHP extension (`php-sqlite3`)

## Quick Start

### Automated Setup (Recommended)

Run the setup script to automatically install dependencies and configure the application:

```bash
./setup.sh
```

Add the `-v` or `--verbose` flag for detailed output:

```bash
./setup.sh -v
```

### Manual Setup

If you prefer to set up manually:

1. **Install PHP dependencies**

    ```bash
    composer install
    ```

2. **Install Node dependencies**

    ```bash
    npm install
    ```

3. **Configure environment**

    ```bash
    cp .env.example .env
    php artisan key:generate
    ```

4. **Install SQLite extension** (if not already installed)

    ```bash
    sudo apt-get install php-sqlite3
    ```

5. **Run database migrations**

    ```bash
    php artisan migrate
    ```

6. **Build frontend assets**
    ```bash
    npm run build
    ```

## Running the Application

### Development Mode

Start all development services (server, queue, logs, and Vite):

```bash
composer dev
```

This will concurrently run:

- Laravel development server (http://127.0.0.1:8000)
- Queue listener
- Application logs (Pail)
- Vite dev server with HMR

### Individual Services

**Start the Laravel server:**

```bash
php artisan serve
```

**Start Vite dev server (for hot reload):**

```bash
npm run dev
```

**Watch queue jobs:**

```bash
php artisan queue:listen
```

**View application logs:**

```bash
php artisan pail
```

## Building for Production

Build optimized frontend assets:

```bash
npm run build
```

## Code Quality

This project uses automated code formatting:

- **PHP**: Laravel Pint
- **JavaScript/React**: Prettier with Tailwind plugin

Format code automatically on commit via Husky pre-commit hooks.

**Manual formatting:**

```bash
# PHP
./vendor/bin/pint

# JavaScript/React
npx prettier --write .
```

## Project Structure

```
├── app/                # Laravel application code
├── database/           # Migrations, seeders, factories
├── public/             # Public assets and build output
├── resources/
│   ├── js/            # React components and Inertia pages
│   └── css/           # Stylesheets
├── routes/            # Application routes
├── tests/             # Test files
└── vendor/            # Composer dependencies
```

## Available Scripts

- `composer dev` - Start all development services
- `npm run dev` - Start Vite dev server
- `npm run build` - Build for production
- `php artisan serve` - Start Laravel server
- `php artisan migrate` - Run database migrations
- `php artisan pail` - View application logs

## License

MIT
