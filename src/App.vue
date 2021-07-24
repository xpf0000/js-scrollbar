<template>
  <div id="app">
    <input v-model="height">
    <div class="a" v-scrollbar="{ xy: 'xy', offsetY: 100 }">
      <div class="b" :style="'height:'+height+'px'">
        <div class="c" @click="a += 1">
          {{ a }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { XScrollBar } from "./index";

export default {
  name: 'app',
  components:{},
  data () {
    return {
      height: 2000,
      show: false,
      a: 0,
      presetLine: [],
      visible: true
    }
  },
  watch: {
    visible(val) {
      console.log(val)
    }
  },
  created() {
    XScrollBar(document.documentElement, {
      offsetX: 30,
      offsetY: 50,
      className: 'userClassName'
    })
  }
}
</script>

<style lang="scss">
  /**::-webkit-scrollbar {*/
  /*  display: none;*/
  /*}*/
  body {
    height: 400vh;
    width: 200vw;
  }
  #app {
    height: 80vh;
  }
  .a {
    position: relative;
    width: 80%;
    height: 80%;
    background: #accdef;
    overflow: auto;
    margin-top: 100px;
    margin-left: 100px;
    padding: 30px;

    .b {
      width: 80%;
      height: 2000px;
      background: #fd9b35;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 50px;
      padding: 40px;

      .c {
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 50px;
        width: 100%;
        height: 100%;
        background: #308c59;
      }
    }
  }
</style>
