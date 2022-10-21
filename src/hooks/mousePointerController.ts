import { gsap } from 'gsap'

const mousePointer = () => {
    // console.log();
    // document.querySelectorAll('canvas')[2]?.nextSibling
    setTimeout(()=>{
        gsap.to(document.querySelectorAll('canvas')[2]?.nextSibling, {
            cursor: 'pointer',
        })
    },0)
}
const mouseDisPointer = () => {
    // console.log('out');

    gsap.to(document.querySelectorAll('canvas')[2]?.nextSibling, {
        cursor: 'auto'
    })
}

export {
    mouseDisPointer,
    mousePointer,
}