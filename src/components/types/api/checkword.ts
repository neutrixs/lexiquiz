export interface request {
    word: string
}

export interface response {
    found: boolean
}

export const method = 'POST'
export const contentType = 'application/json'
