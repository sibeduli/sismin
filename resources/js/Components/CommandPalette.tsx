import { useEffect, useState } from 'react'
import { Command } from 'cmdk'
import { router } from '@inertiajs/react'
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
    Search,
} from 'lucide-react'

const commands = [
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

export default function CommandPalette() {
    const [open, setOpen] = useState(false)

    useEffect(() => {
        function onKeyDown(e: KeyboardEvent) {
            if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
                e.preventDefault()
                setOpen((prev) => !prev)
            }
        }
        function onOpen() {
            setOpen(true)
        }
        document.addEventListener('keydown', onKeyDown)
        document.addEventListener('open-command-palette', onOpen)
        return () => {
            document.removeEventListener('keydown', onKeyDown)
            document.removeEventListener('open-command-palette', onOpen)
        }
    }, [])

    function navigate(href: string) {
        setOpen(false)
        router.visit(href)
    }

    return (
        <Command.Dialog open={open} onOpenChange={setOpen} className="fixed inset-0 z-50">
            <div className="fixed inset-0 flex items-start justify-center pt-[20vh]">
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setOpen(false)} />
                <div className="relative w-full max-w-lg rounded-xl border border-gray-200 bg-white shadow-2xl">
                    <div className="flex items-center gap-2 border-b border-gray-100 px-4">
                        <Search className="h-4 w-4 text-gray-400" />
                        <Command.Input
                            placeholder="Type a command or search..."
                            className="flex-1 border-0 bg-transparent py-3 text-sm text-slate outline-none placeholder:text-gray-400"
                        />
                        <kbd className="rounded bg-gray-100 px-1.5 py-0.5 text-xs text-gray-500">ESC</kbd>
                    </div>
                    <Command.List className="max-h-72 overflow-y-auto p-2">
                        <Command.Empty className="px-4 py-8 text-center text-sm text-gray-500">
                            No results found.
                        </Command.Empty>
                        <Command.Group heading="Navigation" className="px-2 py-1 text-xs font-medium text-gray-400">
                            {commands.map((cmd) => (
                                <Command.Item
                                    key={cmd.href}
                                    value={cmd.label}
                                    onSelect={() => navigate(cmd.href)}
                                    className="flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2 text-sm text-slate transition-colors data-[selected=true]:bg-gray-100"
                                >
                                    <cmd.icon className="h-4 w-4 text-gray-500" />
                                    {cmd.label}
                                </Command.Item>
                            ))}
                        </Command.Group>
                    </Command.List>
                </div>
            </div>
        </Command.Dialog>
    )
}
