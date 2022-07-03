import { Children, cloneElement, isValidElement, FC, PropsWithChildren, ReactNode } from 'react'
import { useElementScrollSize } from 'app/hooks'


type Props = {
    message: string,
    isValid: boolean,
    validate: boolean,
}

/**
 * Form validation wrapper
 */
const FormValidate: FC<PropsWithChildren<Props>> = ({ message, isValid, validate, children }) => {
    const [ formValidateRef, size ] = useElementScrollSize()
    return validate ? (
        <div className="w-full">
            {Children.map<ReactNode, ReactNode>(
                children, 
                (child) => isValidElement(child) ? cloneElement(child, { isValid, validate }) : child
            )}
            <div 
                ref={formValidateRef}
                style={{
                    height: !isValid && message ? size.height : 0,
                    overflow: 'hidden',
                    transition: 'height 300ms ease-in-out',
                }}
            >
                {!isValid && message && (
                    <div className="flex pt-4 text-red-500 text-lg">
                        <svg className="w-6 h-6 mx-5 flex-shrink-0 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M256.003 360C242.75 360 232.005 370.744 232.005 384C232.005 397.254 242.75 408 256.003 408C269.256 408 280.001 397.254 280.001 384C280.001 370.744 269.256 360 256.003 360ZM256.003 320C264.846 320 272.002 312.844 272.002 304V160C272.002 151.156 264.846 144 256.003 144S240.004 151.156 240.004 160V304C240.004 312.844 247.16 320 256.003 320ZM504.343 397.344L304.452 59.375C294.375 42.266 276.314 32.031 256.112 32H256.018C235.817 32 217.693 42.219 207.538 59.359L7.647 397.359C-2.399 414.328 -2.555 434.703 7.226 451.859C17.287 469.484 35.551 480 56.097 480H455.987C476.501 480 494.734 469.469 504.796 451.828C514.56 434.672 514.389 414.312 504.343 397.344ZM476.985 435.984C472.704 443.5 464.846 448 455.987 448H56.097C47.191 448 39.317 443.516 35.02 436C30.942 428.844 31.005 420.703 35.177 413.641L235.067 75.656C239.395 68.359 247.222 64 256.034 64C256.034 64 256.05 64 256.065 64C264.83 64.016 272.611 68.359 276.907 75.641L476.813 413.641V413.656C480.985 420.703 481.063 428.844 476.985 435.984Z"/></svg>
                        {message}
                    </div>
                )}
            </div>
        </div>
    ) : (
        <>
            {children}
        </>
    )
}
export default FormValidate