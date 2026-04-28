# Landing Restructure — Design Spec

**Date:** 2026-04-28
**Status:** Approved

---

## Overview

Reestructuración de la landing page de Finomik para separar los dos modelos de negocio (Colegios y Bancos) en páginas dedicadas, manteniendo la home como página general de marca.

---

## Cambios en la Home (`App.tsx`)

### Navbar
- Reemplazar "Misión · Soluciones · Por qué Finomik · Contacto" por **"Colegios · Bancos · Contacto"** + botón "Solicitar información"
- Links nuevos: `/colegios` y `/bancos`

### Secciones
- **Eliminar** la sección "Para ti" (dashboard del profesor) — se mueve a `/colegios`
- **Reordenar** secciones restantes para evitar fondos blancos consecutivos. Orden propuesto:
  1. Hero (azul oscuro)
  2. Stats (blanco)
  3. Mission (azul oscuro)
  4. Features (blanco)
  5. **Nuevo bloque:** Selector de segmento — "¿Eres un colegio o un banco?" con dos tarjetas CTA (azul medio)
  6. Why Finomik (blanco o azul suave)
  7. SocialProof / Stats (azul oscuro)
  8. Footer CTA

### Nuevo bloque: Selector de segmento
- Dos tarjetas grandes: "Para Colegios" y "Para Bancos"
- Cada una con un título, subtítulo de 1 línea y botón que lleva a la página correspondiente
- Fondo: `#114076`

---

## Página `/colegios` (`pages/Colegios.tsx`)

### Secciones (en orden)

1. **Hero**
   - Título: "La educación financiera que los jóvenes necesitan"
   - Subtítulo: "Un programa adaptado a cada colegio, diseñado para que tus alumnos desarrollen habilidades financieras reales desde el primer día"
   - CTA: "Solicitar información"
   - Fondo: azul oscuro (`#0B3064`)

2. **El programa es tuyo**
   - El colegio elige los temas, se crea un programa personalizado
   - Lista de beneficios: flexibilidad de contenido, adaptación al número de alumnos y tiempos del centro
   - Fondo: blanco

3. **Un camino financiero para cada alumno** *(IA + personalización)*
   - La IA adapta el ritmo de aprendizaje a cada alumno
   - Aclaración explícita: aunque cada alumno avanza a su propio ritmo, todos terminan con el mismo nivel de conocimiento y habilidades
   - Fondo: azul oscuro (`#114076`)

4. **Dashboard del profesor** *(movido desde la home)*
   - Reutiliza el componente existente: simulación de vista de seguimiento de clase
   - Muestra progreso de alumnos, quién va bien, quién va retrasado
   - Título: "Tú tienes el control" o similar
   - Fondo: blanco/azul suave

5. **Certificados**
   - Cada alumno obtiene un certificado al completar el programa
   - Sección corta con icono y descripción breve
   - Fondo: azul oscuro

6. **CTA final**
   - "Solicita información para tu colegio" → `/more-info`

---

## Página `/bancos` (`pages/Bancos.tsx`)

### Secciones (en orden)

1. **Hero**
   - Título: "Clientes mejor educados, decisiones financieras más sólidas"
   - Subtítulo: "Finomik convierte conceptos como renta fija, renta variable o diversificación en entendimiento real y aplicable, permitiendo que los clientes lleguen a tus soluciones con mayor criterio y mayor seguridad en sus decisiones"
   - CTA: "Solicitar reunión"
   - Fondo: azul oscuro (`#0B3064`)

2. **El problema**
   - Los clientes no tienen la educación financiera suficiente para acceder con seguridad a ciertos productos del banco
   - Esta falta de conocimiento genera fricción, inseguridad y rechazo ante propuestas de inversión, ahorro o planificación
   - Finomik lo resuelve educando al cliente dentro del propio ecosistema del banco
   - Fondo: blanco

3. **Cómo funciona**
   - 3-4 pasos: el banco integra Finomik → el cliente aprende → entiende conceptos financieros en contexto → llega con más confianza y criterio a las decisiones
   - Fondo: azul oscuro

4. **Beneficios para el banco**
   - 3 columnas:
     1. Más relevancia y engagement continuo (no solo momentos transaccionales)
     2. Mejor conversión en productos de ahorro, inversión y planificación
     3. Visión del comportamiento financiero del cliente para anticiparse a sus necesidades
   - Fondo: blanco/azul suave

5. **Conceptos que dejan de dar miedo**
   - Renta fija, renta variable, diversificación, gestión del riesgo: dejan de ser abstractos
   - El cliente llega con menos miedo y mayor confianza → menos fricción en la venta
   - Fondo: azul oscuro

6. **La relación banco-cliente cambia**
   - El banco deja de ser solo un proveedor de servicios transaccionales
   - Se convierte en un aliado del crecimiento financiero del cliente
   - Fondo: blanco

7. **CTA final**
   - "Hablemos de cómo integrarlo en tu banco" → `/more-info`

---

## Técnico

- **Nuevos archivos:** `pages/Colegios.tsx`, `pages/Bancos.tsx`
- **Modificados:** `App.tsx` (navbar + eliminar "Para ti" + añadir selector), `index.tsx` (nuevas rutas)
- **Rutas nuevas:** `/colegios`, `/bancos`
- **i18n:** ES/EN/CA completo en ambas páginas nuevas, usando el hook `useI18n` existente
- **Componentes reutilizados:** `WaveShape`, `FadeInSection`, `Button`, dashboard existente de App.tsx
- **Coherencia visual:** misma paleta, tipografía Montserrat, animaciones FadeIn, ondas de marca

---

## Restricciones

- No inventar métricas ni datos sin base real
- No mencionar la ESO en el hero de Colegios
- Mantener el tono de marca: claro, cercano, profesional, con propósito
- i18n completo en todos los textos nuevos
