<template>
  <World>
    <Model
      :scale="300"
      src="/models/Grassland.glb"
      physics="map"
      name="map"
    ></Model>
    <!-- <Model :scale="100" src="/models/test.glb" physics="map" name="map"> -->
    <!-- <Find name="road" physics="map"></Find> -->
    <!-- <Find name="Ground"  physics="map" :metalness-factor="1" :roughness-factor="0"></Find> -->
    <!-- <Find name="Ground.001" physics="map" :metalness-factor="1" :roughness-factor="0"></Find> -->
    <!-- </Model> -->

    <!-- <Model src="/models/gamer.glb" :scale="10" :x="-963.12"></Model>
    <Model src="/models/spring.glb" :scale="3" :z="1246.58" reflection></Model>
    <Model src="/models/bulb.glb" :scale="3" reflection>
      <Find name="Bulb" :opacity-factor="0.6"></Find>
    </Model> -->
    <!-- <Model src="/models/bulb2.glb" :scale="10" ></Model>dwd -->

    <!-- <Model src="/models/metal.glb" :scale="3" :x="-963.12" :y="-800" reflection></Model> -->
    <!-- <Model src="/models/glass.glb" :scale="3" :x="-863.12" :y="-800" :opacity-factor="0.6"></Model> -->
    <!-- <Model src="/models/moji.glb" :scale="3" :x="-863.12" :y="-800" :opacity-factor="0.6"></Model> -->
    <Model src="/models/test02.glb" :scale="1" :x="-863.12" :y="-800">
      <Find
        name="平面"
        reflection
        :metalness-factor="0.6"
        :roughness-factor="0.3"
      ></Find>
      <Find name="文字" bloom></Find>
      <Find name="rahmen">
        <Plane></Plane>
      </Find>
    </Model>

    <Model
      src="/models/gradient.glb"
      :scale="1"
      :x="-763.12"
      :z="100"
      :y="-700"
      bloom
    ></Model>

    <Model
      src="/models/logo.fbx"
      :scale="1"
      :x="-663.12"
      :z="100"
      :y="-700"
      bloom
    ></Model>

    <!-- year controller -->
    <YearController></YearController>

    <Cube
      v-for="(cube, index) in computedCubes"
      :key="index"
      :x="index * -70"
      :y="-880"
      :opacity="0"
      :z="0"
      :width="50"
      :height="50"
      :depth="50"
      :cast-shadow="false"
      :ref="cube"
    >
      <Plane
        :texture="`/UI/photos/${years[year]}/${index}.png`"
        :opacity-factor="1"
        :z="25.1"
        :width="50"
        :height="50"
        :opacity="0"
        :cast-shadow="false"
        :ref="computedPlanes[index]"
      ></Plane>
    </Cube>

    <!-- video-texture="/video/sayori.mp4" -->
    <!-- bloom -->
    <!-- video -->
    <Plane
      :scale-x="1"
      :scale-y="1"
      :x="278.92"
      :y="-919.88"
      :z="54.88"
      :rotation-y="180.0"
      :video-texture="el"
      bloom
      :height="90"
      :width="160.0"
      @mouse-over="planeEnter(videoPlaneRef)"
      @mouse-out="planeLeave(videoPlaneRef)"
      @click="planeClicked"
      
    >
      <Plane
        ref="videoPlaneRef"
        :height="40"
        :width="40.0"
        :texture="btnTexture"
        :opacity-factor="0.9"
        :z="0.1"
        :opacity="1"
      >
      </Plane>
    </Plane>
    <!-- <Audio ref="audioRef" src="/audio/01.mp3" autoplay loop /> -->

    <FirstPersonCamera active mouse-control="drag" :inner-y="75">
      <Dummy
        ref="dummyRef"
        :y="-968.56"
        :strideMove="true"
        strideMode="free"
        physics="character"
        :visible="false"
      />
    </FirstPersonCamera>

    <!-- :bloom-strength="0.2" -->
    <!-- default-light="/env/env.hdr" -->
    <!-- skybox="/env/env.hdr" -->
    <Setup :bloom-strength="0.3" :bloom-radius="0.5" :bloom-threshold="0.6" />
    <LingoEditor v-if="editorOn" />
  </World>

  <!-- load -->
  <!-- <div class="loading" v-if="!start">
    <div class="moji">
      <span v-if="loadingProcess !== 100"
        >loading... {{ Math.floor(loadingProcess) }}%</span
      >
      <span v-else @click="start = true">Start</span>
    </div>
  </div> -->

  <a
    class="btn"
    style="top: 60px"
    href="javascript:void(0);"
    @click.prevent="editorOn = !editorOn"
    >editorOn</a
  >

  <a
    class="btn"
    style="top: 80px"
    href="javascript:void(0);"
    @click.prevent="play"
    >play</a
  >
  <a
    class="btn"
    style="top: 100px"
    href="javascript:void(0);"
    @click.prevent="reverse"
    >reverse</a
  >
  <a
    class="btn"
    style="top: 120px"
    href="javascript:void(0);"
    @click.prevent="display(cubeRef)"
    >display</a
  >

  <!-- <a
    class="btn"
    style="top: 140px"
    href="javascript:void(0);"
    @click.prevent="cubesDisable"
    >cubesDisable</a
  >
  <a
    class="btn"
    style="top: 160px"
    href="javascript:void(0);"
    @click.prevent="cubesEnable"
    >cubesEnable</a
  > -->
  <!-- <a class="btn" style="top: 180px" href="javascript:void(0);">{{ year }}</a>
  <a
    class="btn"
    style="top: 200px"
    href="javascript:void(0);"
    @click.prevent="addYear()"
    >addYear</a
  >
  <a
    class="btn"
    style="top: 220px"
    href="javascript:void(0);"
    @click.prevent="subtractYear()"
    >subtractYear</a
  > -->
  <!-- <a style="top: 80px" class="btn" href="javascript:void(0);" @click="playVideo"
    >playVideo</a
  >
  <a
    style="top: 100px"
    class="btn"
    href="javascript:void(0);"
    @click="pauseVideo"
    >pauseVideo</a
  > -->
</template>

<script lang="ts" setup>
import {
  onMounted,
  ref,
  // reactive,
  // Ref,
  // watchEffect,
  // VNodeRef,
  // nextTick,
  // computed,
} from "vue";
import {
  World,
  Model,
  Dummy,
  FirstPersonCamera,
  LingoEditor,
  Setup,
  Find,
  Plane,
  // HTMLMesh,
  Cube,
} from "lingo3d-vue";
import { gsap } from "gsap";

//hooks
//#region
import { editorOn } from "@/hooks/edit";
import keyAction from "@/hooks/keyActions";
import { start, loadingProcess } from "@/hooks/load";
import {
  el,
  planeEnter,
  planeLeave,
  planeClicked,
  btnTexture,
  stopped,
} from "@/hooks/createVideo";
import { play, reverse, display, initCubeAnime } from "@/hooks/cubeAnime-demo";
import {
  computedCubes,
  computedPlanes,
  // cubesDisablew
  // addYear,
  // subtractYear,
  year,
  // yearForDisplay,
  years,
  intiMesh,
} from "@/hooks/cubesController";
import { 
  mousePointer,
  mouseDisPointer, 
} from '@/hooks/mousePointerController'

//components
import YearController from './components/yearController.vue'

//#endregion

const meshRef = ref();

const cubeRef = ref();

const dummyRef = ref();
const videoPlaneRef = ref();
el.addEventListener("ended", () => {
  stopped.value = true;
  videoPlaneRef.value.opacity = 1;
});


onMounted(() => {
  keyAction(dummyRef);
  initCubeAnime(cubeRef.value);
  intiMesh(meshRef);
});


</script>

<style lang="less" scoped>
.btn {
  position: absolute;
  right: 0;
  z-index: 1000;
  color: #fff;
  text-decoration: none;
}
.loading {
  position: absolute;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  z-index: 1000;
  background-color: #000;
  .moji {
    height: 30px;
    line-height: 30px;
    text-align: center;
    color: #fff;
    font-size: 30px;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    margin: auto;
  }
}


</style>
