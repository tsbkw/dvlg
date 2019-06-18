<template>
  <div>
    <b-badge :to="tag.linkToMe" v-for="tag in tagList" :key="tag.linkToMe" class="tag-badge" @click='resetFocus()'>
      {{ tag.tagStr }}
    </b-badge>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import Tag  from '@/models/Tag'

@Component
({
})
export default class TagBadges extends Vue {
  @Prop({type: Array, required: true}) tagList

  resetFocus() {
    // reset focus for remove focus motion when user clicks a same tag which is shown.
    // @ts-ignore
    document.activeElement.blur()
  }
}
</script>

<style scoped>
.tag-badge {
  margin: 0px 2px 0px 2px;
}
.badge {
  vertical-align: text-bottom;
}
</style>
