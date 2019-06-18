<template>
  <footer class='footer-bar'>
    <a v-if="github" target='_blank' :href='github'>
      <svg class="octicon-mark-github"  viewBox="0 0 16 16" version="1.1"><path fill-rule="evenodd" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z"></path></svg>
    </a>
    <p @click='openMail' v-if='contact' class='footer-item footer-item_clickable'>Contact</p>
    <p class='footer-item'>©{{copyrightSinceTo}} {{author}} All rights reserved.</p>
  </footer>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'

function getEnv(envVal:string|undefined, defaultValue?: string): string | undefined {
  let value
  if (defaultValue) {
    value = defaultValue
  }
  if (envVal != undefined && envVal != '') {
    value = envVal
  }
  return value
}

@Component
({
  data() {
    const thisYear = String(new Date().getFullYear())
    const firstPublishedYear = process.env.firstPublishedYear ? process.env.firstPublishedYear : thisYear
    const copyrightSinceTo = thisYear === firstPublishedYear ? firstPublishedYear : firstPublishedYear + '-' + thisYear
    
    return {
      author: process.env.author,
      copyrightSinceTo: copyrightSinceTo,
      contact: getEnv(process.env.contact),
      github: getEnv(process.env.github)
    }
  },
  mounted() {
    console.log('PRINT ENV', process.env.author)
  }
})
export default class FooterMenu extends Vue {
  contact?: String

  openMail() {
    window.open('mailto:' + this.contact, '_blank')
  }
}
</script>

<style scoped>
.footer-bar {
  background-color: #212529;
  display: flex;
  justify-content: center;
}

.footer-item {
  color:rgba(255, 255, 255, 0.75);
  padding: 0.1rem 0.5rem;
  margin-bottom: 0;
}

.footer-item_clickable {
  color:rgba(255, 255, 255, 0.95);
}

.footer-item_clickable:focus, .footer-item_clickable:hover {
  text-decoration: underline;
}

.octicon-mark-github {
  width: 1.5rem;
  fill:rgba(255, 255, 255, 0.95);
}

</style>