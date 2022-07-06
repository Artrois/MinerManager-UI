<script setup>
import {store}  from '../DataStore';

</script>
<template>
  <div class="about">
    <h1>This is an about page</h1>
    <br><br>
    Store count: {{ store.count }}
    
  </div>
</template>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
