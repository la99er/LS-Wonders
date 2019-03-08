<template>
	<div class="container">
		<h1>Auswertung</h1>
		<nav>
			<div class="icon-container" @click="prev()">
				<fa-icon icon="arrow-left" v-if="state > 0"></fa-icon>
			</div>
			<h3>{{ phases[state] }}</h3>
		</nav>
		<form>
			<div class="form-line" v-for="(player, i) in players" :key="i">
				<span class="label">{{ player }}</span>
				<input type="number" :name="`player${i}`" :id="`player${i}`" v-model="data1[i]" @input="calc(i)">
				<input v-if="state === 5" type="number" :name="`gear${i}`" :id="`gear${i}`" v-model="gears[i]" @input="calc(i)">
				<input v-if="state === 5" type="number" :name="`compass${i}`" :id="`compass${i}`" v-model="compasses[i]" @input="calc(i)">
				<span v-if="state === 5" class="score"> = ({{ score[i] }})</span>
			</div>
			<button class="btn primary" @click.prevent="next()">Next</button>
		</form>
	</div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex';
import Helper from '@/helpers/helper.js';

export default {
	data() {
		return {
			state: 0,
			score: [],
			data1: [],
			gears: [],
			compasses: []
		}
	},
	computed: {
		...mapState({
			players: state => state.game.players
		}),
		...mapGetters([
			'phases',
			'scores'
		])
	},
	methods: {
		next() {
			// TODO: If state == 5, write the correct score to the data
			// Care: The value of the result is data[]
			this.setScore({key: this.state, values: this.data1});
			if (this.state < this.phases.length - 1) {
				this.state++;
				this.data1 = this.scores(this.state);
			} else {
				// All data was entered.
				// Start calculating the score and navigate to the final result page.
			}
		},
		prev() {
			if (this.state > 0) {
				this.state--;
			}
			this.data1 = this.scores(this.state);
		},
		calc(i = 0) {
			if (this.state === 5) {
				this.score[i] = Helper.calculateScience(this.data1[i], this.gears[i], this.compasses[i]);
			}
		},
		...mapActions([
			// Takes an object as argument with the following form:
			// {key: number, values: [numbers]}
			// key is the state of the assignment
			// values is an array of all values in the order or players.
			'setScore'
		])
	}
}
</script>

<style lang="scss" scoped>
.container {
	text-align: center;
}

.score {
	display: inline-block;
}

nav {
	.icon-container {
		height: 30px;
		width: 30px;
		text-align: center;
		line-height: 30px;
		cursor: pointer;
		float: left;
	}	
	h3 {
		margin: 4px 10px;
		display: inline-block;
	}
}
</style>