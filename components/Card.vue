<template>
  <div
    v-if="data.metadata"
    class="card__container"
    @click="
      handleClick({ ...data.metadata, token_id: data.token_id, image: image })
    "
  >
    <object>
      <img :src="image" alt="" onerror="this.style.display='none'" />
    </object>
    <video v-show="isVideo" ref="vid" :autoplay="true" :loop="true">
      <source :src="image" />
    </video>
    <div>
      {{ name }}
    </div>
  </div>
</template>

<script lang="ts">
/* eslint-disable camelcase */
import { Vue, Component, Prop } from 'nuxt-property-decorator'

@Component({
  inheritAttrs: false,
})
export default class CardComponent extends Vue {
  @Prop({ required: true }) data!: any
  @Prop({ required: false }) handleClick!: (metadata: any) => void

  isVideo: boolean = false

  mounted() {
    const video = this.$refs.vid as HTMLElement
    if (video) {
      video.onloadedmetadata = () => {
        this.isVideo = true
      }
    }
  }

  get name() {
    if (this.data.metadata.name) return this.data.metadata.name
    if (this.data.metadata.title) return this.data.metadata.title
    if (this.data.name) return this.data.name
    return 'NA'
  }

  get image() {
    const checkImage = (name: string) => {
      if (name.includes('ipfs/')) {
        return `https://gateway.moralisipfs.com/ipfs/${name.split('ipfs/')[1]}`
      }
      if (name.includes('ipfs://')) {
        return `https://gateway.moralisipfs.com/ipfs/${
          name.split('ipfs://')[1]
        }`
      }
      return name
    }
    if (this.data.metadata.image) {
      const url = checkImage(this.data.metadata.image)
      return url
    }
    if (this.data.metadata.image_url) {
      const url = checkImage(this.data.metadata.image_url)
      return url
    }
    return 'NA'
  }
}
</script>

<style scoped>
.card__container {
  width: 20%;
}
</style>
