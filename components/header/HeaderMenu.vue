<template>
    <b-navbar toggleable="sm" type="dark" variant="dark" sticky>
      <router-link to="/" tag="b-navbar-brand">
        DVLG
      </router-link>
      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav align="right" fill>
          <router-link to="/posts" tag="b-nav-item" >
            Posts
          </router-link>
          <router-link to="/tags" tag="b-nav-item">
            Tags
          </router-link>
        </b-navbar-nav>
      </b-collapse>
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
    </b-navbar>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'

@Component
({
  components: {
  }
})
export default class HeaderMenu extends Vue {
  
}
</script>

<style scoped>
.nav-item.nuxt-link-active {
  text-decoration: underline;
  color: rgba(255, 255, 255, 1);
}
</style>
