<template>
  <div class="main-container">
    <Header />
    <div class="below-header"></div>
    <Nuxt />
  </div>
</template>

<script>
export default {
  name: 'default',
  middleware: 'route-guard',
}
</script>
<style>
.below-header {
  height: 50px;
}
body {
  margin: 0;
}
.main-container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}
</style>