import { onMounted, ref } from "vue";
import { gsap } from "gsap";
const initCubeAnime = (cube: gsap.TweenTarget) => {
    ani = gsap.to(cube, {
        y: -708.56,
        duration: 2,
        ease: "circ.inOut",
        paused: true,
    });
}

let ani: gsap.core.Tween;
const play = () => {
    ani.play();
};
const reverse = () => {
    ani.reverse();
};
const displaying = ref(true);
const display = (cube: gsap.TweenTarget) => {
    if (displaying.value) {
        gsap.to(cube, {
            opacity: 0,
            duration: 1,
        });
    } else {
        gsap.to(cube, {
            opacity: 1,
            duration: 1,
        });
    }
    displaying.value = !displaying.value;
};

export {
    display,
    play,
    reverse,
    initCubeAnime,
}