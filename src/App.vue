<script setup>
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
import PlayerJoin from './components/PlayerJoin.vue'
import CreatorItem from './components/CreatorItem.vue'
</script>

<template>
  <div>
    <PlayerJoin/>
    <hr/>
    <CreatorItem/>
    <hr/>
  </div>
</template>

