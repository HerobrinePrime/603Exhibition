import { gsap } from "gsap";
import { ref, reactive, computed, nextTick, watchEffect, watch, VNodeRef, Ref } from "vue";
import { throttle } from 'lodash'

const MAXPHOTOCOUNT = 10

const yearCount = [4, 5, 3];
const years = ['2012', '2013', '2014']

const year = ref(2);
const yearForDisplay = ref(2);

const cubesDisable = (callback: any = undefined) => {
    gsap.to(cubesInstances, {
        y: -880,
        opacity: 0,
        duration: 0.2,
        stagger: 0.05,
        ease: "none",
        onComplete: () => {
            if (callback instanceof Function) callback();
        },
    });

    gsap.to(planesInstances, {
        opacity: 0,
        duration: 0.2,
        stagger: 0.05,
        ease: 'none'
    })
};
const cubesEnable = () => {
    gsap.to(cubesInstances, {
        y: -900,
        opacity: 1,
        duration: 0.2,
        stagger: 0.05,
        ease: "none",
    });

    gsap.to(planesInstances, {
        opacity: 1,
        duration: 0.2,
        stagger: 0.05,
        ease: "none",
    })
};


const cubes = reactive(new Array<any>());
const planes = reactive(new Array<any>)
const computedCubes = computed(() => {
    return cubes.slice(0, yearCount[year.value]);
});
const computedPlanes = computed(() => {
    return planes.slice(0, yearCount[year.value])
})


let cubesInstances: Array<Ref> = [];
let planesInstances: Array<Ref> = []

const cubeUpdate = () => {
    nextTick(() => {
        if (cubes[0]?.value && planes[0]?.value) {
            cubesInstances.length = 0;
            computedCubes.value.forEach((ele) => {
                cubesInstances.push(ele.value[0]);
            });

            planesInstances.length = 0
            computedPlanes.value.forEach((plane) => {
                planesInstances.push(plane.value[0])
            })
        }

        cubesEnable();
    });
}

const addYear = throttle(() => {
    if (year.value >= years.length - 1) {
        year.value = years.length - 1
        return
    }
    if (yearForDisplay.value >= years.length - 1) {
        yearForDisplay.value = years.length - 1
        return
    }

    yearForDisplay.value++

    // let timeline = gsap.timeline()
    // timeline
    //     .to(mesh, {
    //         opacityFactor: 0,
    //         duration: 0.3
    //     })
    //     .to('.year-container', {
    //         x: '-=500',
    //         duration: 0
    //     }).to(mesh, {
    //         opacityFactor: 1,
    //         duration: 0.3
    //     })

    cubesDisable(() => {
        year.value++;

        cubeUpdate()
    });
}, 500)

const subtractYear = throttle(() => {
    if (year.value <= 0) {
        year.value = 0
        return
    }
    if (yearForDisplay.value <= 0) {
        yearForDisplay.value = 0
        return
    }

    yearForDisplay.value--

    // let timeline = gsap.timeline()
    // timeline
    //     .to(mesh, {
    //         opacityFactor: 0,
    //         duration: 0.3
    //     })
    //     .to('.year-container', {
    //         x: '+=500',
    //         duration: 0
    //     }).to(mesh, {
    //         opacityFactor: 1,
    //         duration: 0.3
    //     })


    cubesDisable(() => {
        year.value--;

        cubeUpdate()
    });
}, 500)

watchEffect(() => {
    console.log("rerender");

    cubes.length = 0;
    // yearCount[year.value]
    for (let i = 0; i < MAXPHOTOCOUNT; i++) {
        let r = ref<VNodeRef>();
        let p = ref<VNodeRef>()
        // console.log(r);
        cubes.push(r);
        planes.push(p)
    }

    cubeUpdate()
});


let meshRef: Ref;
const intiMesh = (theMeshRef: Ref) => {
    meshRef = theMeshRef
}
watch(yearForDisplay, (v) => {
    console.log(v);
    if (v > years.length - 1 || v < 0) return



    let timeline = gsap.timeline()
    timeline
        .to(meshRef.value, {
            opacityFactor: 0,
            duration: 0.3
        })
        .to('.year-container', {
            x: (years.length - 1 - yearForDisplay.value) * 500,
            duration: 0
        }).to(meshRef.value, {
            opacityFactor: 1,
            duration: 0.3
        })
})

export {
    computedCubes, computedPlanes, 
    // cubesDisable, cubesEnable, 
    addYear, subtractYear, year, yearForDisplay, years, intiMesh
}