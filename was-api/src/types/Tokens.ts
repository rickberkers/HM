export type TokenPayload = { id: string }
export type RefreshTokenPayload = TokenPayload
export type AccessTokenPayload = TokenPayload & { name: string }

export type TokenPair = {
    refreshToken: string,
    accessToken: string
}