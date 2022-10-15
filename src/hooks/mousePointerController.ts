import { gsap } from 'gsap'

const mousePointer = () => {
    gsap.to(document.querySelectorAll('canvas')[2].nextSibling, {
        cursor: 'pointer'
    })
}
const mouseDisPointer = () => {
    gsap.to(document.querySelectorAll('canvas')[2].nextSibling, {
        cursor: 'auto'
    })
}

export {
    mouseDisPointer,
    mousePointer,
}