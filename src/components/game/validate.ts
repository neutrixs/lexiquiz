import * as api from '../../api'
import sleep from '../../scripts/sleep'

export default async function validate(word: string): Promise<boolean> {
    try {
        const data = await api.checkWord(word)
        return data.found
    } catch (e) {
        await sleep(1000)
        return await validate(word)
    }
}
