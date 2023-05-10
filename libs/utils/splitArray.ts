export function splitArray<T>(arr : T[]) : T[][]{
    const output : T[][] = []
    const length = arr.length
    for(let i = 0; i < length; i++){
        const firstHalf = arr.slice(0, Math.floor(length/2))
        const secondHalf = arr.slice(Math.floor(length/2))
        output.push(firstHalf, secondHalf)
    }
    return output
}