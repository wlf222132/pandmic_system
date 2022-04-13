<template>
  <div class="loadingBox">
    <div class="container">
      <div class="progressWrapper">
        <div class="back fill"></div>
        <div class="front fill"></div>
        <div class="left"></div>
        <div class="right"></div>
        <div class="up fill"></div>
        <div class="down fill"></div>
        <div class="percentTip"><span>0</span>%</div>
      </div>
    </div>
  </div>
</template>
<script>
export default {};
</script>

<style>
.loadingBox{
    transform: translateY(-100px);
}
.container {
  width: 400px;
  height: 100px;
  margin: 100px auto;
  perspective: 1000px;
  transform-origin: 50% 50%;
  transform-style: preserve-3d;
}
.container .progressWrapper {
  width: 400px;
  height: 100px;
  transition: 0.6s;
  transform-origin: 50% 50%;
  transform-style: preserve-3d;
  position: relative;
  transform: rotateX(60deg);
}
.container .progressWrapper div {
  text-align: center;
  line-height: 100px;
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.3);
}
.container .progressWrapper div.back {
  box-shadow: 0 -16px 80px rgba(0, 0, 0, 0.15),
    0 16px 8px -5px rgba(0, 0, 0, 0.3), 0 -60px 140px rgba(254, 254, 254, 0.6);
  transform-origin: 50% 50%;
  transform: translateZ(-100px);
}
.container .progressWrapper div.front {
  transform-origin: 50% 100%;
  transform: translateZ(0);
}
.container .progressWrapper div.left {
  width: 100px;
  height: 100px;
  transform-origin: 0 100%;
  transform: rotateY(90deg);
}
.container .progressWrapper div.right {
  width: 100px;
  height: 100px;
  right: 0;
  top: 0;
  transform-origin: 100% 100%;
  transform: rotateY(-90deg);
}
.container .progressWrapper div.up {
  width: 400px;
  height: 100px;
  transform-origin: 50% 0;
  transform: rotateX(-90deg);
}
.container .progressWrapper div.down {
  width: 400px;
  height: 100px;
  transform-origin: 50% 100%;
  transform: rotateX(90deg);
}
.container .progressWrapper .fill::before {
  width: 0px;
  height: 100px;
  background-color: rgba(241, 196, 15, 0.5);
  content: "";
  display: block;
  position: absolute;
  margin: 0;
  box-sizing: border-box;
  transition: all 0.5s ease-out;
}
.container .progressWrapper .percentTip {
  width: 60px;
  height: 50px;
  background-color: steelblue;
  transform: translateZ(-100px) translateY(115px);
  box-shadow: 0 -16px 80px rgba(0, 0, 0, 0.15),
    0 16px 8px -5px rgba(0, 0, 0, 0.3), 0 -60px 140px rgba(254, 254, 254, 0.6);
  color: white;
  line-height: 50px;
  position: absolute;
  left: -30px;
  transition: all 0.5s ease-out;
}
.container .progressWrapper .percentTip::before {
  content: "";
  display: block;
  width: 0;
  height: 0;
  border-style: solid;
  border-width: 10px;
  border-color: steelblue;
  border-top-color: transparent;
  border-left-color: transparent;
  border-right-color: transparent;
  position: absolute;
  left: 20px;
  top: -17px;
}
.container .progressWrapper:hover .fill::before {
  background-color: rgba(241, 196, 15, 0.3);
}
</style>