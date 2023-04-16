export default class KeyPress {
    #functions: Array<(key: string) => any>

    public constructor() {
        this.#functions = []
        this.addListener = this.addListener.bind(this)
        this.removeListener = this.removeListener.bind(this)
        this.trigger = this.trigger.bind(this)
    }

    public addListener(cb: (key: string) => any) {
        this.#functions.push(cb)
    }

    public removeListener(cb: (key: string) => any) {
        const index = this.#functions.indexOf(cb)
        this.#functions.splice(index, 1)
    }

    public trigger(key: string) {
        this.#functions.forEach((fn) => fn(key))
    }
}
