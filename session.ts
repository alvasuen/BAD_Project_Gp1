import expressSession from 'express-session'

export let sessionMiddleware = expressSession({
    secret:
        Math.random().toString(36).slice(2)+
        Math.random().toString(36).slice(2)+
        Math.random().toString(36).slice(2),
    resave: true,
    saveUninitialized: true,
})

declare module 'express-session' {
    interface SessionData{
        userId?: number
        username?: string
        isLogin?:boolean
    }
}