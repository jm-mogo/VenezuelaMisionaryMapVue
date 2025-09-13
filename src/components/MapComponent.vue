<script setup lang="ts">
import { LMap, LTileLayer, LMarker } from "@vue-leaflet/vue-leaflet";
import { ref } from "vue";
import type { State } from "../types";
import statesData from "../states.json";
import { latLngBounds } from "leaflet"; // Import latLngBounds for map boundaries

const emit = defineEmits<{
	(e: "marker-click", state: State): void;
}>();

// --- Map Configuration ---
const zoom = ref(6);

// FIX #1: Corrected Longitude from -6.5897 to -66.5897
const center = ref<[number, number]>([8.5238, -66.5897]);

// FIX #3: Define the boundaries for the map view
// This creates a bounding box around Venezuela so users can't pan too far away.
const venezuelaBounds = latLngBounds(
	[0, -74], // Southwest corner (approximate)
	[12, -59] // Northeast corner (approximate)
);

const url = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
const attribution =
	'&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors';
</script>

<template>
	<div class="map-container">
		<l-map
			ref="map"
			v-model:zoom="zoom"
			:center="center"
			:min-zoom="6"
			:max-zoom="8"
			:max-bounds="venezuelaBounds"
		>
			<l-tile-layer
				:url="url"
				:attribution="attribution"
				layer-type="base"
				name="OpenStreetMap"
			></l-tile-layer>

			<l-marker
				v-for="state in (statesData as State[])"
				:key="state.id"
				:lat-lng="state.latitude"
				@click="emit('marker-click', state)"
			>
			</l-marker>
		</l-map>
	</div>
</template>

<style scoped>
.map-container,
.map-container .l-map {
	width: 100%;
	height: 100%;
}
</style>
