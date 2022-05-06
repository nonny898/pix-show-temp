<template>
  <div>
    <div>List Component</div>
    <div class="col">
      <template v-for="(nft, index) in data">
        <card :key="index" :data="nft" v-bind="$attrs" />
      </template>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator'

@Component({
  inheritAttrs: false,
})
export default class ListComponent extends Vue {
  @Prop({ required: true }) data!: any[]
}
</script>

<style scoped>
.col {
  display: flex;
  flex-wrap: wrap;
}
</style>
