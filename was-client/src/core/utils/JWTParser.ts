/**
 * Returns a JS object representation of a Javascript Web Token from its common encoded
 * string form.
 *
 * @template T the expected shape of the parsed token
 * @param {string} token a Javascript Web Token in base64 encoded, `.` separated form
 * @returns {(T | undefined)} an object-representation of the token
 * or undefined if parsing failed
 */
 export function parseJWT<T extends object = { [k: string]: string | number }>(token: string): T | undefined {
    try {
        return JSON.parse(atob(token.split('.')[1]))
    } catch {
        return undefined
    }
}