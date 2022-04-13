<template>
  <div id="chinaMapBox">
    <h1 class="chinaMapName">
      国内疫情分布图<br />
      <span>基于新浪新冠病毒全国疫情API接口</span>
    </h1>
    <div id="chinaMap"></div>
    <div class="page3">
      <h1 class="tit">
        国内疫情统计<br />
        <span v-if="dataInfo.time">更新时间：{{ dataInfo.time }}</span>
        <span v-else>更新时间：暂无</span>
      </h1>
      <div class="boxs">
        <div class="box">
          <div class="v">
            {{ dataInfo.curetotal | isCityData }}
          </div>
          <div class="t">治愈</div>
        </div>
        <div class="box">
          <div class="v">
            {{ dataInfo.gntotal | isCityData }}
          </div>
          <div class="t">累计确诊</div>
        </div>
        <div class="box">
          <div class="v">
            {{ dataInfo.deathtotal | isCityData }}
          </div>
          <div class="t">死亡</div>
        </div>
        <div class="box">
          <div class="v">
            {{ dataInfo.sustotal | isCityData }}
          </div>
          <div class="t">有病例城市</div>
        </div>
      </div>
    </div>
    <div class="page2">
      <h1 class="tit">
        国内各地区疫情统计<br />
        <span>更新的不是数字，而是生命</span>
      </h1>
      <div class="box">
        <div class="listLiTop">
          <span>地区</span>
          <span>累计</span>
          <span>治愈</span>
          <span>境外输入</span>
          <span>死亡</span>
        </div>
        <div class="noList" v-if="dataList.length == 0">
          <el-empty description="暂无数据"></el-empty>
        </div>
        <div class="listLi" v-for="item in dataList" :key="item.name">
          <span>{{ item.name }}</span>
          <span>{{ item.accumulate | isCityData }}</span>
          <span>{{ item.cure | isCityData }}</span>
          <span>{{ item.jwsr | isCityData }}</span>
          <span>{{ item.die | isCityData }}</span>
        </div>
      </div>
      <!-- {{ dataList }} -->
    </div>
  </div>
</template>

<script>
import * as echarts from "echarts";
import "echarts/map/js/china.js";
import { getEpidemic } from "@/api/inquire/inquire.js";
export default {
  filters: {
    isCityData(value) {
      if (isNaN(value)) {
        return "待公布";
      } else {
        return value;
      }
    },
  },
  data() {
    return {
      //echart 配制option
      loading: true,
      options: {
        tooltip: {
          triggerOn: "mousemove", //mousemove、click
          padding: 8,
          borderWidth: 1,
          borderColor: "#409eff",
          backgroundColor: "rgba(255,255,255,0.7)",
          textStyle: {
            color: "#000000",
            fontSize: 13,
          },
          formatter: function (e, t, n) {
            let data = e.data;
            t, n;
            function numIsNull(value) {
              if (isNaN(value)) {
                return "待公布";
              } else {
                return value;
              }
            }
            try {
              data.value = numIsNull(data.value);
              data.jwsr = numIsNull(data.jwsr);
              data.accumulate = numIsNull(data.accumulate);
              data.cure = numIsNull(data.cure);
              data.die = numIsNull(data.die);
            } catch (err) {
              return;
            }

            let date = new Date();
            let dateNow =
              date.getFullYear() +
              "." +
              (date.getMonth() + 1) +
              "." +
              date.getDate();
            let context = `
               <div>
                   <p><b style="font-size:15px;">${data.name}</b>(${dateNow})</p>
                   <p class="tooltipStyle"><span class="tooltipLeft">现有确诊</span><span class="tooltipRight">${data.value}</span></p>
                   <p class="tooltipStyle"><span class="tooltipLeft">累计</span><span class="tooltipRight">${data.accumulate}</span></p>
                   <p class="tooltipStyle"><span class="tooltipLeft">治愈</span><span class="tooltipRight">${data.cure}</span></p>
                   <p class="tooltipStyle"><span class="tooltipLeft">境外输入</span><span class="tooltipRight">${data.jwsr}</span></p>
                   <p class="tooltipStyle"><span class="tooltipLeft">死亡</span><span class="tooltipRight">${data.die}</span></p>
               </div>
            `;
            return context;
          },
        },
        visualMap: {
          show: true,
          left: 26,
          bottom: 40,
          showLabel: true,
          pieces: [
            {
              gte: 10000,
              label: ">= 10000",
              color: "#B80909",
            },
            {
              gte: 1000,
              lt: 10000,
              label: "1000 - 9999",
              color: "#E64546",
            },
            {
              gte: 100,
              lt: 1000,
              label: "100 - 999",
              color: "#F57567",
            },
            {
              gte: 10,
              lt: 100,
              label: "10 - 99",
              color: "#FF9985",
            },
            {
              gte: 1,
              lt: 10,
              label: "1 - 9",
              color: "#FFE5DB",
            },
            {
              lt: 1,
              label: "0",
              color: "#EEEEEE",
            },
          ],
        },
        geo: {
          map: "china",
          scaleLimit: {
            min: 1,
            max: 2,
          },
          zoom: 1,
          top: 120,
          label: {
            normal: {
              show: true,
              fontSize: "14",
              color: "rgba(0,0,0,0.7)",
            },
          },
          itemStyle: {
            normal: {
              //shadowBlur: 50,
              //shadowColor: 'rgba(0, 0, 0, 0.2)',
              borderColor: "rgba(0, 0, 0, 0.2)",
            },
            emphasis: {
              areaColor: "#f2d5ad",
              shadowOffsetX: 0,
              shadowOffsetY: 0,
              borderWidth: 0,
            },
          },
        },
        series: [
          {
            name: "突发事件",
            type: "map",
            geoIndex: 0,
            data: [],
          },
        ],
      },
      //echart data
      dataList: [],
      dataInfo: {},
    };
  },
  methods: {
    //初始化中国地图
    initEchartMap() {
      let mapDiv = document.getElementById("chinaMap");
      let myChart = echarts.init(mapDiv);
      myChart.setOption(this.options);
      
    },
    //修改echart配制
    setEchartOption() {
      this.options.series[0]["data"] = this.dataList;
    },
    //请求疫情数据（新浪API）
    getEpidemic() {
      echarts.init(document.getElementById("chinaMap")).showLoading();
      getEpidemic()
        .then((res) => {
          echarts.init(document.getElementById("chinaMap")).hideLoading();
          if (res.code == 200) {
            this.dataInfo = {
              curetotal: res.data.data.data.curetotal,
              gntotal: res.data.data.data.gntotal,
              deathtotal: res.data.data.data.deathtotal,
              sustotal: res.data.data.data.sustotal,
              time: res.data.data.data.mtime,
            };
            res.data.data.data.list.forEach((v) => {
              this.dataList.push({
                name: v.name,
                value: Number(v.econNum),
                jwsr: Number(v.jwsrNum),
                accumulate: Number(v.value),
                cure: Number(v.cureNum),
                die: Number(v.deathNum),
              });

              this.setEchartOption();
              this.$nextTick(() => {
                this.initEchartMap();
              });
              
            });
          } else {
            this.$notify.error({
              title: "错误",
              message: "网络错误",
            });
            this.setEchartOption();
            this.$nextTick(() => {
              this.initEchartMap();
            });
          }
        })
        .catch((err) => {
          echarts.init(document.getElementById("chinaMap")).hideLoading();
          this.$notify.error({
            title: "错误",
            message: "网络错误",
          });
          this.setEchartOption();
          this.$nextTick(() => {
            this.initEchartMap();
          });
          return err;
        });
    },
  },
  mounted() {
    this.getEpidemic();
  },
};
</script>

<style>
#chinaMapBox {
  position: relative;
}
#chinaMapBox #chinaMap {
  height: calc(100vh - 120px);
  background-color: #ffffff;
  display: flex;
  justify-content: center;
  align-items: center;
}
#chinaMapBox .chinaMapLogo {
  position: absolute;
  top: 0;
  left: 0;
  width: 45px;
}
#chinaMapBox .page2 {
  position: relative;
  background: linear-gradient(90deg, #044ba9 0%, #00ff88 100%);
  padding-bottom: 30px;
}
#chinaMapBox .page2 > .tit {
  text-align: center;
  padding: 30px 0 0 0;
  font-size: 35px;
  color: #ffffff;
}
#chinaMapBox .page2 > .tit > span {
  font-size: 15px;
}
#chinaMapBox .page2 > .box {
  width: 80%;
  margin: 30px auto 0 auto;
  background-color: #ffffff;
  border-radius: 20px;
  overflow: hidden;
}
#chinaMapBox .page2 > .box > .listLiTop,
#chinaMapBox .page2 > .box > .listLi {
  display: flex;
  font-size: 18px;
}
#chinaMapBox .page2 > .box > .listLiTop {
  background: linear-gradient(90deg, #4b6cb7 0%, #182848 100%);
}
#chinaMapBox .page2 > .box > .listLi {
  background-color: rgba(240, 240, 240, 0.7);
  margin: 5px 4px;
  border-radius: 4px;
  overflow: hidden;
}
#chinaMapBox .page2 > .box > .listLi > span:nth-child(1) {
  background: linear-gradient(90deg, #00d2ff 0%, #3a47d5 100%);
  color: #fff;
}
#chinaMapBox .page2 > .box > .listLiTop > span,
#chinaMapBox .page2 > .box > .listLi > span {
  flex: 1;
  text-align: center;
  padding: 10px;
  height: 40px;
  line-height: 40px;
}
#chinaMapBox .page2 > .box > .listLiTop > span {
  font-weight: bold;
  color: #ffffff;
}
#chinaMap .tooltipStyle {
  line-height: 1.7;
  overflow: hidden;
}
#chinaMap .tooltipLeft {
  float: left;
}
#chinaMap .tooltipRight {
  float: right;
}
.chinaMapName {
  position: absolute;
  text-align: center;
  left: 50%;
  transform: translateX(-50%);
  top: 30px;
  font-size: 35px;
  color: #333333;
  z-index: 99;
}
.chinaMapName > span {
  font-size: 15px;
  color: #999999;
}
#chinaMapBox .page3 {
  position: relative;
  height: 650px;
  background: linear-gradient(
    112.72013189013455deg,
    rgba(65, 65, 65, 1) 4.927083333333334%,
    rgba(0, 0, 0, 1) 97.84374999999999%
  );
}
#chinaMapBox .page3 .boxs {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
#chinaMapBox .page3 > .tit {
  position: absolute;
  text-align: center;
  left: 50%;
  transform: translateX(-50%);
  top: 30px;
  font-size: 35px;
  z-index: 99;
  color: #ffffff;
}
#chinaMapBox .page3 > .tit > span {
  font-size: 15px;
}
#chinaMapBox .page3 .box {
  position: relative;
  width: 280px;
  height: 160px;
  background-color: rgba(255, 255, 255, 0.1);
  margin: 30px;
  border-radius: 15px;
  box-shadow: 20px 20px 50px rgb(0 0 0 / 50%);
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  border-top: 1px solid rgba(255, 255, 255, 0.5);
  border-left: 1px solid rgba(255, 255, 255, 0.5);
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
  flex-flow: column;
}
#chinaMapBox .page3 .box:nth-child(1) {
  color: #62cb44;
}
#chinaMapBox .page3 .box:nth-child(2) {
  color: #eb5a56;
}
#chinaMapBox .page3 .box:nth-child(3) {
  color: #ffffff;
}
#chinaMapBox .page3 .box:nth-child(4) {
  color: #f8bc33;
}
#chinaMapBox .page3 .box .v {
  font-size: 28px;
  font-weight: bold;
}
#chinaMapBox .page3 .box .t {
  font-size: 16px;
  color: #fff;
  font-weight: 300;
  margin: 10px 0 15px 0;
}
</style>
