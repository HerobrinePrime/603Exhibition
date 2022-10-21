<template>
  <Plane
    name="show"
    ref="plane"
    :x="382.01"
    :y="-933.19"
    :z="1757.14"
    :rotation-y="90"
    :width="170"
    :height="300"
    texture="/UI/2.png"
  >
    <Plane name="switch" :z="5" :x="-100" @mouse-over="mousePointer" @mouse-out="mouseDisPointer" @click="sswitch(-1)"></Plane>
    <Plane name="switch" :z="5" :x="100" @mouse-over="mousePointer" @mouse-out="mouseDisPointer" @click="sswitch(1)"></Plane>
  </Plane>
</template>

<script lang="ts" setup>
import { Plane, HTMLMesh,Lingo,mouse } from "lingo3d-vue";
import { mousePointer, mouseDisPointer } from "@/hooks/mousePointerController";

import { gsap } from "gsap";
// import { Draggable } from "gsap/Draggable";
import { onMounted, ref } from "vue";
// gsap.registerPlugin(Draggable);


const sswitch = (dir:number)=>{
  console.log('switch',dir);
}
</script>

<style lang="less" scoped></style>
