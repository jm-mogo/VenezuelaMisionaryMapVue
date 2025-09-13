<script setup lang="ts">
import type { Church } from "../types";

// This component now accepts a 'title' string and an array of 'churches'
defineProps<{
	title: string;
	churches: Church[];
}>();

const emit = defineEmits<{
	(e: "church-selected", church: Church): void;
}>();
</script>

<template>
	<div class="multi-church-list">
		<!-- Use the 'title' prop as the main heading -->
		<h2 class="main-title">{{ title }}</h2>
		<h3 class="list-title">Iglesias en esta Región:</h3>
		<div class="list-container">
			<div
				v-for="church in churches"
				:key="church.id"
				class="list-item"
				@click="emit('church-selected', church)"
			>
				<p>{{ church.location }}</p>
				<span>&rarr;</span>
			</div>
		</div>
	</div>
</template>

<style scoped>
.multi-church-list {
	font-family: sans-serif;
	text-align: center;
}

/* Style for the new main title */
.main-title {
	font-size: 2rem;
	font-weight: 700;
	color: #212529;
	margin-bottom: 8px;
}

.list-title {
	margin-bottom: 20px;
	font-size: 1.2rem;
	font-weight: 500;
	color: #6c757d; /* Softer color for the subtitle */
}

/* ... rest of the styles are the same ... */
.list-container {
	display: flex;
	flex-direction: column;
	gap: 12px;
}

.list-item {
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 16px;
	border: 1px solid #e2e8f0;
	border-radius: 8px;
	cursor: pointer;
	transition: all 0.2s ease-in-out;
	background-color: #fff;
}

.list-item:hover {
	border-color: #3b82f6;
	transform: translateY(-2px);
	box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
}

.list-item p {
	margin: 0;
	font-size: 1rem;
	font-weight: 500;
	color: #2d3748;
}

.list-item span {
	font-size: 1.5rem;
	color: #a0aec0;
	transition: color 0.2s;
}

.list-item:hover span {
	color: #3b82f6;
}
</style>
