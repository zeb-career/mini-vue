import { createApp } from '../../lib/my-mini-vue.esm.js'
import { App } from './App.js'

const rootContainer = document.querySelector("#app")
createApp(App).mount(rootContainer);
