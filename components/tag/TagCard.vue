<template>
  <router-link :to="tag.linkToMe" tag="b-card" >
    <b-card-title>{{ tag.tagStr }}</b-card-title>
    <b-card-text>
      {{ tag.countPost }}
    </b-card-text>
  </router-link>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import Tag  from '@/models/Tag'

@Component
({
})
export default class TagCard extends Vue {
  @Prop({type: Tag, required: true}) tag
}
</script>
