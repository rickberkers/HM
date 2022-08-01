export type BaseTokenPayload = { id: string }
export type RefreshTokenPayload = BaseTokenPayload
export type AccessTokenPayload = BaseTokenPayload & { name: string }
export type TokenPayload = RefreshTokenPayload | AccessTokenPayload

export type TokenPair = {
    refreshToken: string,
    accessToken: string
}