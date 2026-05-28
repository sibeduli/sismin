import { createInertiaApp } from '@inertiajs/react'
import { createRoot } from 'react-dom/client'

createInertiaApp({
    resolve: (name) => {
        const pages = import.meta.glob('./Pages/**/*.tsx', { eager: true })
        const page = pages[`./Pages/${name}.tsx`]
        return page as any
    },
    setup({ el, App, props }) {
        if (el) {
            createRoot(el).render(<App {...props} />)
        }
    },
})
