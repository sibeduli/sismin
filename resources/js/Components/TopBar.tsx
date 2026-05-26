import { useState } from 'react'
import { Bell, ChevronRight, Search } from 'lucide-react'
import CompanyDropdown, { type CompanyOption } from '@/Components/CompanyDropdown'

const companies: CompanyOption[] = [
    { label: 'My Company 1', value: 'company-1' },
    { label: 'My Company 2', value: 'company-2' },
]

interface TopBarProps {
    breadcrumbs?: string[]
}

export default function TopBar({ breadcrumbs = ['Dashboard'] }: TopBarProps) {
    const [company, setCompany] = useState(companies[0].value)

    return (
        <header className="relative z-10 flex h-16 items-center justify-between border-b border-neutral-200 bg-white px-6 shadow-[0_2px_8px_rgba(0,0,0,0.08)]">
            <div className="flex items-center gap-2 text-sm text-neutral-500">
                <CompanyDropdown options={companies} value={company} onChange={setCompany} className="w-48" />
                {breadcrumbs.map((crumb, i) => (
                    <span key={i} className="flex items-center gap-2">
                        <ChevronRight className="h-4 w-4" />
                        <span className="text-neutral-700">{crumb}</span>
                    </span>
                ))}
            </div>
            <div className="flex items-center gap-4">
                <button
                    onClick={() => document.dispatchEvent(new CustomEvent('open-command-palette'))}
                    className="flex items-center gap-2 rounded-lg border border-neutral-200 bg-neutral-50 px-3 py-1.5 text-sm text-neutral-400 transition-colors hover:bg-neutral-100"
                >
                    <Search className="h-3.5 w-3.5" />
                    <span>Search...</span>
                    <kbd className="ml-4 rounded bg-neutral-200 px-1.5 py-0.5 text-xs text-neutral-500">⌘K</kbd>
                </button>
                <button className="relative rounded-md p-2 transition-colors hover:bg-neutral-100">
                    <Bell className="h-5 w-5 text-neutral-500" />
                    <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-red-500" />
                </button>
                <div className="flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-neutral-300 text-sm font-medium text-neutral-700">
                        MU
                    </div>
                    <span className="text-sm font-medium text-neutral-700">My User</span>
                </div>
            </div>
        </header>
    )
}
