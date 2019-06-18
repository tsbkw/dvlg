<template>
  <div class='container'>
    <TagList class='tag-list' :tagList='tagList' />
  </div>
</template>

<script>
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component({
  components: {
    TagList: () => import('@/components/tag/TagList.vue')
  },
  async asyncData ({ store, params, env }) {
    const allTagsMap = await store.getters["tags/getAll"]
    return {
      tagList: Array.from(allTagsMap.values())
    }
  },
  validates ({params}) {
    return true //TODO check if posts are exists
  }

})
export default class TagsPage extends Vue {
}
</script>

<style scoped>
.tag-list {
  margin-top: 2rem;
}
</style>
