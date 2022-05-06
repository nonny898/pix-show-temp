<template>
  <div
    v-if="data.metadata"
    class="card__container"
    @click="handleClick({ ...data.metadata, token_id: data.token_id })"
  >
    <object>
      <img
        :src="getImage(data.metadata.image, data.metadata.image_url)"
        alt=""
        onerror="this.style.display='none'"
      />
    </object>
    <video v-show="isVideo" ref="vid" :autoplay="true" :loop="true">
      <source :src="getImage(data.metadata.image, data.metadata.image_url)" />
    </video>
    <!-- {{ getImage(data.metadata.image, data.metadata.image_url) }} -->
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

  // getName(name: string | null, title: string | null, metaName: string | null) {
  //   if (metaName) return metaName
  //   if (title) return title
  //   if (name) return name
  //   return 'NA'
  // }

  getImage(image: string | null, image_url: string | null) {
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
    if (image) {
      const url = checkImage(image)
      return url
    }
    if (image_url) {
      const url = checkImage(image_url)
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
