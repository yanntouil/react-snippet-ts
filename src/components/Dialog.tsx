
import React, { createContext, useContext, useRef, useEffect } from "react"
import { vClass, disableBodyScroll, enableBodyScroll, clearScrollLocks } from "app/helpers"
import { useOnClickOutside } from "../app/hooks"




interface DialogContextInterface {
    open: boolean
    onClose: () => void
    onClickOutside: () => void
}
const DialogContext = createContext<DialogContextInterface>({} as DialogContextInterface)

/**
 * Dialog
 */
type PropsDialog = {
    onClose: () => void
    onClickOutside: () => void
    open: boolean
    className: string
}
const Dialog: React.FC<React.PropsWithChildren<PropsDialog>> = ({ 
    children,
    onClose = () => false,
    onClickOutside = () => false,
    open,
}) => {
    useEffect(() => {
        if (open) disableBodyScroll()
        else enableBodyScroll()
        return () => clearScrollLocks()
    }, [ open ])
    return open ? (
        <DialogContext.Provider value={{ open, onClose, onClickOutside }}>
            <div className="fixed inset-0 z-50">
                {children}
            </div>
        </DialogContext.Provider>
    ) : <></>
}

/**
 * Dialog backdrop
 */

const DialogBackdrop: React.FC = () => {
    return (
        <div 
            className="fixed inset-0 bg-black/60" 
            aria-hidden="true" 
        />
    )
}

/**
 * Dialog close button
 */
type PropsDialogClose = {
    sr?: string
}
const DialogClose: React.FC<PropsDialogClose> = ({ sr = 'Close dialog' }) => {
    const { onClose } = useContext(DialogContext)
    return (
        <div className="relative">
            <button 
                className="absolute top-12 right-16" 
                onClick={onClose}
            >
                <svg aria-hidden="true" className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M315.31 411.31C309.056 417.563 298.936 417.563 292.682 411.31L160 278.627L27.318 411.31C21.064 417.563 10.944 417.563 4.69 411.31C-1.563 405.056 -1.563 394.936 4.69 388.682L137.373 256L4.69 123.318C-1.563 117.064 -1.563 106.944 4.69 100.69C10.944 94.437 21.064 94.437 27.318 100.69L160 233.373L292.682 100.69C298.936 94.437 309.056 94.437 315.31 100.69C321.563 106.944 321.563 117.064 315.31 123.318L182.627 256L315.31 388.682C321.563 394.936 321.563 405.056 315.31 411.31Z"/></svg>                        
                {sr && (<span className="sr-only">{sr}</span>)}
            </button>
        </div>
    )
}

/**
 * Dialog pannel
 */
type PropsDialogPannel = {
    className: string
    center: boolean
}
const DialogPannel: React.FC<React.PropsWithChildren<PropsDialogPannel>> = ({ children, className, center = false }) => {
    const { onClickOutside } = useContext(DialogContext)

    const pannelRef = useRef<HTMLDivElement>(null)
    useOnClickOutside(pannelRef, onClickOutside)

    return (
        <div className={vClass(
            'absolute inset-0 overflow-y-auto flex justify-center',
            center ? 'items-center' : 'items-start',
        )}>
            <div 
                ref={pannelRef}
                className={vClass(
                    'relative w-full mx-auto px-0 sm:px-10 xl:px-12 2xl:px-0 py-0 sm:my-12 bg-white shadow-md',
                    className ? className : 'container',
                )}
            >
                {children}
            </div>
        </div>
    )
}

export { Dialog, DialogBackdrop, DialogClose, DialogPannel }