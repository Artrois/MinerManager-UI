<template>

 <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
  <header>
  <nav class="navbar navbar-expand-lg navbar-light rounded-pill border border-4">
    <h1 class="h2">Dashboard</h1>


<!--       <ul class="navbar-nav mr-auto">
        <li class="nav-item active">
          <a class="nav-link" href="#">Home <span class="sr-only">(current)</span></a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">Link</a>
        </li>
        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            Dropdown
          </a>
          <div class="dropdown-menu" aria-labelledby="navbarDropdown">
            <a class="dropdown-item" href="#">Action</a>
            <a class="dropdown-item" href="#">Another action</a>
            <div class="dropdown-divider"></div>
            <a class="dropdown-item" href="#">Something else here</a>
          </div>
        </li>
        <li class="nav-item">
          <a class="nav-link disabled" href="#">Disabled</a>
        </li>
      </ul> -->
  </nav>

    <!-- <button @click="connect()" type="button" class="btn btn-outline-secondary"  ><i title="connect" class="bi bi-arrows-angle-contract" style="color: black; cursor: pointer; -webkit-text-stroke: 2px;"></i></button>  -->
  <div class="row">
<!--     <div class="d-flex bd-highlight mb-3">
      <div class="p-2 bd-highlight">
        <h1 class="h2">Dashboard</h1>
      </div>
    </div> -->

    <div class="w-100"></div>

    <div class="d-flex bd-highlight mb-3">
      <div class="p-2 bd-highlight">
        <button v-if="!store.backend_connected" type="button" disabled class="btn btn-outline-secondary">
          <i title="connecting..." class="spinner-border spinner-border-sm" style="cursor: pointer;"></i>
        </button>
        <button v-else @click="disconnect()" type="button" class="btn btn-outline-secondary" >
          <i title="disconnect from backend" class="bi bi-arrows-angle-expand" style="cursor: pointer;"></i>
        </button>
        <button @click="send('hello')" type="button" class="btn btn-outline-secondary"  ><i title="send custom msg" class="bi bi-box-arrow-up-right" style="color: black; cursor: pointer; -webkit-text-stroke: 1px;"></i></button>
        <button v-if="store.debug_flag" @click="store.backend_connected?store.backend_connected=false:store.backend_connected=true" type="button" class="btn btn-outline-secondary">Toggle connection: {{ store.backend_connected }}</button> 
      </div>
      <div class="p-2 bd-highlight">
        <span class="text-muted text-reset">
          Last update from backend: {{ store.timestamp }}
        </span>
      </div>
      <div class="ms-auto p-2 bd-highlight">

      </div>
    </div>
  </div>
  <br>

<div class="row my-4">
  <div class="col-12 col-md-6 col-lg-3 mb-4 mb-lg-0">
      <div class="card">
          <h5 class="card-header">Online miners</h5>
          <div class="card-body">
            <DonutChart :percentage=store.dashboard_data.percentage_online_miners :text_inside="store.dashboard_data.online_miners + '/' + store.dashboard_data.total_amount_miners" />
          </div>
        </div>
  </div>
  <div class="col-12 col-md-6 mb-4 mb-lg-0 col-lg-3">
      <div class="card">
          <h5 class="card-header">Total hash rate 5s [THS]</h5>
          <div class="card-body">
            <DonutChart :percentage=store.dashboard_data.percentage_total_hashr_5s :text_inside="round10(store.dashboard_data.total_hashr_5s/1000000, -1) + '/' + round10(store.dashboard_data.total_expected_hashrate_MHS/1000000, -1)" />
          </div>
        </div>
  </div>
  <div class="col-12 col-md-6 mb-4 mb-lg-0 col-lg-3">
      <div class="card">
          <h5 class="card-header">Total hash rate 1m [THS]</h5>
          <div class="card-body">
            <DonutChart :percentage=store.dashboard_data.percentage_total_hasr_1m :text_inside="round10(store.dashboard_data.total_hasr_1m/1000000, -1) + '/' + round10(store.dashboard_data.total_expected_hashrate_MHS/1000000, -1)" />
          </div>
        </div>
  </div>
  <div class="col-12 col-md-6 mb-4 mb-lg-0 col-lg-3">
      <div class="card">
          <h5 class="card-header">Miners with errors</h5>
          <div class="card-body">
            <ul class="list-group list-group-flush">
              <li v-for="item in store.dashboard_data.miners_with_errors" class="list-group-item"> {{ item }} </li>
            </ul>
          </div>
        </div>
  </div>
</div>

<div class="row my-5">
  <div class="col-12 col-xl-8 mb-4 mb-lg-0" style="width: 100%;">
      <div class="card">
          <h5 class="card-header">Temperature, Fan-out, Fan-in over threshold</h5>
          <div class="card-body">
              <div class="table-responsive">
                  <table class="table">
                      <thead>
                        <tr>
                          <th scope="col">IP</th>
                          <th scope="col">Model</th>
                          <th scope="col">Temp</th>
                          <th scope="col">Env Temp</th>
                          <th scope="col">Fan-In</th>
                          <th scope="col">Fan-Out</th>
                          <th scope="col">Jump to Miner</th>
                        </tr>
                      </thead>

                      <tbody>
                        <tr v-for="item in store.dashboard_data.temp_fan_threshold_alarms">
                            <th scope="row"> {{ item.HostName }} </th>
                            <td> {{ item.Model }} </td>
                            <td> {{ item.Temperature }} </td>
                            <td> {{ item.Env_Temp }} </td>
                            <td> {{ item.Fan_Speed_In }} </td>
                            <td> {{ item.Fan_Speed_Out }} </td>
                            <!-- <td><a class="btn btn-sm btn-primary" @click=" changeTab(item.HostName); $refs.vueTabsref.$el.scrollIntoView();">View</a></td> -->
                            <td><a class="btn btn-outline-secondary" @click=" changeTab(item.HostName); $refs.vueTabsref.$el.scrollIntoView();">View</a></td>
                        </tr>
                      </tbody>
                  </table>
            </div>
          </div>
        </div>
  </div>
</div>
<div class="row my-6">
  <div class="col-12 col-xl-4" style="width: 100%;">
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

    <tabs v-if="store.miner_data !==null" cache-lifetime="10" :options="{ useUrlFragment: false }" ref="vueTabsref">
      <div v-for="(object, key) in store.miner_data">
        <tab v-if="object.isAlive" :name="object.HostName" prefix='<i class="bi bi-currency-bitcoin" title="online" style="font-size: 1rem; color: green;"></i>' :id="object.HostName">
          <WhatsminerTable :tblIndex="key"/>
        </tab>
        <tab v-else :name="object.HostName" prefix='<i class="bi bi-currency-bitcoin blink" title="offline" style="font-size: 1rem; color: red;"></i>' :id="object.HostName">
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
  import LineChart from '@/components/LineEChart.vue';
  import { ref } from 'vue';
  //import connect_logo from '@/components/connect_logo.vue';
  //import tab_wrapper from '@/components/tab_wrapper.vue';
  const vueTabsref = ref(null);

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


  //func to programatically change tabs
  const changeTab = (refId) => {
    vueTabsref.value.selectTab("#" + refId);
  }

  /**
 * Decimal adjustment of a number.
 *
 * @param {String}  type  The type of adjustment.
 * @param {Number}  value The number.
 * @param {Integer} exp   The exponent (the 10 logarithm of the adjustment base).
 * @returns {Number} The adjusted value.
 */
  function decimalAdjust(type, value, exp) {
    // If the exp is undefined or zero...
    if (typeof exp === 'undefined' || +exp === 0) {
      return Math[type](value);
    }
    value = +value;
    exp = +exp;
    // If the value is not a number or the exp is not an integer...
    if (isNaN(value) || !(typeof exp === 'number' && exp % 1 === 0)) {
      return NaN;
    }
    // Shift
    value = value.toString().split('e');
    value = Math[type](+(value[0] + 'e' + (value[1] ? (+value[1] - exp) : -exp)));
    // Shift back
    value = value.toString().split('e');
    return +(value[0] + 'e' + (value[1] ? (+value[1] + exp) : exp));
  }

  // Decimal round
  const round10 = (value, exp) => decimalAdjust('round', value, exp);
  // Decimal floor
  const floor10 = (value, exp) => decimalAdjust('floor', value, exp);
  // Decimal ceil
  const ceil10 = (value, exp) => decimalAdjust('ceil', value, exp);


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
