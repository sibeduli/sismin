import { Link, usePage } from '@inertiajs/react'
import { cn } from '@/lib/utils'
import {
    LayoutDashboard,
    Image,
    Factory,
    FlaskConical,
    Calculator,
    Database,
    Wrench,
    Settings,
    CheckSquare,
    PanelLeftClose,
    PanelLeftOpen,
} from 'lucide-react'

const menuItems = [
    { label: 'Dashboard', icon: LayoutDashboard, href: '/' },
    { label: 'Media', icon: Image, href: '/media' },
    { label: 'Production', icon: Factory, href: '/production' },
    { label: 'Research', icon: FlaskConical, href: '/research' },
    { label: 'Accounting', icon: Calculator, href: '/accounting' },
    { label: 'Master', icon: Database, href: '/master' },
    { label: 'Maintenance', icon: Wrench, href: '/maintenance' },
    { label: 'System', icon: Settings, href: '/system' },
    { label: 'Approval', icon: CheckSquare, href: '/approval' },
]

export default function Sidebar({ collapsed, onToggle }: { collapsed: boolean; onToggle: () => void }) {
    const { url } = usePage()

    return (
        <aside
            className={cn(
                'fixed left-0 top-0 z-20 flex h-screen flex-col bg-orange text-white shadow-[4px_0_12px_rgba(0,0,0,0.25)] transition-all duration-200',
                collapsed ? 'w-[4.5rem]' : 'w-60',
            )}
        >
            <div className="flex h-16 items-center justify-between border-b border-white/20 px-3">
                {collapsed ? (
                    <span className="mx-auto rounded-lg bg-white px-2 py-1 text-center text-xs font-bold leading-tight">
                        <span className="block text-slate">SIS</span>
                        <span className="block text-rust">MIN</span>
                    </span>
                ) : (
                    <>
                        <span className="rounded-lg bg-white px-4 py-1 text-lg font-bold">
                            <span className="text-slate">SIS</span>
                            <span className="text-rust">MIN</span>
                        </span>
                        <div className="group relative">
                            <button onClick={onToggle} className="rounded-md p-1 transition-colors hover:bg-white/20">
                                <PanelLeftClose className="h-4 w-4" />
                            </button>
                            <div className="pointer-events-none absolute left-full top-1/2 z-50 ml-2 -translate-y-1/2 whitespace-nowrap rounded-md bg-slate px-2.5 py-1.5 text-xs font-medium text-white opacity-0 shadow-lg transition-opacity group-hover:opacity-100">
                                Collapse sidebar
                            </div>
                        </div>
                    </>
                )}
            </div>
            {collapsed && (
                <div className="group relative mx-auto mt-2">
                    <button onClick={onToggle} className="rounded-md p-1 transition-colors hover:bg-white/20">
                        <PanelLeftOpen className="h-4 w-4" />
                    </button>
                    <div className="pointer-events-none absolute left-full top-1/2 z-50 ml-2 -translate-y-1/2 whitespace-nowrap rounded-md bg-slate px-2.5 py-1.5 text-xs font-medium text-white opacity-0 shadow-lg transition-opacity group-hover:opacity-100">
                        Expand sidebar
                    </div>
                </div>
            )}
            <nav className="flex-1 space-y-1 px-3 py-4">
                {menuItems.map((item) => {
                    const active = url.startsWith(item.href) && (item.href === '/' ? url === '/' : true)
                    return (
                        <div key={item.label} className="group relative">
                            <Link
                                href={item.href}
                                className={cn(
                                    'flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors',
                                    collapsed ? 'justify-center' : 'gap-3',
                                    active ? 'bg-rust text-white shadow-inner' : 'hover:bg-white/10 hover:text-white',
                                )}
                            >
                                <item.icon className="h-5 w-5 shrink-0" />
                                {!collapsed && item.label}
                            </Link>
                            {collapsed && (
                                <div className="pointer-events-none absolute left-full top-1/2 z-50 ml-2 -translate-y-1/2 rounded-md bg-slate px-2.5 py-1.5 text-xs font-medium text-white opacity-0 shadow-lg transition-opacity group-hover:opacity-100">
                                    {item.label}
                                </div>
                            )}
                        </div>
                    )
                })}
            </nav>
        </aside>
    )
}
