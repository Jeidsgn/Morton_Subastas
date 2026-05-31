# Dashboard Público de Morton Gallery - Análisis de Precios y Factores de Éxito en Subastas

## 📋 Descripción

Este dashboard público es una herramienta de visualización de datos diseñada para la **Morton Gallery**, mostrando análisis de precios, factores de éxito en subastas de arte contemporáneo y visualización de variables críticas mediante Machine Learning.

### Objetivo Principal

Proporcionar una vista clara e interactiva de los factores que influyen en el éxito de las subastas, utilizando visualizaciones avanzadas y análisis de Machine Learning (SHAP, UMAP, análisis de tópicos semánticos).

---

## 🚀 Cómo Usar el Dashboard

### Opción 1: Abrir Localmente

1. **Descargar el archivo** `index.html` a su computadora
2. **Abrir el archivo** directamente con cualquier navegador web moderno (Chrome, Firefox, Safari, Edge)
3. El dashboard se cargará automáticamente sin necesidad de servidor

### Opción 2: Desde GitHub Pages

1. Este repositorio puede alojar el dashboard en **GitHub Pages**
2. Configurar en: `Settings > Pages > /main` o `/master`
3. El dashboard estará disponible en: `https://username.github.io/repo-name/`

---

## 📊 Contenido del Dashboard

### Diapositiva 1: La Ilusión del Orden
- Gráficos de rangos de precios (Mínimo, Máximo y Medio)
- Tarjetas KPI con estadísticas clave
- Visualización de la distribución de lotes por categoría

### Diapositiva 2: El Interior de la Caja Negra
- Análisis de SHAP Values para interpretar variables del modelo
- Forças Plot mostrando la influencia de cada variable
- Importancia de características en la predicción de resultados

### Diapositiva 3: El Espacio Semántico
- Análisis de tópicos semánticos (BERTopic)
- Residuales estandarizados por tópico
- Pesos de tópicos en la predicción

### Diapositiva 4: La Geometría del Objeto
- Visualización 3D de obras reducidas mediante UMAP
- Distribución por tamaño de formato
- Análisis de características físicas

### Diapositiva 5: La Red de Afinidades
- Red KNN mostrando afinidades entre obras
- Distribución por medios artísticos
- Análisis de red de relaciones entre lotes

---

## 🎨 Tecnologías Utilizadas

### Frontend
- **HTML5** + **CSS3** - Estructura y estilo
- **JavaScript (ES6+)** - Lógica del dashboard
- **Plotly.js 2.27.0** - Gráficos interactivos profesionales
- **Google Fonts** - Tipografía Hanken Grotesk y Open Sans

### Análisis de Datos (Backend - no visible en frontend)
- **Machine Learning** - Modelos predictivos con SHAP
- **NLP** - Procesamiento de lenguaje con BERTopic
- **Reducción Dimensional** - Algoritmo UMAP
- **Graph Theory** - Análisis de redes con KNN

### Estilo
- **Paleta de colores**: Azul (#457B9D), Verde (#00A86B), Rojo (#E76F51), Gris (#264653)
- **Diseño responsivo**: Funciona en desktop y tablet
- **Tipografía**: Hanken Grotesk (moderna, técnica)

---

## 📁 Estructura de Archivos

```
Morton_Subastas/Github/
├── README_dashboard.md   # Este archivo (documentación)
├── index.html            # Archivo principal HTML
├── styles.css            # Estilos CSS
├── app.js                # Lógica JavaScript y gráficos
└── README.md             # README del repositorio principal
```

---

## 🌐 Datos de Muestra

El dashboard utiliza datos simulados para demostración:

- **455 lotes** en el catálogo completo
- **418 lotes** con precios de venta conocidos
- **37 obras** de artistas reconocidos
- **Variables analizadas**: precio, volumen, orden de subasta, tópicos, dimensiones, etc.

> **Nota**: Los datos son anónimos y representativos del conjunto completo. En producción, se cargarían datos reales desde una API.

---

## 🔄 Estado de Desarrollo

### Actualidad
- ✅ Dashboard visualmente completo
- ✅ 5 diapositivas funcionales
- ✅ Gráficos interactivos con Plotly
- ✅ Responsive design
- ✅ Datos de ejemplo incluidos

### Próximamente
- [ ] Botón de compartir en redes
- [ ] Exportación de gráficos como imagen
- [ ] Modo oscuro
- [ ] Animaciones de entrada
- [ ] Datos reales conectados

---

## 📞 Soporte

Para reportar problemas o solicitar características:

- **Repositorio**: https://github.com/MortonGallery
- **Email**: soporte@mortongallery.com
- **Issues**: https://github.com/MortonGallery/issues

---

## 📜 Licencia

Este dashboard se distribuye bajo la licencia **MIT**. Puede ser utilizado, modificado y distribuido libremente.

---

## 🎯 Para Desarrolladores

### Estructura del Código

#### `index.html`
Contiene la estructura de 5 secciones (diapositivas), cada una con:
- Bloque narrativo (texto explicativo)
- Tarjetas KPI con estadísticas
- Contenedor para gráficos de Plotly

#### `styles.css`
Define:
- Variables de color
- Tipografía
- Layout responsivo
- Estilos de gráficos
- Media queries para mobile

#### `app.js`
Contiene:
- Datos de ejemplo
- Funciones de renderizado por diapositiva
- Configuración de gráficos Plotly
- Event listeners para interactividad

### Personalizando el Dashboard

1. **Cambiar colores** en `styles.css` en la sección `:root`
2. **Modificar datos** en `app.js` en la variable `dashboardData`
3. **Añadir diapositivas** copiando la estructura de las existentes en `index.html`

### Añadir Más Gráficos

1. Añadir nueva variable en `dashboardData`
2. Crear nuevo trace en `app.js`
3. Configurar layout correspondiente
4. Llamar a `Plotly.newPlot()` con el ID del contenedor

---

## 🔒 Privacidad

Este dashboard es una herramienta de análisis público. No recopila información de los visitantes y todos los datos están estáticos en el frontend.

---

## 📄 Créditos

Desarrollado por el equipo de **Morton Gallery** con:
- Análisis de Machine Learning y Data Science
- Visualización con Plotly.js
- Diseño responsive con HTML5/CSS3

---

**Última actualización**: 2024
**Versión**: 1.0.0
**Lenguaje**: Español
