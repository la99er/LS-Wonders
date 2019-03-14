<template>
  <div class="scores">
    <div class="bar-container" v-for="n in 10" :key="n">
      <span class="score">99</span>
      <div class="bar"></div>
      <img src="" :id="`img${n}`">
    </div>
  </div>
</template>

<script>
  export default {
    
  }
</script>

<style lang="scss" scoped>
$colors: (
  war: #902727,
  see: #31B1B1,
  money: #FFD66E,
  wonder: #E4A972,
  prophane: #244599,
  market: #EEC800,
  science: #458F44,
  guild: #612EB4,
  island: #86BC6C,
  leader: #BDBDBD,
  blackCards: #2D2D2D
);

@function color($color-name) {
  @return map-get($colors, $color-name);
}

.scores {
  width: 70%;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  text-align: center;
  
  .bar-container {
    background-color: color(war);
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
      height: 12px;
      background-image: url("./assets/icons/war.png");
    }

    .img1 {
      src: url('../assets/icons/war.png')
    }

  }
  
}
</style>