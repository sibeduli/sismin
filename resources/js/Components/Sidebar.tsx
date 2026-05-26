import { useState } from 'react'
import { Link, usePage } from '@inertiajs/react'
import { cn } from '@/lib/utils'
import CompanyDropdown from '@/Components/CompanyDropdown'
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

const companies = [
    { label: 'My Company 1', value: 'company-1' },
    { label: 'My Company 2', value: 'company-2' },
]

export default function Sidebar() {
    const { url } = usePage()
    const [company, setCompany] = useState(companies[0].value)

    return (
        <aside className="fixed left-0 top-0 h-screen w-60 bg-orange text-white flex flex-col shadow-[4px_0_12px_rgba(0,0,0,0.25)] z-20">
            <div className="h-16 flex items-center px-5 border-b border-white/20">
                <span className="bg-white rounded-full px-4 py-1 text-lg font-bold"><span className="text-slate">SIS</span><span className="text-rust">MIN</span></span>
            </div>
            <div className="px-3 pt-3">
                <CompanyDropdown
                    options={companies}
                    value={company}
                    onChange={setCompany}
                />
            </div>
            <nav className="flex-1 py-4 space-y-1 px-3">
                {menuItems.map((item) => {
                    const active = url.startsWith(item.href) && (item.href === '/' ? url === '/' : true)
                    return (
                        <Link
                            key={item.label}
                            href={item.href}
                            className={cn(
                                'flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors',
                                active
                                    ? 'bg-rust text-white shadow-inner'
                                    : 'hover:bg-white/10 hover:text-white'
                            )}
                        >
                            <item.icon className="h-5 w-5" />
                            {item.label}
                        </Link>
                    )
                })}
            </nav>
        </aside>
    )
}
