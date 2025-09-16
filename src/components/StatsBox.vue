<script setup lang="ts">
defineProps<{
	totalChurches: number;
	statCount: number; // CHANGED: Renamed for clarity
	statLabel: string; // NEW: The dynamic label
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
			<!-- Use the new dynamic props -->
			<span class="stat-number">{{ statCount }}</span>
			<span class="stat-label">{{ statLabel }}</span>
		</div>
	</div>
</template>

<style scoped>
/* All styles remain the same */
.stats-box {
	position: absolute;
	top: 10px;
	right: 10px;
	background-color: rgba(255, 255, 255, 0.9);
	border-radius: 8px;
	box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
	z-index: 500;
	display: flex;
	align-items: center;
	padding: 8px 12px;
	font-family: sans-serif;
	backdrop-filter: blur(4px);
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
