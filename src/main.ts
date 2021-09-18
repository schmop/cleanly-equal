import { createApp } from 'vue';
import Cleanly from './Cleanly.vue';
import Equal from 'equal-vue';
import 'equal-vue/dist/style.css'

const app = createApp(Cleanly);
app.use(Equal);
app.mount('#app');
