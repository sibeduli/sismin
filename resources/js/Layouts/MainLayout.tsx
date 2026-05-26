import { type ReactNode, useState } from 'react'
import Sidebar from '@/Components/Sidebar'
import TopBar from '@/Components/TopBar'
import CommandPalette from '@/Components/CommandPalette'

interface MainLayoutProps {
    children: ReactNode
    breadcrumbs?: string[]
}

export default function MainLayout({ children, breadcrumbs }: MainLayoutProps) {
    const [collapsed, setCollapsed] = useState(false)

    return (
        <div className="min-h-screen bg-light">
            <Sidebar collapsed={collapsed} onToggle={() => setCollapsed(!collapsed)} />
            <CommandPalette />
            <div className="transition-all duration-200" style={{ marginLeft: collapsed ? '4.5rem' : '15rem' }}>
                <TopBar breadcrumbs={breadcrumbs} />
                <main className="p-6">{children}</main>
            </div>
        </div>
    )
}
