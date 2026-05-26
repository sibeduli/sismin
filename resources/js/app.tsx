import { createInertiaApp } from '@inertiajs/react'
import { createRoot } from 'react-dom/client'

createInertiaApp({
    setup({ el, App, props }) {
        createRoot(el).render(<App {...props} />)
    },
})
