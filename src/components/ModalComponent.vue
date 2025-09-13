<script setup lang="ts">
defineProps<{
	isOpen: boolean;
}>();

const emit = defineEmits(["close"]);
</script>

<template>
	<div v-if="isOpen" class="modal-backdrop" @click="emit('close')">
		<div class="modal-content" @click.stop>
			<button class="modal-close-btn" @click="emit('close')">
				&times;
			</button>

			<div class="modal-body">
				<slot></slot>
			</div>
		</div>
	</div>
</template>

<!-- ADD THIS STYLE BLOCK -->
<style scoped>
.modal-backdrop {
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background-color: rgba(0, 0, 0, 0.6); /* Slightly darker backdrop */
	display: flex;
	justify-content: center;
	align-items: center;
	z-index: 1000;
	padding: 1rem; /* Add padding for small screens */
	box-sizing: border-box;
}

.modal-content {
	background-color: white;
	padding: 24px; /* More padding */
	border-radius: 12px; /* Softer corners */
	box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
	position: relative;
	max-width: 550px;
	width: 100%;
	max-height: 90vh; /* Prevent modal from being too tall */
	overflow-y: auto; /* Allow content to scroll if it's too long */
	animation: slide-up 0.3s ease-out; /* Add a subtle entrance animation */
}

@keyframes slide-up {
	from {
		transform: translateY(20px);
		opacity: 0;
	}
	to {
		transform: translateY(0);
		opacity: 1;
	}
}

.modal-close-btn {
	position: absolute;
	top: 12px;
	right: 12px;
	border: none;
	background: transparent;
	font-size: 2.2rem;
	font-weight: 300;
	line-height: 1;
	cursor: pointer;
	color: #aaa;
	transition: color 0.2s;
}

.modal-close-btn:hover {
	color: #333;
}

.modal-body {
	margin-top: 10px;
}
</style>
