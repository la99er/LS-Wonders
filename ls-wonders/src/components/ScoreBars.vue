<template>
  <div class="scores">
    <div class="bar-container" v-for="n in 12" :key="n" :class="`field-${n}`">
      <span :id="`score-${id}-${n}`" :class="`score score-${n}`">0</span>
      <div :id="`bar-${id}-${n}`" :class="`bar bar-${n}`"></div>
      <div :class="`icon img-${n}`"></div>
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
        };
      }
    },
    id: {
      type: Number
    },
    max: {
      type: Number
    }
  },
  mounted() {
    let index = 1;
    for (let score in this.scores) {
      const height = Math.min(this.scores[score] / this.max, 1) * factor * 100;
      document.getElementById(
        `bar-${this.id}-${index}`
      ).style = `height: ${Math.max(height, 1)}%;`;
      document.getElementById(
        `score-${this.id}-${index++}`
      ).textContent = this.scores[score];
    }
  },
  computed: {
    maxValue() {
      const o = Object.keys(this.scores).reduce((a, b) =>
        this.scores[a] > this.scores[b] ? a : b
      );
      return this.scores[o];
    }
  }
};
</script>

<style lang="scss" scoped>
$colors: (
  war: #902727,
  see: #31b1b1,
  babel: #d1d689,
  money: #ffd66e,
  wonder: #e4a972,
  prophane: #244599,
  market: #eec800,
  science: #458f44,
  guild: #612eb4,
  island: #86bc6c,
  leader: #bdbdbd,
  black-card: #2d2d2d
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
    $icon-list: war seewar babel coin pyramid blue-card yellow-card green-card
      purple-card islands leaders black-card;
    @each $icon in $icon-list {
      $i: index($icon-list, $icon);
      .img-#{$i} {
        background-image: url("../assets/icons/#{$icon}.png");
      }
    }

    // Set the colors of the bars.
    $colors-list: war see babel money wonder prophane market science guild
      island leader black-card;
    @each $current-color in $colors-list {
      $i: index($colors-list, $current-color);
      .bar-#{$i} {
        background-color: color($current-color);
      }
    }
  }
}
</style>