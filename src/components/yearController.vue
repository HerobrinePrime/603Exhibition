<template>
  <Plane
    :x="-132.85"
    :y="-944.59"
    :z="-246.43"
    ref="cubeRef"
    :inner-rotation-y="180"
  >
    <!-- sprite -->
    <HTMLMesh :y="100" ref="meshRef" :scale="0.2" bloom :opacity-factor="1">
      <div class="view-port">
        <div class="year-container">
          <div class="year" v-for="theYear in years" :key="theYear">
            {{ theYear }}
          </div>
        </div>
      </div>
    </HTMLMesh>

    <Plane
      :y="100"
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
      :y="100"
      :x="100"
      texture="/UI/year-controller/right.png"
      :opacity-factor="1"
      :scale-y="0.6"
      bloom
      @click="addYear"
      @mouse-out="mouseDisPointer"
      @mouse-over="mousePointer"
    ></Plane>
  </Plane>
</template>

<script lang="ts" setup>
import { Plane, HTMLMesh } from "lingo3d-vue";
import { years, subtractYear, addYear } from "@/hooks/cubesController";
import { mousePointer, mouseDisPointer } from "@/hooks/mousePointerController";
</script>

<style lang="less" scoped>
.view-port {
  position: relative;
  height: 500px;
  width: 500px;
  overflow: hidden;
  .year-container {
    right: 0;
    position: absolute;
    display: flex;
    // background-color: antiquewhite;
    .year {
      position: relative;
      height: 500px;
      width: 500px;
      // background-color: aqua;
      font-size: 150px;
      font-weight: bold;
      text-align: center;
      line-height: 500px;
      overflow: hidden;
    }
  }
}
</style>
