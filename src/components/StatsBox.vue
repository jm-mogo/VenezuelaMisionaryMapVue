<script setup lang="ts">
defineProps<{
	totalRegions: number; // CHANGED from totalStates
	totalChurches: number;
}>();
</script>

<template>
	<div class="stats-box">
		<div class="stat-item">
			<span class="stat-number">{{ totalChurches }}</span>
			<span class="stat-label">Iglesias</span>
		</div>
		<div class="stat-divider"></div>
		<div class="stat-item">
			<span class="stat-number">{{ totalRegions }}</span>
			<span class="stat-label">Estados</span>
			<!-- CHANGED from Regiones -->
		</div>
	</div>
</template>

<style scoped>
.stats-box {
	position: absolute;
	top: 10px;
	right: 10px;
	background-color: rgba(255, 255, 255, 0.9);
	border-radius: 8px;
	box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
	z-index: 500; /* Ensure it's above the map tiles */
	display: flex;
	align-items: center;
	padding: 8px 12px;
	font-family: sans-serif;
	backdrop-filter: blur(4px); /* Frosty glass effect */
}

.stat-item {
	display: flex;
	flex-direction: column;
	align-items: center;
	padding: 0 10px;
}

.stat-number {
	font-size: 1.5rem;
	font-weight: 700;
	color: #1a202c;
}

.stat-label {
	font-size: 0.75rem;
	color: #718096;
	text-transform: uppercase;
	letter-spacing: 0.5px;
}

.stat-divider {
	width: 1px;
	height: 30px;
	background-color: #e2e8f0;
}
</style>
``` And that's it! Your stats box will now show a more accurate count of the
unique Venezuelan states represented on the map.
