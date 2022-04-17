<template>
  <div class="SuspectorInformationQuery">
    <div class="style1"></div>
    <div class="style2"></div>
    <div class="page1">
      <div class="tit">异常人员信息管理</div>
      <div class="text">
        <input
          type="text"
          class="inp"
          placeholder="请输入搜索内容"
          v-model="searchText"
          @keyup.enter="searchUser()"
        />
        <div class="btn" @click="searchUser()">
          <i class="el-icon-search"></i>
        </div>
      </div>
    </div>
    <div class="page2" v-loading="loading.Page2Loading">
      <div class="shell">
        <div class="card">
          <h1 v-if="typeof system.all == 'number'">
            <span class="word">系统人数</span><br />{{ system.all }}人
          </h1>
          <h1 v-else><span class="word">系统人数</span><br />无数据</h1>
        </div>
      </div>
      <div class="shell">
        <div class="card card2">
          <h1 v-if="typeof system.err == 'number'">
            <span class="word word2">异常人数</span><br />{{ system.err }}人
          </h1>
          <h1 v-else><span class="word word2">异常人数</span><br />无数据</h1>
        </div>
      </div>
    </div>

    <div class="page3">
      <div class="page3Box" v-loading="loading.page3BoxLoading">
        <div class="listTop">
          <span>姓名</span>
          <span>身份证</span>
          <span>状态</span>
          <span>选项</span>
        </div>
        <el-empty v-if="userlist.length == 0" description="暂无数据"></el-empty>
        <div class="list" v-for="item in userlist" :key="item.id">
          <span>{{ item.name }}</span>
          <span>{{ item.uid }}</span>
          <span v-if="item.code == '绿码'" class="suc">
            <span></span>
            {{ item.code }}
          </span>
          <span v-else-if="item.code == '红码'" class="err">
            <span></span>
            {{ item.code }}
          </span>
          <span v-else> 无数据 </span>
          <span>
            <span
              class="l"
              @click="$router.push({ path: `/UserDetails/${item.id}` })"
              >详情</span
            >
          </span>
        </div>
      </div>
    </div>
    <div class="page4">
      <div class="page4Box">
        <span class="btn" @click="changeNum(1)">上一页</span>
        <span class="info">第{{ page.pageNum }}页/共{{ page.pageMax }}页</span>
        <span class="btn" @click="changeNum(0)">下一页</span>
      </div>
    </div>
  </div>
</template>
<script>
import { GetSystemCount, SelectUser } from "@/api/select/select.js";
export default {
  mounted() {
    this.getPage2Info();
    this.SelectUserAll();
  },
  methods: {
    searchUser() {
      //查询用户信息
      this.loading.page2BoxLoading = true;
      this.page.pageNum = 1;
      this.SelectUserAll();
    },
    getPage2Info() {
      GetSystemCount()
        .then((res) => {
          this.loading.Page2Loading = false;
          if (res.code == 200) {
            this.system.all = res.data.count.all;
            this.system.err = res.data.count.red + res.data.count.yellow;
          } else {
            this.$notify.error({
              title: "错误",
              message: res.message,
            });
          }
        })
        .catch(() => {
          this.loading.Page2Loading = false;
          this.$notify.error({
            title: "错误",
            message: "网络错误",
          });
        });
    },
    changeNum(type) {
      //上一页，下一页
      if (type == 0) {
        if (this.page.pageNum < this.page.pageMax) {
          this.page.pageNum++;
          this.SelectUserAll();
        } else {
          this.$notify.error({
            title: "提示",
            message: "已经到最后一页了",
          });
        }
      } else {
        if (this.page.pageNum == 1) {
          this.$notify.error({
            title: "提示",
            message: "已经到第一页了",
          });
        } else {
          this.page.pageNum--;
          this.SelectUserAll();
        }
      }
    },
    SelectUserAll() {
      //查询API
      SelectUser({
        info: this.searchText,
        size: this.page.pageSize,
        pageNumber: this.page.pageNum,
      })
        .then((res) => {
          this.loading.page3BoxLoading = false;
          if (res.code == 200) {
            this.page.pageMax = res.data.userInfo.pages;
            if (res.data.userInfo.records.length > 0) {
              this.userlist = [];
              res.data.userInfo.records.forEach((item) => {
                let list = {
                  id: item.id,
                  name: item.name,
                  uid: item.idCard,
                  code: item.status,
                };
                this.userlist.push(list);
              });
              // this.$notify.success({
              //   title: "提示",
              //   message: res.message,
              // });
            } else {
              if (this.page.pageNum > 1) {
                this.page.pageNum--;
              }
              this.$notify.error({
                title: "提示",
                message: "无更多数据",
              });
            }
          } else {
            this.$notify.error({
              title: "错误",
              message: res.message,
            });
          }
        })
        .catch(() => {
          this.loading.page3BoxLoading = false;
          this.$notify.error({
            title: "错误",
            message: "网络错误",
          });
        });
    },
  },
  data() {
    return {
      loading: {
        Page2Loading: true,
        page3BoxLoading: true,
      },
      system: {
        all: null,
        err: null,
      },
      userlist: [],
      searchText: "",
      page: {
        pageSize: 8,
        pageNum: 1,
        pageMax: 1,
      },
    };
  },
};
</script>
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
  position: relative;
}
.SuspectorInformationQuery .style1 {
  width: 200px;
  height: 200px;
  border-radius: 50%;
  background-color: #77fdd7;
  position: absolute;
  bottom: 110px;
  right: 6%;
}
.SuspectorInformationQuery .style2 {
  width: 400px;
  height: 400px;
  border-radius: 50%;
  background-color: rgb(240, 160, 0);
  position: absolute;
  top: 183px;
  left: 5%;
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
.SuspectorInformationQuery .page1 .tit {
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
  -webkit-animation: flipInX 1s 0.2s linear 1 normal both;
  animation: flipInX 1s 0.2s linear 1 normal both;
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
.SuspectorInformationQuery .page1 > .text {
  width: 300px;
  height: 50px;
  background: #2e3642;
  border-radius: 25px;
  overflow: hidden;
  display: flex;
  align-items: center;
  box-shadow: 10px 10px 10px rgba(0, 0, 0, 0.1);
}
.SuspectorInformationQuery .page1 > .text .inp {
  height: 100%;
  flex: 1;
  border: none;
  background: none;
  color: #fff;
  padding: 0 20px;
  /*去除阴影*/
  box-shadow: none;
  /*去除边框*/
  border: none;
  /*去除聚焦input的蓝色边框*/
  outline: none;
  /*禁止拖拽*/
  resize: none;
  /*去除iOS默认样式*/
  -webkit-appearance: none;
  /*去除点击时背景高亮样式*/
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
}
.SuspectorInformationQuery .page1 > .text .btn {
  flex-shrink: 0;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: #fff;
  margin: 0 6px 0 0;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #f74e13;
  font-weight: bold;
  cursor: pointer;
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
  overflow: hidden;
  z-index: 1;
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

.SuspectorInformationQuery .page3 {
  width: 100%;
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
.SuspectorInformationQuery .page3 .page3Box {
  width: 80%;
  height: 100%;
  flex: 1;
  margin: 0 auto;
  overflow-x: hidden;
  display: flex;
  flex-direction: column;
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
  box-shadow: 13px 16px 10px rgb(0 0 0 / 10%);
  padding-bottom: 10px;
}
.SuspectorInformationQuery .page3 .page3Box > div {
  max-height: 75px;
  flex: 1;
}
.SuspectorInformationQuery .page3 .page3Box .el-loading-mask {
  max-height: 100%;
}
.SuspectorInformationQuery .page3 .page3Box .el-empty {
  margin-top: 11%;
}
.SuspectorInformationQuery .page3 .page3Box .listTop {
  background: rgba(255, 255, 255, 0.4);
  padding: 10px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  color: rgba(0, 0, 0, 0.5);
  text-shadow: 1px 1px 3px rgb(255 255 255 / 70%);
  font-weight: bold;
  font-size: 22px;
}
.SuspectorInformationQuery .page3 .page3Box .listTop > span,
.SuspectorInformationQuery .page3 .page3Box .list > span {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}
.SuspectorInformationQuery .page3 .page3Box .list {
  color: rgba(0, 0, 0, 0.5);
  font-weight: bold;
  font-size: 20px;
  margin: 10px 10px 0 10px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  transition: 0.5s;
}
.SuspectorInformationQuery .page3 .page3Box .list:hover {
  background: rgba(255, 255, 255, 0.2);
}
.SuspectorInformationQuery .page3 .list .suc {
  display: flex;
  justify-content: center;
  align-items: center;
  color: rgba(98, 203, 68, 0.9);
}
.SuspectorInformationQuery .page3 .list .suc > span {
  background: rgba(98, 203, 68, 0.9);
  width: 10px;
  height: 10px;
  border-radius: 50%;
  margin-right: 7px;
}
.SuspectorInformationQuery .page3 .list .err {
  display: flex;
  justify-content: center;
  align-items: center;
  color: rgba(235, 90, 86, 1);
}
.SuspectorInformationQuery .page3 .list .err > span {
  background: rgba(235, 90, 86, 0.9);
  width: 10px;
  height: 10px;
  border-radius: 50%;
  margin-right: 7px;
}
.SuspectorInformationQuery .page3 .page3Box .listTop > span:nth-child(2),
.SuspectorInformationQuery .page3 .page3Box .list > span:nth-child(2) {
  flex: 3;
}
.SuspectorInformationQuery .page3 .page3Box .listTop > span:nth-child(4),
.SuspectorInformationQuery .page3 .page3Box .list > span:nth-child(4) {
  flex: 2;
}
.SuspectorInformationQuery .page3 .page3Box .list > span:nth-child(4) {
  display: flex;
  justify-content: center;
  align-content: center;
}
.SuspectorInformationQuery .page3 .page3Box .list > span:nth-child(4) > span {
  width: 70px;
  height: 35px;
  text-align: center;
  line-height: 35px;
  background: rgba(255, 255, 255, 0.3);
  border-radius: 5px;
  font-size: 17px;
  cursor: pointer;
  font-weight: 400;
  transition: 0.4s;
}
.SuspectorInformationQuery
  .page3
  .page3Box
  .list
  > span:nth-child(4)
  > span:hover {
  font-weight: bold;
  background: rgba(255, 255, 255, 0.8);
}
.SuspectorInformationQuery .page3 .page3Box .list > span:nth-child(4) > .l {
  margin-right: 15px;
}
.SuspectorInformationQuery .page3 .page3Box .list > span:nth-child(4) > .del {
  background: rgba(235, 90, 86, 0.8);
  color: rgba(255, 255, 255, 0.8);
}
.SuspectorInformationQuery
  .page3
  .page3Box
  .list
  > span:nth-child(4)
  > .del:hover {
  background: rgba(235, 90, 86, 1);
  color: rgba(255, 255, 255, 1);
}

.SuspectorInformationQuery .page4 {
  width: 100%;
  height: 70px;
  margin: 30px auto 0 auto;
  z-index: 1;
}
.SuspectorInformationQuery .page4 .page4Box {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin: 0 auto;
  width: 80%;
}
.SuspectorInformationQuery .page4 .btn {
  width: 70px;
  height: 35px;
  text-align: center;
  line-height: 35px;
  background: rgba(255, 255, 255, 0.3);
  border-radius: 5px;
  font-size: 17px;
  cursor: pointer;
  font-weight: 400;
  transition: 0.3s;
  color: rgba(0, 0, 0, 0.5);
}
.SuspectorInformationQuery .page4 .btn:hover {
  font-weight: bold;
  background: rgba(255, 255, 255, 0.9);
}
.SuspectorInformationQuery .page4 .info {
  margin: 0 20px;
  color: rgba(0, 0, 0, 0.8);
  font-size: 20px;
}
</style>
