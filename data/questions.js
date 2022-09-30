const questions = [
  {
    id: 1,
    title: '¿Qué te preocupa respecto a tu negocio? ',
    icon: 'bag',
    options: [
      { label: 'La competencia', type: 'option' },
      { label: 'Crisis (inflación, consumo, energía...)', type: 'option' },
      { label: 'Digitalización', type: 'option' }
      // { label: 'Otros', type: 'text' }
    ]
  },
  {
    id: 2,
    title:
      '¿Qué herramientas crees que van a ser claves para tu negocio en los próximos meses?',
    icon: 'engine',
    options: [
      { label: 'Análisis de dato (BI)', type: 'option' },
      { label: 'Herramientas de marketing y comunicación', type: 'option' },
      { label: 'Auto Formación para mi equipo y mis clientes', type: 'option' }
      // { label: 'Otros', type: 'text' }
    ]
  },
  {
    id: 3,
    title: '¿En qué podemos apoyar más a tu negocio?',
    icon: 'pen',
    options: [
      { label: 'En la captación de clientes', type: 'option' },
      {
        label: 'En la captación, crecimiento y desarrollo del talento',
        type: 'option'
      },
      {
        label: 'Análisis y toma de decisiones para el crecimiento de negocio',
        type: 'option'
      }
      // { label: 'Otros', type: 'text' }
    ]
  }
]

export default questions
