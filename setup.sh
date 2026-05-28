#!/bin/bash

# Sismin Setup Script
# Automates the initial setup process for the Laravel + Inertia application

set -e  # Exit on error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Default verbose mode is off
VERBOSE=false

# Parse command line arguments
while [[ $# -gt 0 ]]; do
    case $1 in
        -v|--verbose)
            VERBOSE=true
            shift
            ;;
        -h|--help)
            echo "Usage: ./setup.sh [OPTIONS]"
            echo ""
            echo "Options:"
            echo "  -v, --verbose    Enable verbose output"
            echo "  -h, --help       Show this help message"
            exit 0
            ;;
        *)
            echo "Unknown option: $1"
            echo "Use -h or --help for usage information"
            exit 1
            ;;
    esac
done

# Function to print step headers
print_step() {
    echo -e "\n${BLUE}==>${NC} ${GREEN}$1${NC}"
}

# Function to print info messages
print_info() {
    echo -e "${YELLOW}→${NC} $1"
}

# Function to print success messages
print_success() {
    echo -e "${GREEN}✓${NC} $1"
}

# Function to print error messages
print_error() {
    echo -e "${RED}✗${NC} $1"
}

# Function to run commands with optional verbose output
run_command() {
    local cmd="$1"
    local description="$2"
    
    if [ "$VERBOSE" = true ]; then
        print_info "Running: $cmd"
        eval "$cmd"
    else
        eval "$cmd" > /dev/null 2>&1
    fi
    
    if [ $? -eq 0 ]; then
        print_success "$description"
    else
        print_error "$description failed"
        exit 1
    fi
}

# Banner
echo -e "${BLUE}"
cat << "EOF"
   _____ _           _       
  / ____(_)         (_)      
 | (___  _ ___ _ __ ___  ___ 
  \___ \| / __| '_ ` _ \/ __|
  ____) | \__ \ | | | | \__ \
 |_____/|_|___/_| |_| |_|___/
                              
 Setup Script
EOF
echo -e "${NC}"

# Check prerequisites
print_step "Checking prerequisites"

# Check PHP
if ! command -v php &> /dev/null; then
    print_error "PHP is not installed. Please install PHP 8.2 or higher."
    exit 1
fi

PHP_VERSION=$(php -r "echo PHP_VERSION;")
print_success "PHP $PHP_VERSION found"

# Check Composer
if ! command -v composer &> /dev/null; then
    print_error "Composer is not installed. Please install Composer."
    exit 1
fi

COMPOSER_VERSION=$(composer --version --no-ansi | head -n1 | cut -d' ' -f3)
print_success "Composer $COMPOSER_VERSION found"

# Check Node.js
if ! command -v node &> /dev/null; then
    print_error "Node.js is not installed. Please install Node.js 18 or higher."
    exit 1
fi

NODE_VERSION=$(node --version)
print_success "Node.js $NODE_VERSION found"

# Check npm
if ! command -v npm &> /dev/null; then
    print_error "npm is not installed. Please install npm."
    exit 1
fi

NPM_VERSION=$(npm --version)
print_success "npm $NPM_VERSION found"

# Check SQLite extension
print_step "Checking SQLite PHP extension"

if php -m | grep -q "sqlite3"; then
    print_success "SQLite extension is installed"
else
    print_info "SQLite extension not found. Attempting to install..."
    
    if [ "$VERBOSE" = true ]; then
        sudo apt-get update && sudo apt-get install -y php-sqlite3
    else
        sudo apt-get update > /dev/null 2>&1 && sudo apt-get install -y php-sqlite3 > /dev/null 2>&1
    fi
    
    if [ $? -eq 0 ]; then
        print_success "SQLite extension installed"
    else
        print_error "Failed to install SQLite extension. Please install manually: sudo apt-get install php-sqlite3"
        exit 1
    fi
fi

# Install Composer dependencies
print_step "Installing PHP dependencies"
if [ "$VERBOSE" = true ]; then
    composer install
else
    composer install --quiet
fi
print_success "Composer dependencies installed"

# Install npm dependencies
print_step "Installing Node dependencies"
if [ "$VERBOSE" = true ]; then
    npm install
else
    npm install --silent
fi
print_success "Node dependencies installed"

# Setup environment file
print_step "Configuring environment"

if [ ! -f .env ]; then
    cp .env.example .env
    print_success "Environment file created"
else
    print_info "Environment file already exists, skipping"
fi

# Generate application key
if grep -q "APP_KEY=$" .env || ! grep -q "APP_KEY=" .env; then
    if [ "$VERBOSE" = true ]; then
        php artisan key:generate
    else
        php artisan key:generate --quiet
    fi
    print_success "Application key generated"
else
    print_info "Application key already set, skipping"
fi

# Create database directory if it doesn't exist
if [ ! -d "database" ]; then
    mkdir -p database
    print_success "Database directory created"
fi

# Run migrations
print_step "Running database migrations"

if [ "$VERBOSE" = true ]; then
    php artisan migrate --force
else
    php artisan migrate --force --quiet
fi
print_success "Database migrations completed"

# Build frontend assets
print_step "Building frontend assets"

if [ "$VERBOSE" = true ]; then
    npm run build
else
    npm run build > /dev/null 2>&1
fi
print_success "Frontend assets built"

# Final message
echo -e "\n${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${GREEN}✓ Setup completed successfully!${NC}"
echo -e "${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}\n"

echo -e "${BLUE}Next steps:${NC}"
echo -e "  1. Start the development server:"
echo -e "     ${YELLOW}composer dev${NC} (recommended - starts all services)"
echo -e "     or"
echo -e "     ${YELLOW}php artisan serve${NC} (server only)"
echo -e ""
echo -e "  2. Visit your application at:"
echo -e "     ${YELLOW}http://127.0.0.1:8000${NC}"
echo -e ""
echo -e "${BLUE}Additional commands:${NC}"
echo -e "  ${YELLOW}npm run dev${NC}           - Start Vite dev server with HMR"
echo -e "  ${YELLOW}php artisan pail${NC}      - View application logs"
echo -e "  ${YELLOW}./vendor/bin/pint${NC}     - Format PHP code"
echo -e ""
