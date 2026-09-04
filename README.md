# SomosInformáticos

Landing informativa de **SomosInformáticos**, construida con Astro, Tailwind CSS 4, CSS propio y JavaScript nativo. El proyecto genera un sitio estático listo para desplegarse en Vercel.

## Stack

- **Astro 7:** componentes y generación estática de HTML.
- **Tailwind CSS 4:** reset, tokens de tema y utilidades disponibles mediante `@tailwindcss/vite`.
- **CSS propio:** sistema visual, layouts fluidos, responsive y prototipos gráficos de la marca.
- **JavaScript nativo:** menú móvil, apariciones progresivas, profundidad sutil, botones magnéticos y texto animado.
- **Node.js 24 y npm:** entorno de desarrollo y compilación.

Astro entrega el contenido completo desde el HTML inicial y no envía un runtime de interfaz al navegador. El JavaScript se limita a mejoras progresivas; el contenido sigue visible si las animaciones o `IntersectionObserver` no están disponibles.

## Identidad visual

La interfaz usa una dirección visual directa, resolutiva y cercana. Combina tipografía de gran escala, superficies oscuras de alto contraste, bloques de color comprometidos y prototipos de interfaz que muestran el tipo de trabajo que ofrece el estudio. El gesto `Si_` funciona como firma, respuesta positiva y cursor listo para crear.

La composición evita depender de una retícula uniforme de tarjetas: los servicios se presentan como una lista comparativa, los escenarios de proyecto tienen ritmo narrativo propio y la sección de identidad utiliza el color de marca a ancho completo. La paleta se aplica mediante variables CSS y tokens de Tailwind:

| Rol | Color |
| --- | --- |
| Verde de marca | `#82963A` |
| Tinta principal | `#2F2C39` |
| Fondo | `#ECEBEA` |
| Acento | `#BBBC36` |

La tipografía se resuelve con una sola familia, **Sora**, para mantener una voz consistente entre titulares, navegación y texto. Los conceptos de comunicación son **claridad**, **confianza**, **conversión** y **acompañamiento técnico**.

## Recorrido de la página

1. **Hero:** presenta una promesa centrada en conversión y una demostración visual de una web terminada.
2. **Servicios:** compara cinco capacidades sin convertir cada una en una tarjeta aislada.
3. **Escenarios de proyecto:** explica el valor de un sitio corporativo y una landing de campaña mediante prototipos visuales.
4. **Identidad `Si_`:** concentra el momento de marca y conserva el texto animado como mejora progresiva.
5. **Proceso:** muestra cuatro etapas ordenadas; aquí la numeración comunica una secuencia real.
6. **Contacto:** cierra con correo, WhatsApp y una llamada a la acción persistente en móvil.

## Arquitectura

```text
astro.config.mjs
public/
  favicon.svg
  robots.txt
src/
  components/
    Contacto.astro
    Footer.astro
    Header.astro
    Hero.astro
    Identidad.astro
    Proceso.astro
    Proyectos.astro
    Servicios.astro
  layouts/
    BaseLayout.astro
  pages/
    index.astro
  scripts/
    main.js
  styles/
    global.css
```

`src/pages/index.astro` compone la landing. `BaseLayout.astro` centraliza el documento, las fuentes y los metadatos. Cada sección vive en un componente independiente; los servicios, pasos y enlaces repetidos se generan a partir de arreglos para facilitar su mantenimiento.

El antiguo `index.html` de la raíz fue sustituido por la página Astro. `astro.config.mjs` usa salida `static`, registra Tailwind 4 como plugin de Vite y define `https://somosinformaticos.com` como URL canónica del sitio.

## Desarrollo

Requiere Node.js 24 y npm. Instala exactamente las versiones del lockfile:

```sh
npm ci
```

Inicia el servidor local:

```sh
npm run dev
```

Genera y revisa el sitio estático:

```sh
npm run build
npm run preview
```

El build se escribe en `dist/`. Tanto `dist/` como `.astro/` son artefactos generados y están excluidos de Git.

## Accesibilidad y comportamiento

- La navegación usa enlaces semánticos, estados `aria-expanded` y cierre con la tecla `Escape`.
- Las animaciones respetan `prefers-reduced-motion`.
- Las apariciones al hacer scroll son una mejora progresiva: el contenido es visible por defecto.
- Los prototipos gráficos se describen como una sola imagen y sus detalles decorativos quedan fuera del árbol de accesibilidad.
- Los estilos de foco son visibles y los textos principales mantienen contraste sobre la paleta de marca.
- Los controles táctiles principales tienen una altura mínima de 44–48 px y el diseño cuenta con ajustes específicos para 1040, 780 y 420 px.

## SEO

El layout define idioma, título, descripción, URL canónica, directivas de indexación y metadatos Open Graph y Twitter. `public/robots.txt` permite el rastreo del sitio.

Antes de publicar, confirma que `https://somosinformaticos.com` será el dominio definitivo. Si cambia, actualiza `site` en `astro.config.mjs`; los metadatos canónicos se regenerarán durante el build. Un sitemap se puede añadir cuando existan más rutas públicas.

## Despliegue en Vercel

Configura el proyecto con estos valores:

- Framework Preset: `Astro`
- Root Directory: raíz del repositorio
- Build Command: `npm run build`
- Output Directory: `dist`
- Node.js: `24.x`

La salida es estática, así que no requiere `@astrojs/vercel` ni un `vercel.json` personalizado.

## Pendientes de contenido

- Completar `https://wa.me/` con el número real en formato internacional, solo con dígitos. También se puede agregar un mensaje mediante `?text=`.
- Confirmar que `hola@somosinformaticos.com` sea el destinatario definitivo.
- Añadir una imagen Open Graph cuando exista un recurso de marca aprobado.
- Configurar Search Console después del despliegue y medir Core Web Vitals con la URL de producción.

## Referencias

- [Documentación de Astro](https://docs.astro.build/)
- [Componentes Astro](https://docs.astro.build/en/basics/astro-components/)
- [Tailwind CSS con Astro](https://tailwindcss.com/docs/installation/framework-guides/astro)
- [Astro en Vercel](https://docs.astro.build/en/guides/deploy/vercel/)
- [Guía de SEO de Google](https://developers.google.com/search/docs/fundamentals/seo-starter-guide)
