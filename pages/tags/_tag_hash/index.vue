<template>
  <div>
    <PostList :postList='postList' />
  </div>
</template>

<script>
import { Component, Vue, Prop } from 'vue-property-decorator'
import { createAllPost, Post } from '@/models/Post.ts'

@Component({
  components: {
    PostList: () => import('@/components/post/PostList.vue')
  },
  async asyncData ({ store, params, env }) {
    const tag = (await store.getters["tags/getTagByHash"])(params.tag_hash)
    const allPosts = await store.getters["posts/getAll"]
    return {
      postList: allPosts.filter(post => post.tags.some(postTag => tag.hash === postTag.hash)),
    }
  }
})
export default class TagRelatedPostsPage extends Vue {
}
</script>

<style scoped>

</style>
