import { useState, useRef, useEffect } from 'react'
import { Building2, ChevronsUpDown, Check } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface CompanyOption {
    label: string
    value: string
}

interface CompanyDropdownProps {
    options: CompanyOption[]
    value?: string
    onChange?: (value: string) => void
    className?: string
}

export default function CompanyDropdown({ options, value, onChange, className }: CompanyDropdownProps) {
    const [open, setOpen] = useState(false)
    const ref = useRef<HTMLDivElement>(null)

    const selected = options.find((o) => o.value === value)

    useEffect(() => {
        function handleClickOutside(e: MouseEvent) {
            if (ref.current && !ref.current.contains(e.target as Node)) {
                setOpen(false)
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    return (
        <div ref={ref} className={cn('relative', className)}>
            <button
                type="button"
                onClick={() => setOpen(!open)}
                className="flex w-full items-center gap-2 rounded-lg border border-orange/20 bg-orange/10 px-3 py-2.5 text-left transition-colors hover:bg-orange/20"
            >
                <Building2 className="h-4 w-4 shrink-0 text-rust" />
                <span className="flex-1 truncate text-sm font-medium text-slate">
                    {selected?.label ?? 'Select company'}
                </span>
                <ChevronsUpDown className="h-3.5 w-3.5 shrink-0 text-gray-400" />
            </button>

            {open && (
                <ul className="absolute left-0 right-0 z-50 mt-1.5 max-h-48 overflow-y-auto rounded-lg border border-gray-100 bg-white py-1 shadow-lg">
                    {options.map((option) => (
                        <li key={option.value}>
                            <button
                                type="button"
                                onClick={() => {
                                    onChange?.(option.value)
                                    setOpen(false)
                                }}
                                className={cn(
                                    'flex w-full items-center gap-2 px-3 py-2 text-sm text-slate transition-colors hover:bg-gray-50',
                                    option.value === value && 'bg-gray-50',
                                )}
                            >
                                <Building2 className="h-3.5 w-3.5 shrink-0 text-gray-400" />
                                <span className="flex-1 truncate">{option.label}</span>
                                {option.value === value && <Check className="h-3.5 w-3.5 shrink-0 text-rust" />}
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}
