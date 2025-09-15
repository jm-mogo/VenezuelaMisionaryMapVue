<script setup lang="ts">
import { LMap, LTileLayer, LMarker } from "@vue-leaflet/vue-leaflet";
import type { State, Church } from "../types"; // Import Church type
import statesData from "../states.json";
import { latLngBounds } from "leaflet";

// We now define THREE events to be emitted
const emit = defineEmits<{
	(e: "marker-click", state: State): void;
	(e: "update:zoom", value: number): void;
	// NEW: Event for when a split, individual church marker is clicked
	(e: "church-marker-click", payload: { state: State; church: Church }): void;
}>();

const props = defineProps<{
	center: [number, number];
	zoom: number;
}>();

// NEW: Define the zoom level at which multi-church markers split
const SPLIT_ZOOM_LEVEL = 9;

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
			:center="center"
			:zoom="zoom"
			@update:zoom="$emit('update:zoom', $event)"
			:min-zoom="5"
			:max-zoom="12"
			:max-bounds="venezuelaBounds"
		>
			<l-tile-layer
				:url="url"
				:attribution="attribution"
				layer-type="base"
				name="OpenStreetMap"
			></l-tile-layer>

			<!-- NEW: Restructured marker rendering logic -->
			<template v-for="state in (statesData as State[])" :key="state.id">
				<!-- Case 1: Always render markers for single-church states -->
				<l-marker
					v-if="!state.multiChurchState"
					:lat-lng="state.latitude"
					@click="emit('marker-click', state)"
				>
				</l-marker>

				<!-- Case 2: Render the single REGION marker when zoomed OUT -->
				<l-marker
					v-if="state.multiChurchState && zoom < SPLIT_ZOOM_LEVEL"
					:lat-lng="state.latitude"
					@click="emit('marker-click', state)"
				>
				</l-marker>

				<!-- Case 3: Render INDIVIDUAL church markers when zoomed IN -->
				<template
					v-if="state.multiChurchState && zoom >= SPLIT_ZOOM_LEVEL"
				>
					<l-marker
						v-for="church in state.churches"
						:key="church.id"
						:lat-lng="church.latitude"
						@click="
							emit('church-marker-click', {
								state: state,
								church: church,
							})
						"
					>
					</l-marker>
				</template>
			</template>
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
