# Quick Start Guide

## First Time Setup

```bash
# Run the automated setup script
./setup.sh

# Or with verbose output
./setup.sh -v
```

## Start Development

```bash
# Start all services (recommended)
composer dev
```

This starts:

- Laravel server at http://127.0.0.1:8000
- Queue worker
- Log viewer (Pail)
- Vite dev server with HMR

## Common Commands

### Development

```bash
php artisan serve              # Start Laravel server only
npm run dev                    # Start Vite dev server only
php artisan pail               # View logs
php artisan queue:listen       # Watch queue jobs
```

### Database

```bash
php artisan migrate            # Run migrations
php artisan migrate:fresh      # Fresh migration (drops all tables)
php artisan db:seed            # Seed database
```

### Code Quality

```bash
./vendor/bin/pint              # Format PHP code
npx prettier --write .         # Format JS/React code
```

### Build

```bash
npm run build                  # Build for production
```

## Troubleshooting

### Missing vendor directory

```bash
composer install
```

### Missing node_modules

```bash
npm install
```

### SQLite driver error

```bash
sudo apt-get install php-sqlite3
```

### Missing .env file

```bash
cp .env.example .env
php artisan key:generate
```

### 500 Server Error

```bash
# Check if migrations are run
php artisan migrate

# Rebuild frontend assets
npm run build

# Clear cache
php artisan cache:clear
php artisan config:clear
php artisan route:clear
```
