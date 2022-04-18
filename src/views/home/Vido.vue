<template>
  <div class="HealthCodeInformation">
    <div class="pageBox">
      <div class="tit">{{ datePage1 }}<span>摄像头1</span></div>
      <video class="v1" controls="controls">
        <source
          src="http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4"
          type="video/mp4"
        />
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
    };
  },
  mounted() {
    setInterval(() => {
      this.datePage1 = new Date().Format("yyyy-MM-dd hh:mm:ss");
    }, 1000);
  },
  methods: {},
};
</script>

<style scoped>
.HealthCodeInformation {
  padding: 30px;
  height: 100%;
  box-sizing: border-box;
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
.HealthCodeInformation .pageBox .tit{
    color: #fff;
    position: absolute;
    right: 10px;
    top: 10px;
    background: rgba(0, 0, 0, .7);
    padding: 10px;
    border-radius: 6px;
}
.HealthCodeInformation .pageBox .tit span{
    margin-left: 10px;
}
</style>