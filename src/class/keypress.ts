export default class KeyPress {
    #functions: Array<(key: string) => any>
    #blockInputRequests: Array<BlockInputRequest>

    #isBlocked() {
        return this.#blockInputRequests.some((req) => req.blocked)
    }

    public constructor() {
        this.#functions = []
        this.#blockInputRequests = []
        this.addListener = this.addListener.bind(this)
        this.removeListener = this.removeListener.bind(this)
        this.trigger = this.trigger.bind(this)
    }

    public createBlockInputRequest() {
        const req = new BlockInputRequest()
        this.#blockInputRequests.push(req)
        return req
    }

    public addListener(cb: (key: string) => any) {
        this.#functions.push(cb)
    }

    public removeListener(cb: (key: string) => any) {
        const index = this.#functions.indexOf(cb)
        this.#functions.splice(index, 1)
    }

    public trigger(key: string) {
        if (this.#isBlocked()) {
            return
        }
        this.#functions.forEach((fn) => fn(key))
    }
}

export class BlockInputRequest {
    public blocked: boolean

    public constructor() {
        this.blocked = false
    }

    public block() {
        this.blocked = true
        return this
    }

    public unblock() {
        this.blocked = false
        return this
    }
}
