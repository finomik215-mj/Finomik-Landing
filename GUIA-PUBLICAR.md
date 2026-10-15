# Cómo publicar la nueva web de Finomik

La web nueva está en esta carpeta (`web-finomik`). Todavía **no está publicada**: finomik.com sigue mostrando la web antigua hasta que hagas los pasos de abajo.

Tiempo estimado: 20-30 minutos. No hace falta saber programar.

---

## Antes de publicar (obligatorio)

1. **Datos de la empresa:** ya están puestos (EduFin Tech, S.L., NIF B26790485, Registro Mercantil de Barcelona, hoja B-652147).
2. **Revisión legal.** Que alguien con criterio legal lea `/aviso-legal`, `/privacidad` y `/cookies`.

---

## Paso 1 · Ver la web en tu ordenador (opcional)

En Claude, pide: *"abre la web nueva"*. Se abre en `http://localhost:8798`.

## Cómo se publica

La web está en Vercel, conectada a tu repositorio de GitHub **finomik215-mj/Finomik-Landing**. Cada vez que llegan cambios a GitHub, Vercel publica solo:

- Cambios en la rama **main** → se publican en **finomik.com**.
- Cambios en **otra rama** (por ejemplo `web-nueva`) → Vercel crea una **vista previa** con su propia dirección y finomik.com no cambia.

La copia de git está en `~/FinomikLocal/Finomik-Landing` (fuera de iCloud, porque iCloud estropea git). No hace falta tocarla: el script la usa solo.

## Paso 2 · Vista previa (sin tocar finomik.com)

En el Terminal:

```
cd ~/Desktop/Trabajo/Finomik/web-finomik && sh herramientas/subir-github.sh web-nueva
```

En 1-2 minutos aparece la vista previa en vercel.com → tu proyecto → *Deployments* (la de la rama `web-nueva`). Ábrela y revisa todo, también desde el móvil.

## Paso 3 · Publicarla en finomik.com

Cuando la vista previa esté bien:

```
cd ~/Desktop/Trabajo/Finomik/web-finomik && sh herramientas/subir-github.sh
```

(sin nombre de rama = `main` = finomik.com).

**Si algo va mal:** en vercel.com → *Deployments*, elige la publicación anterior → **Instant Rollback**. La web antigua vuelve en segundos.

El archivo `vercel.json` (lo genera `build.py`) le dice a Vercel que la web ya viene montada en `public/`: no hay que cambiar nada en los ajustes del proyecto aunque antes fuera una web de React.

## Paso 4 · Estadísticas

Vercel → proyecto → pestaña **Analytics** → si no está activado, *Enable*. La web ya lleva el código y no usa cookies.

## Paso 5 · Que el botón «Publicar en la web» del panel del blog suba solo

Después de publicar la web nueva en finomik.com (paso 3), pon en `admin/config.json`: `"publicar": "sh herramientas/subir-github.sh"`. **No antes**: si no, el primer «Publicar» del blog sacaría la web nueva a finomik.com.

## Para que el Mac no vaya lento

El Escritorio se guarda en iCloud y, con «Optimizar almacenamiento», el Mac deja archivos de la web solo en la nube y los descarga cuando hacen falta: por eso a veces publicar tarda minutos. En Finder, clic derecho en la carpeta `web-finomik` → **Mantener descargado**.

## Paso 6 · Comprobar el formulario de demo

1. Abre finomik.com/demo y envía una solicitud de prueba con tu email.
2. Comprueba que llega a hello@finomik.com (el formulario usa la cuenta de Formspree de siempre).
3. En formspree.io, revisa que el formulario siga activo y el plan: el gratuito tiene un número limitado de envíos al mes.

Cuando el CRM tenga una dirección para recibir solicitudes, Claude cambia una sola línea (`FORM_ENDPOINT` en `public/assets/site.js`).

## Paso 7 · Avisar a Google

1. Entra en search.google.com/search-console con la cuenta de Finomik.
2. Añade la propiedad `finomik.com` (si no existe) y verifícala como te indique (suele ser un registro DNS).
3. En *Sitemaps*, envía: `https://finomik.com/sitemap.xml`
4. En unos días, revisa *Páginas* para ver que Google indexa las nuevas.

Las direcciones de la web antigua (`/privacy`, `/terms`, `/articulo/...`, `/solutions/...`) redirigen solas a las nuevas, así que no se pierde lo que ya está en Google.

## Paso 8 · Probar en móviles reales

Abre finomik.com en un iPhone (Safari) y en un Android (Chrome) y recorre: inicio, alumnos (toca la demo), profesores, demo y blog.

---

## El blog: panel para administrarlo

En Claude, pide *"abre el panel del blog"* (o en el Terminal: `python3 ~/Desktop/Trabajo/Finomik/web-finomik/admin/servidor.py` y abre http://localhost:8799).

- **Artículos:** todos los artículos, con su estado (borrador o publicado).
- **Editar:** cuatro pasos: Ajustes (fecha, destacado, imagen) → Castellano → Inglés → Revisar y publicar.
- **Vista previa:** enseña el artículo tal y como se verá, aunque sea borrador.
- **Eliminar:** lo manda a la papelera; desde Papelera se recupera.
- **Publicar en la web:** monta el blog con los artículos publicados. Cuando esté configurado (paso 5), también la sube a GitHub y Vercel la publica.

Cuando esté el servidor de ops.finomik.com, el panel se sube allí, detrás del login, para usarlo desde cualquier sitio.

## Cómo se edita la web a partir de ahora

- El contenido de cada página está en `src/paginas/es/` (castellano) y `src/paginas/en/` (inglés).
- Los artículos del blog están en `src/blog/posts/` (un archivo por artículo, con castellano e inglés). Mejor editarlos con el panel.
- Estilos y animaciones: `public/assets/site.css` y `public/assets/site.js`.
- Después de cualquier cambio se ejecuta `python3 build.py`, que vuelve a montar todas las páginas en `public/`.
- Imágenes para compartir (LinkedIn, WhatsApp): `node herramientas/og.js`.

Lo más fácil: pedírselo a Claude ("cambia este texto", "añade un artículo") y luego volver a publicar con `sh herramientas/subir-github.sh`.
