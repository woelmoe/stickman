<template>
<div
  ref="stickmanRef"
  :style="{
    width: width + 'px'
  }"
>
  <div
    class="stickman"
    :style="{
      left: stickmanX + 'px',
      width: stickmanWidth + 'px',
      height: stickmanHeight + 'px'
    }"
  >
    <div
      class="head"
      :style="{
        height: headHeight + 'px',
        width: headWidth + 'px',
      }"
    ></div>
    <div
      class="torso"
      :style="{
        height: torsoHeight + 'px',
        width: torsoWidth + 'px',
        left: torsoX + 'px'
      }"
    >
      <div
        class="spine stick"
        :style="{
          height: spineLength + 'px',
          transform: SpineAngle
        }"
      ></div>
      <div
        class="pelvic stick"
        ref="pelvicRef"
        :style="{
          height: pelvicLength + 'px',
          transform: PelvicAngle
        }"
      ></div>
    </div>
    <div class="handLeft"></div>
    <div class="handRight"></div>
    <div
      class="legs"
      ref="legsRef"
      :style="{
        height: legsHeight + 'px'
      }"
    >
      <div
        class="thighLeft stick"
        ref="thighRef"
        :style="{
          height: thighHeight + 'px',
          transform: ThighAngle
        }"
      ></div>
      <div
        class="leftLeg stick"
        :style="{
          bottom: '0px',
          left: thighJoinX + 'px',
          height: legHeight + 'px'
        }"
      ></div>
    </div>
  </div>
</div>
</template>

<script lang="ts">
import { defineComponent, computed, ref, onMounted } from 'vue'
import { maths } from '@/assets/maths'

export default defineComponent({
  props: {
    width: {
      required: true,
      type: Number
    }
  },
  setup (props) {
    const stickWidth = 5 // то же значение в стилях

    const stickmanRef = ref<HTMLElement>()
    const stickmanHeight = computed(() => props.width * 3)
    const stickmanWidth = computed(() => props.width * 0.3)
    const stickmanX = computed(() => maths.centerObjectByWidth(props.width, stickmanWidth.value))

    // head
    const headHeight = computed(() => stickmanHeight.value * 0.11)
    const headWidth = computed(() => headHeight.value * 0.8)

    // torso
    const torsoHeight = computed(() => spineBottomPointY.value + pelvicBottomPointY.value)
    const torsoWidth = computed(() => stickmanHeight.value * 0.1)
    const torsoX = computed(() => (torsoWidth.value / 2) - torsoWidth.value)

    // spine
    const spineLength = computed(() => stickmanHeight.value * 0.2)
    const spineAngle = ref(30)
    const setSpineAngle = (value:number) => {
      spineAngle.value = value
    }
    const SpineAngle = computed(() => `rotate(${spineAngle.value}deg)`)
    const spineBottomPointY = computed(() => spineLength.value * Math.cos(maths.toRadians(spineAngle.value)))
    const spineBottomPointX = computed(() => spineLength.value * Math.sin(maths.toRadians(spineAngle.value)))

    // pelvic
    const pelvicRef = ref<HTMLElement>()
    const pelvicTransformOrigin = computed(() => spineBottomPointX.value)
    const pelvicLength = computed(() => stickmanHeight.value * 0.1)
    const pelvicAngle = ref(0)
    const setPelvicAngle = (value:number) => {
      pelvicAngle.value = value
    }
    const PelvicAngle = computed(() => `rotate(${pelvicAngle.value}deg)`)
    const pelvicBottomPointY = computed(() => pelvicLength.value * Math.cos(maths.toRadians(pelvicAngle.value)))
    const pelvicBottomPointX = computed(() => pelvicLength.value * Math.sin(maths.toRadians(pelvicAngle.value)))

    // legs
    const legsRef = ref<HTMLElement>()
    const legsHeight = computed(() => stickmanHeight.value * 0.56)

    // thighLeft
    const thighRef = ref<HTMLElement>()
    const thighHeight = computed(() => legsHeight.value * 0.45) // поменять на натуральную величину после отстройки соотношений
    const thighAngle = ref(-50)
    const ThighAngle = computed(() => `rotate(${thighAngle.value}deg)`)
    const thighJoinX = computed(() => maths.getCoordsBotX(thighRef.value) - maths.getCoordsX(legsRef.value) - stickWidth)
    // const thighBottomPointY = computed(() => thighHeight.value * )

    // legLeft
    const legHeight = computed(() => legsHeight.value * 0.55)

    onMounted(() => {
      console.log(thighRef.value)
      console.log(maths.getCoordsBotX(thighRef.value))
      console.log(maths.getCoordsX(legsRef.value))
      console.log(thighJoinX.value)
    })

    return {
      stickmanRef,
      stickmanHeight,
      stickmanWidth,
      stickmanX,
      headHeight,
      headWidth,
      torsoHeight,
      torsoWidth,
      torsoX,
      setSpineAngle,
      SpineAngle,
      spineLength,
      pelvicRef,
      setPelvicAngle,
      PelvicAngle,
      pelvicLength,
      legsRef,
      legsHeight,
      legHeight,
      thighRef,
      thighHeight,
      ThighAngle,
      thighJoinX
    }
  }
})
</script>

<style lang="scss" scoped>
  $stick-width: 5px; // то же значение stickWidth

  * {
    background-color: rgb(186, 186, 240);
  }
  .stickman {
    position: relative;
    background-color: rgb(245, 157, 157);
  }
  .stick {
    width: $stick-width;
    background-color: black;
  }
  .head {
    position: relative;
    background-color: black;
    border-radius: 50%;
  }
  .torso {
    position: relative;
    background-color: aquamarine;
  }
  .spine {
    position: relative;
    left: calc(50% - $stick-width / 2);
    transform-origin: 50% top;
  }
  .pelvic {
    position: relative;
  }
  .legs {
    position: absolute;
    bottom: 0;
    left: 0;
    transform-origin: 50% top;
    width: 100%;
    background-color:bisque;
  }
  .thighLeft {
    position: absolute;
    transform-origin: 50% top;
  }
  .leftLeg {
    position: absolute;
    transform-origin: 50% top;
  }

</style>
