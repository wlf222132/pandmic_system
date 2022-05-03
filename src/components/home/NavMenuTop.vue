<template>
  <div class="NavMenuTop">
    <div class="clock" v-if="typeof clock.h1 == 'number'">
      <p id="1">{{ clock.h1 }}</p>
      <p id="2">{{ clock.h2 }}</p>
      <p id="3">:</p>
      <p id="4">{{ clock.m1 }}</p>
      <p id="5">{{ clock.m2 }}</p>
      <p id="6">:</p>
      <p id="7">{{ clock.s1 }}</p>
      <p id="8">{{ clock.s2 }}</p>
    </div>
    <div class="title" @click="pathHome()">
      <div class="titBox">
        <div class="tiLi">
          <div></div>
          <div></div>
          <div></div>
        </div>
        基于Retinaface人脸检测算法的精准疫情防控系统
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      clock: {
        h1: null,
        h2: null,
        m1: null,
        m2: null,
        s1: null,
        s2: null,
      },
    };
  },
  methods: {
    pathHome() {
      this.$router.push("/");
    },
    myTime() {
      let time = new Date();
      let hh = time.getHours();
      let mm = time.getMinutes();
      let ss = time.getSeconds();

      this.clock.h1 = Math.floor(hh / 10);
      this.clock.h2 = hh % 10;
      this.clock.m1 = Math.floor(mm / 10);
      this.clock.m2 = mm % 10;
      this.clock.s1 = Math.floor(ss / 10);
      this.clock.s2 = ss % 10;
    },
  },
  created() {
    setInterval(this.myTime, 1000);
  },
};
</script>
<style scoped>
.NavMenuTop {
  height: 100%;
  overflow: hidden;
  position: relative;
  background-color: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(25px);
  -webkit-backdrop-filter: blur(25px);
  border-bottom-left-radius: 6px;
  border-bottom-right-radius: 6px;
  box-shadow: 13px 11px 10px 0px rgb(0 0 0 / 10%);
}
.clock {
  position: absolute;
  top: 50%;
  left: 30px;
  transform: translateY(-50%);
  width: 234px;
}
.clock p {
  width: 30px;
  text-align: center;
  font-size: 30px;
  color: #fff;
  float: left;
  font-weight: bold;
  margin: -3px;
  text-shadow: 0 1px 0 #be294f, 0 2px 0 #df456c, 0 3px 0 #c14161,
    0 4px 0 #99324b, 0 5px 0 #96304a, 0 6px 0 #87283e, 0 7px 0 #3d1919d3,
    0 8px 0 #511826bc;
}
.clock p:nth-child(3n) {
  width: 30px;
}
.title {
  position: absolute;
  top: 50%;
  right: 30px;
  height: 100%;
  line-height: 60px;
  transform: translate(0, -50%);
  display: flex;
  justify-content: center;
  align-items: center;
}
.title:hover .titBox {
  color: #fff;
}
.titBox {
  display: inline-block;
  height: 40px;
  border-radius: 8px;
  color: rgba(255, 255, 255, 0.6);
  box-shadow: 0px 5px 45px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(2px);
  background: rgba(0, 0, 0, 0.8);
  text-align: center;
  margin-left: 8px;
  padding: 0 10px;
  font-size: 15px;
  letter-spacing: 6px;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: 0.5s;
  cursor: pointer;
}
.tiLi {
  display: inline-block;
  width: 60px;
  display: flex;
  justify-content: space-around;
  margin-right: 8px;
}
.tiLi > div {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  display: inline-block;
}
.tiLi > div:nth-child(1) {
  background: #eb5a56;
}
.tiLi > div:nth-child(2) {
  background: #f8bc33;
}
.tiLi > div:nth-child(3) {
  background: #62cb44;
}
</style>