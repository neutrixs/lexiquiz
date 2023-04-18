import * as api from '../types/api/checkword'

export default async function validate(word: string): Promise<boolean> {
    const reqBody: api.request = { word }
    const request = await fetch('/api/checkword', {
        method: api.method,
        headers: {
            'Content-Type': api.contentType,
        },
        body: JSON.stringify(reqBody),
    })

    const response = (await request.json()) as api.response
    return response.found
}
