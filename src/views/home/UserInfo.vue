<template>
  <div class="UserInfo">
    <!-- 用户编辑 -->
    <el-dialog
      :title="thisUserInfo.tit"
      :visible.sync="dialogFormVisibleUserInfo"
    >
      <el-form :model="thisUserInfo">
        <el-form-item label="姓名">
          <el-input v-model="thisUserInfo.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="身份证">
          <el-input v-model="thisUserInfo.uid" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisibleUserInfo = false">取 消</el-button>
        <el-button type="primary" @click="changeUser(thisUserInfo.tit)"
          >确 定</el-button
        >
      </div>
    </el-dialog>

    <div class="style1"></div>
    <div class="style2"></div>
    <div class="page1">
      <div class="tit">用户信息管理</div>
      <el-tooltip
        class="item"
        effect="dark"
        content="添加用户"
        placement="bottom"
      >
        <div class="add" @click="editAddUser()">
          <i class="el-icon-plus"></i>
        </div>
      </el-tooltip>

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
    <div class="page2">
      <div class="page2Box" v-loading="loading.page2BoxLoading">
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
          <span v-if="item.code == '正常'" class="suc">
            <span></span>
            {{ item.code }}
          </span>
          <span v-else class="err">
            <span></span>
            {{ item.code }}
          </span>
          <span>
            <span class="l" @click="editUserInfo(item.id, item.name, item.uid)"
              >编辑</span
            >
            <span
              class="l"
              @click="$router.push({ path: `/UserDetails/${item.id}` })"
              >详情</span
            >
            <span class="del" @click="delUser(item.id, item.name)">删除</span>
          </span>
        </div>
      </div>
    </div>
    <div class="page3">
      <div class="page3Box">
        <span class="btn">上一页</span>
        <span class="info">第{{ page.pageNum }}页/共{{ page.pageMax }}页</span>
        <span class="btn">下一页</span>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  methods: {
    editAddUser() {
      this.thisUserInfo.id = null;
      this.thisUserInfo.name = null;
      this.thisUserInfo.uid = null;
      this.thisUserInfo.tit = "添加用户";
      this.dialogFormVisibleUserInfo = true;
    },
    editUserInfo(id, name, uid) {
      this.thisUserInfo.id = id;
      this.thisUserInfo.name = name;
      this.thisUserInfo.uid = uid;
      this.thisUserInfo.tit = "用户信息编辑";
      this.dialogFormVisibleUserInfo = true;
    },
    changeUser(tit) {
      if (this.thisUserInfo.name == null || this.thisUserInfo.name == "") {
        this.$notify.error({
          title: "错误",
          message: "名字不能为空",
        });
      } else if (this.thisUserInfo.uid == null || this.thisUserInfo.uid == "") {
        this.$notify.error({
          title: "错误",
          message: "身份证不能为空",
        });
      } else {
        this.dialogFormVisibleUserInfo = false;
        if (tit == "用户信息编辑") {
          this.updateUser();
        } else {
          this.addUser();
        }
      }
    },
    updateUser() {
      //更改用户信息
      this.loading.page2BoxLoading = true;

      setTimeout(() => {
        this.loading.page2BoxLoading = false;
        this.$notify.success({
          title: "提示",
          message: "用户信息更新成功",
        });
      }, 1000);
    },
    addUser() {
      //添加用户信息
      this.loading.page2BoxLoading = true;

      setTimeout(() => {
        this.loading.page2BoxLoading = false;
        this.$notify.success({
          title: "提示",
          message: "用户信息删除成功",
        });
      }, 1000);
    },
    searchUser() {
      //查询用户信息
      this.loading.page2BoxLoading = true;

      setTimeout(() => {
        this.loading.page2BoxLoading = false;
        this.$notify.success({
          title: "提示",
          message: "用户信息查询成功",
        });
      }, 1000);
    },
    delUser(id, name) {
      //删除用户信息

      id;
      this.$confirm(`是否删除${name}?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.loading.page2BoxLoading = true;

          setTimeout(() => {
            this.loading.page2BoxLoading = false;
            this.$notify.success({
              title: "提示",
              message: "用户信息添加成功",
            });
          }, 1000);
          return;
        })
        .catch(() => {
          return;
        });
    },
  },
  data() {
    return {
      dialogFormVisibleUserInfo: false,
      loading: {
        page2BoxLoading: false,
        dialog: false,
      },
      searchText: null,
      thisUserInfo: {
        tit: null,
        id: null,
        name: null,
        uid: null,
      },
      page: {
        pageSize: 10,
        pageNum: 1,
        pageMax: 8,
      },
      userlist: [
        //用户信息列表
        {
          id: 1,
          name: "张三",
          uid: "500105200104291222",
          code: "正常",
        },
        {
          id: 2,
          name: "李四",
          uid: "500105200004291215",
          code: "异常",
        },
        {
          id: 3,
          name: "王五",
          uid: "500105200004291215",
          code: "异常",
        },
        {
          id: 4,
          name: "张三",
          uid: "500105200004291215",
          code: "正常",
        },
        {
          id: 5,
          name: "张三",
          uid: "500105200004291215",
          code: "正常",
        },
        {
          id: 6,
          name: "张三",
          uid: "500105200004291215",
          code: "正常",
        },
        {
          id: 7,
          name: "张三",
          uid: "500105200004291215",
          code: "正常",
        },
        {
          id: 8,
          name: "张三",
          uid: "500105200004291215",
          code: "异常",
        },
        {
          id: 9,
          name: "张三",
          uid: "500105200004291215",
          code: "正常",
        },
        {
          id: 10,
          name: "张三",
          uid: "500105200004291215",
          code: "正常",
        },
      ],
    };
  },
};
</script>

<style>
.UserInfo {
  position: relative;
  padding: 30px;
  height: 100%;
  box-sizing: border-box;
  overflow: hidden;
  background: linear-gradient(90deg, #fc466b 0%, #3f5efb 100%);
}
.UserInfo .el-form-item {
  display: flex;
  justify-content: center;
  align-items: center;
}
.UserInfo .el-input {
  width: 260px;
}
.UserInfo .el-dialog {
  max-width: 580px;
}
.UserInfo .el-form-item__label {
  width: 70px;
  text-align: center;
}
.UserInfo .style1 {
  width: 200px;
  height: 200px;
  border-radius: 50%;
  background-color: #77fdd7;
  position: absolute;
  top: 90px;
  right: 6%;
}
.UserInfo .style2 {
  width: 400px;
  height: 400px;
  border-radius: 50%;
  background-color: rgb(240, 160, 0);
  position: absolute;
  bottom: 40px;
  left: 5%;
}
.UserInfo .page1 {
  position: relative;
  width: 80%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin: 0 auto 20px auto;
}
.UserInfo .page1 .tit {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  width: 220px;
  z-index: 99;
  color: rgba(255, 255, 255, 0.8);
  font-weight: bold;
  font-size: 27px;
  letter-spacing: 6px;
  border-bottom: 2px solid rgba(255, 255, 255, 0.8);
  padding-bottom: 15px;
  text-align: center;
  transition: 0.5s;
  animation: flipInX 1s 0.2s linear 1 normal both;
}
.UserInfo .page1 .add {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #f74e13;
  font-weight: bold;
  cursor: pointer;
  margin-right: 20px;
}
.UserInfo .page1 .tit:hover {
  color: #fff;
  border-bottom: 2px solid #fff;
}
.UserInfo .page1 > .text {
  width: 300px;
  height: 50px;
  background: #2e3642;
  border-radius: 25px;
  overflow: hidden;
  display: flex;
  align-items: center;
  box-shadow: 10px 10px 10px rgba(0, 0, 0, 0.1);
}
.UserInfo .page1 > .text .inp {
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
.UserInfo .page1 > .text .btn {
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
.UserInfo .page2 {
  display: flex;
  justify-content: center;
  align-items: center;
  height: calc(100% - 170px);
}
.UserInfo .page2 .page2Box {
  width: 80%;
  height: calc(100% - 30px);
  margin: 30px auto 0 auto;
  overflow: hidden;
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
.UserInfo .page2 .page2Box > div {
  max-height: 9.09%;
  flex: 1;
}
.UserInfo .page2 .page2Box .el-loading-mask {
  max-height: 100%;
}
.UserInfo .page2 .page2Box .el-empty {
  margin-top: 11%;
}
.UserInfo .page2 .page2Box .listTop {
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
.UserInfo .page2 .page2Box .listTop > span,
.UserInfo .page2 .page2Box .list > span {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}
.UserInfo .page2 .page2Box .list {
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
.UserInfo .page2 .page2Box .list:hover {
  background: rgba(255, 255, 255, 0.2);
}
.UserInfo .page2 .list .suc {
  display: flex;
  justify-content: center;
  align-items: center;
  color: rgba(98, 203, 68, 0.9);
}
.UserInfo .page2 .list .suc > span {
  background: rgba(98, 203, 68, 0.9);
  width: 10px;
  height: 10px;
  border-radius: 50%;
  margin-right: 7px;
}
.UserInfo .page2 .list .err {
  display: flex;
  justify-content: center;
  align-items: center;
  color: rgba(235, 90, 86, 1);
}
.UserInfo .page2 .list .err > span {
  background: rgba(235, 90, 86, 0.9);
  width: 10px;
  height: 10px;
  border-radius: 50%;
  margin-right: 7px;
}
.UserInfo .page2 .page2Box .listTop > span:nth-child(2),
.UserInfo .page2 .page2Box .list > span:nth-child(2) {
  flex: 3;
}
.UserInfo .page2 .page2Box .listTop > span:nth-child(4),
.UserInfo .page2 .page2Box .list > span:nth-child(4) {
  flex: 2;
}
.UserInfo .page2 .page2Box .list > span:nth-child(4) {
  display: flex;
  justify-content: center;
  align-content: center;
}
.UserInfo .page2 .page2Box .list > span:nth-child(4) > span {
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
.UserInfo .page2 .page2Box .list > span:nth-child(4) > span:hover {
  font-weight: bold;
  background: rgba(255, 255, 255, 0.8);
}
.UserInfo .page2 .page2Box .list > span:nth-child(4) > .l {
  margin-right: 15px;
}
.UserInfo .page2 .page2Box .list > span:nth-child(4) > .del {
  background: rgba(235, 90, 86, 0.8);
  color: rgba(255, 255, 255, 0.8);
}
.UserInfo .page2 .page2Box .list > span:nth-child(4) > .del:hover {
  background: rgba(235, 90, 86, 1);
  color: rgba(255, 255, 255, 1);
}
.UserInfo .page3 {
  height: 100px;
}
.UserInfo .page3 .page3Box {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin: 30px auto 0 auto;
  width: 80%;
}
.UserInfo .page3 .btn {
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
.UserInfo .page3 .btn:hover {
  font-weight: bold;
  background: rgba(255, 255, 255, 0.9);
}
.UserInfo .page3 .info {
  margin: 0 20px;
  color: rgba(0, 0, 0, 0.8);
  font-size: 20px;
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
</style>