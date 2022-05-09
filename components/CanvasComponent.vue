<template>
  <div>
    <div id="container" ref="container" class="konva__container" />
    <!-- <client-only>
    </client-only> -->
    <canvas id="c" ref="canvas" width="400" height="400" />
    <button @click="clearImage">Clear</button>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
import Konva from 'konva'
@Component({})
export default class CanvasComponent extends Vue {
  vueCanvas: any = null

  width: number = 400
  height: number = 400

  layer: any = null

  mounted() {
    const ctx = this.$refs.canvas as HTMLCanvasElement
    this.vueCanvas = ctx.getContext('2d')

    const stage = new Konva.Stage({
      container: 'container',
      width: this.width,
      height: this.height,
    })

    this.layer = new Konva.Layer()
    stage.add(this.layer)
  }

  drawImage(imageObj: any, x: any, y: any, id: any) {
    const img = new Konva.Image({
      image: imageObj,
      x,
      y,
      id,
      width: 50,
      height: 50,
      draggable: true,
    })
    img.on('mouseover', function () {
      document.body.style.cursor = 'pointer'
    })
    img.on('mouseout', function () {
      document.body.style.cursor = 'default'
    })
    this.layer.add(img)
  }

  addImage(metadata: any) {
    const img = new Image()
    img.onload = () => {
      this.drawImage(img, metadata.x, metadata.y, metadata.token_id)
    }
    img.src = metadata.image
  }

  clearImage(id: any) {
    console.log('🚀 ~ CanvasComponent ~ clearImage ~ id', id)
    const image = this.layer.getChildren((node: any) => {
      return node.getAttr('id') === id
    })
    image[0].destroy()
    this.layer.draw()
    // this.vueCanvas.clearRect(x, y, 50, 50)
  }
}
</script>

<style scoped>
canvas,
.konva__container {
  border: 1px solid black;

  width: fit-content;
}
</style>
