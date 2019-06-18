<template>
  <div class='root-container'>
    <HeaderMenu/>
    <div class='main-content-container'>
      <nuxt class='main-content'/>
      <div class='padding-left'/>
      <div class='padding-right'/>
    </div>  
    <FooterMenu class='footer-bar'/>
  </div>
</template>

<script>
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component({
  components: {
    HeaderMenu: () => import('@/components/header/HeaderMenu.vue'),
    FooterMenu: () => import('@/components/footer/FooterMenu.vue')
  },
})
export default class DefaultLayout extends Vue {

}
</script>


<style>
.root-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.footer-bar {
  background-color: #000000;
  margin-top: auto;
}

.padding-left {
  min-width: 1rem;
  order: 1;
}

.padding-right {
  min-width: 1rem;
  order: 3;
}

.main-content {
  max-width: 960px;
  min-width: 0;
  margin: auto;
  order: 2;
}

.main-content-container {
  display: flex;
}

</style>
