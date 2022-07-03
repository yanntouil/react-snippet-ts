/**
 * Normalize Search term
 */
export const normalize = (string: string): string => string
    .toLowerCase()
    .trim()
    .normalize('NFD')
    .replace(/[.,/#!$%^&*;:{}=\-_`~()]/g, '')