# Contributing to Sismin

Thank you for your interest in contributing to Sismin!

## Getting Started

1. **Fork and clone the repository**

    ```bash
    git clone https://github.com/yourusername/sismin.git
    cd sismin
    ```

2. **Run the setup script**

    ```bash
    ./setup.sh -v
    ```

3. **Create a new branch**
    ```bash
    git checkout -b feature/your-feature-name
    ```

## Development Workflow

1. Make your changes
2. Test your changes locally
3. Format your code:
    ```bash
    ./vendor/bin/pint              # PHP
    npx prettier --write .         # JavaScript/React
    ```
4. Commit your changes (Husky will auto-format on commit)
5. Push to your fork
6. Create a Pull Request

## Code Style

- **PHP**: Follow Laravel conventions, use Laravel Pint for formatting
- **JavaScript/React**: Use Prettier with Tailwind plugin
- **Commits**: Write clear, descriptive commit messages

## Pre-commit Hooks

This project uses Husky to automatically format code before commits:

- PHP files are formatted with Laravel Pint
- JS/TS/React files are formatted with Prettier

## Running Tests

```bash
php artisan test
```

## Questions?

Feel free to open an issue for any questions or concerns.
