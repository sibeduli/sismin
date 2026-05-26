import { Bell, ChevronRight } from 'lucide-react'

interface TopBarProps {
    breadcrumbs?: string[]
}

export default function TopBar({ breadcrumbs = ['Dashboard'] }: TopBarProps) {
    return (
        <header className="h-16 bg-white border-b border-neutral-200 shadow-[0_2px_8px_rgba(0,0,0,0.08)] flex items-center justify-between px-6 z-10 relative">
            <div className="flex items-center gap-2 text-sm text-neutral-500">
                <span className="font-medium text-neutral-400">My Company</span>
                {breadcrumbs.map((crumb, i) => (
                    <span key={i} className="flex items-center gap-2">
                        <ChevronRight className="h-4 w-4" />
                        <span className="text-neutral-700">{crumb}</span>
                    </span>
                ))}
            </div>
            <div className="flex items-center gap-4">
                <button className="relative p-2 rounded-md hover:bg-neutral-100 transition-colors">
                    <Bell className="h-5 w-5 text-neutral-500" />
                    <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full" />
                </button>
                <div className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-full bg-neutral-300 flex items-center justify-center text-sm font-medium text-neutral-700">
                        MU
                    </div>
                    <span className="text-sm font-medium text-neutral-700">My User</span>
                </div>
            </div>
        </header>
    )
}
