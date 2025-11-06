// Generador simple de mesa: 1..50
export function assignTableNumber(existing) {
    if (existing && Number.isInteger(existing)) return existing
    const min = 1, max = 50
    return Math.floor(Math.random() * (max - min + 1)) + min
}
