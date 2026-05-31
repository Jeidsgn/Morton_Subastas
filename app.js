/**
 * Dashboard de Morton Gallery - App Principal
 * Renderiza todas las gráficas del dashboard público
 */

(function() {
  'use strict';

  // ============================================================
  // VARIABLES GLOBALES DEL DASHBOARD
  // ============================================================

  // Datos simulados para el dashboard (en producción se cargarían del JSON)
  const dashboardData = {
    // Diapositiva 1: Rangos de precio
    slide1Data: {
      ranges: [
        { category: 'Más', min: 150000, max: 8500000, median: 2500000, count: 89 },
        { category: 'Estimado', min: 15000, max: 450000, median: 85000, count: 456 },
        { category: 'Menos', min: 5000, max: 180000, median: 35000, count: 67 },
        { category: 'Retirado', min: 5000, max: 120000, median: 12000, count: 23 }
      ],
      histogramData: [
        { label: 'Mínimo', value: 5000, color: '#457B9D' },
        { label: 'Medio', value: 125000, color: '#00453F' },
        { label: 'Máximo', value: 8500000, color: '#C7E1F4' }
      ]
    },

    // Diapositiva 2: SHAP Values
    slide2Data: {
      featureImportance: [
        { feature: 'orden_lote', value: -0.32, importance: 0.18 },
        { feature: 'volumen_obra', value: 0.28, importance: 0.15 },
        { feature: 'artista', value: 0.21, importance: 0.12 },
        { feature: 'procedencia', value: 0.15, importance: 0.09 },
        { feature: 'escuela', value: 0.12, importance: 0.07 },
        { feature: 'dimension_x', value: 0.08, importance: 0.05 },
        { feature: 'dimension_y', value: 0.05, importance: 0.03 },
        { feature: 'dimension_z', value: 0.02, importance: 0.02 },
        { feature: 'is_retirado', value: -0.45, importance: 0.34 }
      ],
      forcesData: {
        positive: [
          { feature: 'Orden Alto', value: 0.45 },
          { feature: 'Volumen Grande', value: 0.38 },
          { feature: 'Artista Renowned', value: 0.52 }
        ],
        negative: [
          { feature: 'Orden Bajo', value: -0.32 },
          { feature: 'Retirado', value: -0.45 },
          { feature: 'Volumen Pequeño', value: -0.25 }
        ]
      }
    },

    // Diapositiva 3: Análisis de texto
    slide3Data: {
      topicWeights: [
        { topic: 'abstract', weight: 0.35, impact: 0.28 },
        { topic: 'paisaje', weight: 0.22, impact: 0.15 },
        { topic: 'retrato', weight: 0.18, impact: -0.12 },
        { topic: 'abstracto_geometrico', weight: 0.15, impact: 0.32 },
        { topic: 'expresionismo', weight: 0.12, impact: 0.18 },
        { topic: 'minimalista', weight: 0.08, impact: 0.25 }
      ],
      residualData: [
        { topic: 'Abstracto', residual: 1.8 },
        { topic: 'Paisaje', residual: 1.2 },
        { topic: 'Retrato', residual: -1.4 },
        { topic: 'Geométrico', residual: 2.1 },
        { topic: 'Expresionismo', residual: 0.9 },
        { topic: 'Minimalista', residual: 1.6 }
      ]
    },

    // Diapositiva 4: UMAP 3D
    slide4Data: {
      umapPoints: Array.from({ length: 50 }, (_, i) => ({
        lot_id: i + 1,
        x: (Math.random() - 0.5) * 2,
        y: (Math.random() - 0.5) * 2,
        z: (Math.random() - 0.5) * 2,
        label: `Lote ${String(i + 1).padStart(3, '0')}`,
        color: i % 3 === 0 ? '#94D2BD' : i % 3 === 1 ? '#9ECAE1' : '#D5F4E6'
      })),
      formatDistribution: [
        { size: 'Pequeños', count: 156, color: '#94D2BD' },
        { size: 'Medios', count: 234, color: '#9ECAE1' },
        { size: 'Grandes', count: 67, color: '#D5F4E6' }
      ]
    },

    // Diapositiva 5: Red KNN
    slide5Data: {
      networkNodes: Array.from({ length: 30 }, (_, i) => ({
        id: i + 1,
        label: `Lote ${String(i + 1).padStart(3, '0')}`,
        category: ['oleo_tela', 'acuarela', 'oleo_papel', 'grafito', 'mixed_media'][i % 5],
        degree: 3 + Math.floor(Math.random() * 10)
      })),
      networkEdges: Array.from({ length: 60 }, (_, i) => ({
        source: Math.floor(Math.random() * 30) + 1,
        target: Math.floor(Math.random() * 30) + 1,
        weight: 0.3 + Math.random() * 0.7
      }))
    },

    mediumDistribution: [
      { medium: 'Óleo sobre tela', value: 320, color: '#457B9D' },
      { medium: 'Acuarela', value: 180, color: '#00A86B' },
      { medium: 'Óleo sobre papel', value: 250, color: '#E76F51' },
      { medium: 'Grafito', value: 95, color: '#264653' },
      { medium: 'Mixed Media', value: 215, color: '#3D5A80' }
    ]
  };

  // ============================================================
  // FUNCIONES DE RENDERIZADO DE GRÁFICOS
  // ============================================================

  /**
   * Renderiza todas las gráficas del dashboard
   */
  function renderAllCharts() {
    console.log('🎨 Iniciando renderizado de gráficas del dashboard');

    renderSlide1Charts();
    renderSlide2Charts();
    renderSlide3Charts();
    renderSlide4Charts();
    renderSlide5Charts();

    console.log('✅ Todas las gráficas renderizadas');
  }

  /**
   * Diapositiva 1: Rangos de precio
   */
  function renderSlide1Charts() {
    console.log('📊 Renderizando Diapositiva 1: Rangos de Precio');

    // Gráfico 1: Histograma de rangos
    const trace1 = {
      type: 'histogram',
      x: [
        Array.from({ length: 50 }, (_, i) => 5000 + i * 166667), // Mínimo
        Array.from({ length: 50 }, (_, i) => 15000 + i * 8695),  // Medio
        Array.from({ length: 50 }, (_, i) => 5000 + i * 650000)  // Máximo
      ],
      nbinsx: 50,
      marker: {
        color: ['#457B9D', '#00A86B', '#E76F51', '#264653'],
        line: { color: 'white', width: 0.5 }
      },
      name: ['Mínimo', 'Medio', 'Máximo', 'Retirado'],
      opacity: 0.75,
      showlegend: false
    };

    // Gráfico 2: Conteo de lotes por categoría
    const trace2 = {
      type: 'bar',
      x: ['Más', 'Estimado', 'Menos', 'Retirado'],
      y: [89, 456, 67, 23],
      marker: {
        color: ['#D5F4E6', '#94D2BD', '#9ECAE1', '#E76F51'],
        line: { color: 'white', width: 2 }
      },
      textposition: 'auto',
      text: ['89', '456', '67', '23'],
      name: 'Conteo',
      opacity: 0.85
    };

    const layout = {
      title: 'Distribución de Rangos de Precio',
      margin: { t: 50, b: 50, l: 60, r: 40 },
      paper_bgcolor: '#FFFFFF',
      plot_bgcolor: '#FFFFFF',
      font: { family: 'Hanken Grotesk, sans-serif', size: 12 },
      xaxis: {
        title: 'Categoría de Lote',
        gridcolor: '#e5e5e5',
        tickfont: { size: 10 }
      },
      yaxis: {
        title: 'Número de Lotes',
        gridcolor: '#e5e5e5',
        tickfont: { size: 10 }
      }
    };

    Plotly.newPlot('chart-price-ranges', [trace2], layout, { responsive: true });
    console.log('✅ Gráfico 1 (rangos) renderizado');
  }

  /**
   * Diapositiva 2: SHAP Analysis
   */
  function renderSlide2Charts() {
    console.log('📊 Renderizando Diapositiva 2: Análisis SHAP');

    // Gráfico 1: Importancia de variables SHAP
    const shapTrace = {
      type: 'bar',
      x: dashboardData.slide2Data.featureImportance.map(f => f.feature),
      y: dashboardData.slide2Data.featureImportance.map(f => f.importance * 100),
      marker: {
        color: dashboardData.slide2Data.featureImportance.map((f, i) => {
          // Colores según signo del valor
          if (f.value > 0) return '#00A86B'; // Positivo
          if (f.value < 0) return '#E76F51'; // Negativo
          return '#457B9D';
        })
      },
      text: dashboardData.slide2Data.featureImportance.map(f => f.value.toFixed(2)),
      textposition: 'outside',
      hoverinfo: 'x+y+text',
      orientation: 'v',
      yaxis: { title: 'Importancia (%)' }
    };

    const shapLayout = {
      title: 'Importancia de Variables SHAP',
      margin: { t: 60, b: 60, l: 60, r: 40 },
      paper_bgcolor: '#FFFFFF',
      plot_bgcolor: '#FFFFFF',
      font: { family: 'Hanken Grotesk, sans-serif', size: 12 },
      xaxis: { title: 'Variable', gridcolor: '#e5e5e5' },
      yaxis: { title: 'Importancia (%)', gridcolor: '#e5e5e5' }
    };

    Plotly.newPlot('chart-shap-values', [shapTrace], shapLayout, { responsive: true });
    console.log('✅ Gráfico SHAP bar renderizado');

    // Gráfico 2: Forces Plot de Shapley
    const forcesTrace = {
      type: 'scatter',
      mode: 'markers',
      x: dashboardData.slide2Data.forcesData.positive.map(f => f.value)
        .concat(dashboardData.slide2Data.forcesData.negative.map(f => f.value)),
      y: Array.from({ length: 14 }, (_, i) => i),
      text: dashboardData.slide2Data.forcesData.positive.map(f => f.feature)
        .concat(dashboardData.slide2Data.forcesData.negative.map(f => f.feature)),
      hoverinfo: 'text+x',
      marker: {
        size: 8,
        line: { width: 2, color: 'white' },
        colorscale: 'Hot'
      }
    };

    const forcesLayout = {
      title: 'Forces Plot de Valores Shapley',
      margin: { t: 60, b: 80, l: 80, r: 40 },
      paper_bgcolor: '#FFFFFF',
      plot_bgcolor: '#FFFFFF',
      font: { family: 'Hanken Grotesk, sans-serif', size: 12 },
      xaxis: {
        title: 'Valor SHAP',
        range: [-0.6, 0.6],
        gridcolor: '#e5e5e5'
      },
      yaxis: {
        title: 'Puntos',
        showgrid: false,
        gridcolor: '#e5e5e5'
      }
    };

    Plotly.newPlot('chart-shap-forces', [forcesTrace], forcesLayout, { responsive: true });
    console.log('✅ Gráfico SHAP forces renderizado');
  }

  /**
   * Diapositiva 3: Análisis de texto
   */
  function renderSlide3Charts() {
    console.log('📊 Renderizando Diapositiva 3: Análisis de Texto');

    // Gráfico 1: Pesos de tópicos
    const topicTrace = {
      type: 'bar',
      x: dashboardData.slide3Data.topicWeights.map(t => t.topic.replace(/_/g, ' ')),
      y: dashboardData.slide3Data.topicWeights.map(t => t.weight * 100),
      marker: {
        color: dashboardData.slide3Data.topicWeights.map((t, i) => {
          // Colores cíclicos
          const colors = ['#457B9D', '#00A86B', '#E76F51', '#264653', '#3D5A80', '#94D2BD'];
          return colors[i % colors.length];
        })
      },
      text: dashboardData.slide3Data.topicWeights.map(t => (t.weight * 100).toFixed(0)),
      textposition: 'auto',
      textfont: { size: 9 }
    };

    const topicLayout = {
      title: 'Pesos de Tópicos Semánticos',
      margin: { t: 60, b: 60, l: 60, r: 40 },
      paper_bgcolor: '#FFFFFF',
      plot_bgcolor: '#FFFFFF',
      font: { family: 'Hanken Grotesk, sans-serif', size: 12 },
      xaxis: {
        title: 'Tópico',
        tickangle: -45,
        gridcolor: '#e5e5e5'
      },
      yaxis: {
        title: 'Peso (%)',
        gridcolor: '#e5e5e5'
      }
    };

    Plotly.newPlot('chart-topic-weights', [topicTrace], topicLayout, { responsive: true });
    console.log('✅ Gráfico topic weights renderizado');

    // Gráfico 2: Residuales por tópico
    const residualTrace = {
      type: 'scatter',
      mode: 'markers+text',
      x: dashboardData.slide3Data.residualData.map(r => r.topic.replace(/ /g, '\n')),
      y: dashboardData.slide3Data.residualData.map(r => r.residual),
      text: dashboardData.slide3Data.residualData.map(r => r.topic),
      hoverinfo: 'text+y',
      marker: {
        size: 12,
        line: { width: 2, color: 'white' },
        color: dashboardData.slide3Data.residualData.map(r => {
          if (r.residual > 1) return '#00A86B'; // Positivo fuerte
          if (r.residual < -1) return '#E76F51'; // Negativo fuerte
          return '#457B9D';
        })
      },
      type: 'scatter',
      xaxis: {
        title: 'Tópico',
        tickangle: -45
      },
      yaxis: {
        title: 'Residual Estandarizado',
        gridcolor: '#e5e5e5'
      }
    };

    const residualLayout = {
      title: 'Residuales Estandarizados por Tópico',
      margin: { t: 60, b: 60, l: 60, r: 40 },
      paper_bgcolor: '#FFFFFF',
      plot_bgcolor: '#FFFFFF',
      font: { family: 'Hanken Grotesk, sans-serif', size: 12 },
      xaxis: { gridcolor: '#e5e5e5' },
      yaxis: { gridcolor: '#e5e5e5' }
    };

    Plotly.newPlot('chart-topic-residuals', [residualTrace], residualLayout, { responsive: true });
    console.log('✅ Gráfico topic residuals renderizado');
  }

  /**
   * Diapositiva 4: UMAP 3D
   */
  function renderSlide4Charts() {
    console.log('📊 Renderizando Diapositiva 4: Espacio UMAP 3D');

    // Gráfico 1: UMAP 3D
    const umapTrace = {
      type: 'scatter3d',
      mode: 'markers',
      x: dashboardData.slide4Data.umapPoints.map(p => p.x),
      y: dashboardData.slide4Data.umapPoints.map(p => p.y),
      z: dashboardData.slide4Data.umapPoints.map(p => p.z),
      text: dashboardData.slide4Data.umapPoints.map(p => p.label),
      hoverinfo: 'text',
      marker: {
        size: 6,
        opacity: 0.8,
        color: dashboardData.slide4Data.umapPoints.map(p => p.color),
        line: { width: 0.5 }
      },
      type: 'scatter3d',
      showscale: true,
      colorscale: 'Jet'
    };

    const umapLayout = {
      title: 'Reducción Dimensional UMAP 3D',
      margin: { t: 60, b: 80, l: 60, r: 40 },
      paper_bgcolor: '#FFFFFF',
      plot_bgcolor: '#FFFFFF',
      font: { family: 'Hanken Grotesk, sans-serif', size: 12 },
      scene: {
        xaxis: {
          title: 'Dimensión X',
          gridcolor: '#e5e5e5',
          backgroundcolor: '#FFFFFF'
        },
        yaxis: {
          title: 'Dimensión Y',
          gridcolor: '#e5e5e5',
          backgroundcolor: '#FFFFFF'
        },
        zaxis: {
          title: 'Dimensión Z',
          gridcolor: '#e5e5e5',
          backgroundcolor: '#FFFFFF'
        },
        camera: {
          eye: { x: 1.5, y: 1.5, z: 1.5 }
        }
      }
    };

    Plotly.newPlot('chart-umap-3d', [umapTrace], umapLayout, { responsive: true });
    console.log('✅ Gráfico UMAP 3D renderizado');

    // Gráfico 2: Distribución por tamaño
    const formatTrace = {
      type: 'bar',
      x: dashboardData.slide4Data.formatDistribution.map(f => f.size),
      y: dashboardData.slide4Data.formatDistribution.map(f => f.count),
      marker: {
        color: dashboardData.slide4Data.formatDistribution.map(f => f.color),
        line: { color: 'white', width: 2 }
      },
      text: dashboardData.slide4Data.formatDistribution.map(f => f.count),
      textposition: 'auto'
    };

    const formatLayout = {
      title: 'Distribución por Tamaño de Formato',
      margin: { t: 60, b: 60, l: 60, r: 40 },
      paper_bgcolor: '#FFFFFF',
      plot_bgcolor: '#FFFFFF',
      font: { family: 'Hanken Grotesk, sans-serif', size: 12 },
      xaxis: { gridcolor: '#e5e5e5' },
      yaxis: { gridcolor: '#e5e5e5' }
    };

    Plotly.newPlot('chart-format-size', [formatTrace], formatLayout, { responsive: true });
    console.log('✅ Gráfico format distribution renderizado');
  }

  /**
   * Diapositiva 5: Red KNN
   */
  function renderSlide5Charts() {
    console.log('📊 Renderizando Diapositiva 5: Red KNN');

    // Gráfico 1: Red de afinidades KNN
    const networkTrace = {
      type: 'graph',
      x: Array.from({ length: 30 }, (_, i) => Math.cos(i * 0.5)),
      y: Array.from({ length: 30 }, (_, i) => Math.sin(i * 0.5)),
      node: {
        label: dashboardData.slide5Data.networkNodes.map(n => n.label),
        x: Array.from({ length: 30 }, (_, i) => Math.cos(i * 0.5)),
        y: Array.from({ length: 30 }, (_, i) => Math.sin(i * 0.5)),
        sizetype: 'degree',
        sizeref: 1,
        color: dashboardData.slide5Data.networkNodes.map(n => {
          const colors = ['#457B9D', '#00A86B', '#E76F51', '#264653', '#3D5A80'];
          return colors[n.category.split('_')[0] === 'oleo' ? 0 : 1];
        }),
        line: {
          width: 2
        }
      },
      edge: {
        opacity: 0.3,
        colorbar: {
          title: 'Weight'
        },
        color: dashboardData.slide5Data.networkEdges.map(e => e.weight)
      },
      hovermode: 'closest'
    };

    const networkLayout = {
      title: 'Red de Afinidades KNN',
      margin: { t: 60, b: 80, l: 80, r: 40 },
      paper_bgcolor: '#FFFFFF',
      plot_bgcolor: '#FFFFFF',
      font: { family: 'Hanken Grotesk, sans-serif', size: 12 },
      scene: {
        camera: {
          eye: { x: 1.5, y: 1.5, z: 1.5 }
        }
      }
    };

    Plotly.newPlot('chart-knn-network', [networkTrace], networkLayout, { responsive: true });
    console.log('✅ Gráfico KNN network renderizado');

    // Gráfico 2: Distribución por medios
    const mediumTrace = {
      type: 'bar',
      x: dashboardData.mediumDistribution.map(m => m.medium.replace(/[^a-zA-Z\s]/g, '')),
      y: dashboardData.mediumDistribution.map(m => m.value),
      marker: {
        color: dashboardData.mediumDistribution.map(m => m.color),
        line: { color: 'white', width: 2 }
      },
      text: dashboardData.mediumDistribution.map(m => m.value),
      textposition: 'auto'
    };

    const mediumLayout = {
      title: 'Distribución por Medios Artísticos',
      margin: { t: 60, b: 60, l: 60, r: 40 },
      paper_bgcolor: '#FFFFFF',
      plot_bgcolor: '#FFFFFF',
      font: { family: 'Hanken Grotesk, sans-serif', size: 12 },
      xaxis: { gridcolor: '#e5e5e5' },
      yaxis: { gridcolor: '#e5e5e5' }
    };

    Plotly.newPlot('chart-medium-types', [mediumTrace], mediumLayout, { responsive: true });
    console.log('✅ Gráfico medium types renderizado');
  }

  // ============================================================
  // INICIALIZACIÓN
  // ============================================================

  // Esperar a que el DOM esté listo
  document.addEventListener('DOMContentLoaded', function() {
    console.log('🎨 Dashboard Morton Gallery - Inicialización');
    console.log('📊 Renderizando todas las gráficas...');

    renderAllCharts();
  });

})();
