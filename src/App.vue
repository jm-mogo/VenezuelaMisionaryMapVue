<script setup lang="ts">
import { ref, computed, watch, onMounted } from "vue";
import type { Church, State, SearchResult } from "./types";
import locationsData from "./locations.json";

import { inject } from "@vercel/analytics";
inject();

import MapComponent from "./components/MapComponent.vue";
import ModalComponent from "./components/ModalComponent.vue";
import ChurchCard from "./components/ChurchCard.vue";
import MultiChurchList from "./components/MultiChurchList.vue";
import StatsBox from "./components/StatsBox.vue";
import SearchComponent from "./components/SearchComponent.vue";
import CountrySelector from "./components/CountrySelector.vue";

const selectedCountry = ref("All");

const countryViews: {
	[key: string]: { center: [number, number]; zoom: number };
} = {
	All: { center: [7.5, -69.5], zoom: 5 },
	Venezuela: { center: [8.5238, -66.5897], zoom: 6 },
	Colombia: { center: [4.60971, -74.08175], zoom: 6 },
};

const isChurchModalOpen = ref(false);
const selectedState = ref<State | null>(null);
const displayedChurch = ref<Church | null>(null);
const isAboutModalOpen = ref(false);
const mapCenter = ref<[number, number]>(countryViews.All.center);
const mapZoom = ref(countryViews.All.zoom);

const availableCountries = computed(() => {
	const countries = new Set(
		(locationsData as State[]).map((loc) => loc.country)
	);
	return ["All", ...Array.from(countries)];
});

// UPDATED: The MASTER reactive data source for all child components
const filteredLocations = computed(() => {
	// Check the environment variable provided by Vercel
	const isFriendsOnlyMode =
		import.meta.env.VITE_FILTER_MODE === "friends_only";

	// First, get all locations
	let locations = locationsData as State[];

	// If the 'friends_only' mode is active, apply the filter
	if (isFriendsOnlyMode) {
		locations = locations.filter((loc) => loc.isFriend);
	}

	// Then, filter by the selected country as before
	if (selectedCountry.value === "All") {
		return locations;
	}
	return locations.filter((loc) => loc.country === selectedCountry.value);
});

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
	} else {
		displayedChurch.value = result.church;
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

const regionOrCountryCount = computed(() => {
	if (selectedCountry.value === "All") {
		const uniqueCountries = new Set(
			filteredLocations.value.map((loc) => loc.country)
		);
		return uniqueCountries.size;
	} else {
		const uniqueRegions = new Set(
			filteredLocations.value.map((state) => state.region)
		);
		return uniqueRegions.size;
	}
});
const totalChurches = computed(() => {
	return filteredLocations.value.reduce((count, state) => {
		if (state.multiChurchState && state.churches) {
			return count + state.churches.length;
		}
		return count + 1;
	}, 0);
});
const regionOrCountryLabel = computed(() => {
	if (selectedCountry.value === "All") {
		// If there is only 1 country in the filtered list, label should be singular
		return regionOrCountryCount.value === 1 ? "País" : "Países";
	}
	return "Estados";
});

watch(selectedCountry, (newCountry) => {
	const view = countryViews[newCountry] || countryViews.All;
	mapCenter.value = view.center;
	mapZoom.value = view.zoom;
});

watch(displayedChurch, (newChurch) => {
	if (newChurch && selectedState.value) {
		const regionId = selectedState.value.id;
		const churchId = newChurch.id;
		const hash =
			regionId === churchId ? `#${churchId}` : `#${regionId}/${churchId}`;
		history.pushState(null, "", hash);
	} else if (!newChurch && !isChurchModalOpen.value) {
		history.pushState(null, "", " ");
	}
});

watch(isChurchModalOpen, (isOpen) => {
	if (!isOpen) {
		history.pushState(null, "", " ");
	}
});

onMounted(() => {
	const hash = window.location.hash.slice(1);
	if (!hash) return;
	const ids = hash.split("/");
	const regionId = ids[0];
	const churchId = ids.length > 1 ? ids[1] : regionId;

	const foundState = (locationsData as State[]).find(
		(s) => s.id === regionId
	);
	if (!foundState) return;

	let foundChurch: Church | undefined;
	if (foundState.multiChurchState && foundState.churches) {
		foundChurch = foundState.churches.find((c) => c.id === churchId);
	} else {
		foundChurch = foundState as Church;
	}

	if (foundChurch) {
		selectedCountry.value = foundState.country;
		selectedState.value = foundState;
		displayedChurch.value = foundChurch;
		isChurchModalOpen.value = true;
	}
});
</script>

<template>
	<main class="app-container">
		<header>
			<div class="header-left">
				<h1>Mapa Misionero</h1>
				<CountrySelector
					:countries="availableCountries"
					v-model="selectedCountry"
				/>
				<SearchComponent
					:states="filteredLocations"
					@result-selected="handleSearchResultSelected"
				/>
			</div>
			<button
				@click="isAboutModalOpen = true"
				class="about-button"
				title="Acerca de este proyecto"
			>
				<svg
					xmlns="http://www.w.org/2000/svg"
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
			<MapComponent
				:key="selectedCountry"
				:center="mapCenter"
				v-model:zoom="mapZoom"
				:locations="filteredLocations"
				@marker-click="handleMarkerClick"
				@church-marker-click="handleChurchMarkerClick"
			/>
			<!-- NEW: Pass the dynamic props to StatsBox -->
			<StatsBox
				:total-churches="totalChurches"
				:stat-count="regionOrCountryCount"
				:stat-label="regionOrCountryLabel"
			/>
		</div>

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
	gap: 16px;
	flex-grow: 1;
	flex-wrap: wrap;
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
@media (max-width: 920px) {
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
