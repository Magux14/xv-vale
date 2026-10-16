# Convenciones del proyecto

- React con JavaScript, Vite y Sass. No introducir TypeScript ni otro framework de estilos.
- Nombrar archivos y carpetas en kebab-case.
- Cada componente debe vivir en una carpeta homónima con archivos `.jsx` y `.scss` del mismo nombre.
- Usar clases BEM y anidar SCSS dentro del bloque correspondiente.
- Centralizar el contenido editable en `src/data/invitation-data.js`.
- Reutilizar `invitation-section` y `event-location`. Evitar dependencias y abstracciones innecesarias.
- Mantener textos en español, accesibilidad por teclado y estilos adaptables.
- No inventar números de contacto ni afirmar que una confirmación fue enviada o guardada.
- Verificar cambios con `npm test`, `npm run lint` y `npm run build`.

## Preparación

- [x] Requisitos definidos: React, Vite, JavaScript, SCSS y BEM.
- [x] Proyecto inicializado y dependencias instaladas.
- [x] Invitación implementada con componentes reutilizables.
- [x] No se requieren extensiones adicionales.
- [x] Compilación, linter y pruebas ejecutados.
- [x] Tarea de desarrollo creada y servidor iniciado.
- [x] Documentación de personalización y recursos incluida.