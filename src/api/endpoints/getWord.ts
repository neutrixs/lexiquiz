export async function getWord(): Promise<string> {
    return new Promise(async (resolve, reject) => {
        const request = await fetch('/api/getword')
        if (!request.ok) {
            reject(request)
            return
        }

        const word = await request.text()
        resolve(word)
    })
}
