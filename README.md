# SomosInformáticos

Landing informativa con Astro, Tailwind CSS 4, CSS propio y JavaScript nativo, destinada a un despliegue estático en Vercel. Node.js 24 se usa como herramienta de desarrollo y compilación.

## Identidad de marca

La paleta de colores de **somosinformaticos.com** será:

- `#82963A`
- `#2F2C39`
- `#EAE9E9`
- `#BBBC36`

Esta paleta será la referencia para la futura refactorización visual; su aplicación al sitio está pendiente.

Las palabras y conceptos que definen a la marca son **innovación**, **automatización** y **mejorar rendimiento**. También se contempla **proyección** como alternativa a «mejorar rendimiento», pensando en el SEO. Estos conceptos orientarán los textos y la comunicación de la marca; la elección entre ambas expresiones queda pendiente.

## Estado actual

El stack está declarado en `package.json`, pero la migración del sitio está pendiente. `index.html` conserva el ejemplo original con sus estilos y scripts inline. Todavía no existen páginas o componentes Astro, configuración de Tailwind ni una entrada de estilos que lo importe.

Los scripts ya apuntan a Astro. Astro no utiliza el `index.html` de la raíz como entrada: hasta crear `src/pages/index.astro`, estos comandos no sirven ni compilan la landing original. Un build sin páginas no valida la migración. Cualquier contenido previo de `dist/` corresponde a la compilación anterior con Vite y no representa el stack nuevo.

## Arquitectura elegida

- **Astro con generación estática:** organiza la página en componentes y genera HTML durante el build. Los componentes Astro no añaden JavaScript al navegador por defecto.
- **Tailwind CSS 4:** utilidades para composición, responsive, colores y espaciado. Se complementará con CSS propio para efectos visuales específicos.
- **JavaScript nativo:** menú móvil y animaciones, cargado únicamente donde se necesite. No se requieren React ni un framework de hidratación.
- **Vercel:** sirve el HTML y los recursos generados. El alcance actual no necesita base de datos ni servidor de aplicación.

Astro facilita mantener las secciones y centralizar los metadatos sin renunciar a una salida estática. Tailwind mejora la consistencia al iterar el diseño; no aporta SEO por sí mismo. Astro ya utiliza Vite internamente, por lo que no se declara Vite como dependencia directa. Para Tailwind 4 se utiliza `@tailwindcss/vite`, según su guía oficial.

## Desarrollo

Con Node.js 24 y npm instalados, instalar las versiones del lockfile:

```sh
npm ci
```

Conservar `package-lock.json` en Git y actualizarlo con `npm install` cuando cambien las dependencias. Los siguientes comandos serán útiles para la landing una vez completada la refactorización:

```sh
npm run dev
npm run build
npm run preview
```

`build` genera `dist/`. `preview` permite revisar ese resultado localmente; no es un servidor de producción.

## Refactorización pendiente

Esta estructura es una propuesta para sesiones posteriores; todavía no está creada:

```text
astro.config.mjs
src/
  pages/index.astro
  layouts/BaseLayout.astro
  components/
    Header.astro
    Hero.astro
    Servicios.astro
    Proyectos.astro
    Proceso.astro
    Contacto.astro
    Footer.astro
  styles/global.css
  scripts/main.js
  assets/
public/
  assets/
  robots.txt
```

1. Crear `astro.config.mjs` con salida `static`, registrar `tailwindcss()` de `@tailwindcss/vite` en `vite.plugins` y establecer `site` cuando se confirme el dominio de producción.
2. Crear `src/pages/index.astro` a partir del ejemplo y separar las secciones en componentes. Centralizar el documento HTML y los metadatos en `BaseLayout.astro`.
3. Importar `tailwindcss` desde `src/styles/global.css` e importar ese archivo en el layout. Definir los colores, fuentes y espaciados del proyecto. Revisar el efecto del reset de Tailwind sobre el diseño existente.
4. Migrar las interacciones a scripts procesados por Astro y conservar el soporte para movimiento reducido y contenido accesible sin JavaScript.
5. Colocar imágenes que se quieran procesar con Astro en `src/assets/`. Reservar `public/` para archivos que deban copiarse sin procesamiento, como el video y `robots.txt`.
6. Añadir `.astro/` a `.gitignore` cuando se configure Astro y validar la página migrada en desarrollo y con un build de producción.

El video y su portada pueden conservar las rutas `/assets/tech-loop.mp4` y `/assets/tech-loop-poster.jpg` colocando los archivos en `public/assets/`. Actualmente están ausentes.

## SEO previsto

Astro y el HTML original pueden entregar contenido completo en el HTML inicial. El cambio de framework no garantiza mejores posiciones; la implementación y el contenido siguen siendo determinantes.

Durante la refactorización:

- Mantener contenido útil que explique los servicios y la propuesta de valor, con encabezados semánticos y enlaces descriptivos.
- Definir idioma, título, descripción y URL canónica en el layout con el dominio real; añadir metadatos Open Graph para compartir la página.
- Verificar que la página de producción sea indexable, revisar `robots.txt` y configurar Search Console después del despliegue. Evaluar un sitemap según las URLs publicadas.
- Optimizar imágenes, video y fuentes, evitar saltos de diseño y medir Core Web Vitals en lugar de asumir mejoras por el stack.
- Añadir datos estructurados solo cuando correspondan a información real y visible del negocio.

## Despliegue en Vercel

Después de completar y validar la refactorización, importar el repositorio con estos ajustes:

- Framework Preset: `Astro`.
- Root Directory: raíz del repositorio.
- Build Command: `npm run build`.
- Output Directory: `dist`.
- Node.js: `24.x`, establecido en `package.json`.

El despliegue estático de Astro no requiere `@astrojs/vercel`. La página usa anclas internas y no necesita reglas de reescritura ni un `vercel.json` personalizado. El objetivo del build es producir `dist/index.html` y sus recursos antes de publicar.

## Contacto y pendientes del ejemplo

- Completar `https://wa.me/` con el número real en formato internacional, solo dígitos. Opcionalmente añadir `?text=` con el mensaje codificado.
- Confirmar el destinatario `hola@somosinformaticos.com`. `mailto:` abre el cliente de correo del visitante; no envía correos por sí mismo.
- Si se incorpora un formulario que envíe cotizaciones desde la página, conectar un servicio de formularios o una función de Vercel con un proveedor de correo. En ese caso, validar los datos y proteger el envío contra abuso; las claves privadas deben permanecer en el servidor. La landing puede continuar siendo estática.
- Añadir el video y su imagen de portada, o retirar sus referencias cuando se revise el diseño. Actualmente apuntan a archivos ausentes.
- Revisar como parte de las futuras mejoras que el contenido con `.reveal` siga siendo visible cuando JavaScript esté deshabilitado o falle.

## Referencias

- [Instalación de Astro](https://docs.astro.build/en/install-and-setup/).
- [Componentes Astro](https://docs.astro.build/en/basics/astro-components/).
- [Tailwind CSS con Astro](https://tailwindcss.com/docs/installation/framework-guides/astro).
- [Astro en Vercel](https://docs.astro.build/en/guides/deploy/vercel/).
- [Guía de SEO de Google](https://developers.google.com/search/docs/fundamentals/seo-starter-guide).
- [Versiones de Node.js en Vercel](https://vercel.com/docs/functions/runtimes/node-js/node-js-versions).
