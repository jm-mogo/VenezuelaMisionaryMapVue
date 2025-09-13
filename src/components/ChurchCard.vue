<script setup lang="ts">
import type { Church } from "../types";

defineProps<{
	church: Church;
}>();
</script>

<template>
	<div class="church-card">
		<!-- Image is now inside the main content area -->
		<img
			:src="church.img"
			:alt="'Familia ' + church.family"
			class="family-picture"
		/>

		<div class="card-content">
			<h2 class="church-name">{{ church.name }}</h2>
			<p class="family-name">Familia {{ church.family }}</p>
		</div>

		<div class="card-footer">
			<span class="footer-title">Contacto y Ubicación:</span>
			<div class="links-container">
				<a
					v-if="church.locationUrl"
					:href="church.locationUrl"
					target="_blank"
					class="icon-link location-link"
				>
					<img src="/location.png" alt="Mapa" class="icon" />
				</a>

				<a
					v-for="social in church.socials"
					:key="social.name"
					:href="social.socialUrl"
					target="_blank"
					class="icon-link"
				>
					<img
						v-if="social.name === 'instagram'"
						src="/instagram.png"
						alt="Instagram"
						class="icon"
					/>
					<img
						v-if="social.name === 'facebook'"
						src="/facebook.png"
						alt="Facebook"
						class="icon"
					/>
				</a>
			</div>
		</div>
	</div>
</template>

<style scoped>
.church-card {
	font-family: sans-serif;
	text-align: center;
	background-color: #ffffff; /* Change back to a clean white */
	border-radius: 12px;
	overflow: hidden;
	border: 1px solid #e9ecef;
	padding-top: 24px; /* Add padding at the top */
}

.family-picture {
	/* This is the key change for portrait images */
	max-width: 80%; /* Don't let the image touch the card edges */
	max-height: 300px; /* Keep the original max-height */
	height: auto; /* Let the height adjust to maintain aspect ratio */
	border-radius: 8px; /* Give the image itself rounded corners */
	display: block;
	margin: 0 auto; /* Center the image horizontally */
}

.card-content {
	padding: 20px;
}

.church-name {
	font-size: 1.8rem;
	font-weight: 700;
	color: #212529;
	margin: 0;
}

.family-name {
	font-size: 1.2rem;
	color: #6c757d;
	margin-top: 8px;
}

.card-footer {
	background-color: #f8f9fa; /* Move the light grey to the footer */
	padding: 16px 20px;
	border-top: 1px solid #e9ecef;
}

.footer-title {
	display: block;
	font-size: 0.9rem;
	color: #6c757d;
	margin-bottom: 12px;
	font-weight: 500;
}

.links-container {
	display: flex;
	justify-content: center;
	align-items: center;
	gap: 24px;
}

.icon-link {
	display: inline-block;
}

.icon {
	width: 36px;
	height: 36px;
	transition: transform 0.2s ease-in-out;
}

.icon:hover {
	transform: scale(1.15);
}
</style>
