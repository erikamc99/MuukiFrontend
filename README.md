# Muuki

Aplicación móvil para el monitoreo inteligente de animales de granja. Desarrollada en **React Native** utilizando **Expo**, se conecta con un backend en .NET y utiliza MongoDB como base de datos. Actualmente funciona con datos simulados, pero está preparada para integrarse con sensores reales.

---

## 🧰 Requerimientos

- Node.js >= 18
- Expo CLI (`npm install -g expo-cli`)
- Expo Go (en dispositivo físico o simulador)
- Acceso a red local (para comunicación con backend en desarrollo)

---

## 🚀 Instalación

1. Clona el repositorio:

```bash
git clone https://github.com/erikamc99/MuukiFrontend.git
cd MuukiFrontend

	2.	Instala las dependencias:

npm install

	3.	Ejecuta la aplicación:

npx expo start

Abre el código QR con Expo Go desde un dispositivo físico conectado a la misma red local.

⸻

📁 Estructura del proyecto

Final/
├── components/          # Componentes reutilizables (cards, modals, header, footer)
├── constants/           # Endpoints y textos de ayuda
├── context/             # Contextos globales (usuario, espacios)
├── hooks/               # Hooks personalizados (auth, ayuda)
├── navigation/          # Navegadores (auth, main, tabs)
├── screens/             # Pantallas de la app (home, stats, perfil, etc.)
├── services/            # Servicios para llamadas a API
├── styles/              # Estilos por pantalla o componente
├── utils/               # Gestión de token y almacenamiento local
├── mock/                # Datos simulados
└── App.js               # Entry point de la app


⸻

📦 Scripts disponibles

npm start         # Inicia el servidor de desarrollo (expo)
npm run android   # Intenta abrir la app en un emulador Android
npm run ios       # Intenta abrir la app en un simulador iOS (macOS)


⸻

🧪 Datos simulados

El archivo mock/mockStats.js contiene datos temporales de temperatura, humedad, contaminación, agua y comida por día de la semana.

⸻

🔐 Autenticación

La autenticación se gestiona mediante el contexto de usuario (UserContext) y se integra con el backend vía Axios. El token y los datos del usuario se almacenan en AsyncStorage.

⸻

ℹ️ Ayuda contextual

Sistema de ayuda paso a paso por pantalla. Se activa automáticamente o desde un botón visible. Los mensajes están en constants/helpMessages.js.

⸻

📡 Conexión con backend

La URL base para las peticiones se encuentra en constants/endpoints.js. Asegúrate de que la IP local del backend sea accesible desde el dispositivo móvil:

export const API_BASE = "http://<TU_IP_LOCAL>:5098/api";


⸻

🧹 Principios aplicados
	•	Clean Code
	•	SOLID
	•	DRY
	•	KISS
	•	Separación de responsabilidades

⸻

📌 Notas
	•	El uso de imágenes .svg requiere validación, ya que React Native no soporta SVGs directamente en <Image />.
	•	El login, registro y navegación están completamente funcionales.
	•	El sistema de ayuda y el estado global están centralizados y reutilizados entre pantallas.

⸻

📎 Repositorio backend

 [Repositorio Backend](https://github.com/erikamc99/MuukiBackend.git)

⸻

🎨 Diseño en Figma

[Diseño UI](https://www.figma.com/design/dh2XW1GWwZha0BAba7sdvg/Muuki-Design?node-id=15-165&t=8H3rqboRJYGZvKhB-1)
