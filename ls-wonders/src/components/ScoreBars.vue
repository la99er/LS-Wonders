<template>
  <div class="board">
    <div class="bar-container" v-for="n in 10" :key="n">
      <span class="score">99</span>
      <div class="bar"></div>
      <img src="http://lorempixel.com/20/20/">
    </div>
  </div>
</template>

<script>
  export default {
    
  }
</script>

<style lang="scss" scoped>
.board {
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  text-align: center;
  
  .bar-container {
    width: 8%;
    .score {
      font-size: 10px;
    }
    .bar {
      background: #bc2f2f;
      width: 40%;
      height: 50%;
      margin: 0 auto;
    }

    img {
      height: 8px;
    }
  }
  
}
</style>