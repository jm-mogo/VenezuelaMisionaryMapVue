<script setup lang="ts">
import { ref } from "vue";
import type { Church } from "../types";

const props = defineProps<{
	church: Church;
}>();

const showCopyMessage = ref(false);

const shareChurch = async () => {
	const shareUrl = window.location.href;
	const shareData = {
		title: `Mapa Misionero: ${props.church.name}`,
		text: `Echa un vistazo a la información sobre la ${props.church.name}, pastoreada por la familia ${props.church.family}.`,
		url: shareUrl,
	};

	try {
		if (navigator.share) {
			await navigator.share(shareData);
		} else {
			await navigator.clipboard.writeText(shareUrl);
			showCopyMessage.value = true;
			setTimeout(() => {
				showCopyMessage.value = false;
			}, 2000);
		}
	} catch (err) {
		console.error("Error al compartir:", err);
		alert("No se pudo copiar el enlace.");
	}
};
</script>

<template>
	<div class="church-card">
		<img
			:src="church.img"
			:alt="'Familia ' + church.family"
			class="family-picture"
		/>

		<div class="card-content">
			<h2 class="church-name">{{ church.name }}</h2>
			<p class="family-name">Familia {{ church.family }}</p>

			<!-- NEW: Display the address if it exists -->
			<p v-if="church.address" class="address-text">
				{{ church.address }}
			</p>
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
				<template v-for="social in church.socials" :key="social.name">
					<a
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
						<img
							v-if="social.name === 'youtube'"
							src="/youtube.png"
							alt="YouTube"
							class="icon"
						/>
					</a>
				</template>
			</div>

			<div class="separator"></div>

			<div class="share-section">
				<span class="footer-title">Compartir esta iglesia</span>
				<button @click="shareChurch" class="icon-link share-button">
					<img src="/share.svg" alt="Compartir" class="icon" />
				</button>
			</div>

			<div v-if="showCopyMessage" class="copy-feedback">
				¡Enlace copiado!
			</div>
		</div>
	</div>
</template>

<style scoped>
.church-card {
	font-family: sans-serif;
	text-align: center;
	background-color: #ffffff;
	border-radius: 12px;
	overflow: hidden;
	border: 1px solid #e9ecef;
	padding-top: 24px;
}

.family-picture {
	max-width: 80%;
	max-height: 300px;
	height: auto;
	border-radius: 8px;
	display: block;
	margin: 0 auto;
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

/* NEW: Style for the address text */
.address-text {
	font-size: 0.95rem;
	color: #4a5568;
	margin-top: 16px;
	padding: 12px;
	border-radius: 6px;
	background-color: #f8f9fa;
	border: 1px solid #e9ecef;
	line-height: 1.5;
	max-width: 90%;
	margin-left: auto;
	margin-right: auto;
}

.card-footer {
	position: relative;
	background-color: #f8f9fa;
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

.share-button {
	background: none;
	border: none;
	padding: 0;
	cursor: pointer;
}

.icon {
	width: 36px;
	height: 36px;
	transition: transform 0.2s ease-in-out;
}

.icon:hover {
	transform: scale(1.15);
}

.separator {
	height: 1px;
	background-color: #e9ecef;
	margin: 20px auto;
	width: 80%;
}

.copy-feedback {
	position: absolute;
	bottom: -40px;
	left: 50%;
	transform: translateX(-50%);
	background-color: #28a745;
	color: white;
	padding: 6px 12px;
	border-radius: 6px;
	font-size: 0.9rem;
	font-weight: 500;
	animation: fade-in-out 2s ease-in-out;
}

@keyframes fade-in-out {
	0% {
		opacity: 0;
		transform: translateX(-50%) translateY(-10px);
	}
	20% {
		opacity: 1;
		transform: translateX(-50%) translateY(0);
	}
	80% {
		opacity: 1;
		transform: translateX(-50%) translateY(0);
	}
	100% {
		opacity: 0;
		transform: translateX(-50%) translateY(-10px);
	}
}
</style>
