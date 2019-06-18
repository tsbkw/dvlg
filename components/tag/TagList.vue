<template>
  <div class='tagcloud'>
    <ul class='tagcloud-container'>
      <router-link tag="li" :to="tag.linkToMe" v-for="tag in tagList" :key="tag.linkToMe" class='tagcloud-item'>
        <span class='tagcloud-label'>
          {{ tag.tagStr }}
          <b-badge pill=true>
            {{ tag.countPost }}
          </b-badge>
        </span>
      </router-link>
    </ul>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import Tag from '@/models/Tag'

@Component
({
  components: {
  },
})
export default class TagList extends Vue {
  @Prop({type: Array, required: true}) tagList
}
</script>

<style scoped>
.tagcloud-container {
	margin: 0;
	padding: 0;
	list-style: none;
}
.tagcloud-item {
	display: inline-block;
	margin: 0 0 1rem 3rem;
	position: relative;
	padding: 0 1em;
	background-color: hsla(31,15%,50%,.1);
	border-radius: 0 0.5rem 0.5rem 0;
	color: #000;
	font-size: 1.5rem;
	text-decoration: none;
	-webkit-transition: .2s;
	transition: .2s;
}
.tagcloud-item::before {
	position: absolute;
	content: '';
  left: -1rem;
	border-color: transparent hsla(31,15%,50%,.1) transparent transparent;
	border-style: solid;
	border-width: 1rem 1rem 1rem 0;
	-webkit-transition: .2s;
	transition: .2s;
  height: 2.2rem;
}
.tagcloud-label {
	display: block;
	max-width: 20rem;
	white-space: nowrap;
	text-overflow: ellipsis;
	overflow: hidden;
}
.tagcloud-item:hover {
	background-color: #555;
	color: #fff;
}
.tagcloud-item:hover::before {
	border-right-color: #555;
}
</style>

