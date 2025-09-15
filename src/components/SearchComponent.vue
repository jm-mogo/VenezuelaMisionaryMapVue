<script setup lang="ts">
import { ref, computed } from "vue";
// NEW: Import the shared SearchResult type
import type { State, Church, SearchResult } from "../types";

const props = defineProps<{
	states: State[];
}>();

const emit = defineEmits<{
	(e: "result-selected", payload: SearchResult): void;
}>();

const searchQuery = ref("");

// DELETED: The local 'type SearchResult = { ... }' is now gone.

const filteredResults = computed<SearchResult[]>(() => {
	const query = searchQuery.value.trim().toLowerCase();
	if (!query) return [];

	const results: SearchResult[] = [];

	props.states.forEach((state) => {
		if (state.multiChurchState && state.churches) {
			if (state.name.toLowerCase().includes(query)) {
				const regionAsChurch: Church = {
					id: state.id,
					name: state.name,
					latitude: state.latitude,
					family: "",
					location: `Región con ${state.churches.length} iglesias`,
					img: "",
				};
				results.push({
					state: state,
					church: regionAsChurch,
					isRegion: true,
				});
			}

			state.churches.forEach((church) => {
				if (
					church.name.toLowerCase().includes(query) ||
					church.family.toLowerCase().includes(query) ||
					church.location.toLowerCase().includes(query)
				) {
					results.push({
						state: state,
						church: church,
						isRegion: false,
					});
				}
			});
		} else {
			const church = state as Church;
			if (
				church.name.toLowerCase().includes(query) ||
				church.family.toLowerCase().includes(query) ||
				church.location.toLowerCase().includes(query)
			) {
				results.push({
					state: state,
					church: church,
					isRegion: false,
				});
			}
		}
	});

	return results;
});

const onResultClick = (result: SearchResult) => {
	emit("result-selected", result);
	searchQuery.value = "";
};
</script>

<template>
	<div class="search-container">
		<input
			type="text"
			v-model="searchQuery"
			placeholder="Buscar por iglesia, familia, o lugar..."
			class="search-input"
		/>
		<!-- Render the search results list -->
		<ul
			v-if="searchQuery && filteredResults.length > 0"
			class="results-list"
		>
			<!-- NEW: Added @click handler -->
			<li
				v-for="result in filteredResults"
				:key="result.church.id"
				class="result-item"
				@click="onResultClick(result)"
			>
				<div class="result-info">
					<span class="result-name">{{ result.church.name }}</span>
					<span class="result-location"
						>{{ result.church.family }} -
						{{ result.church.location }}</span
					>
				</div>
			</li>
		</ul>
		<!-- Optional: Show a "no results" message -->
		<div
			v-if="searchQuery && filteredResults.length === 0"
			class="results-list no-results"
		>
			No se encontraron resultados.
		</div>
	</div>
</template>

<style scoped>
.search-container {
	position: relative;
	width: 100%;
	max-width: 400px;
}

.search-input {
	width: 100%;
	padding: 10px 15px;
	border-radius: 8px;
	border: 1px solid #ccc;
	font-size: 1rem;
	box-sizing: border-box;
	box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
	transition: border-color 0.2s, box-shadow 0.2s;
}

.search-input:focus {
	outline: none;
	border-color: #3b82f6;
	box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.3);
}

.results-list {
	position: absolute;
	top: 100%;
	left: 0;
	right: 0;
	background-color: white;
	border: 1px solid #ddd;
	border-top: none;
	border-radius: 0 0 8px 8px;
	list-style: none;
	padding: 0;
	margin: 0;
	max-height: 300px;
	overflow-y: auto;
	z-index: 1;
	box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.result-item {
	padding: 12px 15px;
	cursor: pointer;
	border-bottom: 1px solid #f0f0f0;
	display: flex;
	flex-direction: column;
}

.result-item:last-child {
	border-bottom: none;
}

.result-item:hover {
	background-color: #f4f4f9;
}

.result-name {
	font-weight: 500;
	color: #333;
}

.result-location {
	font-size: 0.85rem;
	color: #666;
}

.no-results {
	padding: 15px;
	text-align: center;
	color: #666;
}
</style>
