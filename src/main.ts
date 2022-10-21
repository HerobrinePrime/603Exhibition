import { createApp } from 'vue';
import App from './App.vue';

import '@/main.css'

//element
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

const app = createApp(App)

app.use(ElementPlus)
app.mount('#app')
