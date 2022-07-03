import { useState, useRef, type FC, type Dispatch, type FocusEvent  } from "react"
import { vClass } from "app/helpers"
import { useUpdateEffect } from "app/hooks"

type Props = {
    value: string
    setValue: Dispatch<string>
    labelIcon: JSX.Element
    placeholder?: string
    name?: string
    password?: boolean
    isValid?: boolean
    validate?: boolean
}

/**
 * Form Text
 */
const FormText: FC<Props> = ({ value, setValue, labelIcon, placeholder = '', name = 'form-text', password = false, isValid, validate }) => {
    const fieldRef = useRef<HTMLInputElement>(null)
    const passwordRef = useRef<HTMLButtonElement>(null)
    const [ showPassword, setShowPassword ] = useState(false)

    /**
     * Manage cursor position and focus
     */
    const [ cursorPosition, setCursorPosition ] = useState([0, 0])
    const onBlur = ({ relatedTarget, target }: FocusEvent<HTMLInputElement>) => {
        if (relatedTarget === passwordRef?.current) // Blur to toggle password button
            setCursorPosition([target.selectionStart || 0, target.selectionEnd || 0])// backup cursor position
        else setCursorPosition([value.length, value.length])// set cursor position to the end
    }
    useUpdateEffect(() => {// Delay focus after next render
        fieldRef?.current?.setSelectionRange(cursorPosition[0], cursorPosition[1])
        fieldRef?.current?.focus()
    }, [ showPassword ])

    /**
     * Render
     */
    return (
        <div className="relative flex w-full h-16">
            {!!labelIcon && (
                <label 
                    htmlFor={name}
                    className="absolute inset-y-0 left-0 flex justify-center items-center w-16 h-16 text-neutral-500"
                    aria-hidden="true"
                >
                    {labelIcon}
                </label>
            )}
            <input 
                className={vClass(
                    'flex justify-between items-center grow h-full leading-4 bg-white shadow text-lg text-left placeholder:text-neutral-500',
                    labelIcon ? 'pl-16' : 'pl-4',
                    password ? 'pr-16' : 'pr-4',
                    {
                        'border border-red-200 shadow-red-200': validate && !isValid
                    }
                )}
                type={password && !showPassword ? 'password' : 'text'}
                id={name}
                name={name}
                ref={fieldRef}
                value={value}
                onChange={({ target }) => setValue(target.value)}
                onBlur={onBlur}
                placeholder={placeholder}
            />
            {password && (
                <button 
                    className="absolute inset-y-0 right-0 flex justify-center items-center aspect-square text-neutral-500"
                    aria-hidden="true"
                    type="button"
                    ref={passwordRef}
                    onClick={() => setShowPassword(!showPassword)}
                >
                    {showPassword ? (
                        <svg className="h-6 w-6 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><path d="M272.859 137.234L303.773 161.641C309.074 160.73 314.443 160 320 160C370.775 160 412.045 199.742 415.363 249.74L446.183 274.072C447.029 268.135 448 262.227 448 256.055V256C448 185.348 390.666 128 320 128C303.316 128 287.478 131.422 272.859 137.234ZM320 448C213.484 448 115.685 376.02 64.975 260.65C64.58 259.57 64.051 256.939 63.996 256.209C64.051 255.063 64.582 252.426 64.766 251.846C77.607 222.621 93.461 196.232 111.654 173.043L86.601 153.266C66.539 178.789 49.266 207.572 35.469 238.973C33.562 243.402 32 251.041 32 256C32 260.977 33.562 268.596 35.469 273.025C89.719 396.473 197.062 480 320 480C368.131 480 413.805 467.039 454.91 444.043L427.17 422.141C393.572 438.67 357.4 448 320 448ZM320 64C426.516 64 524.316 135.979 575.025 251.348C575.42 252.428 575.949 255.061 576.004 255.791C575.949 256.936 575.418 259.574 575.234 260.152C562.394 289.373 546.547 315.76 528.355 338.947L553.404 358.725C573.465 333.203 590.734 304.422 604.531 273.025C606.437 268.596 608 260.957 608 256C608 251.023 606.437 243.402 604.531 238.973C550.281 115.525 442.937 32 320 32C271.875 32 226.203 44.959 185.101 67.949L212.846 89.854C246.439 73.328 282.605 64 320 64ZM320.057 384C336.732 384 352.558 380.58 367.17 374.771L336.248 350.357C330.941 351.27 325.564 352 320 352C269.201 352 227.914 312.221 224.631 262.236L193.824 237.916C192.973 243.875 192 249.807 192 256C192 326.652 249.334 384 320 384H320.057ZM633.908 483.438L25.904 3.42C18.998 -2.033 8.935 -0.83 3.435 6.061C-2.033 12.998 -0.846 23.062 6.092 28.547L614.096 508.563C617.033 510.875 620.533 512 624.002 512C628.721 512 633.408 509.906 636.564 505.922C642.033 498.984 640.846 488.922 633.908 483.438Z"/></svg>
                    ) : (
                        <svg className="h-6 w-6 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path d="M288 128C217.334 128 160 185.348 160 256S217.334 384 288 384H288.057C358.695 384 416 326.68 416 256.055V256C416 185.348 358.666 128 288 128ZM288 352C235.066 352 192 308.936 192 256S235.066 160 288 160C340.936 160 384 203.064 384 256.055C384 308.959 340.959 352 288 352ZM572.531 238.973C518.281 115.525 410.938 32 288 32S57.688 115.58 3.469 238.973C1.562 243.402 0 251.041 0 256C0 260.977 1.562 268.596 3.469 273.025C57.719 396.473 165.062 480 288 480S518.312 396.418 572.531 273.025C574.438 268.596 576 260.957 576 256C576 251.023 574.438 243.402 572.531 238.973ZM543.234 260.152C492.322 376.021 394.521 448 288 448C181.484 448 83.686 376.02 32.975 260.65C32.58 259.57 32.051 256.939 31.996 256.209C32.051 255.063 32.582 252.426 32.766 251.846C83.678 135.979 181.479 64 288 64C394.516 64 492.316 135.979 543.025 251.348C543.42 252.428 543.949 255.061 544.004 255.791C543.949 256.936 543.418 259.574 543.234 260.152Z"/></svg>
                    )}
                </button>
            )}
        </div>
    )
}
export default FormText