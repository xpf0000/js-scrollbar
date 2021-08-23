<template>
  <div id="app">
    <input v-model="height">
    <div class="a" v-if="show" v-scrollbar="{ xy: 'xy', offsetY: 100 }">
      <div class="b" :style="'height:'+height+'px'">
        <div class="c" @click="a += 1">
          <div v-for="i in 1000" class="cccc">
            <img :src="i % 2 === 0 ? img0 : img1" />
          </div>
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
      img0: require('./256x256.png'),
      img1: require('./screen1.gif'),
      height: 200,
      show: true,
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
    width: 800px;
    height: 80%;
    background: #accdef;
    overflow: auto;
    margin-top: 100px;
    margin-left: 100px;
    padding: 30px;

    .b {
      width: 80%;
      background: #fd9b35;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 50px;
      padding: 40px;

      .c {
        display: flex;
        font-size: 50px;
        width: 100%;
        height: 100%;
        background: #308c59;
        flex-wrap: wrap;

        .cccc {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 300px;
          height: 300px;
          flex-shrink: 0;

          img {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }
        }
      }
    }
  }

  .x-scroll-bar-x {
    height: 50px;
  }
  .x-scroll-bar-y {
    width: 50px;
  }
</style>
