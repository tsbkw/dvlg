<template>
  <div>
    <PostList :postList="postList"/>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { Post } from '@/models/Post.ts'

@Component({
  components: {
    PostList: () => import('@/components/post/PostList.vue')
  },
  async asyncData({env, store}) {
    const allPosts = await store.getters["posts/getAll"]
    return {postList: allPosts}
  }
})
export default class TopPage extends Vue {

}
</script>

<style scoped>
</style>
