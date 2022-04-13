<template>
  <div class="SuspectorInformationQuery">
    <div class="page1">
      <div class="tit">异常人员信息管理</div>
    </div>
    <div class="page2">
      <div class="shell">
        <div class="card">
          <h1><span class="word">系统人数</span><br />1000人</h1>
        </div>
      </div>
      <div class="shell">
        <div class="card card2">
          <h1><span class="word word2">异常人数</span><br />23人</h1>
        </div>
      </div>
    </div>
    <div class="page3"></div>
    <div class="page4"></div>
  </div>
</template>
<style scoped>
.SuspectorInformationQuery {
  padding: 30px;
  width: 100%;
  min-height: 100%;
  box-sizing: border-box;
  overflow: hidden;
  background: linear-gradient(90deg, #fc466b 0%, #3f5efb 100%);
  display: flex;
  flex-direction: column;
}
.SuspectorInformationQuery .page1 {
  position: relative;
  width: 80%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin: auto;
  height: 50px;
}
.SuspectorInformationQuery .page1 .tit{
  position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    width: 285px;
    z-index: 99;
    color: rgba(255, 255, 255, 0.8);
    font-weight: bold;
    font-size: 27px;
    letter-spacing: 6px;
    border-bottom: 2px solid rgba(255, 255, 255, 0.8);
    padding-bottom: 15px;
    text-align: center;
    transition: 0.5s;
    -webkit-animation: flipInX-data-v-2b086e3f 1s .2s linear 1 normal both;
    animation: flipInX-data-v-2b086e3f 1s .2s linear 1 normal both;
}
.SuspectorInformationQuery .page1 .tit:hover {
  color: #fff;
  border-bottom: 2px solid #fff;
}
@keyframes flipInX {
  0% {
    -webkit-transform: perspective(400px) rotateX(90deg);
    transform: perspective(400px) rotateX(90deg);
    -webkit-animation-timing-function: ease-in;
    animation-timing-function: ease-in;
    opacity: 0;
}
40% {
    -webkit-transform: perspective(400px) rotateX(-20deg);
    transform: perspective(400px) rotateX(-20deg);
    -webkit-animation-timing-function: ease-in;
    animation-timing-function: ease-in;
}
60% {
    -webkit-transform: perspective(400px) rotateX(10deg);
    transform: perspective(400px) rotateX(10deg);
    opacity: 1;
}
80% {
    -webkit-transform: perspective(400px) rotateX(-5deg);
    transform: perspective(400px) rotateX(-5deg);
}
100% {
    -webkit-transform: perspective(400px);
    transform: perspective(400px);
}
}
.SuspectorInformationQuery .page2 {
  width: 80%;
  height: 230px;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  margin: 30px auto;
  background: linear-gradient(
    to right bottom,
    rgba(255, 255, 255, 0.6),
    rgba(255, 255, 255, 0.3),
    rgba(255, 255, 255, 0.2)
  );
  border-radius: 30px;
  box-shadow: 13px 16px 10px rgb(0 0 0 / 10%);
}

.SuspectorInformationQuery .page2 .shell {
  position: relative;
  perspective: 700px;
  transform-style: preserve-3d;
}

.SuspectorInformationQuery .page2 .card {
  height: 130px;
  width: 230px;
  transform: translateX(4px) rotateY(22deg) rotateX(10deg);
  display: flex;
  align-items: center;
  background: rgba(98, 203, 68, 0.8);
  color: rgba(255, 255, 255, 0.9);
  border-radius: 10px;
}
.SuspectorInformationQuery .page2 .card2 {
  background: rgba(235, 90, 86, 0.8);
}
.SuspectorInformationQuery .page2 h1 {
  font-size: 35px;
  text-align: center;
}

.SuspectorInformationQuery .page2 .card .word {
  background-color: rgba(255, 255, 255, 0.9);
  line-height: 1;
  color: rgba(98, 203, 68, 0.8);
  font-weight: bold;
  font-size: 25px;
  padding: 13px;
  border-radius: 5px;
  margin: 0 15px 0 30px;
  display: inline-flex;
}
.SuspectorInformationQuery .page2 .card .word2 {
  color: rgba(235, 90, 86, 0.8);
}
.SuspectorInformationQuery .page2 .shell::before {
  content: "";
  height: 130px;
  width: 230px;
  position: absolute;
  margin-top: -9px;
  margin-left: -9px;
  border: 9px solid rgba(255, 255, 255, 0.7);
  transform: translateX(-15px) rotateY(-30deg) rotateX(15deg) scale(1.02);
  border-radius: 20px;
}

.SuspectorInformationQuery .page2 .shell:hover > div,
.SuspectorInformationQuery .page2 .shell:hover::before {
  transform: none;
}

.SuspectorInformationQuery .page2 .shell > div,
.SuspectorInformationQuery .page2 .shell::before {
  transition: 0.3s;
}
.SuspectorInformationQuery .page3{
  width: 80%;
  margin: auto;
  flex: 1;
}
.SuspectorInformationQuery .page4{
  width: 80%;
  height: 70px;
  margin: 30px auto 0 auto;
  background: #fc466b;
}
</style>
