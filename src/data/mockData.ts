import { CaseStudy, FAQItem } from '../types';

export const CASE_STUDIES: CaseStudy[] = [
  {
    id: 'nova-finance',
    title: 'Nova Asesores Financieros',
    client: 'Nova Consultores',
    category: 'Servicios',
    metric: '+185%',
    metricLabel: 'Más Solicitudes de Clientes',
    tag: 'Web Corporativa • Captación de Leads',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=1200&auto=format&fit=crop'
    ],
    challenge: 'Nova dependía únicamente de recomendaciones de boca a boca y no lograba captar clientes nuevos a través de internet debido a un sitio web desactualizado y sin llamados a la acción.',
    solution: 'Diseñamos una página web moderna y rápida con estructura de ventas persuasiva, calculadora de ahorro para potenciales clientes y botón directo a WhatsApp empresarial.',
    results: [
      '+185% de incremento en consultas de nuevos clientes el primer mes',
      'Más de 45 llamadas de asesoría agendadas en piloto automático',
      'Posicionamiento en los primeros lugares de búsqueda local en Google'
    ],
    techStack: ['React', 'TypeScript', 'Tailwind CSS', 'WhatsApp Business API', 'Google SEO Local'],
    testimonial: {
      quote: 'Agilweb entendió exactamente las necesidades de nuestra microempresa. En solo dos semanas teníamos una web profesional que ahora nos genera clientes todos los días.',
      author: 'Alejandro Ramos',
      role: 'Director General en Nova Consultores',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop'
    },
    duration: '2 Semanas',
    url: 'https://novafinance.example.com'
  },
  {
    id: 'lumina-lighting',
    title: 'Lumina Iluminación & Deco',
    client: 'Lumina Taller Creativo',
    category: 'E-commerce',
    metric: '+240%',
    metricLabel: 'Incremento en Ventas Online',
    tag: 'Tienda Online • E-commerce Emprendedor',
    image: 'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?q=80&w=1200&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?q=80&w=1200&auto=format&fit=crop'
    ],
    challenge: 'Un emprendimiento de lámparas artesanales que vendía solo por Instagram y perdía horas respondiendo mensajes manualmente sin una pasarela de pago ágil.',
    solution: 'Implementamos una tienda online ultrarrápida con catálogo visual interactivo, pasarela de pago instantánea con Bizum y tarjetas, y cálculo de envíos automático.',
    results: [
      '+240% en facturación digital durante el primer trimestre',
      'Ahorro de más de 15 horas semanales en gestión manual de pedidos',
      'Ticket promedio de compra incrementado en un 38%'
    ],
    techStack: ['E-commerce Headless', 'Stripe & Bizum Checkout', 'Tailwind CSS', 'SEO para Tiendas'],
    testimonial: {
      quote: 'Pasamos de anotar pedidos en un cuaderno a tener una tienda online profesional que vende sola las 24 horas del día. El mejor paso para nuestro emprendimiento.',
      author: 'Chiara Moretti',
      role: 'Fundadora de Lumina Taller',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=200&auto=format&fit=crop'
    },
    duration: '3 Semanas',
    url: 'https://lumina.example.com'
  },
  {
    id: 'vant-co',
    title: 'Vant & Co. Estudio de Arquitectura',
    client: 'Vant Arquitectura',
    category: 'Servicios',
    metric: '4.2x',
    metricLabel: 'Más Proyectos Residenciales',
    tag: 'Portafolio de Alto Impacto • Web Inmobiliaria',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=1200&auto=format&fit=crop'
    ],
    challenge: 'Vant Arquitectura necesitaba transmitir máxima confianza y profesionalismo para competir contra grandes firmas y captar proyectos residenciales de alto valor.',
    solution: 'Desarrollamos un sitio web con portafolio interactivo de alta definición, carga instantánea en teléfonos móviles y un formulario de cotización de proyectos por etapas.',
    results: [
      '4.2 veces más solicitudes de presupuestos de reformas y obras nuevas',
      'Cierre de 3 contratos de gran escala en los primeros 60 días',
      'Tasa de rebote reducida del 68% al 22%'
    ],
    techStack: ['React', 'TypeScript', 'Tailwind CSS', 'CMS Autoadministrable', 'Optimización Web'],
    testimonial: {
      quote: 'Nuestra nueva página web refleja exactamente la calidad de nuestras construcciones. Los clientes nos felicitan por lo clara y moderna que es la web.',
      author: 'Marcus Vant',
      role: 'Arquitecto Principal en Vant & Co.',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop'
    },
    duration: '3 Semanas'
  },
  {
    id: 'blockchain-protocol',
    title: 'Aura Clínica Dental & Estética',
    client: 'Clínica Aura',
    category: 'Salud & Belleza',
    metric: '+320',
    metricLabel: 'Citas Nuevas al Mes',
    tag: 'Web de Servicios • Reservas Online',
    image: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?q=80&w=1200&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1629909613654-28e377c37b09?q=80&w=1200&auto=format&fit=crop'
    ],
    challenge: 'La clínica dependía de llamadas telefónicas y sufría de ausencias frecuentes en citas sin confirmación digital.',
    solution: 'Creamos una página web con sistema de agenda de citas integrada, recordatorios automáticos por WhatsApp y presentación clara de tratamientos y precios.',
    results: [
      '+320 citas reservadas a través de la web cada mes',
      'Reducción del 75% en cancelaciones gracias a confirmaciones automáticas',
      'Retorno total de la inversión recuperado en menos de 3 semanas'
    ],
    techStack: ['React', 'Google Calendar Sync', 'WhatsApp API', 'Tailwind CSS'],
    testimonial: {
      quote: 'Agilweb transformó la forma en que gestionamos nuestros pacientes. La web se convirtió en nuestra recepcionista digital más eficiente.',
      author: 'Elena Rostova',
      role: 'Directora Médica en Clínica Aura',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=200&auto=format&fit=crop'
    },
    duration: '2 Semanas'
  },
  {
    id: 'audio-x',
    title: 'Audio X Estudio de Grabación',
    client: 'Audio X Studios',
    category: 'Creativo',
    metric: '+160%',
    metricLabel: 'Ocupación de Horas de Sala',
    tag: 'Página Web Creativa • Reservas de Salas',
    image: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=1200&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=1200&auto=format&fit=crop'
    ],
    challenge: 'Un estudio de audio independiente que requería mostrar su equipamiento y portafolio musical de forma interactiva y capturar reservas de artistas.',
    solution: 'Desarrollamos una landing page dinámica con muestras de audio interactivas, galería de cabinas y calendario en vivo para apartar sesiones.',
    results: [
      'Salas con 90% de ocupación en fines de semana',
      '+160% de incremento en contratación de paquetes de producción',
      'Diseño móvil impecable para artistas y productores en gira'
    ],
    techStack: ['React', 'Web Audio API', 'Tailwind CSS', 'Calendly Sync'],
    testimonial: {
      quote: 'Nuestros clientes pueden escuchar producciones anteriores y reservar en un minuto desde su teléfono. La web de Agilweb nos impulsó a otro nivel.',
      author: 'David Chen',
      role: 'Productor y Fundador en Audio X',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop'
    },
    duration: '2 Semanas'
  },
  {
    id: 'growth-engine',
    title: 'Growth Gourmet Café & Bakery',
    client: 'Growth Coffee Roasters',
    category: 'Gastronomía & Local',
    metric: '+310%',
    metricLabel: 'Ventas de Granos y Pedidos Para Llevar',
    tag: 'Negocio Local • Menú Digital & Pedidos',
    image: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?q=80&w=1200&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?q=80&w=1200&auto=format&fit=crop'
    ],
    challenge: 'Una cafetería de especialidad que quería ampliar sus ingresos vendiendo café en grano por suscripción y facilitando pedidos de comida para recoger en local.',
    solution: 'Diseñamos una web cálida y apetitosa con menú interactivo QR, pedidos para llevar sin comisiones de apps externas y suscripción mensual de café.',
    results: [
      '+310% de aumento en pedidos directos sin pagar comisiones',
      'Más de 120 suscriptores mensuales recurrentes de café en grano',
      'Aparición destacada en Google Maps para búsquedas de cafeterías'
    ],
    techStack: ['React', 'Stripe Checkout', 'Google Maps SEO', 'Tailwind CSS'],
    testimonial: {
      quote: 'El mejor dinero invertido en nuestro negocio. Ahora no solo vendemos a los vecinos del barrio, sino que enviamos café a todo el país.',
      author: 'Sofía Valdés',
      role: 'Co-propietaria en Growth Coffee',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&auto=format&fit=crop'
    },
    duration: '2 Semanas'
  }
];

export const FAQS: FAQItem[] = [
  {
    category: 'General',
    question: '¿Por qué mi microempresa o emprendimiento necesita una página web profesional?',
    answer: 'Hoy en día, el 85% de las personas investiga en Google antes de contratar un servicio o comprar un producto. Una página web profesional creada por Agilweb te otorga credibilidad inmediata, te posiciona frente a tus competidores y trabaja las 24 horas del día captando clientes y generando ventas, incluso mientras duermes.'
  },
  {
    category: 'General',
    question: '¿Cuánto tiempo tarda en estar lista mi página web?',
    answer: 'La mayoría de nuestras páginas web para emprendimientos y microempresas se diseñan y lanzan en un plazo de 1 a 3 semanas. Trabajamos con metodología ágil para que puedas empezar a conseguir clientes lo antes posible sin retrasos innecesarios.'
  },
  {
    category: 'Precios',
    question: '¿Los precios son cerrados o hay costes ocultos?',
    answer: 'En Agilweb nuestros precios son 100% transparentes y cerrados desde el primer día. Sabrás exactamente qué incluye tu proyecto sin sorpresas ni mensualidades obligatorias no deseadas. Tu web y tu código son 100% tuyos.'
  },
  {
    category: 'Tecnología',
    question: '¿Podré editar los textos, precios y fotos de mi web fácilmente?',
    answer: 'Sí, absolutamente. Configuramos tu página web con un panel intuitivo y fácil de usar, y te entregamos un video tutorial personalizado paso a paso para que puedas cambiar precios, fotos, textos o añadir nuevos productos en minutos sin depender de nadie ni saber de programación.'
  },
  {
    category: 'Conversión',
    question: '¿Cómo me ayuda la web a conseguir más clientes por WhatsApp o teléfono?',
    answer: 'Diseñamos cada sección pensando en la conversión: botones flotantes directos a WhatsApp, formularios de cotización sencillos de 1 clic, llamadas a la acción claras y velocidad de carga ultrarrápida para que ningún visitante se escape por lentitud.'
  },
  {
    category: 'Google & SEO',
    question: '¿Mi página web aparecerá en las búsquedas de Google?',
    answer: 'Sí. Todos nuestros proyectos incluyen optimización SEO técnica y local para Google, alta en Google Search Console y configuración de Google Maps para que los clientes de tu ciudad o zona te encuentren fácilmente cuando busquen tus servicios.'
  }
];

