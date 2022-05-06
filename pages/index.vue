<template>
  <div class="col">
    <template v-for="(nft, index) in data">
      <card :key="index" :data="nft" />
    </template>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
import { $axios } from '~/utils/api'

@Component({})
export default class MainPage extends Vue {
  data: any[] = []
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
}
</script>

<style scoped>
.col {
  display: flex;
  flex-wrap: wrap;
}
</style>
