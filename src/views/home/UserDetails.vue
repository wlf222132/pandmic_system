<template>
  <div class="UserDetails" v-loading="loading.pageLoading">
    <div class="page1">
      <div class="i" @click="$router.go(-1)">
        <i class="el-icon-top-left"></i>
        <div class="tit">返回</div>
      </div>
    </div>
    <div class="page2">
      <el-descriptions title="用户信息">
    <el-descriptions-item label="用户名">{{userInfo.name}}</el-descriptions-item>
    <el-descriptions-item label="身份证">{{userInfo.idCard}}</el-descriptions-item>
    <!-- <el-descriptions-item label="手机号">{{userInfo.phone}}</el-descriptions-item>
    <el-descriptions-item label="性别">{{userInfo.sex}}</el-descriptions-item> -->
    <el-descriptions-item label="状态">
      <el-tag size="small" v-if="userInfo.status =='红码'||userInfo.status =='黄码'||userInfo.status =='绿码'">{{userInfo.status}}</el-tag>
      <el-tag size="small" v-else>无数据</el-tag>
    </el-descriptions-item>
    
</el-descriptions>
    </div>
  </div>
</template>
<script>
import { SelectUserId } from "@/api/select/select.js";

export default {
  mounted() {
    this.SelectUserById(this.$route.params.id);
  },
  methods: {
    SelectUserById(id) {
      SelectUserId({ id })
        .then((res) => {
          this.loading.PageLoading = false;
          if(res.code == 200){
            this.userInfo = res.data.info;
          }else{
             this.loading.PageLoading = false;
          this.$notify.error({
            title: "错误",
            message: res.message,
          });
          }
        })
        .catch(() => {
          this.loading.PageLoading = false;
          this.$notify.error({
            title: "错误",
            message: "网络错误",
          });
        });
    },
  },
  data(){
    return{
      loading:{
        PageLoading:true
      },
      userInfo:{
        name:'',
        phone:'',
        sex:'',
        idCard:'',
        status:''
      }
    }
  }
};
</script>

<style>
.UserDetails {
  padding: 30px;
  box-sizing: border-box;
  min-height: 100%;
}
.UserDetails .page1 {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 20px;
}
.UserDetails .page1 .i {
  width: 95px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #2e3642;
  color: #f74e13;
  border-radius: 40px;
  box-shadow: 5px 10px 10px rgba(0, 0, 0, 0.1);
  cursor: pointer;
}
.UserDetails .page1 .i .tit {
  margin-left: 10px;
  color: #fff;
  transform: translateY(-2px);
}
</style>