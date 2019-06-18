<template>
  <div>
    <div v-html="about"/>
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
    let about
    try {
      // @ts-ignore
      const aboutFile = await import('@/rawpost/__about.md')
      about = aboutFile.default
    } catch(e) {
      // about file not exists
      about = ''
      console.log(e)
    }

    // const postList = new Array<Post>()
    // env.markdownFiles.map(async path => {
    //   const post = await createPost(path)
    //   if (post !== null) {
    //     postList.push(post)
    //   }
    // })
    const allPosts = await store.getters["posts/getAll"]
    return {
      about: about,
      postList: allPosts,
    }
  }
})
export default class TopPage extends Vue {

}
</script>

<style scoped>
</style>
