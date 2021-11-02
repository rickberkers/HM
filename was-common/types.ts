import { Type } from "@sinclair/typebox";

const Order = Type.Object({
    email:    Type.String({ format: 'email' }), 
    address:  Type.String(),
    quantity: Type.Number({ minimum: 1, maximum: 99 }),
    option:   Type.Union([
        Type.Literal('pizza'), 
        Type.Literal('salad'),
        Type.Literal('pie')
    ])
})