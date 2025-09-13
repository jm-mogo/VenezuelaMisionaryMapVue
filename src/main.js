import "./style.css";
import "leaflet/dist/leaflet.css";
import { createApp } from "vue";
import App from "./App.vue";

// --- START: Leaflet Icon Path Fix ---
// This code fixes the issue where Leaflet's default icons don't load in Vite.
import L from "leaflet";
import iconUrl from "leaflet/dist/images/marker-icon.png";
import iconRetinaUrl from "leaflet/dist/images/marker-icon-2x.png";
import shadowUrl from "leaflet/dist/images/marker-shadow.png";

L.Icon.Default.mergeOptions({
	iconUrl: iconUrl,
	iconRetinaUrl: iconRetinaUrl,
	shadowUrl: shadowUrl,
});
// --- END: Leaflet Icon Path Fix ---

createApp(App).mount("#app");
