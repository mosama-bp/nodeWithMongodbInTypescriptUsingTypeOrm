import csrf from 'csrf'

let csrfToken: any
let secret: string

export const initCsrfToken = () => {
    csrfToken = new csrf
}

export const createCsrfToken = () => {
    secret = csrfToken.secretSync()
    const token: string = csrfToken.create(secret)
    return token
}

export const verifyCsrfToken = (token: string) => {
    if (!csrfToken.verify(secret, token)) {
        throw new Error('invalid token!')
    }
}