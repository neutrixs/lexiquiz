interface requestType {
    word: string
}

interface responseType {
    found: boolean
}

export async function checkWord(word: string): Promise<responseType> {
    return new Promise(async (resolve, reject) => {
        const body: requestType = {
            word,
        }
        const request = await fetch('/api/checkword', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        })

        if (!request.ok) {
            reject(request)
            return
        }

        const data = (await request.json()) as responseType
        resolve(data)
    })
}
