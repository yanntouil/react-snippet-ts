import React, { useRef, useState, Children, cloneElement, isValidElement } from "react"
import { vClass } from "app/helpers"
import { useOnClickOutside } from "app/hooks"

/**
 * Dropdown
 */
type PropsDropdown = {
    className: string
}
const Dropdown: React.FC<React.PropsWithChildren<PropsDropdown>> = ({ children, className }) => {
    const [ open, setOpen ] = useState(false)
    const onOpen = () => setOpen(true)
    const onClose = () => setOpen(false)
    const dropdownRef = useRef<HTMLDivElement>(null)
    useOnClickOutside(dropdownRef, onClose)
    const onBlur = ({ relatedTarget }: React.FocusEvent<HTMLButtonElement>) => {
        if (!dropdownRef?.current?.contains(relatedTarget)) {
            onClose()
        }
    }
    return (
        <div 
            className={className ? className : 'relative'}
            ref={dropdownRef}
        >
            {Children.map<React.ReactNode, React.ReactNode>(
                children, 
                (child) => typeof child !== 'string' && isValidElement(child) ? cloneElement(child, { open, onClose, onOpen, onBlur }) : child
            )}
        </div>
    )
}

/**
 * Dropdown button
 */
type PropsDropdownButton = {
    open: boolean
    onClose: () => void
    onOpen: () => void
    onBlur: (e: React.FocusEvent<HTMLButtonElement>) => void
    className?: string
    icon?: boolean
}
const DropdownButton: React.FC<React.PropsWithChildren<PropsDropdownButton>> = ({ children, open, onClose, onOpen, onBlur, className = '', icon = false }) => {
    return (
        <button 
            className={vClass(
                { 'flex items-center h-16 pl-4': icon },
                className,
            )}
            onClick={() => open ? onClose() : onOpen()}
            onBlur={onBlur}
        >
            {children}
            {icon && (
                <span className="flex justify-center items-center w-12 h-16 text-neutral-800" aria-hidden="true">
                    <svg className={vClass(
                        'w-4 h-4 fill-current transition-transform duration-300 ease-in-out',
                        open ? 'rotate-180' : 'rotate-0'
                    )} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path d="M362.71 203.889L202.719 347.898C196.594 353.367 187.407 353.367 181.282 347.898L21.292 203.889C14.729 197.982 14.198 187.857 20.104 181.295C26.376 174.377 36.499 174.512 42.729 180.107L192.001 314.475L341.272 180.107C347.866 174.23 357.96 174.746 363.897 181.295C369.803 187.857 369.272 197.982 362.71 203.889Z"/></svg>
                </span>
            )}
        </button>
    )
}


/**
 * Dropdown menu
 */
type PropsDropdownMenu = {
    open: boolean
    onClose: () => void
    onOpen: () => void
    onBlur: (e: React.FocusEvent<HTMLButtonElement>) => void
    className?: string
    bottom?: boolean
    left?: boolean
    right?: boolean
}
const DropdownMenu: React.FC<React.PropsWithChildren<PropsDropdownMenu>> = ({ children, open, onClose, onOpen, onBlur, className, bottom = false, left = false, right = false }) => {
    return open ? (
        <ul 
            className={vClass(
                'absolute z-10 flex flex-col items-stretch bg-white shadow-md',
                bottom ? 'top-full' : 'top-0',
                {
                    'right-0': right || !left,
                    'left-0': !right && left,
                },
                className
            )}
        >
            {Children.map<React.ReactNode, React.ReactNode>(
                children, 
                (child) => typeof child !== 'string' && isValidElement(child) ? cloneElement(child, { open, onClose, onOpen, onBlur }) : child
            )}
        </ul>
    ) : <></>
}

/**
 * Dropdown item
 */
type PropsDropdownMenuItem = {
    onClose: () => void
    onBlur: (e: React.FocusEvent<HTMLButtonElement>) => void
    onClick: () => void
    clickAndClose?: boolean
    className?: string
}
const DropdownMenuItem: React.FC<React.PropsWithChildren<PropsDropdownMenuItem>> = ({ children, onClose, onBlur, onClick, clickAndClose = true, className }) => {
    return (
        <li className="flex flex-col items-stretch">
            <button 
                onBlur={onBlur}
                onClick={() => {
                    onClick()
                    clickAndClose && onClose()
                }} 
                className={vClass(
                    'flex min-w-max flex-grow p-4 text-neutral-800 hover:bg-sky-100 focus:bg-sky-100',
                    className,
                )}
            >
                {children}
            </button>
        </li>
    )
}

export { Dropdown, DropdownMenu, DropdownMenuItem, DropdownButton }