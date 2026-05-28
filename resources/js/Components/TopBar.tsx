import { useState, useRef, useEffect } from 'react'
import { Bell, ChevronDown, ChevronRight, Search, User, Settings, LogOut, Menu, ArrowLeft } from 'lucide-react'
import { router } from '@inertiajs/react'
import CompanyDropdown, { type CompanyOption } from '@/Components/CompanyDropdown'

const companies: CompanyOption[] = [
    { label: 'My Company 1', value: 'company-1' },
    { label: 'My Company 2', value: 'company-2' },
]

interface TopBarProps {
    breadcrumbs?: string[]
    onMobileMenuToggle?: () => void
}

const userMenuItems = [
    { label: 'Profile', icon: User, href: '/profile' },
    { label: 'Account', icon: Settings, href: '/account' },
]

function MobileBreadcrumb({ breadcrumbs }: { breadcrumbs: string[] }) {
    const handleBack = () => {
        window.history.back()
    }

    if (breadcrumbs.length <= 1) return null

    return (
        <button
            onClick={handleBack}
            className="flex items-center gap-1 rounded-md px-2 py-1.5 text-sm transition-colors hover:bg-neutral-100"
            aria-label="Go to parent page"
        >
            <ArrowLeft className="h-4 w-4 text-neutral-500" />
            <span className="text-neutral-600">{breadcrumbs[breadcrumbs.length - 2]}</span>
        </button>
    )
}

export default function TopBar({ breadcrumbs = ['Dashboard'], onMobileMenuToggle }: TopBarProps) {
    const [company, setCompany] = useState(companies[0].value)
    const [userOpen, setUserOpen] = useState(false)
    const userRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        function handleClickOutside(e: MouseEvent) {
            if (userRef.current && !userRef.current.contains(e.target as Node)) {
                setUserOpen(false)
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    return (
        <header className="relative z-10 flex h-16 items-center justify-between border-b border-neutral-200 bg-white px-4 shadow-[0_2px_8px_rgba(0,0,0,0.08)] md:px-6">
            <div className="flex items-center gap-2 text-sm text-neutral-500">
                <button
                    onClick={onMobileMenuToggle}
                    className="rounded-md p-2 transition-colors hover:bg-neutral-100 md:hidden"
                    aria-label="Open menu"
                >
                    <Menu className="h-5 w-5 text-neutral-600" />
                </button>
                <div className="md:hidden">
                    <MobileBreadcrumb breadcrumbs={breadcrumbs} />
                </div>
                <CompanyDropdown
                    options={companies}
                    value={company}
                    onChange={setCompany}
                    className="hidden w-48 sm:block"
                />
                {breadcrumbs.map((crumb, i) => (
                    <span key={i} className="hidden items-center gap-2 sm:flex">
                        <ChevronRight className="h-4 w-4" />
                        <span className="text-neutral-700">{crumb}</span>
                    </span>
                ))}
                <span className="text-sm font-medium text-neutral-700 md:hidden">
                    {breadcrumbs[breadcrumbs.length - 1]}
                </span>
            </div>
            <div className="flex items-center gap-2 md:gap-4">
                <button
                    onClick={() => document.dispatchEvent(new CustomEvent('open-command-palette'))}
                    className="hidden items-center gap-2 rounded-lg border border-neutral-200 bg-neutral-50 px-3 py-1.5 text-sm text-neutral-400 transition-colors hover:bg-neutral-100 lg:flex"
                >
                    <Search className="h-3.5 w-3.5" />
                    <span>Search...</span>
                    <kbd className="ml-4 rounded bg-neutral-200 px-1.5 py-0.5 text-xs text-neutral-500">⌘K</kbd>
                </button>
                <button
                    onClick={() => document.dispatchEvent(new CustomEvent('open-command-palette'))}
                    className="rounded-md p-2 transition-colors hover:bg-neutral-100 lg:hidden"
                    aria-label="Search"
                >
                    <Search className="h-5 w-5 text-neutral-500" />
                </button>
                <button className="relative hidden rounded-md p-2 transition-colors hover:bg-neutral-100 sm:block">
                    <Bell className="h-5 w-5 text-neutral-500" />
                    <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-red-500" />
                </button>
                <div ref={userRef} className="relative">
                    <button
                        onClick={() => setUserOpen(!userOpen)}
                        className="flex items-center gap-2 rounded-lg px-2 py-1 transition-colors hover:bg-neutral-100"
                    >
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-orange text-sm font-medium text-white">
                            MU
                        </div>
                        <span className="hidden text-sm font-medium text-neutral-700 sm:inline">My User</span>
                        <ChevronDown
                            className={`hidden h-3.5 w-3.5 text-neutral-400 transition-transform duration-200 sm:inline ${userOpen ? 'rotate-180' : ''}`}
                        />
                    </button>
                    {userOpen && (
                        <div className="absolute right-0 top-full z-50 mt-1.5 w-56 rounded-lg border border-gray-200 bg-white py-1 shadow-lg">
                            <div className="border-b border-gray-100 px-3 py-3">
                                <p className="text-sm font-medium text-neutral-800">My User</p>
                                <p className="text-xs text-neutral-400">myuser@example.com</p>
                                <span className="mt-1 inline-block rounded-full bg-orange/10 px-2 py-0.5 text-xs font-medium text-orange">
                                    Regular User
                                </span>
                            </div>
                            <div className="py-1">
                                {userMenuItems.map((item) => (
                                    <a
                                        key={item.label}
                                        href={item.href}
                                        className="flex items-center gap-2 px-3 py-2 text-sm text-neutral-700 transition-colors hover:bg-gray-50"
                                    >
                                        <item.icon className="h-4 w-4 text-neutral-400" />
                                        {item.label}
                                    </a>
                                ))}
                            </div>
                            <div className="border-t border-gray-100" />
                            <button
                                onClick={() => {
                                    /* TODO: handle logout */
                                }}
                                className="flex w-full items-center gap-2 px-3 py-2 text-sm text-red-600 transition-colors hover:bg-red-50"
                            >
                                <LogOut className="h-4 w-4" />
                                Logout
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </header>
    )
}
