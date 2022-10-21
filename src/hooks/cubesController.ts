import { gsap } from "gsap";
import { ref, reactive, computed, nextTick, watchEffect, watch, VNodeRef, Ref } from "vue";
import { max, throttle } from 'lodash'

const MAXPHOTOCOUNT = 18

const yearCount = [4, 5, 3, 2, 6, 18, 3, 4];
const years = ['2012', '2013', '2014', '2015', '2016', '2017', '2018', '2019']
// const years = ['2013', '2014', '2015', '2016', '2017', '2018', '2019','2020','2021','2022']

const year = ref(yearCount.length - 1);
const yearForDisplay = ref(yearCount.length - 1);

const cubesDisable = (callback: any = undefined) => {
    gsap.to(cubesInstances, {
        y: '+=20',
        opacityFactor: 0,
        duration: 0.2,
        stagger: 0.05,
        ease: "none",
        onComplete: () => {
            if (callback instanceof Function) callback();
        },
    });

    // gsap.to(planesInstances, {
    //     opacity: 0,
    //     duration: 0.2,
    //     stagger: 0.05,
    //     ease: 'none'
    // })
};
const cubesEnable = () => {
    gsap.to(cubesInstances, {
        y: '-=20',
        opacityFactor: 1,
        duration: 0.2,
        stagger: 0.05,
        ease: "none",
    });

    // gsap.to(planesInstances, {
    //     opacity: 1,
    //     duration: 0.2,
    //     stagger: 0.05,
    //     ease: "none",
    // })
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
// let planesInstances: Array<Ref> = []

const cubeUpdate = () => {
    nextTick(() => {
        if (cubes[0]?.value && planes[0]?.value) {
            cubesInstances.length = 0;
            computedCubes.value.forEach((ele) => {
                cubesInstances.push(ele.value[0]);
            });

            // planesInstances.length = 0
            // computedPlanes.value.forEach((plane) => {
            //     planesInstances.push(plane.value[0])
            // })
        }

        cubesEnable();
    });
}

// const addYear = throttle(() => {
//     if (year.value >= years.length - 1) {
//         year.value = years.length - 1
//         return
//     }
//     if (yearForDisplay.value >= years.length - 1) {
//         yearForDisplay.value = years.length - 1
//         return
//     }

//     yearForDisplay.value++

//     // let timeline = gsap.timeline()
//     // timeline
//     //     .to(mesh, {
//     //         opacityFactor: 0,
//     //         duration: 0.3
//     //     })
//     //     .to('.year-container', {
//     //         x: '-=500',
//     //         duration: 0
//     //     }).to(mesh, {
//     //         opacityFactor: 1,
//     //         duration: 0.3
//     //     })

//     cubesDisable(() => {
//         year.value++;

//         cubeUpdate()
//     });
// }, 500)

// const subtractYear = throttle(() => {
//     if (year.value <= 0) {
//         year.value = 0
//         return
//     }
//     if (yearForDisplay.value <= 0) {
//         yearForDisplay.value = 0
//         return
//     }

//     yearForDisplay.value--

//     // let timeline = gsap.timeline()
//     // timeline
//     //     .to(mesh, {
//     //         opacityFactor: 0,
//     //         duration: 0.3
//     //     })
//     //     .to('.year-container', {
//     //         x: '+=500',
//     //         duration: 0
//     //     }).to(mesh, {
//     //         opacityFactor: 1,
//     //         duration: 0.3
//     //     })


//     cubesDisable(() => {
//         year.value--;

//         cubeUpdate()
//     });
// }, 500)
const selectYear = throttle((index:number)=>{
    // console.log(index);
    if(yearForDisplay.value === index) return

    yearForDisplay.value = index
    cubesDisable(()=>{
        year.value = index

        cubeUpdate()
    })
},500)

const page = ref(0)
const maxPage = Math.ceil(years.length / 5) - 1
const addPage = () => {
    // console.log('add');
    if (page.value == maxPage) return
    page.value++
}
const subPage = () => {
    // console.log('sub');
    if (page.value == 0) return
    page.value--
}

// watch(page, v => {
//     console.log(v);
//     const timeline = gsap.timeline()

//     timeline
//         .to(yearScrollerRef.value, {
//             duration: 0.3,
//             opacityFactor: 0
//         })
//         .to(yearScrollerRef.value, {
//             duration: 0,
//             y: 220 + page.value * 300
//         })
//         .to(yearScrollerRef.value, {
//             duration: 0.3,
//             opacityFactor: 1
//         })
// })

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


// let meshRef: Ref;
// let yearScrollerRef: Ref;
// const intiMesh = (theMeshRef: Ref, theYearScrollerRef: Ref) => {
    // meshRef = theMeshRef
    // yearScrollerRef = theYearScrollerRef
// }

// watch(yearForDisplay, (v) => {
// console.log(v);
// if (v > years.length - 1 || v < 0) return

// let timeline = gsap.timeline()
// timeline.to(yearScrollerRef.value,{
//     duration:0.3,
//     y:100 + (years.length - 1 - yearForDisplay.value) * 60
// })
// .to(meshRef.value, {
//     opacityFactor: 0,
//     duration: 0.3
// })
// .to('.year-container', {
//     y: -(years.length - 1 - yearForDisplay.value) * 300,
//     duration: 0.3
// })
// .to(meshRef.value, {
//     opacityFactor: 1,
//     duration: 0.3
// })
// })

export {
    computedCubes, computedPlanes,
    // cubesDisable, cubesEnable, intiMesh,
    year, yearForDisplay, years, 
    addPage, subPage,page,
    selectYear
}