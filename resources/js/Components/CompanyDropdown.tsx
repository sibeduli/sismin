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
                className="w-full flex items-center gap-2 bg-white rounded-lg px-3 py-2.5 text-left shadow-sm hover:shadow transition-shadow"
            >
                <Building2 className="h-4 w-4 text-rust shrink-0" />
                <span className="flex-1 truncate text-sm font-medium text-slate">
                    {selected?.label ?? 'Select company'}
                </span>
                <ChevronsUpDown className="h-3.5 w-3.5 text-gray-400 shrink-0" />
            </button>

            {open && (
                <ul className="absolute left-0 right-0 mt-1.5 bg-white rounded-lg shadow-lg border border-gray-100 py-1 z-50 max-h-48 overflow-y-auto">
                    {options.map((option) => (
                        <li key={option.value}>
                            <button
                                type="button"
                                onClick={() => {
                                    onChange?.(option.value)
                                    setOpen(false)
                                }}
                                className={cn(
                                    'w-full flex items-center gap-2 px-3 py-2 text-sm text-slate hover:bg-gray-50 transition-colors',
                                    option.value === value && 'bg-gray-50'
                                )}
                            >
                                <Building2 className="h-3.5 w-3.5 text-gray-400 shrink-0" />
                                <span className="flex-1 truncate">{option.label}</span>
                                {option.value === value && (
                                    <Check className="h-3.5 w-3.5 text-rust shrink-0" />
                                )}
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}
