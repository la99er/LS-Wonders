<template>
  <div class="scores">
    <div class="bar-container" v-for="n in 11" :key="n">
      <span :id="`score-${n}`" class="score">0</span>
      <div :id="`bar-${n}`" class="bar"></div>
      <div :id="`img-${n}`" class="icon"></div>
    </div>
  </div>
</template>

<script>
  const factor = 0.55;
  
  export default {
    props: {
      scores: {
        type: Object,
        default: function() {
          return {
            war: 10,
            seeWar: 5,
            money: 1,
            wonders: 5,
            profane: 3,
            markets: 2,
            science: 12,
            guild: 1,
            islands: 8,
            leaders: 20,
            blackCards: 15
          }
        }
      },
      maxValue: {
        type: Number,
        default: 20
      }
    },
    mounted() {
      let index = 1;
      for (let score in this.scores) {
        const height = Math.min((this.scores[score] / this.maxValue), 1) * factor * 100;
        document.getElementById(`bar-${index}`).style = `height: ${Math.max(height, 1)}%;`;
        document.getElementById(`score-${index++}`).textContent = this.scores[score];
      };
    }
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
  black-card: #2D2D2D
);

@function color($color-name) {
  @return map-get($colors, $color-name);
}

.scores {
  width: 70%;
  display: flex;
  justify-content: start;
  text-align: center;
  padding: 4px;
  
  .bar-container {
    width: 8%;
    display: flex;
    flex-direction: column;
    justify-content: end;
    align-items: center;
    .score {
      font-size: 10px;
    }
    .bar {
      transition: all 1s;
      width: 40%;
      height: 1%; // from 1% to 55%. 55% is 100%
      margin: 0 auto;
    }

    .icon {
      display: inline-block;
      margin-top: 2px;
      height: 20%;
      width: 15px;
      background-size: contain;
      background-repeat: no-repeat;
      background-position: center;
    }

    // Set icons to the bars
    $icon-list: war seewar coin pyramid blue-card yellow-card green-card purple-card islands leaders black-card;
    @each $icon in $icon-list {
      $i: index($icon-list, $icon);
      #img-#{$i} {
        background-image: url('../assets/icons/#{$icon}.png');
      }
    }

    // Set the colors of the bars.
    $colors-list: war see money wonder prophane market science guild island leader black-card;
    @each $current-color in $colors-list {
      $i: index($colors-list, $current-color);
      #bar-#{$i} {
        background-color: color($current-color);
      }
    }
  }
  
}
</style>