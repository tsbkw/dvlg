<template>
  <PostList :postList='postList'></PostList>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

const PARAM_LENGTH_YEAR_ONLY = 4
const PARAM_LENGTH_YEAR_AND_MONTH = 6
@Component
({
  components: {
    PostList: () => import('@/components/post/PostList.vue')
  },
  async asyncData({store, params}) {
    if (params.yyyymm.length == PARAM_LENGTH_YEAR_AND_MONTH) {
      const year = params.yyyymm.substr(0, 4)
      const month = params.yyyymm.substr(4, 2)
      console.log('yaer, month, params', year, month, params)
      return {
        postList: await store.getters['posts/getAllByYearMonth'](year, month)
      }
    } else if(params.yyyymm.length == PARAM_LENGTH_YEAR_ONLY) {
      return {
        postList: await store.getters['posts/getAllByYear'](params.yyyymm)
      }
    } else {
      console.log('unexpected parameter length. ', params.yyyymm.length, params)
      return {
        postList: new Array()
      }
    }
  }
})
export default class PostInTheMonthPage extends Vue {

}

</script>

