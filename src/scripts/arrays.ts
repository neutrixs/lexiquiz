export function findAllIndex<T extends any>(
    arr: T[],
    callback: (val: T, index: number) => boolean,
): number[] {
    return arr
        .map((val, index) => (callback(val, index) ? index : null))
        .filter((val): val is number => val != null)
}
