<template>

 <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
  <header>
    <!-- <button @click="connect()" type="button" class="btn btn-outline-secondary"  ><i title="connect" class="bi bi-arrows-angle-contract" style="color: black; cursor: pointer; -webkit-text-stroke: 2px;"></i></button>  -->


  <div class="d-flex bd-highlight mb-3">
    <div class="p-2 bd-highlight">
      <button v-if="!store.backend_connected" type="button" disabled class="btn btn-outline-secondary">
        <i title="connecting..." class="spinner-border spinner-border-sm" style="cursor: pointer;"></i>
      </button>
      <button v-else @click="disconnect()" type="button" class="btn btn-outline-secondary" >
        <i title="disconnect from backend" class="bi bi-arrows-angle-expand" style="cursor: pointer;"></i>
      </button>
    </div>
    <div class="p-2 bd-highlight">
      <button @click="send('hello')" type="button" class="btn btn-outline-secondary"  ><i title="send custom msg" class="bi bi-box-arrow-up-right" style="color: black; cursor: pointer; -webkit-text-stroke: 1px;"></i></button>
    </div>
    <div class="p-2 bd-highlight">
      <button @click="store.backend_connected?store.backend_connected=false:store.backend_connected=true" type="button" class="btn btn-outline-secondary">Toggle connection: {{ store.backend_connected }}</button> 
    </div>
    <div class="ms-auto p-2 bd-highlight">
      <span class="text-muted text-reset">
        Last update from backend: {{ store.timestamp }}
      </span>
    </div>
  </div>

   <!-- 
   <connect_logo :connect_status="store.backend_connected" /> 
   --> 

  <!-- 

  <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" />

  <div class="wrapper">
    <nav>

      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/about">About</RouterLink> 

      <RouterLink :to="{ name: 'home' }">Home</RouterLink>
      <RouterLink :to="{ name: 'about' }">About</RouterLink>
    </nav> 

  </div>

    -->  
  </header>


 
  <main>

    <tabs v-if="store.miner_data !==null" cache-lifetime="10" :options="{ useUrlFragment: false }">
      <div v-for="(object, key) in store.miner_data">
        <tab v-if="object.isAlive" :name="object.HostName" prefix='<i class="bi bi-currency-bitcoin" title="online" style="font-size: 1rem; color: green;"></i>' >
          <WhatsminerTable :tblIndex="key"/>
        </tab>
        <tab v-else :name="object.HostName" prefix='<i class="bi bi-currency-bitcoin blink" title="offline" style="font-size: 1rem; color: red;"></i>' >
          <WhatsminerTable :tblIndex="key"/>
        </tab>
      </div>  
    </tabs>
    <tabs v-else>
      <i class="bi bi-exclamation-triangle" >Oh no, there is no miner data available!</i>
    </tabs>

  </main>


<!--   <aside>

  </aside> -->
  <footer>
    <a>Copyright (C) 2021 HakoonEx. All Rights Reserved.</a>
    
    <div v-if="debug_flag" class="recv_dump">
      <pre>{{ JSON.stringify(store, null, 2) }}</pre>
    </div>

  </footer>
 <!-- <RouterView />   -->
</template>

<script setup>
  //import { RouterLink, RouterView } from 'vue-router'
  //import HelloWorld from '@/components/HelloWorld.vue';
  import {store}  from '@/DataStore';
  import WhatsminerTable from '@/components/TableWhatsminer30S.vue';
  //import connect_logo from '@/components/connect_logo.vue';
  //import tab_wrapper from '@/components/tab_wrapper.vue';
  const debug_flag = false;

  defineProps({
    msg: {
      type: String,
      required: true
    },
    msg2: {
      type: String,
      required: true
    }
  }); 

</script>
<script>
import {onBeforeMount} from 'vue';
  export default {
    methods: {
    data() {
      return {
        MinerData: []
      };
     },
    connect() {
      this.$webSocketsConnect()
    },
    disconnect() {
      this.$webSocketsDisconnect()
    },
    send(value) {
      let msg = JSON.parse('{"HostName": null, "command": "message", "params": null}');
      msg.params = value;
      this.$webSocketsSend(msg);
      console.log('Sent UI message to WS server: ' + JSON.stringify(msg, 0, 2));
    }
   },
    onBeforeMount(){ },
    mounted() {
      console.log('App.vue component created');
    }
  };

</script>

<style>
@import '@/assets/base.css';

</style>
