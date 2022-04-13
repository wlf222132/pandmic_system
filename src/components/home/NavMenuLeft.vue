<template>
  <div class="NavMenuLeft nav">
    <div class="btn">
      <div class="btnItem"></div>
      <div class="btnItem"></div>
      <div class="btnItem"></div>
    </div>
    <div class="icon">
      <div class="iconImg">
        <img src="@/assets/img/home/index/userimg.jpg" alt="" />
      </div>
      <div class="iconCon">
        <p>{{ this.$user.type }}</p>
        <h2>{{ this.$user.userName }}</h2>
      </div>
    </div>
    <div class="line"></div>
    <div class="title">
      <p>信息统计</p>
    </div>
    <div class="menu">
      <div
        class="item"
        v-for="item in statisticsList"
        :key="item.id"
        @click="routerUrl(item.path)"
      >
        <div class="light"></div>
        <div class="licon">
          <i class="iconfont" :class="item.i"></i>
        </div>
        <div class="con">{{ item.name }}</div>
        <div class="ricon"></div>
      </div>
    </div>
    <div class="line"></div>
    <div class="title">
      <p>信息查询</p>
    </div>
    <div class="menu">
      <div
        class="item"
        v-for="item in apiList"
        :key="item.id"
        @click="routerUrl(item.path)"
      >
        <div class="light"></div>
        <div class="licon">
          <i class="iconfont" :class="item.i"></i>
        </div>
        <div class="con">{{ item.name }}</div>
        <div class="ricon"></div>
      </div>
    </div>
    <div class="line"></div>
    <div class="title">
      <p>用户功能</p>
    </div>
    <div class="serve">
      <div
        class="item"
        v-for="item in userFeaturesList"
        :key="item.id"
        @click="routerUrl(item.path)"
      >
        <div class="light"></div>
        <div class="licon">
          <i class="iconfont" :class="item.i"></i>
        </div>
        <div class="con">{{ item.name }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    routerUrl(url) {
      if (url == "/login") {
        this.$confirm("是否确定退出系统？", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
          .then(() => {
            this.$user.userId = null;
            this.$user.email = null;
            this.$user.userName = null;
            window.sessionStorage.removeItem('token');
            this.$router.push(url);
          })
          .catch(() => {
            return;
          });
      } else {
        this.$router.push(url);
      }
    },
  },
  data() {
    return {
      statisticsList: [
        //信息统计
        {
          id: "1",
          name: "首页",
          path: "/index",
          i: "el-icon-house",
        },
        {
          id: "2",
          name: "实时疫情",
          path: "/RealTimeRiskArea",
          i: "el-icon-pie-chart",
        },
      ],
      apiList: [
        //信息查询
        {
          id: "1",
          name: "实时监控",
          path: "/vido",
          i: "el-icon-full-screen",
        },
        {
          id: "2",
          name: "用户信息管理",
          path: "/UserInfo",
          i: "el-icon-user",
        },
        {
          id: "3",
          name: "异常人员信息查询",
          path: "/SuspectorInformationQuery",
          i: "el-icon-search",
        },
      ],
      userFeaturesList: [
        //用户功能
        {
          id: "1",
          name: "退出",
          path: "/login",
          i: "el-icon-switch-button",
        },
      ],
    };
  },
};
</script>

<style scoped>
.nav {
  width: 110px;
  /* width: 280px; */
  height: calc(100% - 60px);
  background: rgba(0, 0, 0, 0.8);
  border-radius: 20px;
  transition: 0.5s;
  overflow: hidden;
  color: rgba(255, 255, 255, 0.6);
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  margin-left: 30px;
}
.nav:hover {
  width: 280px;
  color: #fff;
}
.btn {
  width: 60px;
  height: 10px;
  display: flex;
  justify-content: space-around;
  margin-left: 25px;
  margin-top: 25px;
}
.btnItem {
  width: 10px;
  height: 10px;
  border-radius: 50%;
}
.btnItem:nth-child(1) {
  background: #eb5a56;
}
.btnItem:nth-child(2) {
  background: #f8bc33;
}
.btnItem:nth-child(3) {
  background: #62cb44;
}
.icon {
  width: 250px;
  height: 60px;
  margin-left: 25px;
  margin-top: 20px;
  display: flex;
}
.iconImg {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  border: 4px solid rgba(255, 255, 255, 0.3);
  overflow: hidden;
}
.iconImg img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
}
.iconCon {
  height: 60px;
  margin-left: 25px;
}
.iconCon p {
  padding-top: 5px;
}
.iconCon h2 {
  font-weight: 400;
}
.line {
  width: 60px;
  height: 1px;
  background: rgba(245, 252, 255, 0.5);
  margin: 20px 25px;
  transition: 0.5s;
}
.nav:hover .line {
  width: 230px;
}
.title {
  width: 60px;
  margin-left: 25px;
  margin-bottom: 20px;
}
.title p {
  font-size: 14px;
}
.menu {
  width: 230px;
  margin-left: 25px;
}
.item {
  display: flex;
  position: relative;
  transition: 0.5s;
  border-radius: 6px;
  cursor: pointer;
}
.item:hover {
  background: rgba(255, 255, 255, 0.1);
}
.licon {
  width: 60px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.con {
  width: 0px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: 0.5s;
  overflow: hidden;
  position: relative;
  left: -20px;
  opacity: 0;
  white-space: nowrap;
}
.nav:hover .con {
  width: 160px;
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 1;
}
.iconfont {
  font-size: 26px;
}
.light {
  width: 6px;
  height: 50px;
  background: #4f5cef;
  position: absolute;
  left: -25px;
  transition: 0.5s;
  border-top-right-radius: 4px;
  border-bottom-right-radius: 4px;
  opacity: 0;
}
.item:hover .light {
  opacity: 1;
}
.serve {
  width: 60px;
  background: rgba(0, 0, 0, 0.7);
  margin-left: 25px;
  border-radius: 10px;
  overflow: hidden;
  transition: 0.5s;
}
.nav:hover .serve {
  width: 230px;
}
</style>