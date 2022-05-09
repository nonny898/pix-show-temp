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
  }

  addImage(metadata: any) {
    const img = new Image()
    img.onload = () => {
      this.vueCanvas.drawImage(img, metadata.x, metadata.y, 50, 50)
    }
    img.src = metadata.image
  }

  clearImage(x: any, y: any) {
    this.vueCanvas.clearRect(x, y, 50, 50)
  }
}
</script>

<style scoped>
canvas {
  border: 1px solid black;
}
</style>
