<template>
	<form>
		<h2>Wähle deine Erweiterungen aus:</h2>
		<div class="form-group check-small">
			<input type="checkbox" id="wonderPack" v-model="game.extensions.wonderPack" >
			<label for="wonderPack">Wonder Pack</label>
		</div>
		<div class="form-group check-small">
			<input type="checkbox" id="leaders" v-model="game.extensions.leaders" >
			<label for="leaders">Leaders</label>
		</div>
		<div class="form-group check-small">
			<input type="checkbox" id="cities" v-model="game.extensions.cities" >
			<label for="cities">Cities</label>
		</div>
		<div class="form-group check-small">
			<input type="checkbox" id="babylon" v-model="game.extensions.babylon" >
			<label for="babylon">Babylon</label>
		</div>
		<hr>
		<h2>Sonstige Einstellungen:</h2>
		<div class="form-group">
			<input type="checkbox" id="easy" v-model="game.easy" >
			<label for="easy">Einfache Variante (A only)</label>
		</div>
		<hr>
		<h2>Gib alle Spielernamen ein:</h2>
		<div class="form-group" v-for="index in playerCount+1" :key="index">
			<label :for="`player${index}`">Spieler {{ index }}:</label>
			<input data-lpignore="true" type="text" :id="`player${index}`" v-model="game.players[index-1]" @change="calc()">
			<button class="btn delete" v-if="(index > 1 && game.players.length >= index)" @click.prevent="remove(index)">X</button>
		</div>
		<button class="btn primary" v-if="playerCount > 1" @click.prevent="startGame()">Los Geht's!</button>
	</form>
</template>

<script>
	export default {
		data() {
			return {
				ready: false,
				game: {
					extensions: {
						wonderPack: true,
						leaders: true,
						cities: true,
						babylon: false,
					},
					easy: false, // If true, play only with A site
					players: [
					]
				}
			}
		},
		computed: {
			playerCount() {
				return Math.min(7, this.game.players.length+1) - 1;
			}
		},
		methods: {
			calc() {
				this.game.players = this.game.players.filter(p => p != "");
			},
			remove(index) {
				console.log(index);
				this.game.players.splice(index-1, 1);
			},
			startGame() {
				this.$emit('startGame', this.game);
			}
		},
	}
</script>

<style lang="scss" scoped>

</style>