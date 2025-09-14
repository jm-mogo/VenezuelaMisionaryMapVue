# Mapa Misionero de Venezuela

[**➡️ Ver Demo en Vivo ⬅️**](https://venezuela-misionary-map.vercel.app/)

Este proyecto es un mapa interactivo que muestra la ubicación de iglesias bíblicas bautistas afiliadas a lo largo de Venezuela. Permite a los usuarios explorar las diferentes regiones, ver información detallada de cada iglesia y acceder a sus redes sociales o ubicación en Google Maps.

## ✨ Características Principales (Features)

-   **Mapa Interactivo:** Construido con [Leaflet.js](https://leafletjs.com/), los usuarios pueden hacer zoom y desplazarse por un mapa real de Venezuela.
-   **Ubicaciones de Iglesias:** Cada iglesia o región con múltiples iglesias está marcada en el mapa.
-   **Modal de Información Detallada:** Al hacer clic en un marcador, aparece una ventana modal con información específica, incluyendo:
    -   Nombre de la iglesia.
    -   Foto de la familia pastoral.
    -   Nombre de la familia.
    -   Enlaces a redes sociales (Instagram, Facebook).
    -   Enlace directo a Google Maps para la ubicación.
-   **Agrupación por Regiones:** Las regiones con múltiples iglesias (como Caracas) primero muestran una lista de las congregaciones disponibles.
-   **Panel de Estadísticas:** Un pequeño panel en el mapa muestra un conteo en tiempo real del número total de iglesias y regiones representadas.
-   **Interfaz en Español:** Toda la interfaz de usuario está diseñada para hablantes de español.
-   **Diseño Responsivo:** La aplicación es funcional y se ve bien tanto en computadoras de escritorio como en dispositivos móviles.

## 🛠️ Tecnologías Utilizadas (Tech Stack)

-   **Framework Principal:** [Vue.js 3](https://vuejs.org/) (usando Composition API y `<script setup>`).
-   **Lenguaje:** [TypeScript](https://www.typescriptlang.org/) para un desarrollo más robusto y seguro.
-   **Herramientas de Build:** [Vite](https://vitejs.dev/) para un desarrollo y compilación ultrarrápidos.
-   **Librería de Mapas:** [Vue-Leaflet](https://vue-leaflet.github.io/vue-leaflet/) como un wrapper de Vue para la popular librería [Leaflet.js](https://leafletjs.com/).
-   **Estilos:** CSS Scoped directamente dentro de los componentes de Vue.
-   **Formato de Datos:** La información de las iglesias se gestiona a través de un archivo `states.json` local.

## 🚀 Cómo Empezar (Getting Started)

Para correr este proyecto en tu máquina local, sigue estos pasos:

### Prerrequisitos

-   Tener instalado [Node.js](https://nodejs.org/) (se recomienda la versión LTS).
-   Tener instalado un gestor de paquetes como `npm` (que viene con Node.js).

### Instalación

1.  **Clona el repositorio:**

    ```bash
    git clone https://github.com/jm-mogo/venezuela-missionary-map.git
    cd venezuela-missionary-map
    ```

2.  **Instala las dependencias del proyecto:**

    ```bash
    npm install
    ```

3.  **Inicia el servidor de desarrollo:**
    ```bash
    npm run dev
    ```
    La aplicación estará disponible en `http://localhost:5173`.

## 📦 Build para Producción

Para compilar la aplicación para producción, ejecuta el siguiente comando:

```bash
npm run build
```

📝 Cómo Actualizar los Datos
Toda la información que se muestra en el mapa se gestiona desde un único archivo: src/states.json. Para añadir, modificar o eliminar una iglesia, solo necesitas editar este archivo.
Existen dos tipos de entradas: una iglesia única y una región con múltiples iglesias.

1. Añadir/Modificar una Iglesia Única
   Este es el formato para una región que tiene una sola iglesia.

```JSON
   {
   "id": "maracaibo",
   "name": "IBB Maracaibo",
   "family": "Ferrer",
   "location": "Maracaibo",
   "latitude": [10.641, -71.6074],
   "img": "/familyPictures/maracaibo.jpg"
   }
```

id: Un identificador único en minúsculas y sin espacios.
name: El nombre completo de la iglesia, que se mostrará en la tarjeta.
family: El apellido de la familia pastoral.
location: El nombre de la ciudad o localidad.
latitude: Las coordenadas geográficas. Importante: Deben estar en formato [latitud, longitud]. Puedes obtenerlas haciendo clic derecho sobre la ubicación en Google Maps.
img: La ruta a la foto de la familia. La imagen debe estar ubicada en la carpeta public/familyPictures/.
locationUrl (opcional): El enlace a Google Maps.
socials (opcional): Un arreglo de objetos para las redes sociales. Ejemplo: "socials": [{ "name": "instagram", "socialUrl": "https://..." }]. 2. Añadir/Modificar una Región con Múltiples Iglesias
Este formato se usa para agrupar varias iglesias bajo un mismo marcador principal (ej. "Caracas").

```
JSON
{
"id": "caracas",
"name": "Caracas",
"multiChurchState": true,
"latitude": [10.486, -66.949],
"churches": [
{
"id": "vistaAlegre",
"name": "IBBVA",
"family": "Paez",
"location": "Vista Alegre",
"latitude": [10.485, -66.953],
"img": "/familyPictures/caracas.jpg",
"locationUrl": "https://...",
"socials": []
},
{
"id": "lasAdjuntas",
"name": "Iglesia Bautista de Las Adjuntas",
"family": "Mata",
"location": "Las Adjuntas",
"latitude": [10.443, -66.995],
"img": "/familyPictures/lasAdjuntas.jpg"
}
]
}
```

id y name: Identificador y nombre de la región (ej. "caracas", "Caracas").
multiChurchState: true: Esta bandera es obligatoria para indicar que es un grupo.
latitude: Las coordenadas para el marcador principal de la región.
churches: Un arreglo ([]) que contiene los objetos de cada iglesia individual. Cada objeto dentro de este arreglo sigue exactamente el mismo formato que el de una "Iglesia Úunica", como se explicó en la sección anterior.
Simplemente sigue estos formatos para mantener el mapa actualizado.
