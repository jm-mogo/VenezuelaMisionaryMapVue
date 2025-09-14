# Mapa Misionero de Venezuela

![Mapa Misionero de Venezuela Screenshot](screenshot.png) <!-- Suggestion: Add a screenshot of your app named screenshot.png to the root folder -->

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

Este proyecto fue construido desde cero utilizando un stack de tecnologías moderno y eficiente:

-   **Framework Principal:** [Vue.js 3](https://vuejs.org/) (usando Composition API y `<script setup>`).
-   **Lenguaje:** [TypeScript](https://www.typescriptlang.org/) para un desarrollo más robusto y seguro.
-   **Herramientas de Build:** [Vite](https://vitejs.dev/) para un desarrollo y compilación ultrarrápidos.
-   **Librería de Mapas:** [Vue-Leaflet](https://vue-leaflet.github.io/vue-leaflet/) como un wrapper de Vue para la popular librería [Leaflet.js](https://leafletjs.com/).
-   **Estilos:** CSS Scoped directamente dentro de los componentes de Vue. No se utilizaron frameworks de CSS como Tailwind para mantener el código de estilos simple y contenido.
-   **Formato de Datos:** La información de las iglesias se gestiona a través de un archivo `states.json` local.

## 🚀 Cómo Empezar (Getting Started)

Para correr este proyecto en tu máquina local, sigue estos pasos:

### Prerrequisitos

-   Tener instalado [Node.js](https://nodejs.org/) (se recomienda la versión LTS).
-   Tener instalado un gestor de paquetes como `npm` (que viene con Node.js).

### Instalación

1.  **Clona el repositorio:**

    ```bash
    git clone https://github.com/tu-usuario/nombre-del-repositorio.git
    cd nombre-del-repositorio
    ```

2.  **Instala las dependencias del proyecto:**

    ```bash
    npm install
    ```

3.  **Inicia el servidor de desarrollo:**
    ```bash
    npm run dev
    ```
    La aplicación estará disponible en `http://localhost:5173` (o el puerto que la terminal indique). El servidor se recargará automáticamente cada vez que hagas un cambio en el código.

### Estructura del Proyecto

La estructura de los archivos principales es la siguiente:
