<template>
  <div>
    <router-link :to="post.myPath" tag="b-card" v-for="post in postData" :key="post.myPath" class="mb-1" >
      <b-card-title>{{ post.title }}</b-card-title>
      <b-card-sub-title>
        <TagBadges class="post-taglist" :tagList="post.tags" />
      </b-card-sub-title>
      <b-card-text>
        {{ post.getSummary() }}
      </b-card-text>
    </router-link>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from 'vue-property-decorator'
import { Post } from '@/models/Post.ts'

@Component
({
  components: {
    TagBadges: () => import('@/components/tag/TagBadges.vue')
  },
})
export default class PostList extends Vue {
  @Prop({required: true})
  postList!: Array<Post>
  postData = this.postList
}
</script>

<style scoped>

</style>
