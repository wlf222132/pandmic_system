<template>
  <div class="none">
    <div class="container">
      <span data-text="404">404</span>
    </div>
  </div>
</template>
<style scoped>
.none {
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: "Montserrat", sans-serif, Arial, "Microsoft Yahei";
}
.none .container {
  font-family: "Montserrat", sans-serif, Arial, "Microsoft Yahei";
  position: relative;
  width: 60vw;
  height: 50vh;
  background-color: rgba(255, 255, 255, 0.4);
  border-radius: 30px;
  box-shadow: 10px 10px 20px #00000040;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 400px;
  font-weight: 800;
  font-family: Arial, Helvetica, sans-serif;
}

.none .container span {
  position: relative;
}

.none .container span::after {
  position: absolute;
  content: attr(data-text);
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  text-shadow: 3px 3px 2px #ffffff33;
  background: linear-gradient(90deg, #fc466b 0%, #3f5efb 100%);
  background-size: 400%;
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;

  animation: animate 5s linear infinite;
}

@keyframes animate {
  0% {
    /* 左上 */
    background-position: 0% 0%;
  }

  25% {
    /* 右上 */
    background-position: 100% 0%;
  }

  50% {
    /* 右下 */
    background-position: 100% 100%;
  }

  75% {
    /* 左下 */
    background-position: 0% 100%;
  }

  100% {
    /* 还原左上 */
    background-position: 0% 0%;
  }
}
</style>