<template>

 <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
  <header>
    <!-- <button @click="connect()" type="button" class="btn btn-outline-secondary"  ><i title="connect" class="bi bi-arrows-angle-contract" style="color: black; cursor: pointer; -webkit-text-stroke: 2px;"></i></button>  -->

  <div class="row">
    <div class="d-flex bd-highlight mb-3">
      <div class="p-2 bd-highlight">
        <h1 class="h2">Dashboard</h1>
      </div>
    </div>

    <div class="w-100"></div>

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
  </div>
  <br>

<div class="row my-4">
  <div class="col-12 col-md-6 col-lg-3 mb-4 mb-lg-0">
      <div class="card">
          <h5 class="card-header">Online miners</h5>
          <div class="card-body">
<!--             <h5 class="card-title">345k</h5>
            <p class="card-text">Feb 1 - Apr 1, United States</p>
            <p class="card-text text-success">18.2% increase since last month</p> -->
            <DonutChart percentage=50 text_inside="1 / 2" />
          </div>
        </div>
  </div>
  <div class="col-12 col-md-6 mb-4 mb-lg-0 col-lg-3">
      <div class="card">
          <h5 class="card-header">Total hash rate 5s [GHS]</h5>
          <div class="card-body">
<!--             <h5 class="card-title">$2.4k</h5>
            <p class="card-text">Feb 1 - Apr 1, United States</p>
            <p class="card-text text-success">4.6% increase since last month</p> -->
            <DonutChart percentage=50 text_inside="104 / 208" />
          </div>
        </div>
  </div>
  <div class="col-12 col-md-6 mb-4 mb-lg-0 col-lg-3">
      <div class="card">
          <h5 class="card-header">Total hash rate 1m [GHS]</h5>
          <div class="card-body">
<!--             <h5 class="card-title">43</h5>
            <p class="card-text">Feb 1 - Apr 1, United States</p>
            <p class="card-text text-danger">2.6% decrease since last month</p> -->
            <DonutChart percentage=50 text_inside="104 / 208" />
          </div>
        </div>
  </div>
  <div class="col-12 col-md-6 mb-4 mb-lg-0 col-lg-3">
      <div class="card">
          <h5 class="card-header">Miners with errors</h5>
          <div class="card-body">
            <h5 class="card-title">64k</h5>
            <p class="card-text">Feb 1 - Apr 1, United States</p>
            <p class="card-text text-danger">2.5% increase since last month</p>
          </div>
        </div>
  </div>
</div>

<div class="row my-5">
  <div class="col-12 col-xl-8 mb-4 mb-lg-0">
      <div class="card">
          <h5 class="card-header">Temperature, Fan out, Fan in over-threshold</h5>
          <div class="card-body">
              <div class="table-responsive">
                  <table class="table">
                      <thead>
                        <tr>
                          <th scope="col">Order</th>
                          <th scope="col">Product</th>
                          <th scope="col">Customer</th>
                          <th scope="col">Total</th>
                          <th scope="col">Date</th>
                          <th scope="col"></th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <th scope="row">17371705</th>
                          <td>Volt Premium Bootstrap 5 Dashboard</td>
                          <td>johndoe@gmail.com</td>
                          <td>€61.11</td>
                          <td>Aug 31 2020</td>
                          <td><a href="#" class="btn btn-sm btn-primary">View</a></td>
                        </tr>
                        <tr>
                          <th scope="row">17370540</th>
                          <td>Pixel Pro Premium Bootstrap UI Kit</td>
                          <td>jacob.monroe@company.com</td>
                          <td>$153.11</td>
                          <td>Aug 28 2020</td>
                          <td><a href="#" class="btn btn-sm btn-primary">View</a></td>
                        </tr>
                      </tbody>
                  </table>
            </div>
          </div>
        </div>
  </div>

  <div class="col-12 col-xl-4">
    <div class="card">
        <h5 class="card-header">Hash rate history</h5>
        <div class="card-body">
            <LineChart />
        </div>
    </div>
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
  <footer >
    <span>Copyright © 2022 <a href="">HakoonEx</a></span>
  </footer>
 <!-- <RouterView />   -->
</template>

<script setup>
  //import { RouterLink, RouterView } from 'vue-router'
  //import HelloWorld from '@/components/HelloWorld.vue';
  import {store}  from '@/DataStore';
  import WhatsminerTable from '@/components/TableWhatsminer30S.vue';
  import DonutChart from '@/components/DonutChart.vue';
  import LineChart from '@/components/LineEChart.vue'
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
