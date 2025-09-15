<script setup lang="ts">
import { ref, computed } from "vue";
import type { Church, State, SearchResult } from "./types";
import statesData from "./states.json";

import { inject } from "@vercel/analytics";

inject();

// ... (all other imports)
import MapComponent from "./components/MapComponent.vue";
import ModalComponent from "./components/ModalComponent.vue";
import ChurchCard from "./components/ChurchCard.vue";
import MultiChurchList from "./components/MultiChurchList.vue";
import StatsBox from "./components/StatsBox.vue";
import SearchComponent from "./components/SearchComponent.vue";

// ... (all state management refs)
const isChurchModalOpen = ref(false);
const selectedState = ref<State | null>(null);
const displayedChurch = ref<Church | null>(null);
const isAboutModalOpen = ref(false);
const mapCenter = ref<[number, number]>([8.5238, -66.5897]);
const mapZoom = ref(6);

// ... (all event handlers)
const handleMarkerClick = (state: State) => {
	selectedState.value = state;
	if (!state.multiChurchState) {
		displayedChurch.value = state as Church;
	} else {
		displayedChurch.value = null;
	}
	isChurchModalOpen.value = true;
};

const handleChurchMarkerClick = (payload: { state: State; church: Church }) => {
	selectedState.value = payload.state;
	displayedChurch.value = payload.church;
	isChurchModalOpen.value = true;
};

const handleSearchResultSelected = (result: SearchResult) => {
	selectedState.value = result.state;
	if (result.isRegion) {
		displayedChurch.value = null;
		// mapCenter.value = result.state.latitude;
		// mapZoom.value = 8;
	} else {
		displayedChurch.value = result.church;
		// mapCenter.value = result.church.latitude;
		// mapZoom.value = 10;
	}
	isChurchModalOpen.value = true;
};

const handleChurchSelection = (church: Church) => {
	displayedChurch.value = church;
	mapCenter.value = church.latitude;
	mapZoom.value = 10;
};

const handleGoBack = () => {
	displayedChurch.value = null;
	if (selectedState.value) {
		// mapCenter.value = selectedState.value.latitude;
		// mapZoom.value = 8;
	}
};

const handleCloseChurchModal = () => {
	isChurchModalOpen.value = false;
	selectedState.value = null;
	displayedChurch.value = null;
	// mapCenter.value = [8.5238, -66.5897];
	// mapZoom.value = 6;
};

// --- Statistics Calculation ---
// NEW: Logic to count unique regions
const totalUniqueRegions = computed(() => {
	// Create a Set of all region strings to automatically get unique values
	const uniqueRegions = new Set(
		(statesData as State[]).map((state) => state.region)
	);
	return uniqueRegions.size;
});

const totalChurches = computed(() => {
	return (statesData as State[]).reduce((count, state) => {
		if (state.multiChurchState && state.churches) {
			return count + state.churches.length;
		}
		return count + 1;
	}, 0);
});
</script>

<template>
	<main class="app-container">
		<header>
			<div class="header-left">
				<h1>Mapa Misionero de Venezuela</h1>
				<SearchComponent
					:states="(statesData as State[])"
					@result-selected="handleSearchResultSelected"
				/>
			</div>
			<button
				@click="isAboutModalOpen = true"
				class="about-button"
				title="Acerca de este proyecto"
			>
				<!-- SVG icon -->
				<svg
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 20 20"
					fill="currentColor"
				>
					<path
						fill-rule="evenodd"
						d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
						clip-rule="evenodd"
					/>
				</svg>
			</button>
		</header>

		<div class="map-wrapper">
			<!-- NEW: Added the @church-marker-click listener -->
			<MapComponent
				:center="mapCenter"
				v-model:zoom="mapZoom"
				@marker-click="handleMarkerClick"
				@church-marker-click="handleChurchMarkerClick"
			/>
			<StatsBox
				:total-regions="totalUniqueRegions"
				:total-churches="totalChurches"
			/>
		</div>

		<!-- Church Details Modal -->
		<ModalComponent
			:isOpen="isChurchModalOpen"
			@close="handleCloseChurchModal"
		>
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

		<!-- "About" Project Modal -->
		<ModalComponent
			:isOpen="isAboutModalOpen"
			@close="isAboutModalOpen = false"
		>
			<!-- About modal content -->
			<div class="about-modal-content">
				<h2 class="about-title">Acerca del Proyecto</h2>
				<p class="about-text">
					Este mapa fue creado con el propósito de conectar y dar a
					conocer las iglesias bíblicas bautistas en Venezuela. Es una
					herramienta para miembros, visitantes y cualquiera
					interesado en encontrar una congregación cercana.
				</p>
				<div class="separator"></div>
				<h2 class="about-title">Sobre el Desarrollador</h2>
				<p class="about-text" style="text-align: center">
					¡Hola! Soy <strong>José M. Mogollón</strong>, un
					desarrollador web. Creé este proyecto como una forma de
					aplicar mis habilidades para servir a la comunidad. Siempre
					estoy buscando nuevos desafíos y oportunidades para crecer.
				</p>
				<div class="developer-links">
					<a
						href="https://jm-mogo.github.io/portfolio/"
						target="_blank"
						>Portafolio</a
					>
					<a href="https://github.com/jm-mogo" target="_blank"
						>GitHub</a
					>
					<a href="https://www.instagram.com/j_mogo/" target="_blank"
						>Instagram</a
					>
				</div>
			</div>
		</ModalComponent>
	</main>
</template>

<style>
/* All styles remain the same */
body {
	margin: 0;
	font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
		Helvetica, Arial, sans-serif;
	background-color: #f4f4f9;
}
.app-container {
	display: flex;
	flex-direction: column;
	height: 100vh;
	overflow: hidden;
}
header {
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 0.8rem 1.5rem;
	background-color: white;
	box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
	z-index: 900;
	flex-shrink: 0;
	gap: 20px;
}
.header-left {
	display: flex;
	align-items: center;
	gap: 20px;
	flex-grow: 1;
}
h1 {
	margin: 0;
	font-size: 1.5rem;
	color: #333;
	white-space: nowrap;
}
.about-button {
	background: none;
	border: none;
	cursor: pointer;
	padding: 5px;
	border-radius: 50%;
	display: flex;
	align-items: center;
	justify-content: center;
	flex-shrink: 0;
}
.about-button svg {
	width: 28px;
	height: 28px;
	color: #6c757d;
	transition: color 0.2s;
}
.about-button:hover svg {
	color: #333;
}
.map-wrapper {
	flex-grow: 1;
	position: relative;
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
.about-modal-content {
	font-family: sans-serif;
	color: #333;
}
.about-title {
	font-size: 1.75rem;
	font-weight: 600;
	margin-bottom: 1rem;
	text-align: center;
}
.about-text {
	font-size: 1rem;
	line-height: 1.6;
	color: #4a5568;
	margin-bottom: 1.5rem;
}
.separator {
	height: 1px;
	background-color: #e2e8f0;
	margin: 2rem 0;
}
.developer-links {
	display: flex;
	justify-content: center;
	gap: 1.5rem;
}
.developer-links a {
	color: #3b82f6;
	text-decoration: none;
	font-weight: 500;
	transition: text-decoration 0.2s;
}
.developer-links a:hover {
	text-decoration: underline;
}
@media (max-width: 768px) {
	.header-left {
		flex-direction: column;
		align-items: flex-start;
		gap: 10px;
	}
	h1 {
		font-size: 1.2rem;
	}
	header {
		padding: 0.8rem 1rem;
	}
}
</style>
