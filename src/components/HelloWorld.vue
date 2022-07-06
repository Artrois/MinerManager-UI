<script setup>
import {store}  from '../DataStore';
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

<!-- <script>
  
  export default {
  data() {
    return {
      store
    }
  }
}; 
</script> -->



<template>
  <div class="greetings">
    <h1 class="green">{{ msg }}</h1>
    

     <!-- <pre>{{ JSON.stringify(received_miner_data, null, 2) }}</pre>   -->
    <h3>
      You’ve successfully created a project with
    </h3>


  </div>
<!--   <button @click="store.count==1?store.count=0:store.count=1"> From main: {{ store.count }}  </button> 
  <button @click="msg2=store.miner_data[0].HostName"> From main: {{ msg2 }}  </button> -->




</template>

<script>

export default {
  mounted() {
    //initialize with default empty data
    store.miner_data = JSON.parse(`[
    {
        "HostName": "192.168.3.3", 
        "port": 4028, 
        "isAlive": false,
        "timestamp": "NaN",
        "dirty": true,
        "summary": {},
        "pools": {},
        "edevs": {},
        "psu": {},
        "error_codes": {}
    }, 
    {
        "HostName": "127.0.0.1", 
        "port": 4028, 
        "isAlive": false,
        "timestamp": "NaN",
        "dirty": true,
        "summary": {},
        "pools": {},
        "edevs": {},
        "psu": {},
        "error_codes": {}
    }
            ]
`);
    console.log('component created');
  }
}
</script>

<!-- <style scoped>

h1 {
  font-weight: 500;
  font-size: 2.6rem;
  top: -10px;
}

h3 {
  font-size: 1.2rem;
}

.greetings h1,
.greetings h3 {
  text-align: center;
}

@media (min-width: 1024px) {
  .greetings h1,
  .greetings h3 {
    text-align: left;
  }
}

</style> -->
