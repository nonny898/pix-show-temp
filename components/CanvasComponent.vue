<template>
  <div>
    <canvas id="c" ref="canvas" width="400" height="400" />
    <button @click="clearImage">Clear</button>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'

@Component({})
export default class CanvasComponent extends Vue {
  vueCanvas: any = null

  mounted() {
    const ctx = this.$refs.canvas as HTMLCanvasElement
    this.vueCanvas = ctx.getContext('2d')
    const img = new Image()
    img.onload = () => {
      this.vueCanvas.drawImage(img, 30, 30, 50, 50)
    }
    img.src =
      'https://api.sandbox.game/lands/61101e37-4c21-4179-a82b-597bda3e71af/v1/preview-500px-x-500px.jpg'
  }

  addImage() {}

  clearImage() {
    this.vueCanvas.clearRect(30, 30, 10, 10)
  }
}
</script>

<style scoped>
canvas {
  border: 1px solid black;
}
</style>
