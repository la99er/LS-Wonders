<template>
	<div class="container">
		<h1>Auswertung</h1>
		<nav>
			<div class="icon-container" @click="prev()">
				<fa-icon icon="arrow-left" v-if="state > 0"></fa-icon>
			</div>
			<h3>{{ phases[state] }}</h3>
			<div class="icon-container" @click="next()">
				<fa-icon icon="arrow-right" v-if="state < phases.length - 1"></fa-icon>
			</div>
		</nav>
		<form>
			<div class="form-line" v-for="(player, i) in players" :key="i">
				<label :for="`player${i}`">{{ player }}</label>
				<input type="number" :name="`player${i}`" :id="`player${i}`" v-model="data[i]">
			</div>
			<button class="btn primary" @click.prevent="next()">Next</button>
		</form>
	</div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex';

export default {
	data() {
		return {
			state: 0,
			data: []
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
			this.setScore({key: this.state, values: this.data});
			if (this.state < this.phases.length - 1) {
				this.state++;
				this.data = this.scores(this.state);
			} else {
				// All data was entered.
				// Start calculating the score and navigate to the final result page.
			}
		},
		prev() {
			if (this.state > 0) {
				this.state--;
			}
			this.data = this.scores(this.state);
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
.icon-container {
	height: 30px;
	width: 30px;
	text-align: center;
	line-height: 30px;
	cursor: pointer;
}


nav {
	display: flex;
	justify-content: space-between;
	align-items: center;
	
	h3 {
		margin: 4px 10px;
	}
}
</style>