import { createApp } from 'vue';
import App from './App.vue';
import {Tabs, Tab} from 'vue3-tabs-component';
import {store}  from '@/DataStore';
import webSocketService from '@/WebSocketService';

import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";

/* import router from './router' */

const app = createApp(App);

app.component('tabs', Tabs);
app.component('tab', Tab);
/* app.use(router) */
app.use(webSocketService, {
    store,
    url: 'ws://' + location.hostname + ':8000'
  });



app.mount('#app');

