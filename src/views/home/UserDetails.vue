<template>
  <div class="UserDetails">
    <div class="page1">
      <div class="i" @click="$router.go(-1)">
        <i class="el-icon-top-left"></i>
        <div class="tit">返回</div>
      </div>
    </div>
    <div class="page2">
      {{ $route.params.id }}
    </div>
  </div>
</template>
<style>
.UserDetails {
  padding: 30px;
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