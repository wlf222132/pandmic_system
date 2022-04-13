<template>
  <div class="index">
    <div class="page1">
      <div class="page1Left">
        <div class="tit">
          <div class="left"></div>
          <div class="cont">近况汇总</div>
        </div>
        <div class="txt">
          <!-- <el-empty description="暂无数据"></el-empty> -->
          <div id="receptive"></div>
        </div>
        <div class="tit titFeatures">
          <div class="left"></div>
          <div class="cont">功能区</div>
        </div>
        <div class="features">
          <div
            class="list"
            v-for="item in featuresList"
            :key="item.id"
            @click="routerPath(item.path)"
          >
            <div class="i">
              <i class="iconfont" :class="item.i"></i>
            </div>
            <div class="tit">
              <div class="t1">{{ item.txt }}</div>
              <div class="t2">{{ item.name }}</div>
            </div>
          </div>
        </div>
      </div>
      <div class="dailyDataBox">
        <div class="dailyData">
          <div class="li">
            <div class="tit">
              绿码
              <span class="num">{{ dailyData.g }}</span>
            </div>
          </div>
          <div class="li">
            <div class="tit">
              黄码
              <span class="num">{{ dailyData.y }}</span>
            </div>
          </div>
          <div class="li">
            <div class="tit">
              红码
              <span class="num">{{ dailyData.r }}</span>
            </div>
          </div>
          <div class="date">{{ dailyData.date }}</div>
        </div>
        <el-calendar v-model="todayDate"></el-calendar>
      </div>
    </div>
    <div class="page2">
      <div class="txt">
        <div class="tit">
          <div class="left"></div>
          <div class="cont">状态异常人员监控</div>
        </div>
        <!-- <el-empty description="暂无数据" v-if="!StateAbnormality"></el-empty> -->
        <div class="page2Box">
          <div class="box" v-for="item in StateAbnormality" :key="item.id" @click="$router.push({ path: `/UserDetails/${item.id}` })">
            <div class="a">
              <div class="b">
                <a href="#">{{ item.name }}</a>
                <h2>{{ item.code }}</h2>
                <span>{{ item.msg }}</span>
              </div>
              <div class="c">
                <div class="d" style="--i: 1; --w: 1.5"></div>
                <div class="d" style="--i: 2; --w: 1.6"></div>
                <div class="d" style="--i: 3; --w: 1.4"></div>
                <div class="d" style="--i: 4; --w: 1.7"></div>
                <div class="e" style="--i: 1"></div>
              </div>
              <!-- 设置头像 -->
              <div class="f">
                <img :src="item.imgurl" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import * as echarts from "echarts";
export default {
  data() {
    return {
      todayDate: new Date(),
      dailyData: {
        //统计个数
        date: null,
        g: 100,
        y: 8,
        r: 0,
      },
      //page2
      StateAbnormality: [
        {
          id: 1,
          name: "孙悟空",
          msg: "2022.4.12 15:34经过摄像头1",
          code: "健康码异常",
          imgurl:
            "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fup.enterdesk.com%2Fedpic_source%2F9d%2Fc2%2Fdd%2F9dc2ddda0a69053caa0ef363c0c0bc25.jpg&refer=http%3A%2F%2Fup.enterdesk.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1652341861&t=8b78b59102e68e94eaa1b5760a1f8dfe",
        },
        {
          id: 2,
          name: "猪八戒",
          msg: "2022.4.11 11:00经过摄像头2",
          code: "健康码异常",
          imgurl:
            "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fup.enterdesk.com%2Fedpic_source%2F9d%2Fc2%2Fdd%2F9dc2ddda0a69053caa0ef363c0c0bc25.jpg&refer=http%3A%2F%2Fup.enterdesk.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1652341861&t=8b78b59102e68e94eaa1b5760a1f8dfe",
        },
        {
          id: 3,
          name: "沙和尚",
          msg: "2022.4.11 10:46经过摄像头1",
          code: "健康码异常",
          imgurl:
            "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fup.enterdesk.com%2Fedpic_source%2F9d%2Fc2%2Fdd%2F9dc2ddda0a69053caa0ef363c0c0bc25.jpg&refer=http%3A%2F%2Fup.enterdesk.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1652341861&t=8b78b59102e68e94eaa1b5760a1f8dfe",
        },
      ],
      featuresList: [
        {
          id: "1",
          name: "实时监控",
          path: "/vido",
          i: "el-icon-full-screen",
          txt: "实时监控管理",
        },
        {
          id: "2",
          name: "用户信息管理",
          path: "/UserInfo",
          i: "el-icon-user",
          txt: "查询管理用户信息",
        },
        {
          id: "3",
          name: "异常人员信息查询",
          path: "/SuspectorInformationQuery",
          i: "el-icon-search",
          txt: "查询异常人员信息",
        },
      ],
      optionReceptive: {
        legend: {
          data: [
            { name: "绿码人数", icon: "rect" },
            { name: "黄码人数", icon: "rect" },
            { name: "红码人数", icon: "rect" },
          ],
          orient: "vertical",
          right: "5%",
          top: "center",
        },
        xAxis: {
          data: ["4.6", "4.7", "4.8", "4.9", "4.10", "4.11", "4.12"],
        },
        yAxis: {},
        series: [
          {
            name: "红码人数",
            data: [10, 22, 28, 43, 49, 21, 32],
            type: "line",
            stack: "x",
            itemStyle: {
              normal: {
                color: "#eb5a56", // 红码数据
              },
            },
            areaStyle: { opacity: 0.5 },

            smooth: true,
          },
          {
            name: "黄码人数",
            data: [5, 4, 3, 5, 10, 43, 43],
            type: "line",
            stack: "x",
            itemStyle: {
              normal: {
                color: "#f8bc33", // 黄码数据
              },
            },
            areaStyle: { opacity: 0.7 },
            smooth: true,
          },
          {
            name: "绿码人数",
            data: [1, 14, 32, 13, 35, 76, 1],
            type: "line",
            stack: "x",
            itemStyle: {
              normal: {
                color: "#62cb44", // 绿码数据
              },
            },
            areaStyle: {},
            smooth: true,
          },
        ],
      },
    };
  },
  mounted() {
    this.initEchartReceptive();
    this.calendar();
  },
  methods: {
    //日历
    calendar() {
      let d =
        document.querySelector(".index .is-today").children[0].children[0]
          .innerHTML;
      let y = document
        .querySelector(".index .el-calendar__title")
        .innerHTML.trim()
        .split("年")[0]
        .trim();
      let m = document
        .querySelector(".index .el-calendar__title")
        .innerHTML.trim()
        .split("年")[1]
        .split("月")[0]
        .trim();
      this.dailyData.date = `${y}.${m}.${d}`;
      document.querySelectorAll(".index .el-calendar-day").forEach((res) => {
        res.onclick = () => {
          let d = res.children[0].innerHTML;
          let y, m;
          setTimeout(() => {
            y = document
              .querySelector(".index .el-calendar__title")
              .innerHTML.trim()
              .split("年")[0]
              .trim();
            m = document
              .querySelector(".index .el-calendar__title")
              .innerHTML.trim()
              .split("年")[1]
              .split("月")[0]
              .trim();
            this.getSpecifiedDateData(y, m, d);
          });
        };
      });
    },
    getSpecifiedDateData(y, m, d) {
      this.dailyData.date = `${y}.${m}.${d}`;
    },
    routerPath(path) {
      this.$router.push(path);
    },
    //初始化表格
    initEchartReceptive() {
      let chartDiv = document.getElementById("receptive");
      let myChart = echarts.init(chartDiv);
      myChart.setOption(this.optionReceptive);
    },
  },
};
</script>
<style>
/* page1 */
.index .page1 {
  display: flex;
}
.index .page1 .page1Left {
  flex: 1;
  padding: 30px;
  display: flex;
  flex-flow: column;
  width: 0;
}
.index .page1 .page1Left .tit {
  height: 50px;
  line-height: 50px;
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}
.index .page1 .page1Left .titFeatures {
  margin-top: 10px;
}
.index .page1 .page1Left .tit .left {
  width: 10px;
  height: 68%;
  display: inline-block;
  background: #6584ee;
  margin-right: 12px;
}
.index .page1 .page1Left .titFeatures .left {
  background: #62cb44;
}
.index .page1 .page1Left .tit .cont {
  display: inline-block;
  vertical-align: top;
  font-size: 25px;
  font-weight: bold;
}

.index .page1 .page1Left .txt {
  width: 100%;
  height: 500px;
  background: #f9f9f9;
  border-radius: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
}
.index .page1 .page1Left .txt > div {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.index .page1 .page1Left .txt > div > div {
  position: relative;
}
.index .page1 .page1Left .txt > div > div > * {
  position: absolute;
  top: 50% !important;
  left: 50% !important;
  transform: translate(-50%, -50%);
}
.index .page1 .page1Left .features {
  flex: 1;
  display: flex;
  justify-content: space-around;
}
.index .page1 .page1Left .features .list {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}
.index .page1 .page1Left .features .list:hover {
  cursor: pointer;
}
.index .page1 .page1Left .features .list:hover .i {
  background: linear-gradient(90deg, #6584ee 0%, #b863e4 100%);
  transition: 0.5s;
}
.index .page1 .page1Left .features .list .i {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: linear-gradient(90deg, #f1886a 0%, #f6ac2e 100%);
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 10px;
  transition: 0.5s;
}
.index .page1 .page1Left .features .list .tit {
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: flex-start;
}
.index .page1 .page1Left .features .list .tit .t1 {
  font-size: 15px;
  color: #606060;
  height: 25px;
  line-height: 25px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.index .page1 .page1Left .features .list .tit .t2 {
  font-size: 22px;
  color: #94979c;
  height: 30px;
  line-height: 30px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.index .page1 .dailyDataBox {
  width: 520px;
  overflow: hidden;
  flex-shrink: 0;
}
.index .dailyData {
  height: 220px;
  background: linear-gradient(
    112.72013189013455deg,
    rgba(65, 65, 65, 1) 4.927083333333334%,
    rgba(0, 0, 0, 1) 97.84374999999999%
  );
  border-radius: 30px;
  margin-bottom: 30px;
  position: relative;
  display: flex;
  justify-content: center;
  align-content: center;
  overflow: hidden;
}
.index .dailyData .li {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}
.index .dailyData .date {
  position: absolute;
  color: #fff;
  font-size: 20px;
  left: 45px;
  top: 15px;
}
.index .dailyData .li .tit {
  width: 95px;
  height: 95px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-flow: column;
  color: #fff;
}
.index .dailyData .li .tit .num {
  font-weight: bold;
  font-size: 25px;
}
.index .dailyData .li:nth-child(1) .tit {
  background: linear-gradient(90deg, #62cb44, #2c7518);
}
.index .dailyData .li:nth-child(2) .tit {
  background: linear-gradient(90deg, #f8bc33, #b08112);
}
.index .dailyData .li:nth-child(3) .tit {
  background: linear-gradient(90deg, #eb5a56, #89221e);
}
/* 日历 */
.dailyDataBox {
  padding: 30px 30px 30px 0;
}
.dailyDataBox .el-calendar {
  background-color: #f9f9f9;
  font-weight: bold;
  border-radius: 20px;
}
.dailyDataBox .el-calendar-table td {
  border-bottom: none;
  border-right: none;
}
.dailyDataBox .el-calendar-table tr td:first-child {
  border-left: none;
}
.dailyDataBox .el-calendar-table tr:first-child td {
  border-top: none;
}
.dailyDataBox .current {
  color: #83a1ac;
}
.dailyDataBox .el-backtop,
.el-calendar-table td.is-today {
  color: #fa865a;
}
.dailyDataBox .el-calendar-table .el-calendar-day {
  text-align: center;
  height: 70px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.dailyDataBox .el-calendar-table td.is-selected {
  background: none;
  color: #fff !important;
  border-radius: 50px;
}
.dailyDataBox .el-calendar-table .el-calendar-day:hover {
  background: none;
}
.dailyDataBox .el-calendar__header {
  padding: 30px 30px 12px 30px;
  border-bottom: none;
}
.dailyDataBox .el-calendar__body {
  padding: 0px 30px 10px 30px;
}
.dailyDataBox .el-button {
  border: none;
  height: 30px;
  color: #c0c4cc;
  font-weight: bold;
}
.dailyDataBox .el-button:focus,
.dailyDataBox .el-button:hover {
  background: linear-gradient(90deg, #f1886a 0%, #f6ac2e 100%);
  color: #fff;
}
.dailyDataBox .el-calendar__title {
  margin-left: 20px;
}
.dailyDataBox .is-selected .el-calendar-day span {
  display: inline-block;
  width: 50px;
  border-radius: 50%;
  height: 50px;
  line-height: 50px;
  background: linear-gradient(90deg, #6584ee 0%, #b863e4 100%);
  text-align: center;
}

/* page2 */
.index .page2 {
  margin: 0 30px 30px 30px;
}
.index .page2 .tit {
  height: 50px;
  line-height: 50px;
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}
.index .page2 .tit .left {
  width: 10px;
  height: 68%;
  display: inline-block;
  background: #eb5a56;
  margin-right: 12px;
}
.index .page2 .tit .cont {
  display: inline-block;
  vertical-align: top;
  font-size: 25px;
  font-weight: bold;
}
.index .page2 .txt {
  background: #f9f9f9;
  border-radius: 20px;
  padding: 30px;
}
.index .page2 .page2Box {
  display: flex;
  flex-wrap: wrap;
}
.index .page2 .page2Box .box {
  flex: 1;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  min-width: 620px;
}
.index .page2 .a {
  max-width: 620px;
  cursor: pointer;
  position: relative;
  width: 90%;
  height: 380px;
  border: #fff 10px solid;
  background: linear-gradient(
    112.72013189013455deg,
    rgba(65, 65, 65, 1) 4.927083333333334%,
    rgba(0, 0, 0, 1) 97.84374999999999%
  );
  border-radius: 20px;
  overflow: hidden;
  margin-bottom: 20px;
  box-shadow: 7px 15px 20px 0px rgb(0 0 0 / 20%);
}

.index .page2 .b {
  position: absolute;
  width: 200px;
  height: 300px;
  left: 0;
  margin: 75px 50px;
  transition: 1s;
}
.index .page2 .b a {
  text-decoration: none;
  color: #fff;
  font: 900 28px "";
}
.index .page2 .b h2 {
  transition: 0.5s 1s;
  opacity: 0;
  color: #eb5a56;
}
.index .page2 .b span {
  transition: 0.5s 1s;
  color: #fff;
  font: 500 15px "";
  position: absolute;
  top: 70px;
  width: 140px;
  padding: 4px;
  border-radius: 3px;
}
.index .page2 .c {
  position: absolute;
  top: -130px;
  right: -240px;
}
.index .page2 .d,
.index .page2 .e {
  position: absolute;
  right: calc(var(--i) * 100px);
  width: calc(var(--w) * 40px);
  height: 500px;
  overflow: hidden;
  border-radius: 100px;
  transform: rotateZ(220deg) translate(0, 0);
  background: #f8bc33;
  transition: 0.5s 0.5s;
}
.index .page2 .d:nth-child(2) {
  background: #eb5a56;
}
.index .page2 .e {
  left: -470px;
  top: -140px;
  width: 70px;
  background-color: #62cb44;
}
.index .page2 .a:hover .c div {
  transition: 0.5s calc(var(--i) * 0.1s);

  transform: rotateZ(220deg) translate(-200px, 400px);
}
.index .page2 .a:hover .b {
  transition: 1s 0.5s;
  left: 370px;
}
.index .page2 .a:hover .b span {
  transition: 1s 0.5s;
  top: 105px;
}
.index .page2 .a:hover .b h2 {
  transition: 1s 0.5s;
  opacity: 1;
}
.index .page2 .f {
  width: 250px;
  height: 250px;
  position: absolute;
  border-radius: 50%;
  background-size: cover;
  margin: 70px;
  opacity: 0;
  transition: 0.5s;
  overflow: hidden;
  border: 6px solid #fff;
  box-shadow: 10px 10px 10px rgba(0, 0, 0, 0.1);
}
.index .page2 .f img {
  width: 100%;
  height: 100%;
}
.index .page2 .a:hover .f {
  transition: 1s 1.3s;
  opacity: 1;
}
</style>