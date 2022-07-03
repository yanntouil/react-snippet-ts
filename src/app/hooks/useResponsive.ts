import { useState } from 'react'
import { useEventListener, useIsomorphicLayoutEffect } from '.'

/**
 * Typescript hack to maintain type in Object.entries return
 */
type Entries<T> = { [K in keyof T]: [K, T[K]] }[keyof T][]
function entries<T>(obj: T): Entries<T> {
    return Object.entries(obj) as any;
}


type Breakpoints = {
    'xs': number,
    'sm': number,
    'md': number,
    'lg': number,
    'xl': number,
    '2xl': number,
}


/** @const {Breakpoints} breakpoints List of breakpoints available in an object */
const breakpoints: Breakpoints = {
    'xs': 0,
    'sm': 640,
    'md': 768,
    'lg': 1024,
    'xl': 1280,
    '2xl': 1536,
}

/**
 * Return an object to manage media queries state, Media queries are base on TaillWind default media queries
 * Do no hesitate to change values on name (dont forget to also update type) to be closer to your needs
 * min(breakpoint) : min-width breakpoint
 * max(breakpoint) : max-width breakpoint
 * between(breakpointSmallest, breakpointBiggest) : min-width breakpointSmallest max-width breakpointBiggest
 * breakpoint : current breakpoint
 * breakpoints : List of breakpoints available in an object
 * @returns {{
 *      min: (breakpoint: keyof Breakpoints) => boolean,
 *      max: (breakpoint: keyof Breakpoints) => boolean,
 *      between: (breakpointSmallest: keyof Breakpoints, breakpointBiggest: keyof Breakpoints) => boolean,
 *      breakpoint: keyof Breakpoints,
 *      breakpoints: Breakpoints,
 * }}
 */
export default function useResponsive() {
    const [breakpoint, setBreackpoint] = useState<keyof Breakpoints>('2xl')
    const [windowWidth, setWindowSize] = useState<number>(0)
    const handleSize = () => setWindowSize(window.innerWidth)// Update windowWidth
    const handleBreakpoint = () => {// Update current breakpoint
        const cB = entries(breakpoints).reverse().find(b => b[1] <= windowWidth)
        setBreackpoint(cB ? cB[0] : '2xl')// Typescript hack to be sure to have every time the right type
    }
    // Update state on window resize
    useEventListener('resize', () => {
        handleSize()
        handleBreakpoint()
    })
    // Set size at the first client-side load
    useIsomorphicLayoutEffect(() => {
        handleSize()
        handleBreakpoint()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return {//the biggest, the smallest
        min: (breakpoint: keyof Breakpoints) => windowWidth > breakpoints[breakpoint],
        max: (breakpoint: keyof Breakpoints) => windowWidth < breakpoints[breakpoint],
        between: (breakpointSmallest: keyof Breakpoints, breakpointBiggest: keyof Breakpoints) => windowWidth > breakpoints[breakpointSmallest] && windowWidth < breakpoints[breakpointBiggest],
        breakpoint,
        breakpoints,
    }
}

