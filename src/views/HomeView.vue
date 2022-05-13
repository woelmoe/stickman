<template>
  <div class="home">
    <StickMan class="StickMan" :width="width"/>
    <div class="ground"></div>
  </div>
</template>

<script lang="ts">
import StickMan from '@/components/StickMan.vue'
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'HomeView',
  components: {
    StickMan
  },
  setup () {
    const width = ref(250)

    return {
      width
    }
  }
})
</script>

<style lang="scss">
  .home {
    width: 100vw;
    height: 100vh;
  }
  .StickMan {
    position: absolute;
    left: 80%;
    bottom: 10%;
  }
  .ground {
    position: absolute;
    bottom: 10%;
    width: 100%;
    height: 5rem;
    background-color: black;
  }
</style>
