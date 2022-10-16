<template>
  <Plane
    :x="-132.85"
    :y="-944.59"
    :z="-246.43"
    ref="cubeRef"
    :inner-rotation-y="180"
    :cast-shadow="false"
  >
    <!-- sprite -->
    <!-- bloom -->
    <!-- <HTMLMesh :y="100" ref="meshRef" :scale="0.2" :opacity-factor="1">
      <div class="container">
        <div class="view-port">
          <div class="year-container">
            <div class="year" v-for="theYear in years" :key="theYear">
              {{ theYear }}
            </div>
          </div>
        </div>
      </div>
    </HTMLMesh> -->

    <Plane
      name="year-scroller"
      :y="100"
      :inner-rotation-y="180"
      ref="yearScrollerRef"
      :cast-shadow="false"
    >
      <Plane
        :height="60"
        v-for="(ele, index) in meshRefs"
        :key="ele.theYear"
        :y="-60 * (years.length - 1 - index)"
        color="#111"
        :inner-rotation-y="180"
        :cast-shadow="false"
        :ref="ele.meshR"
        :opacity-factor="1"
      >
        <HTMLMesh :scale="0.2" :bloom="yearForDisplay == index">
          <div class="year">
            <div class="context" :style="{}">
              {{ ele.theYear }}
            </div>
          </div>
        </HTMLMesh>
      </Plane>

      <Plane
        :height="60"
        v-for="(ele, index) in meshRefs"
        :key="ele.theYear"
        :y="-60 * (years.length - 1 - index)"
        color="#111"
        :cast-shadow="false"
        :opacity-factor="1"
        :x="70.00"
        :z="-0.1"
        :inner-rotation-y="180"
      >
        <HTMLMesh :scale="0.2">
          <div class="year-deco">
            <div class="border-use"></div>
            <div class="dot"></div>
            <div class="line-use"></div>
          </div>
        </HTMLMesh>
      </Plane>

      
    </Plane>

    <!-- <Plane
      :y="105"
      :x="-100"
      texture="/UI/year-controller/left.png"
      :opacity-factor="1"
      :scale-y="0.6"
      bloom
      @click="subtractYear"
      @mouse-out="mouseDisPointer"
      @mouse-over="mousePointer"
    ></Plane>
    <Plane
      :y="105"
      :x="100"
      texture="/UI/year-controller/right.png"
      :opacity-factor="1"
      :scale-y="0.6"
      bloom
      @click="addYear"
      @mouse-out="mouseDisPointer"
      @mouse-over="mousePointer"
    ></Plane> -->

    <Plane
      bloom
      :opacity-factor="1"
      :y="-80.71"
      :z="0.1"
      :x="70.00"
      :scale-y="0.7"
      :rotation-z="90"
      texture="/UI/year-controller/left.png"
      :normal-scale="{ x: 1, y: 1 }"
      @click="subtractYear"
      @mouse-out="mouseDisPointer"
      @mouse-over="mousePointer"
    />
    <Plane
      bloom
      :opacity-factor="1"
      :y="291.03"
      :z="0.1"
      :x="70.00"
      :scale-y="0.7"
      :rotation-z="90"
      texture="/UI/year-controller/right.png"
      :normal-scale="{ x: 1, y: 1 }"
      @click="addYear"
      @mouse-out="mouseDisPointer"
      @mouse-over="mousePointer"
    />
  </Plane>
</template>

<script lang="ts" setup>
import { Plane, HTMLMesh } from "lingo3d-vue";
import {
  years,
  subtractYear,
  addYear,
  intiMesh,
  yearForDisplay,
} from "@/hooks/cubesController";
import { mousePointer, mouseDisPointer } from "@/hooks/mousePointerController";
import {
  onMounted,
  ref,
  reactive,
  nextTick,
  computed,
  Ref,
  watchEffect,
  watch,
} from "vue";

import { gsap } from "gsap";

const meshRef = ref();
const yearScrollerRef = ref();

onMounted(() => {
  intiMesh(meshRef, yearScrollerRef);
});

const meshRefs = computed(() => {
  let array: any[] = [];

  years.forEach((theYear) => {
    let r = ref();
    // console.log(r);
    array.push({
      theYear,
      meshR: r,
    });
  });

  return array;
});

const planeInstances: any[] = [];

watchEffect(() => {
  if (meshRefs.value[0].meshR.value) {
    meshRefs.value.forEach((ele) => {
      planeInstances.push(ele.meshR.value[0]);
    });

    // gsap.to(planeInstances,{
    //   opacityFactor:0,
    //   duration:1,
    //   repeat:Infinity,
    //   yoyo:true
    // })
    nextTick(() => {
      setTimeout(() => {
        render();
      }, 500);
    });
  }
});

const render = () => {
  planeInstances.forEach((plane, index) => {
    // console.log(plane);
    gsap.to(plane, {
      opacityFactor: () => {
        const mi = Math.abs(yearForDisplay.value - index);
        console.log(mi);
        if (mi > 2) return 0;
        if (mi == 2) return 0.4;
        if (mi == 1) return 0.7;
        return 1;
      },

      duration: 0.3,
    });
  });

  document.querySelectorAll(".context").forEach((ele, index) => {
    gsap.to(ele, {
      duration: 0.3,
      fontSize: () => {
        const mi = Math.abs(yearForDisplay.value - index);
        console.log(mi);
        if (mi >= 2) return 1.1 * 150;
        if (mi == 1) return 1.15 * 150;
        return 1.2 * 150;
        // return 1
      },
    });
  });
};

watch(yearForDisplay, render);
</script>

<style lang="less" scoped>
// .container {
//   position: relative;
//   height: 1500px;
//   .view-port {
//     position: relative;
//     top: 600px;
//     left: 0;
//     height: 300px;
//     width: 500px;
//     // overflow: hidden;
//     .year-container {
//       right: 0;
//       top: 0;
//       // position: absolute;
//       position: relative;
//       display: flex;
//       flex-direction: column-reverse;
// //       // background-color: antiquewhite;
//       .year {
//         position: relative;
//         height: 300px;
//         width: 500px;
//         // background-color: aqua;
//         font-size: 150px;
//         font-weight: bold;
//         text-align: center;
//         line-height: 300px;
//         // overflow: hidden;
//       }
//     }
//   }
// }

.year {
  height: 300px;
  width: 500px;
  color: white;
  font-size: 150px;
  line-height: 300px;
  text-align: center;
  font-weight: bold;
  // background-color: aqua;
  // border-right: 15px solid red;
  box-sizing: border-box;
}
.year-deco {
  height: 300px;
  width: 500px;
  // background-color: red;
  position: relative;
  .border-use {
    position: relative;
    height: 300px;
    width: 250px;
    box-sizing: border-box;
    border-right: 20px solid rgb(251, 49, 49);
    // border-right: 10px solid rgb(255, 255, 255);
  }
  .dot {
    position: absolute;
    height: 40px;
    width: 40px;
    border-radius: 50%;
    background-color: rgb(251, 49, 49);
    // background-color: rgb(255, 255, 255);
    top: 100px;
    left: 0;
    right: 0;
    margin: auto;
  }
  .line-use{
    position: absolute;
    width: 250px;
    height: 0;
    top: 105px;
    left: 0;
    // border-bottom: 10px solid rgb(251, 49, 49);
  }
}
</style>
