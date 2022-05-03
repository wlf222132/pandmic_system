<template>
  <div class="HealthCodeInformation">
    <div class="page" v-if="isPage">
      <div class="list" v-for="item in videoList" :key="item.id" @click="changeList(item.src,item.name)">
        {{ item.name }}
      </div>
    </div>
    <div class="pageBox" v-else>
      <div class="tit">
        {{ datePage1 }}<span>{{ videoText }}</span>
      </div>
      <div class="fh" @click="fh()">返回</div>
      <video class="v1" controls="controls">
        <source :src="videoSrc" type="video/mp4" />
      </video>
    </div>
  </div>
</template>
<script>
Date.prototype.Format = function (fmt) {
  var o = {
    "M+": this.getMonth() + 1, //月份
    "d+": this.getDate(), //日
    "h+": this.getHours(), //小时
    "m+": this.getMinutes(), //分
    "s+": this.getSeconds(), //秒
  };
  if (/(y+)/.test(fmt)) {
    //根据y的长度来截取年
    fmt = fmt.replace(
      RegExp.$1,
      (this.getFullYear() + "").substr(4 - RegExp.$1.length)
    );
  }
  for (var k in o) {
    if (new RegExp("(" + k + ")").test(fmt))
      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length)
      );
  }
  return fmt;
};
export default {
  data() {
    return {
      datePage1: new Date().Format("yyyy-MM-dd hh:mm:ss"),
      isPage: true,
      videoSrc: "",
      videoText: "",
      videoList: [
        {
          id: 1,
          name: "重庆市合川",
          src: "http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4",
        },
        {
          id: 2,
          name: "重庆市渝中",
          src: "http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4",
        },
        {
          id: 3,
          name: "四川省成都",
          src: "http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4",
        },
      ],
    };
  },
  mounted() {
    setInterval(() => {
      this.datePage1 = new Date().Format("yyyy-MM-dd hh:mm:ss");
    }, 1000);
  },
  methods: {
    changeList(src,name){
      this.isPage=false;
      this.videoSrc=src;
      this.videoText=name;
    },
    fh(){
      this.isPage=true;
    }
  },
};
</script>

<style scoped>
.HealthCodeInformation {
  padding: 30px;
  height: 100%;
  box-sizing: border-box;
  background: linear-gradient(90deg, #fc466b 0%, #3f5efb 100%);
}
.HealthCodeInformation .page {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.HealthCodeInformation .pageBox {
  height: 100%;
  position: relative;
}
.HealthCodeInformation .pageBox .v1 {
  width: 100%;
  height: 100%;
  background: #000;
}
.HealthCodeInformation .pageBox .tit {
  color: #fff;
  position: absolute;
  right: 10px;
  top: 10px;
  background: rgba(0, 0, 0, 0.7);
  padding: 10px;
  border-radius: 6px;
}
.HealthCodeInformation .pageBox .tit span {
  margin-left: 10px;
}
.HealthCodeInformation .list {
  width: 400px;
  height: 250px;
  border-radius: 20px;
  background: linear-gradient(
    to right bottom,
    rgba(255, 255, 255, 0.6),
    rgba(255, 255, 255, 0.3),
    rgba(255, 255, 255, 0.2)
  );
  backdrop-filter: blur(11px);
  border-top: 1px solid rgba(255, 255, 255, 0.8);
  border-left: 1px solid rgba(255, 255, 255, 0.8);
  font: 900 50px "";
  display: flex;
  justify-content: center;
  align-items: center;
  color: rgba(0, 0, 0, 0.5);
  text-shadow: 1px 1px 3px rgb(255 255 255 / 70%);
  cursor: pointer;
  margin-right: 20px;
}
.HealthCodeInformation .fh{
  position: absolute;
  top: 15px;
  left: 15px;
  background: #fff;
  padding: 5px 10px;
  border-radius: 5px;
  cursor: pointer;
  z-index: 1111;
}
</style>