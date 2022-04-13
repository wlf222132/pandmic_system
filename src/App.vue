<template>
  <div id="app">
    <router-view />
  </div>
</template>
<script>
export default {};
</script>
<style>
* {
  margin: 0;
  padding: 0;
  font-family: "Hiragino Sans GB";
}
html,
body,
#app {
  width: 100vw;
  height: 100vh;
  overflow-x: hidden;
  background: linear-gradient(90deg, #fc466b 0%, #3f5efb 100%);
  user-select: none;
}
#app {
  overflow-y: auto;
}
</style>
