<script setup lang="ts">
import { LMap, LTileLayer, LMarker } from "@vue-leaflet/vue-leaflet";
import type { State, Church } from "../types";
// REMOVED: No longer importing data directly
// import locationsData from "../locations.json";
import { latLngBounds } from "leaflet";

const emit = defineEmits<{
	(e: "marker-click", state: State): void;
	(e: "update:zoom", value: number): void;
	(e: "church-marker-click", payload: { state: State; church: Church }): void;
}>();

// NEW: Add a 'locations' prop to receive the filtered data
const props = defineProps<{
	center: [number, number];
	zoom: number;
	locations: State[];
}>();

const SPLIT_ZOOM_LEVEL = 9;

// NEW: Make map bounds more generic to support more countries
const mapBounds = latLngBounds(
	[-34, -92], // Southwest corner (covers South America)
	[13, -34] // Northeast corner
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
			:min-zoom="4"
			:max-zoom="12"
			:max-bounds="mapBounds"
		>
			<l-tile-layer
				:url="url"
				:attribution="attribution"
				layer-type="base"
				name="OpenStreetMap"
			></l-tile-layer>

			<!-- NEW: Loop over the 'locations' prop instead of the direct import -->
			<template v-for="state in locations" :key="state.id">
				<l-marker
					v-if="!state.multiChurchState"
					:lat-lng="state.latitude"
					@click="emit('marker-click', state)"
				>
				</l-marker>

				<l-marker
					v-if="state.multiChurchState && zoom < SPLIT_ZOOM_LEVEL"
					:lat-lng="state.latitude"
					@click="emit('marker-click', state)"
				>
				</l-marker>

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
