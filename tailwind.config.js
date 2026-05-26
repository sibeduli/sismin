/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './resources/**/*.blade.php',
        './resources/**/*.tsx',
        './resources/**/*.ts',
    ],
    theme: {
        extend: {
            colors: {
                slate: '#4D5459',
                orange: '#F26E22',
                brown: '#A64724',
                rust: '#A63C24',
                light: '#F2F2F2',
            },
        },
    },
    plugins: [],
};
