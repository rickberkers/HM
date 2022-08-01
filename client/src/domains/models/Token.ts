export type AccessToken = { 
    token: string, 
    payload: AccessTokenPayload
}

export type AccessTokenPayload = {
    id: string,
    name: string,
    iat: number,
}