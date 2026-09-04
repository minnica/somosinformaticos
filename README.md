# SomosInformáticos

Landing informativa de **SomosInformáticos**, construida con Astro, Tailwind CSS 4, CSS propio y JavaScript nativo. El proyecto genera un sitio estático listo para desplegarse en Vercel.

## Stack

- **Astro 7:** componentes y generación estática de HTML.
- **Tailwind CSS 4:** reset, tokens de tema y utilidades disponibles mediante `@tailwindcss/vite`.
- **CSS propio:** sistema visual, layouts, responsive y efectos específicos de la marca.
- **JavaScript nativo:** menú móvil, apariciones al hacer scroll, efecto de profundidad, botones magnéticos y texto animado.
- **Node.js 24 y npm:** entorno de desarrollo y compilación.

Astro entrega el contenido completo desde el HTML inicial y no envía un runtime de interfaz al navegador. El JavaScript se limita a mejoras progresivas; el contenido sigue visible si las animaciones o `IntersectionObserver` no están disponibles.

## Identidad visual

La interfaz conserva la composición y el lenguaje visual de la landing original: tipografía de gran escala, superficies oscuras, acentos vivos, demostraciones gráficas y llamadas a la acción redondeadas. La paleta ya está aplicada mediante variables y tokens:

| Rol | Color |
| --- | --- |
| Verde de marca | `#82963A` |
| Tinta principal | `#2F2C39` |
| Fondo | `#EAE9E9` |
| Acento | `#BBBC36` |

Los conceptos de comunicación son **innovación**, **automatización** y **mejorar rendimiento**. «Proyección» se mantiene como alternativa editorial para futuras revisiones de contenido y SEO.

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
- Los elementos gráficos decorativos están ocultos para tecnologías de asistencia.
- Los estilos de foco son visibles y los textos principales mantienen contraste sobre la paleta de marca.

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
