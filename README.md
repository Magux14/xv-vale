# React + Vite

Invitación de XV años con JavaScript y Sass. Basada en la referencia de Valeria: https://cartamiastudio.my.canva.site/misxvmariajose-template.

## Desarrollo

Requiere Node.js 22.12 o superior y npm.

```sh
npm install --legacy-peer-deps
npm run dev
```

Vite muestra la dirección local disponible. También se incluye la tarea de VS Code `Vite: invitación XV`.

```sh
npm test
npm run lint
npm run build
npm run preview
```

La compilación estática se genera en `dist/`, lista para desplegarse en un servicio de alojamiento estático. No requiere servidor de aplicaciones.

## Personalización

Editar `src/data/invitation-data.js` para cambiar nombres, familiares, fecha, horarios, lugares, fotografías y confirmación. Actualizar también título y descripción en `index.html` al cambiar de festejada.

- `date` y `endDate`: fechas ISO con desplazamiento horario explícito. El ejemplo utiliza UTC-06:00; verificar la zona horaria real del evento.
- `timeZone`: zona IANA para los rótulos de fecha, por ejemplo `America/Mexico_City`. El día, mes, año y hora visibles se derivan de la fecha configurada.
- `whatsappNumber`: número de la persona que recibirá las confirmaciones, incluyendo código de país. Mientras esté vacío, WhatsApp permite elegir un contacto para compartir el mensaje.
- `music.src`: ruta de una canción autorizada, por ejemplo `/audio/mi-cancion.mp3`. Agregar el archivo en `public/audio/`. El reproductor se oculta mientras esta ruta esté vacía. La canción original no estaba disponible públicamente en la referencia.
- `music.title`: nombre que aparece junto al reproductor.
- `locations`: nombres, horarios y enlaces de Google Maps.
- `photos`: rutas y textos alternativos de las fotografías.
- Los colores y tipografías compartidas están en `src/styles/global.scss`.

La fecha, los nombres y los mapas son los de la plantilla. Confirmarlos antes de publicar. El itinerario distingue ceremonia a las 14:00 y recepción a las 17:00, de acuerdo con las ubicaciones; la referencia también etiqueta como recepción un bloque de las 14:00.

## Estructura

```text
src/
	components/
		countdown/
			countdown.jsx
			countdown.scss
		event-location/
		invitation/
		invitation-section/
		music-player/
		rsvp-dialog/
	data/invitation-data.js
	styles/global.scss
	utils/
		event-utils.js
		event-utils.test.js
	main.jsx
public/images/
```

Todos los componentes viven en carpetas homónimas, con archivos kebab-case y estilos SCSS BEM. `invitation-section` reutiliza la composición de las secciones y `event-location` la de los lugares. Los datos no se duplican dentro de los componentes.

## Funciones y límites

- Cuenta regresiva con limpieza del temporizador y valores no negativos.
- Descarga de calendario `.ics`, con horas convertidas a UTC.
- Mapas de ceremonia y recepción en otra pestaña.
- Formulario de confirmación con validación nativa, control de foco del diálogo y cierre con Escape. Abre WhatsApp con el mensaje preparado; no guarda respuestas ni envía mensajes automáticamente. El invitado debe completar el envío en WhatsApp.
- Reproductor opcional sin reproducción automática, con pausa y manejo de errores.
- Diseño adaptable, navegación por teclado y respeto a movimiento reducido.
- Pruebas de utilidades con el ejecutor nativo de Node.js, sin dependencias de pruebas adicionales.

## Recursos

Las fotografías y adornos de `public/images/` se descargaron de la referencia solicitada y se sirven localmente. Su uso en esta implementación no concede derechos sobre ellos: verificar permisos o sustituirlos por recursos propios antes de publicar. Las fuentes se sirven desde Google Fonts y los iconos son de Lucide. Se conserva el estilo de la referencia con HTML adaptable, no con el posicionamiento absoluto generado por Canva.
