<template>
    <Plane
      name="prize"
      ref="plane"
      :x="-778.30"
      :y="-957.18"
      :z="1107.84"
      :rotation-y="180"
      :width="170"
      :height="300"
      texture="/UI/2.png"
    >
      <Plane name="switch" :z="5" :x="-100" @mouse-over="mousePointer" @mouse-out="mouseDisPointer" @click="sswitch(-1)"></Plane>
      <Plane name="switch" :z="5" :x="100" @mouse-over="mousePointer" @mouse-out="mouseDisPointer" @click="sswitch(1)"></Plane>
    </Plane>

    <Plane
      name="prize"
      ref="plane"
      :x="-778.30"
      :y="-957.18"
      :z="1107.84"
      :rotation-y="180"
      :width="170"
      :height="300"
      texture="/UI/2.png"
    >
      <Plane name="switch" :z="5" :x="-100" @mouse-over="mousePointer" @mouse-out="mouseDisPointer" @click="sswitch(-1)"></Plane>
      <Plane name="switch" :z="5" :x="100" @mouse-over="mousePointer" @mouse-out="mouseDisPointer" @click="sswitch(1)"></Plane>
    </Plane>

    <Plane
      name="prize"
      ref="plane"
      :x="-778.30"
      :y="-957.18"
      :z="1107.84"
      :rotation-y="180"
      :width="170"
      :height="300"
      texture="/UI/2.png"
    >
      <Plane name="switch" :z="5" :x="-100" @mouse-over="mousePointer" @mouse-out="mouseDisPointer" @click="sswitch(-1)"></Plane>
      <Plane name="switch" :z="5" :x="100" @mouse-over="mousePointer" @mouse-out="mouseDisPointer" @click="sswitch(1)"></Plane>
    </Plane>

    <Plane
      name="prize"
      ref="plane"
      :x="-778.30"
      :y="-957.18"
      :z="1107.84"
      :rotation-y="180"
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
  