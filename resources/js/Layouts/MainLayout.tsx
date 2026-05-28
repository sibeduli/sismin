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
    const [mobileOpen, setMobileOpen] = useState(false)

    return (
        <div className="min-h-screen bg-light">
            <Sidebar
                collapsed={collapsed}
                onToggle={() => setCollapsed(!collapsed)}
                mobileOpen={mobileOpen}
                onMobileClose={() => setMobileOpen(false)}
            />
            <CommandPalette />
            <div
                className="transition-all duration-200 md:ml-[4.5rem] lg:ml-60"
                style={{ marginLeft: collapsed ? '4.5rem' : undefined }}
            >
                <TopBar breadcrumbs={breadcrumbs} onMobileMenuToggle={() => setMobileOpen(true)} />
                <main className="p-4 md:p-6">{children}</main>
            </div>
        </div>
    )
}
