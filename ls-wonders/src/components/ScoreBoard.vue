<template>
  <div class="board">
    <div class="header inner">
      <h4 class="name">Lars</h4>
      <h5 class="wonder">Abu Simbel (A)</h5>
    </div>
    <div class="content inner">
      <score-bars />
      <div class="total">
        <h5>Total</h5>
        <h5>74</h5>
      </div>
    </div>
  </div>
</template>

<script>
import ScoreBars from '@/components/ScoreBars.vue'

export default {
  components: {
    ScoreBars
  },
}
</script>

<style lang="scss" scoped>
.board {
  color: white;
  background-color: rgba($color: #55534c, $alpha: 0.8);
  display: flex;
  flex-direction: column;

  .header {
    .name {
      margin: 8px 15px;
      font-size: 1.5em;
    }
    .wonder {
      margin: auto 10px;
    }
  }

  .content {
    .total {
      margin: 0 10px 10px 10px;
      background-color: #4d7585;
      width: 50px;
      height: 50px;
      padding: 10px;
      text-align: center;
    }
  }

  .inner {
    display: flex;
    justify-content: space-between;

    h5 {
      margin: 0;
    } 
  }
}
</style>