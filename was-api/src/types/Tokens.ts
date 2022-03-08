export type RefreshTokenPayload = {
    id: string,
}

export type AccessTokenPayload = {
    id: string,
    name: string
}

export type TokenPair = {
    refreshToken: string,
    accessToken: string
}