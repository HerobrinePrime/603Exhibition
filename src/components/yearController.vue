<template>
  <Plane
    name="years-selector"
    :scale="0.7"
    :x="16.69"
    :y="-1021.33"
    :z="0"
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

    <!-- ref="yearScrollerRef" -->
    <Plane
      name="year-scroller"
      :y="220"
      :inner-rotation-y="180"
      :cast-shadow="false"
    >
      <Plane
        name="year-plane"
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
        <Plane
          name="clickable-plane"
          :height="60"
          :visible="false"
          @click="selectYear(index)"
          @mouse-out="mouseDisPointer"
          @mouse-over="mousePointer"
        ></Plane>
      </Plane>
    </Plane>

    <!-- line -->
    <Plane
      :height="60"
      v-for="index in 5"
      :key="index"
      :y="60 * (4 - index) + 40"
      color="#111"
      :cast-shadow="false"
      :opacity-factor="1"
      :x="70.0"
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

    <!-- <Plane
      :y="105"
      :x="-100"
      texture="/UI/year-controller/left.png"
      :opacity-factor="1"
      :scale-y="0.6"
      bloom
      @click="subtractYear"
      @mouse-out="mouseDisPointer"`
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
      emissive-color="#363636"
      :opacity-factor="1"
      :y="-65"
      :z="0.1"
      :x="70.0"
      :scale="0.3"
      :rotation-z="90"
      texture="/UI/year-controller/left.png"
      :normal-scale="{ x: 1, y: 1 }"
      @click="addPage"
      @mouse-out="mouseDisPointer"
      @mouse-over="mousePointer"
    />
    <Plane
      emissive-color="#363636"
      :opacity-factor="1"
      :y="265"
      :z="0.1"
      :x="70.0"
      :scale="0.3"
      :rotation-z="90"
      texture="/UI/year-controller/right.png"
      :normal-scale="{ x: 1, y: 1 }"
      @click="subPage"
      @mouse-out="mouseDisPointer"
      @mouse-over="mousePointer"
    />
  </Plane>
</template>

<script lang="ts" setup>
import { Plane, HTMLMesh } from "lingo3d-vue";
import {
  years,
  // intiMesh,
  yearForDisplay,
  addPage,
  subPage,
  page,
  selectYear,
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

// const meshRef = ref();
// const yearScrollerRef = ref();

// onMounted(() => {
// intiMesh(meshRef, yearScrollerRef);
// });

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
    const timeline = gsap.timeline();
    timeline
      .to(plane, {
        duration: 0.3,
        opacityFactor: 0,
      })
      .to(plane, {
        y: () => {
          const disIndex = years.length - 1 - index;
          return page.value * 300 + -60 * disIndex;
        },
        duration: 0,
      })
      .to(plane, {
        opacityFactor: opacityFactorCalculator(index),
        duration: 0.3,
      });
  });

  fontSizeCalculator();
};
const render2 = () => {
  planeInstances.forEach((plane, index) => {
    gsap.to(plane, {
      opacityFactor: opacityFactorCalculator(index),
      duration: 0.5,
    });
  });

  fontSizeCalculator();
};
const opacityFactorCalculator = (index: number) => {
  const disIndex = years.length - 1 - index;
  const currentDisIndex = years.length - 1 - yearForDisplay.value;
  if (disIndex >= page.value * 5 && disIndex < (page.value + 1) * 5) {
    const mi = Math.abs(yearForDisplay.value - index);

    if (
      currentDisIndex >= page.value * 5 &&
      currentDisIndex < (page.value + 1) * 5
    ) {
      if (mi == 0) return 1;
      if (mi == 1) return 0.8;
      if (mi == 2) return 0.6;
      if (mi == 3) return 0.6;
      if (mi == 4) return 0.6;
    } else {
      return 0.6;
    }
  } else {
    return 0;
  }
};
const fontSizeCalculator = () => {
  document.querySelectorAll(".context").forEach((ele, index) => {
    const mi = Math.abs(yearForDisplay.value - index);
    gsap.to(ele, {
      duration: 0.3,
      fontSize: () => {
        if (mi == 0) return 1.3 * 150;
        if (mi == 1) return 1.15 * 150;
        if (mi == 2) return 1.1 * 150;
        if (mi == 3) return 1.05 * 150;
        if (mi == 4) return 1 * 150;
        return 1 * 150;
      },
      // delay:()=>{
      //   if (mi == 0) return 0
      //   if (mi == 1) return 0.02
      //   if (mi == 2) return 0.04
      //   if (mi == 3) return 0.06
      //   if (mi == 4) return 0.08
      //   return 1
      // }
    });
  });
};

watch(page, render);
watch(yearForDisplay, render2);
</script>

<style lang="less" scoped>
@font-face {
  font-family: source;
  src: url("/font/source.ttf");
}
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
  font-family: source;
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
    border-right: 20px solid #947557;
    box-shadow: 10px 5px 5px rgb(98, 3, 3);
    // border-right: 10px solid rgb(255, 255, 255);
  }

  .dot {
    position: absolute;
    height: 30px;
    width: 30px;
    border-radius: 50%;
    background-color: #947557;
    // background-color: rgb(255, 255, 255);
    top: 100px;
    left: 0;
    right: 0;
    margin: auto;
  }

  .line-use {
    position: absolute;
    width: 250px;
    height: 0;
    top: 105px;
    left: 0;
    // border-bottom: 10px solid rgb(251, 49, 49);
  }
}
</style>
