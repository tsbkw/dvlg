<template>
  <div class="error-container mt-5">
    <div class="error-mainmessage">
      <h1 v-if="error.statusCode === 404">Page not found</h1>
      <h1 v-else>An error occurred</h1>
    </div>
    <div class="error-direction">
      <nuxt-link to="/">Home page</nuxt-link>
    </div>
  </div>
</template>

<script>
export default {
  props: ['error'],
  layout: 'default' // you can set a custom layout for the error page
}
</script>

<style scoped>
.error-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
}
</style>
