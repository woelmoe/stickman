<template>
<div>
  <div
    class="stickman"
    :style="{
      width: width + 'rem',
      height: height + 'rem'
    }"
  >
    <div
      class="head"
      :style="{
        height: headHeight + 'rem',
        width: headWidth + 'rem'
      }"
    ></div>
    <div
      class="torso"
      :style="{
        height: torsoHeight + 'rem'
      }"
    >
      <div
        class="spine stick"
        :style="{
          height: spineLength + 'rem',
          transform: SpineAngle
        }"
      ></div>
      <div
        class="pelvic stick"
        :style="{
          height: pelvicLength + 'rem',
          transform: PelvicAngle
        }"
      ></div>
    </div>
    <div class="handLeft"></div>
    <div class="handRight"></div>
    <div
      class="legs"
      :style="{
        height: LegHeight
      }"
    ></div>
  </div>
</div>
</template>

<script lang="ts">
import { defineComponent, computed, ref } from 'vue'

export default defineComponent({
  props: {
    width: {
      required: true,
      type: Number
    }
  },
  setup (props) {
    const height = computed(() => {
      return props.width * 3
    })

    const toRadians = (angle:number) => {
      return angle * (Math.PI / 180)
    }

    const headHeight = computed(() => height.value * 0.11)
    const headWidth = computed(() => headHeight.value * 0.8)

    const spineLength = computed(() => height.value * 0.2)
    const spineAngle = ref(30)
    const setSpineAngle = (value:number) => {
      spineAngle.value = value
    }
    const SpineAngle = computed(() => `rotate(${spineAngle.value}deg)`)

    const pelvicLength = computed(() => height.value * 0.1)
    const pelvicAngle = ref(0)
    const setPelvicAngle = (value:number) => {
      pelvicAngle.value = value
    }
    const PelvicAngle = computed(() => `rotate(${pelvicAngle.value}deg)`)

    const torsoHeight = computed(() => {
      const value =
        spineLength.value * Math.cos(toRadians(spineAngle.value)) +
        pelvicLength.value * Math.cos(toRadians(pelvicAngle.value))
      console.log(value)
      return value
    })

    const legHeight = ref(53)
    const setLegHeight = (value:number) => {
      legHeight.value = value
    }
    const LegHeight = computed(() => legHeight.value + '%')

    return {
      height,
      headHeight,
      headWidth,
      torsoHeight,
      setSpineAngle,
      SpineAngle,
      spineLength,
      setPelvicAngle,
      PelvicAngle,
      pelvicLength,
      setLegHeight,
      LegHeight
    }
  }
})
</script>

<style lang="scss" scoped>
  $head-height: 12%;
  $torso-height: 35%;
  .stick {
    width: 5rem;
    background-color: black;
  }
  .head {
    position: relative;
    background-color: black;
    border-radius: 50%;
  }
  .torso {
    position: relative;
    left: 7%;
    width: 14%;
    background-color: aquamarine;
  }
  .spine {
    position: relative;
    left: 40%;
    transform-origin: 50% top;
  }
  .pelvic {
    position: relative;
    transform-origin: 50% top;
  }
  .legs {
    position: relative;
    width: 30%;
    background-color:bisque;
  }
</style>
