import { ref, watch,Ref } from "vue";
import { gsap } from 'gsap'
import { mouseDisPointer,mousePointer, } from '@/hooks/mousePointerController'

const createElement = <T extends Element>(html: string) => {
    const el = document.createElement("div");
    el.innerHTML = html;
    return el.children[0] as T;
};

const el =
    createElement<HTMLVideoElement>(`<video playsinline style="display: none">
        <source
          src="/video/sayori.mp4"
          type="video/mp4"
        ></source>
        </video>`);
document.body.appendChild(el);

const planeLeave = (videoPlane:any) => {
    mouseDisPointer()
    gsap.to(videoPlane,{
        opacity:0,
        duration:0.5
    })
}
const planeEnter = (videoPlane:any) => {
    mousePointer()
    gsap.to(videoPlane,{
        opacity:1,
        duration:0.5
    })
}



const btnTexture = ref('/UI/video-controller/play.png')
const stopped = ref(true)
const planeClicked = () => {
    stopped.value = !stopped.value
    if (stopped.value) pauseVideo()
    else playVideo()
};
watch(stopped, (v) => {
    if (v) btnTexture.value = '/UI/video-controller/play.png'
    else btnTexture.value = '/UI/video-controller/pause.png'
})

const playVideo = () => {
    el.play();
};

const pauseVideo = () => {
    el.pause();
};

export {
    el, planeEnter, planeLeave, planeClicked, btnTexture,stopped
}