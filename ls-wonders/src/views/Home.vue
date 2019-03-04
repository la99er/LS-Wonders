<template>
  <div class="home">
    <keep-alive>
      <component :is="state" @startGame="startGame($event)" :players="players"></component>
    </keep-alive>
  </div>
</template>

<script>
// @ is an alias to /src
import Configuration from '@/components/Configuration.vue';
import Assignments from '@/components/Assignments.vue';

export default {
  components: {
    Configuration,
    Assignments
  },
  data() {
    return {
      state: 'Configuration',
      players: [],
      wonders: {
        vanilla: [
          'Rhodos',
          'Alexandria',
          'Éphesos',
          'Babylon',
          'Olympia',
          'Halikarnassos',
          'Gizeh'
        ],
        wonderPack: [
          'Stonehenge',
          'Manneken Pis',
          'The Great Wall',
          'Abu Simbel'
        ],
        leaders: [
          'Rom'
        ],
        cities: [
          'Petra',
          'Byzantium'
        ],
        played: []
      }
    }
  },
  methods: {
    startGame(game) {
      this.wonders.played = this.wonders.vanilla;
      
      if (game.extensions.wonderPack) {
        this.addWonders(this.wonders.wonderPack);
      }
      if (game.extensions.leaders) {
        this.addWonders(this.wonders.leaders);
      }
      if (game.extensions.cities) {
        this.addWonders(this.wonders.cities);
      }
      this.assignWonders(game.players, game.easy);
      this.state = 'Assignments'
    },
    addWonders(wonders) {
      this.wonders.played = this.wonders.played.concat(wonders);
    },
    assignWonders(players, easy) {
      // Assign a wonder to each player
      let _vm = this;
      let _side = 'A';
      for (var wonders=[],i=0;i<this.wonders.played.length;++i) wonders[i]=_vm.wonders.played[i];
      wonders = this.shuffle(wonders);
      wonders = wonders.slice(0,players.length);
      players.forEach((player, i) => {
        if (!easy) {
          _side = Math.round(Math.random()) ? 'A' : 'B';
        }
        this.players.push({
          name: player,
          wonder: wonders[i],
          side: _side
        });
      });
    },
    shuffle(array) {
      var tmp, current, top = array.length;
      if(top) while(--top) {
        current = Math.floor(Math.random() * (top + 1));
        tmp = array[current];
        array[current] = array[top];
        array[top] = tmp;
      }
      return array;
    }
  },
}
</script>

<style lang="scss" scoped>
</style>
