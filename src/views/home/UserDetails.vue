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
        <el-descriptions-item v-if="userInfo.name" label="姓名">{{
          userInfo.name
        }}</el-descriptions-item>
        <el-descriptions-item v-else label="姓名">无数据</el-descriptions-item>
        <el-descriptions-item v-if="userInfo.idCard" label="身份证">{{
          userInfo.idCard
        }}</el-descriptions-item>
        <el-descriptions-item v-else label="身份证"
          >无数据</el-descriptions-item
        >
        <el-descriptions-item v-if="userInfo.name" label="性别">{{
          userInfo.sex
        }}</el-descriptions-item>
        <el-descriptions-item v-else label="性别">无数据</el-descriptions-item>
        <el-descriptions-item v-if="userInfo.name" label="电话">{{
          userInfo.phone
        }}</el-descriptions-item>
        <el-descriptions-item v-else label="电话">无数据</el-descriptions-item>
        <el-descriptions-item label="状态">
          <el-tag
            size="small"
            v-if="
              userInfo.status == '红码' ||
              userInfo.status == '黄码' ||
              userInfo.status == '绿码'
            "
            >{{ userInfo.status }}</el-tag
          >
          <el-tag size="small" v-else>无数据</el-tag>
        </el-descriptions-item>
      </el-descriptions>
    </div>
    <el-empty description="暂无数据" v-if="GetTripList.length < 1"></el-empty>
    <div class="page3">
      <div class="tit">7天行程</div>
      <el-timeline>
        <el-timeline-item
          :timestamp="item.date"
          placement="top"
          v-for="item in GetTripList"
          :key="item.date"
        >
          <el-card>
            <div class="page3List">
              <el-result
                icon="info"
                title="无行程"
                v-if="item.map.length < 1"
              >
              </el-result>
              <el-steps
                :active="item.map.length"
                finish-status="process"
                align-center
              >
                <el-step
                  :title="item2.createTime || '无数据'"
                  :description="item2.city + item2.area || '无数据'"
                  v-for="item2 in item.map"
                  :key="item2.createTime"
                ></el-step>
              </el-steps>
            </div>
          </el-card>
        </el-timeline-item>
      </el-timeline>
    </div>
  </div>
</template>
<script>
import { SelectUserId, GetTripInfo } from "@/api/select/select.js";

export default {
  mounted() {
    this.SelectUserById(this.$route.params.id);
    this.selectTripInfo(this.$route.params.id);
  },
  methods: {
    selectTripInfo(id) {
      GetTripInfo({
        id: id,
        pageNumber: this.page.pageNum,
        size: this.page.pageSize,
        days: this.page.day,
      })
        .then((res) => {
          if (res.code == 200) {
            this.GetTripList = res.data.trip.records;
            this.GetTripList.forEach((item) => {
              item.map.reverse();
            });
          } else {
            this.$notify.error({
              title: "错误",
              message: res.message || res.msg,
            });
          }
        })
        .catch(() => {
          this.$notify.error({
            title: "错误",
            message: "网络错误",
          });
        });
    },
    SelectUserById(id) {
      SelectUserId({ id })
        .then((res) => {
          this.loading.PageLoading = false;
          if (res.code == 200) {
            this.userInfo = res.data.info;
          } else {
            this.loading.PageLoading = false;
            this.$notify.error({
              title: "错误",
              message: res.message || res.msg,
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
  data() {
    return {
      loading: {
        PageLoading: true,
      },
      page: {
        pageNum: 1,
        pageSize: 10,
        day: 7,
      },
      userInfo: {
        name: "",
        phone: "",
        sex: "",
        idCard: "",
        status: "",
      },
      GetTripList: [],
    };
  },
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
  margin-bottom: 30px;
}
.UserDetails .page2 {
  padding: 20px;
  border-radius: 15px;
  background: #f9f9f9;
  box-shadow: 4px 4px 20px rgb(0 0 0 / 10%);
}
.UserDetails .page2 .el-descriptions__body {
  background-color: #f9f9f9;
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
.UserDetails .page3 {
  padding: 20px;
  margin-top: 30px;
  background: #f4f4f5;
  border-radius: 15px;
  box-shadow: 8px 12px 20px rgb(0 0 0 / 10%);
}
.UserDetails .page3 .tit {
  font-size: 16px;
  font-weight: 700;
  margin-bottom: 40px;
  color: #303133;
}
/* .UserDetails .page3 .el-steps {
  height: 600px;
} */
</style>