<template>
  <div>
    <div>
      {{ message }}
    </div>
    <div class="page__container">
      <div class="canvas__container">
        <canvas-component />
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

  counter: number = 1

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
    console.log('🚀 ~ TestPage ~ handleClick ~ exist', exist)
    if (exist >= 0) {
      this.selectedImages.splice(exist, 1)
    } else {
      this.handleAdd(metadata)
    }
  }

  handleAdd(metadata: any) {
    const canvasImage = {
      ...metadata,
      x: this.counter * 10,
      y: this.counter * 10,
    }
    this.selectedImages.push(canvasImage)
    this.counter++
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
