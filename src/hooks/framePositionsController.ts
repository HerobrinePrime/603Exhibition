const distance1 = 75
const distance2 = 83
const startX = -786.85
const xDis = 38
const startY = -871
const startY2 = -823.95
const startY3 = -1008.83
const startY4 = -941.78
const startZ = -33.41
const computedX = (index: number) => {
    if (index < 4) return index * distance1 + startX
    if (index < 9) return index * distance2 + startX + xDis
    if (index < 13) return (index - 9) * distance1 + startX
    return (index - 9) * distance2 + startX + xDis
}
const computedY = (index: number) => {
    if (index < 4) return startY
    else if (index < 9) return startY2
    else if (index < 13) return startY3
    else return startY4
}

export {
    computedX,
    computedY,
    startZ,
}