<script setup>
import TheWelcome from '@/components/TheWelcome.vue'
import {store}  from '@/DataStore';

/* var vm = new Vue({
  el: '#myDiv',
  data: {
    response: {}
  },
  created() {
    // GET request using fetch with error handling
    fetch("https://api.npms.io/v2/invalid-url")
      .then(async response => {
        const data = await response.json();

        // check for error response
        if (!response.ok) {
          // get error message from body or default to response statusText
          const error = (data && data.message) || response.statusText;
          return Promise.reject(error);
        }

        this.totalVuePackages = data.total;
      })
      .catch(error => {
        this.errorMessage = error;
        console.error("There was an error!", error);
      });
  }
}); */

</script>

<template>
 <!--  <main>
    <TheWelcome /> -->

      <!--     <div id="myDiv">
          <div v-if="response.userId">
            {{ response.userId }}
            {{ response.id }}
            {{ response.title }}
            {{ response.body }}
          </div>
          <div v-if="response.error">
            <p>Request failed</p>
          </div>
    </div> -->
  <!-- </main> -->
   <div>Store count: {{ store.count }} </div>
</template>
