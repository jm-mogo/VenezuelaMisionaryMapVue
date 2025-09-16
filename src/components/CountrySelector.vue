<script setup lang="ts">
defineProps<{
	countries: string[];
	modelValue: string; // Used for v-model
}>();

const emit = defineEmits<{
	(e: "update:modelValue", value: string): void; // Used for v-model
}>();

const handleChange = (event: Event) => {
	emit("update:modelValue", (event.target as HTMLSelectElement).value);
};
</script>

<template>
	<div class="selector-container">
		<select
			:value="modelValue"
			@change="handleChange"
			class="country-select"
		>
			<option
				v-for="country in countries"
				:key="country"
				:value="country"
			>
				{{ country }}
			</option>
		</select>
	</div>
</template>

<style scoped>
.selector-container {
	position: relative;
}

.country-select {
	-webkit-appearance: none;
	-moz-appearance: none;
	appearance: none;
	background-color: white;
	border: 1px solid #ccc;
	border-radius: 8px;
	padding: 10px 30px 10px 15px;
	font-size: 1rem;
	cursor: pointer;
	box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
	transition: border-color 0.2s, box-shadow 0.2s;
	background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e");
	background-position: right 0.5rem center;
	background-repeat: no-repeat;
	background-size: 1.5em 1.5em;
}

.country-select:focus {
	outline: none;
	border-color: #3b82f6;
	box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.3);
}
</style>
