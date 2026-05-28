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
    X,
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

export default function Sidebar({
    collapsed,
    onToggle,
    mobileOpen,
    onMobileClose,
}: {
    collapsed: boolean
    onToggle: () => void
    mobileOpen: boolean
    onMobileClose: () => void
}) {
    const { url } = usePage()

    return (
        <>
            {mobileOpen && (
                <div className="fixed inset-0 z-30 bg-black/50 md:hidden" onClick={onMobileClose} aria-hidden="true" />
            )}
            <aside
                className={cn(
                    'fixed left-0 top-0 z-40 flex h-screen flex-col bg-orange text-white shadow-[4px_0_12px_rgba(0,0,0,0.25)] transition-all duration-200',
                    'md:z-20',
                    collapsed ? 'md:w-[4.5rem] lg:w-[4.5rem]' : 'md:w-[4.5rem] lg:w-60',
                    mobileOpen ? 'w-60 translate-x-0' : 'w-60 -translate-x-full md:translate-x-0',
                )}
            >
                <div className="flex h-16 items-center justify-between border-b border-white/20 px-3">
                    {collapsed && !mobileOpen ? (
                        <span className="mx-auto hidden rounded-lg bg-white px-2 py-1 text-center text-xs font-bold leading-tight md:block lg:hidden">
                            <span className="block text-slate">SIS</span>
                            <span className="block text-rust">MIN</span>
                        </span>
                    ) : (
                        <>
                            <span className="rounded-lg bg-white px-4 py-1 text-lg font-bold">
                                <span className="text-slate">SIS</span>
                                <span className="text-rust">MIN</span>
                            </span>
                            <button
                                onClick={onMobileClose}
                                className="rounded-md p-1 transition-colors hover:bg-white/20 md:hidden"
                                aria-label="Close menu"
                            >
                                <X className="h-5 w-5" />
                            </button>
                            <div className="group relative hidden lg:block">
                                <button
                                    onClick={onToggle}
                                    className="rounded-md p-1 transition-colors hover:bg-white/20"
                                >
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
                    <div className="group relative mx-auto mt-2 hidden lg:block">
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
                                    onClick={onMobileClose}
                                    className={cn(
                                        'flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors',
                                        collapsed ? 'md:justify-center lg:gap-3' : 'gap-3',
                                        active
                                            ? 'bg-rust text-white shadow-inner'
                                            : 'hover:bg-white/10 hover:text-white',
                                    )}
                                >
                                    <item.icon className="h-5 w-5 shrink-0" />
                                    <span className={cn(collapsed ? 'md:hidden lg:inline' : '')}>{item.label}</span>
                                </Link>
                                {collapsed && (
                                    <div className="pointer-events-none absolute left-full top-1/2 z-50 ml-2 hidden -translate-y-1/2 rounded-md bg-slate px-2.5 py-1.5 text-xs font-medium text-white opacity-0 shadow-lg transition-opacity group-hover:opacity-100 md:block lg:hidden">
                                        {item.label}
                                    </div>
                                )}
                            </div>
                        )
                    })}
                </nav>
            </aside>
        </>
    )
}
