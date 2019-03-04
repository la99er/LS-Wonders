<template>
	<div class="container">
		<h1>Auswertung</h1>
		<nav>
			<div class="icon-container" @click="decrease()">
				<fa-icon icon="arrow-left" v-if="state > 0"></fa-icon>
			</div>
			<h3>{{ phases[state] }}</h3>
			<div class="icon-container" @click="increase()">
				<fa-icon icon="arrow-right" v-if="state < phases.length - 1"></fa-icon>
			</div>
		</nav>
		<form>
			<div class="form-line" v-for="(player, i) in players" :key="i">
				<label :for="`player${i}`">{{ player }}</label>
				<input type="number" :name="`player${i}`" :id="`player${i}`">
			</div>
			<button class="btn primary" @click.prevent="increase()">Next</button>
		</form>
	</div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';

export default {
	data() {
		return {
			state: 0
		}
	},
	computed: {
		...mapState({
			players: state => state.game.players
		}),
		...mapGetters([
			'phases'
		])
	},
	methods: {
		increase() {
			if (this.state < this.phases.length - 1) {
				this.state++;
			}
		},
		decrease() {
			if (this.state > 0) {
				this.state--;
			}
		}
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