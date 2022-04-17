<template>
  <div class="home">
    <el-container>
      <el-header class="homeHeader">
        <NavMenuTop />
      </el-header>
      <el-container>
        <el-aside
          class="homeAside"
          :style="asideW"
          @mouseover="mouseOverAside"
          @mouseleave="mouseLeaveAside"
        >
          <NavMenuLeft />
        </el-aside>
        <el-main class="homeMain">
          <!-- <transition name="el-fade-in-linear"> -->
            <router-view />
          <!-- </transition> -->
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import NavMenuTop from "@/components/home/NavMenuTop.vue";
import NavMenuLeft from "@/components/home/NavMenuLeft.vue";
export default {
  name: "Home",
  components: {
    NavMenuTop,
    NavMenuLeft,
  },
  data() {
    return {
      asideW: 'width:"140px"',
    };
  },
  methods: {
    mouseOverAside() {
      this.asideW = 'width:"310px"';
    },
    mouseLeaveAside() {
      this.asideW = 'width:"140px"';
    },
  },
  watch: {
    $route: function () {
      document.querySelector('.homeMain').scrollTop = 0;
    },
  },

};
</script>
<style>
.homeHeader {
  padding: 0;
}
.homeAside {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  transition: 0.5s;
  height: calc(100vh - 60px);
}
.homeMain {
  padding: 0;
  height: calc(100vh - 120px);
  margin: 30px;
  border-radius: 12px;
  box-shadow: 20px 20px 50px rgb(0 0 0 / 50%);
  transition: 0.5s;
  background: #fff;
  position: relative;
}
::-webkit-scrollbar {
  display: none;
}
</style>