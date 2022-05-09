<template>
  <div>
    <div>
      {{ message }}
    </div>

    <div class="page__container">
      <div class="canvas__container">
        <client-only>
          <canvas-component ref="canvasComponent" />
        </client-only>
      </div>
      <div class="selector__container">
        <list-component :data="data" :handle-click="handleClick" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
/* eslint-disable camelcase */
import { Vue, Component } from 'nuxt-property-decorator'
import { $axios } from '~/utils/api'

@Component({})
export default class TestPage extends Vue {
  message: string = 'Vue + Canvas Test Page'

  data: any[] = []

  selectedImages: any[] = []

  removedCoordinates: any[] = []

  counterX: number = 0
  counterY: number = 0

  configKonva = {
    width: 200,
    height: 200,
  }

  configCircle = {
    x: 100,
    y: 100,
    radius: 70,
    fill: 'red',
    stroke: 'black',
    strokeWidth: 4,
  }

  async mounted() {
    const data = await $axios.$get(
      `https://deep-index.moralis.io/api/v2/0x8deB5646Abb78064eD0029babDf4C33613E24bdA/nft?chain=eth`,
      {
        headers: {
          Accept: 'application/json',
          'X-API-Key':
            'vb2ocySwBBfRqkOamwwbsqht5cePpOqzwlYiwdGb8uu5asdLJtb47Vc9NUkpLyZn',
        },
      }
    )
    this.data = data.result.map((nft: any) => {
      return {
        ...nft,
        metadata: JSON.parse(nft.metadata),
      }
    })
  }

  handleClick(metadata: any) {
    const exist = this.selectedImages.findIndex(
      (image) => metadata.token_id === image.token_id
    )
    if (exist >= 0) {
      this.handleRemove(exist)
    } else {
      this.handleAdd(metadata)
    }
  }

  handleAdd(metadata: any) {
    const { x, y } = this.getCoordinates()
    const canvasImage = {
      ...metadata,
      x,
      y,
    }
    this.selectedImages.push(canvasImage)
    const canvas = this.$refs.canvasComponent as Vue & {
      addImage: (canvasImage: any) => void
    }
    canvas.addImage(canvasImage)
  }

  getCoordinates() {
    if (this.removedCoordinates.length > 0) {
      const { x, y } = this.removedCoordinates[0]
      this.removedCoordinates.splice(0, 1)
      return {
        x,
        y,
      }
    }
    const x = this.counterX * 50
    const y = this.counterY * 50
    this.handleCounter()
    return { x, y }
  }

  handleRemove(index: number) {
    const { x, y, token_id } = this.selectedImages[index]
    this.removedCoordinates.push({ x, y })
    this.removedCoordinates.sort((a: any, b: any) => {
      if (a.y === b.y) {
        return a.x - b.x
      }
      return a.y > b.y ? 1 : -1
    })
    this.selectedImages.splice(index, 1)
    const canvas = this.$refs.canvasComponent as Vue & {
      clearImage: (id: any) => void
    }
    canvas.clearImage(token_id)
  }

  handleCounter() {
    const resetCounter = (count: number) => {
      if (count === 7) {
        return 0
      }
      return count + 1
    }
    this.counterY = this.counterX === 7 ? this.counterY + 1 : this.counterY
    this.counterX = resetCounter(this.counterX)
  }
}
</script>

<style scoped>
.page__container {
  display: flex;
}
.canvas__container {
  width: 70%;
}

.selector__container {
  width: 30%;
}
</style>
