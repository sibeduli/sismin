import { type ReactNode } from 'react'
import Sidebar from '@/Components/Sidebar'
import TopBar from '@/Components/TopBar'
import CommandPalette from '@/Components/CommandPalette'

interface MainLayoutProps {
    children: ReactNode
    breadcrumbs?: string[]
}

export default function MainLayout({ children, breadcrumbs }: MainLayoutProps) {
    return (
        <div className="min-h-screen bg-light">
            <Sidebar />
            <CommandPalette />
            <div className="ml-60">
                <TopBar breadcrumbs={breadcrumbs} />
                <main className="p-6">{children}</main>
            </div>
        </div>
    )
}
