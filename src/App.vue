<template>
  <World>
    <!-- <Model
      :scale="300"
      src="/models/Grassland.glb"
      physics="map"
      name="map"
    ></Model> -->

    <Model
      name="603"
      src="/models/603.glb"
      :scale="5"
      :x="362.24"
      :y="-968.17"
      :z="1440.78"
      physics="map"
    >
      <Find name="logo.001" bloom :cast-shadow="false"></Find>
      <Find name="logo" bloom :cast-shadow="false"></Find>
      <Find
        name="文字"
        bloom
        emissive-color="#5cafff"
        :cast-shadow="false"
      ></Find>
      <Find name="玻璃_1"></Find>
      <Find name="玻璃门" :opacity="0.1"></Find>

      <Find name="点光"></Find>
      <Find name="wenzi" :x="1118.72"></Find>

      <!-- # e4a8ff -->
      <!-- point lights -->
      <!-- #region -->
      <PointLight
        :helper="false"
        :x="-115.4"
        :y="41.48"
        :z="-200.91"
        color="#ec82ff"
        :intensity="pointLightIntensity"
        :shadow-resolution="256"
        v-if="mtktwe"
      />
      <!-- <PointLight
        :helper="false"
        :x="-115.4"
        :y="41.48"
        :z="-211.24"
        color="#ec82ff"
        :intensity="pointLightIntensity"
        :shadow-resolution="256"
      />
      <PointLight
        :helper="false"
        :x="-115.4"
        :y="41.48"
        :z="-189.91"
        color="#ec82ff"
        :intensity="pointLightIntensity"
        :shadow-resolution="256"
      /> -->

      <PointLight
        :helper="false"
        :x="-115.4"
        :y="13.41"
        :z="-200.91"
        color="#1f94ff"
        :intensity="pointLightIntensity"
        :shadow-resolution="256"
        v-if="mtktwe"
      />
      <!-- <PointLight
        :helper="false"
        :x="-115.4"
        :y="13.41"
        :z="-211.24"
        color="#ec82ff"
        :intensity="pointLightIntensity"
        :shadow-resolution="256"
      />
      <PointLight
        :helper="false"
        :x="-115.4"
        :y="13.41"
        :z="-189.91"
        color="#ec82ff"
        :intensity="pointLightIntensity"
        :shadow-resolution="256"
      /> -->

      <PointLight
        :helper="false"
        :x="-115.4"
        :y="-0.28"
        :z="-200.91"
        color="#6193ff"
        :intensity="pointLightIntensity"
        :shadow-resolution="256"
        v-if="mtktwe"
      />
      <!-- <PointLight
        :helper="false"
        :x="-115.4"
        :y="-0.28"
        :z="-211.24"
        color="#6193ff"
        :intensity="pointLightIntensity"
        :shadow-resolution="256"
      />
      <PointLight
        :helper="false"
        :x="-115.4"
        :y="-0.28"
        :z="-289.91"
        color="#6193ff"
        :intensity="pointLightIntensity"
        :shadow-resolution="256"
      /> -->
      <!-- #endregion -->
    </Model>

    <!-- test models -->
    <!-- #region -->
    <!-- <Model name="shiyanshi" src="/models/shiyanshi.glb" :scale="1" :x="-963.12">
      <Find
        name="平面"
        reflection
        :metalness-factor="0.6"
        :roughness-factor="0.3"
      ></Find>
      <Find name="文字" bloom></Find>
      <Find name="rahmen">
        
      </Find>
    </Model> -->

    <!-- <Model src="/models/gamer.glb" :scale="10" :x="-963.12"></Model>
    <Model src="/models/spring.glb" :scale="3" :z="1246.58" reflection></Model>
    <Model src="/models/bulb.glb" :scale="3" reflection>
      <Find name="Bulb" :opacity-factor="0.6"></Find>
    </Model> -->
    <!-- <Model src="/models/bulb2.glb" :scale="10" ></Model>dwd -->

    <!-- <Model src="/models/metal.glb" :scale="3" :x="-963.12" :y="-800" reflection></Model> -->
    <!-- <Model src="/models/glass.glb" :scale="3" :x="-863.12" :y="-800" :opacity-factor="0.6"></Model> -->
    <!-- <Model src="/models/moji.glb" :scale="3" :x="-863.12" :y="-800" :opacity-factor="0.6"></Model> -->

    <!-- 
    <Model src="/models/test02.glb" :scale="5" :x="-863.12" :y="-810.21" :z="741.79" physics="map">
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
    </Model> -->

    <!-- <Model
      src="/models/gradient.glb"
      :scale="1"
      :x="-763.12"
      :z="100"
      :y="-700"
      bloom
    ></Model> -->

    <!-- <Model
      src="/models/logo.fbx"
      :scale="1"
      :x="-663.12"
      :z="100"
      :y="-700"
      bloom
    ></Model> -->
    <!-- #endregion -->

    <!-- year controller -->
    <YearController></YearController>

    <!-- ContextPlane -->
    <ContextPlane></ContextPlane>

    <!-- PrizePlane -->
    <PrizePlane></PrizePlane>

    <!-- Frames -->
    <!-- :opacity="0" -->
    <Model
      v-for="(cube, index) in computedCubes"
      :key="index"
      :x="computedX(index)"
      :y="computedY(index)"
      :opacity-factor="0"
      :z="startZ"
      :cast-shadow="false"
      :ref="cube"
      :scale="0.39"
      src="/models/picture.glb"
      @mouse-over="mousePointer"
      @mouse-out="mouseDisPointer"
      @click="frameShow(`/UI/photos/${years[year]}/${index}.webp`)"
    >
      <Plane
        :texture="`/UI/photos/${years[year]}/${index}.webp`"
        :opacity-factor="1"
        :z="9"
        :width="115"
        :height="80"
        :opacity="1"
        :cast-shadow="false"
        :ref="computedPlanes[index]"
      ></Plane>
    </Model>

    <!-- video -->
    <VideoPlaneVue></VideoPlaneVue>

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

    <!-- lights -->
    <PointLight :x="-323.89" :y="-763.08" :z="2024.37" :intensity="0.5" />

    <!-- :bloom-strength="0.2" -->
    <!-- default-light="/env/env.hdr" -->
    <!-- skybox="/env/env.hdr" -->
    <!-- default-light="" -->
    <Setup
      :bloom-strength="0.3"
      :bloom-radius="0.5"
      :bloom-threshold="0.6"
      default-light="default"
      :exposure="0.7"
      skybox="/env/env.hdr"
    />
    <LingoEditor v-if="editorOn" />
  </World>
  <!-- Frame -->
  <el-dialog
    v-model="dialogVisible"
    width="70%"
    :before-close="handleClose"
    style="--el-dialog-margin-top: 8vh"
  >
    <div class="prize">
      <el-image
        style="width: 100%; height: 100%"
        :src="photoPath"
        fit="contain"
      />
    </div>
    <!-- <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">Cancel</el-button>
        <el-button type="primary" @click="dialogVisible = false"
          >Confirm</el-button
        >
      </span>
    </template> -->
  </el-dialog>

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
import { onMounted, ref } from "vue";
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
  PointLight,
  DirectionalLight,
} from "lingo3d-vue";
import { gsap } from "gsap";

//hooks
//#region
import { editorOn, mtktwe } from "@/hooks/edit";
import keyAction from "@/hooks/keyActions";
import { start, loadingProcess } from "@/hooks/load";
import { play, reverse, display, initCubeAnime } from "@/hooks/cubeAnime-demo";
import {
  computedCubes,
  computedPlanes,
  year,
  years,
} from "@/hooks/cubesController";
import { mousePointer, mouseDisPointer } from "@/hooks/mousePointerController";
import { computedX, computedY, startZ } from "@/hooks/framePositionsController";

//components
import YearController from "./components/yearController.vue";
import ContextPlane from "./components/contextPlane.vue";
import VideoPlaneVue from "./components/videoPlane.vue";
import PrizePlane from "./components/prizePlane.vue";

//#endregion

const frameShow = (path: string) => {
  console.log(path);
  dialogVisible.value = true;
  photoPath.value = path;
};
const dialogVisible = ref(false);
const photoPath = ref("");
const handleClose = () => {
  dialogVisible.value = false;
};

const pointLightIntensity = ref(0.1);

const cubeRef = ref();
const dummyRef = ref();

onMounted(() => {
  keyAction(dummyRef);
  initCubeAnime(cubeRef.value);
});
</script>

<style lang="less">
@font-face {
  font-family: face;
  src: url("/font/source.ttf");
}
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
