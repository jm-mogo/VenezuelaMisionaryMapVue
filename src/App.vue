<script setup lang="ts">
import { ref, computed } from "vue";
import type { Church, State } from "./types";
import statesData from "./states.json";

// Import all components
import MapComponent from "./components/MapComponent.vue";
import ModalComponent from "./components/ModalComponent.vue";
import ChurchCard from "./components/ChurchCard.vue";
import MultiChurchList from "./components/MultiChurchList.vue";
import StatsBox from "./components/StatsBox.vue";

// --- State Management ---
// State for the Church Modal
const isChurchModalOpen = ref(false);
const selectedState = ref<State | null>(null);
const displayedChurch = ref<Church | null>(null);

// NEW: State for the "About" Modal
const isAboutModalOpen = ref(false);

// --- Event Handlers for Church Modal ---
const handleMarkerClick = (state: State) => {
	selectedState.value = state;
	if (!state.multiChurchState) {
		displayedChurch.value = state as Church;
	}
	isChurchModalOpen.value = true;
};

const handleChurchSelection = (church: Church) => {
	displayedChurch.value = church;
};

const handleGoBack = () => {
	displayedChurch.value = null;
};

const handleCloseChurchModal = () => {
	isChurchModalOpen.value = false;
	selectedState.value = null;
	displayedChurch.value = null;
};

// --- Statistics Calculation ---
const totalRegions = computed(() => statesData.length);
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
			<h1>Mapa Misionero de Venezuela</h1>

			<!-- NEW: "About" Button in the header -->
			<button
				@click="isAboutModalOpen = true"
				class="about-button"
				title="Acerca de este proyecto"
			>
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
			<MapComponent @marker-click="handleMarkerClick" />
			<StatsBox
				:total-states="totalRegions"
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

		<!-- NEW: "About" Project Modal -->
		<ModalComponent
			:isOpen="isAboutModalOpen"
			@close="isAboutModalOpen = false"
		>
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
/* ... body, .app-container styles ... */
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

/* --- Updated Header Style --- */
header {
	display: flex; /* Use flexbox to align title and button */
	justify-content: space-between;
	align-items: center;
	padding: 0.8rem 1.5rem;
	background-color: white;
	box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
	z-index: 10;
	flex-shrink: 0;
}

h1 {
	margin: 0;
	font-size: 1.5rem; /* Slightly smaller to fit button */
	color: #333;
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

/* ... back-button styles ... */
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

/* --- NEW: "About" Modal Content Styles --- */
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
/* REMOVE THESE STYLES */
.developer-intro {
	text-align: center;
	margin-bottom: 1.5rem;
}
.developer-intro p {
	margin: 0;
	font-size: 1rem;
	color: #6c757d;
}
.developer-intro h3 {
	margin: 0.25rem 0;
	font-size: 2rem;
	font-weight: 700;
	color: #212529;
}
.developer-bio {
	text-align: center;
	max-width: 450px;
	margin-left: auto;
	margin-right: auto;
}
</style>
