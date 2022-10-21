<template>
  <!-- video -->
  <Plane
    :scale-x="1"
    :scale-y="1"
    :x="-10.53"
    :y="-919.88"
    :z="837.58"
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
      :opacity-factor="1"
      :z="0.1"
      :opacity="1"
      bloom
      emissive-color="#fff"
    >
    </Plane>
  </Plane>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { Plane, } from 'lingo3d-vue'
import {
  el,
  planeEnter,
  planeLeave,
  planeClicked,
  btnTexture,
  stopped,
} from "@/hooks/createVideo";

const videoPlaneRef = ref();
el.addEventListener("ended", () => {
  stopped.value = true;
  videoPlaneRef.value.opacity = 1;
});

</script>

<style lang="less" scoped></style>
