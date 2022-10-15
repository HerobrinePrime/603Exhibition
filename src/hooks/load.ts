import { usePreload } from "lingo3d-vue"
import { ref } from "vue"

const start = ref(false)
const loadingProcess = usePreload([
  "/env/env.hdr",

  "/models/Fox.fbx",
  "/models/Grassland.glb",
  "/models/Idle.fbx",
  "/models/Walking.fbx",
],'6.62MB')

const input = ref("")
const username = ref("");
const dialogVisible = ref(true)
const confirm = ()=>{
  if(!input.value) return
  username.value = input.value
  dialogVisible.value = false
}

export{
    start,
    loadingProcess,
    input,
    username,
    dialogVisible,
    confirm,
}