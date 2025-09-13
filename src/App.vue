<script setup lang="ts">
import { ref, computed } from "vue"; // Import 'computed'
import type { Church, State } from "./types";
import statesData from "./states.json";

// Import all components
import MapComponent from "./components/MapComponent.vue";
import ModalComponent from "./components/ModalComponent.vue";
import ChurchCard from "./components/ChurchCard.vue";
import MultiChurchList from "./components/MultiChurchList.vue";
import StatsBox from "./components/StatsBox.vue"; // Import the new StatsBox

// --- Modal State Management ---
const isModalOpen = ref(false);
const selectedState = ref<State | null>(null);
const displayedChurch = ref<Church | null>(null);

const handleMarkerClick = (state: State) => {
	selectedState.value = state;
	if (!state.multiChurchState) {
		displayedChurch.value = state as Church;
	}
	isModalOpen.value = true;
};

const handleChurchSelection = (church: Church) => {
	displayedChurch.value = church;
};

const handleGoBack = () => {
	displayedChurch.value = null;
};

const handleCloseModal = () => {
	isModalOpen.value = false;
	selectedState.value = null;
	displayedChurch.value = null;
};

// --- Statistics Calculation ---
// Use 'computed' properties so these values are calculated efficiently
const totalRegions = computed(() => statesData.length);

const totalChurches = computed(() => {
	return (statesData as State[]).reduce((count, state) => {
		if (state.multiChurchState && state.churches) {
			return count + state.churches.length;
		}
		return count + 1; // It's a single-church state
	}, 0);
});
</script>

<template>
	<main class="app-container">
		<header>
			<h1>Mapa Misionero de Venezuela</h1>
		</header>

		<!-- The map-wrapper now contains both the map and the stats box -->
		<div class="map-wrapper">
			<MapComponent @marker-click="handleMarkerClick" />
			<StatsBox
				:total-states="totalRegions"
				:total-churches="totalChurches"
			/>
		</div>

		<ModalComponent :isOpen="isModalOpen" @close="handleCloseModal">
			<div v-if="selectedState">
				<div v-if="displayedChurch">
					<button
						@click="handleGoBack"
						class="back-button"
						v-if="selectedState.multiChurchState"
					>
						&larr; Volver a la Lista
					</button>
					<ChurchCard :church="displayedChurch" />
				</div>
				<div v-else-if="selectedState.multiChurchState">
					<MultiChurchList
						:title="selectedState.name"
						:churches="selectedState.churches || []"
						@church-selected="handleChurchSelection"
					/>
				</div>
			</div>
		</ModalComponent>
	</main>
</template>

<style>
/* Reset some default browser styles */
body {
	margin: 0;
	font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
		Helvetica, Arial, sans-serif;
	background-color: #f4f4f9;
}

/* --- Full Screen Layout Styles --- */
.app-container {
	display: flex;
	flex-direction: column;
	height: 100vh;
	overflow: hidden;
}

header {
	padding: 1rem;
	background-color: white;
	box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
	text-align: center;
	z-index: 10;
	flex-shrink: 0;
}

.map-wrapper {
	flex-grow: 1; /* Makes the map area fill all remaining space */
	position: relative; /* Essential for positioning children like the StatsBox */
}
/* --- End Full Screen Layout Styles --- */

h1 {
	margin: 0;
	font-size: 1.8rem;
	color: #333;
}

.back-button {
	background: #f8f8f8;
	border: 1px solid #ddd;
	border-radius: 6px;
	padding: 8px 12px;
	cursor: pointer;
	margin-bottom: 20px;
	display: block;
	font-size: 0.9rem;
	transition: background-color 0.2s;
}
.back-button:hover {
	background-color: #e9e9e9;
}
</style>
