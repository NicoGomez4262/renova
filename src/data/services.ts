import type { Service, ServiceQuestion } from '@/types'

/* Preguntas reutilizables */
const photos: ServiceQuestion = {
  id: 'fotos',
  type: 'photos',
  label: 'Adjuntar fotos',
  hint: 'Puedes subir varias fotos. Ayudan al técnico a llegar preparado.',
}

const urgency: ServiceQuestion = {
  id: 'urgencia',
  type: 'options',
  label: '¿Qué tan urgente es?',
  options: [
    { value: 'hoy', label: 'Hoy mismo' },
    { value: 'semana', label: 'Esta semana' },
    { value: 'flexible', label: 'Soy flexible' },
  ],
}

/**
 * Servicios del piloto. Precios en COP, de referencia.
 * `popular: true` → aparecen en "Servicios populares" en Inicio.
 */
export const services: Service[] = [
  /* ───────── Plomería ───────── */
  {
    id: 'reparar-fuga',
    categoryId: 'plomeria',
    name: 'Reparación de fugas',
    description:
      'Detectamos y reparamos fugas en tuberías, llaves, sifones y conexiones de cocina o baño.',
    includes: [
      'Diagnóstico de la fuga',
      'Reparación o cambio de empaques y conexiones',
      'Prueba de presión al terminar',
      'Garantía Renova de 30 días',
    ],
    priceType: 'fijo',
    price: 150000,
    priceUnit: 'por visita',
    durationMin: 90,
    popular: true,
    questions: [
      {
        id: 'ubicacion',
        type: 'options',
        label: '¿Dónde está la fuga?',
        options: [
          { value: 'cocina', label: 'Cocina' },
          { value: 'bano', label: 'Baño' },
          { value: 'lavadero', label: 'Lavadero' },
          { value: 'otro', label: 'Otro lugar' },
        ],
        required: true,
      },
      urgency,
      photos,
    ],
  },
  {
    id: 'destapar-desague',
    categoryId: 'plomeria',
    name: 'Destape de desagües',
    description: 'Destapamos lavaplatos, lavamanos, duchas y sanitarios con equipo profesional.',
    includes: ['Destape con sonda o equipo', 'Limpieza del área', 'Garantía Renova de 30 días'],
    priceType: 'fijo',
    price: 160000,
    priceUnit: 'por punto',
    durationMin: 60,
    questions: [
      {
        id: 'punto',
        type: 'options',
        label: '¿Qué está tapado?',
        options: [
          { value: 'lavaplatos', label: 'Lavaplatos' },
          { value: 'sanitario', label: 'Sanitario' },
          { value: 'ducha', label: 'Ducha' },
          { value: 'lavamanos', label: 'Lavamanos' },
        ],
        multiple: true,
        required: true,
      },
      photos,
    ],
  },
  {
    id: 'instalar-griferia',
    categoryId: 'plomeria',
    name: 'Instalación de grifería',
    description:
      'Instalamos o cambiamos llaves, mezcladores y duchas. Tú pones el repuesto o lo compras en la tienda Renova.',
    includes: [
      'Desmonte de la grifería anterior',
      'Instalación y sellado',
      'Prueba de funcionamiento',
    ],
    priceType: 'fijo',
    price: 140000,
    priceUnit: 'por punto',
    durationMin: 60,
    questions: [
      {
        id: 'cantidad',
        type: 'number',
        label: '¿Cuántos puntos?',
        placeholder: 'Ej. 1',
        min: 1,
        max: 10,
        required: true,
      },
      photos,
    ],
  },

  /* ───────── Limpieza ───────── */
  {
    id: 'limpieza-profunda',
    categoryId: 'limpieza',
    name: 'Limpieza profunda del hogar',
    description: 'Limpieza a fondo de cocina, baños, pisos, ventanas por dentro y superficies.',
    includes: [
      'Cocina y baños a fondo',
      'Pisos, polvo y superficies',
      'Productos de limpieza incluidos',
      'Personal verificado',
    ],
    priceType: 'fijo',
    price: 100000,
    priceUnit: 'hasta 60 m²',
    durationMin: 240,
    popular: true,
    questions: [
      {
        id: 'tamano',
        type: 'options',
        label: 'Tamaño del espacio',
        options: [
          { value: 'pequeno', label: 'Hasta 60 m²' },
          { value: 'mediano', label: '60 a 100 m²' },
          { value: 'grande', label: 'Más de 100 m²' },
        ],
        required: true,
      },
      {
        id: 'mascotas',
        type: 'options',
        label: '¿Hay mascotas en casa?',
        options: [
          { value: 'si', label: 'Sí' },
          { value: 'no', label: 'No' },
        ],
      },
    ],
  },
  {
    id: 'limpieza-post-obra',
    categoryId: 'limpieza',
    name: 'Limpieza post-obra',
    description:
      'Dejamos tu espacio listo después de pintura o remodelación: polvo, pintura y residuos.',
    includes: ['Retiro de polvo fino', 'Limpieza de vidrios y marcos', 'Productos especializados'],
    priceType: 'cotizacion',
    price: 220000,
    priceUnit: 'desde',
    durationMin: 360,
    questions: [
      {
        id: 'area',
        type: 'number',
        label: 'Área aproximada',
        unit: 'm²',
        placeholder: 'Ej. 60',
        min: 10,
        max: 500,
        required: true,
      },
      photos,
    ],
  },

  /* ───────── Pintura ───────── */
  {
    id: 'pintura-interior',
    categoryId: 'pintura',
    name: 'Pintura de interiores',
    description:
      'Pintamos paredes, techos o el espacio completo. Un profesional revisa tu solicitud y te envía una cotización sin compromiso.',
    includes: [
      'Protección de pisos y muebles',
      'Resanes menores',
      'Dos manos de pintura',
      'Limpieza al terminar',
      'Garantía Renova de 30 días',
    ],
    priceType: 'cotizacion',
    price: 180000,
    priceUnit: 'desde',
    durationMin: 480,
    popular: true,
    questions: [
      {
        id: 'que-pintar',
        type: 'options',
        label: '¿Qué deseas pintar?',
        options: [
          { value: 'paredes', label: 'Paredes' },
          { value: 'techo', label: 'Techo' },
          { value: 'todo', label: 'Todo el espacio' },
        ],
        required: true,
      },
      {
        id: 'area',
        type: 'number',
        label: 'Área aproximada',
        unit: 'm²',
        placeholder: 'Ej. 20',
        min: 1,
        max: 500,
        required: true,
      },
      {
        id: 'pintura',
        type: 'options',
        label: '¿Tienes la pintura?',
        options: [
          { value: 'si', label: 'Sí, ya la tengo' },
          { value: 'no', label: 'No, la necesito' },
        ],
      },
      photos,
    ],
  },
  {
    id: 'pintura-fachada',
    categoryId: 'pintura',
    name: 'Pintura de fachadas y exteriores',
    description: 'Pintura de fachadas, muros y rejas con materiales para exterior.',
    includes: ['Visita técnica', 'Pintura para exterior', 'Andamios si se requieren'],
    priceType: 'cotizacion',
    price: 450000,
    priceUnit: 'desde',
    durationMin: 960,
    questions: [
      {
        id: 'area',
        type: 'number',
        label: 'Área aproximada',
        unit: 'm²',
        placeholder: 'Ej. 40',
        min: 1,
        max: 2000,
        required: true,
      },
      photos,
    ],
  },

  /* ───────── Electricidad ───────── */
  {
    id: 'revision-electrica',
    categoryId: 'electricidad',
    name: 'Revisión eléctrica',
    description:
      'Diagnóstico de cortos, breakers que se disparan, tomas sin corriente o luces que parpadean.',
    includes: [
      'Diagnóstico completo',
      'Reparaciones menores incluidas',
      'Informe del estado eléctrico',
    ],
    priceType: 'fijo',
    price: 120000,
    priceUnit: 'por visita',
    durationMin: 90,
    popular: true,
    questions: [
      {
        id: 'problema',
        type: 'options',
        label: '¿Qué está pasando?',
        options: [
          { value: 'sin-luz', label: 'Sin corriente' },
          { value: 'breaker', label: 'Se dispara el breaker' },
          { value: 'chispa', label: 'Chispas u olor a quemado' },
          { value: 'otro', label: 'Otro' },
        ],
        required: true,
      },
      urgency,
      photos,
    ],
  },
  {
    id: 'instalar-lampara',
    categoryId: 'electricidad',
    name: 'Instalación de lámparas y tomas',
    description: 'Instalamos lámparas, apliques, tomas, interruptores y ventiladores de techo.',
    includes: ['Instalación segura', 'Revisión del circuito', 'Garantía Renova de 30 días'],
    priceType: 'fijo',
    price: 95000,
    priceUnit: 'por punto',
    durationMin: 60,
    questions: [
      {
        id: 'cantidad',
        type: 'number',
        label: '¿Cuántos puntos?',
        placeholder: 'Ej. 2',
        min: 1,
        max: 20,
        required: true,
      },
      photos,
    ],
  },

  /* ───────── Electrodomésticos ───────── */
  {
    id: 'reparar-lavadora',
    categoryId: 'electrodomesticos',
    name: 'Reparación de lavadoras',
    description: 'Diagnóstico y reparación de lavadoras y secadoras de todas las marcas.',
    includes: [
      'Diagnóstico en casa',
      'Mano de obra',
      'Repuestos cotizados aparte',
      'Garantía Renova de 30 días',
    ],
    priceType: 'fijo',
    price: 130000,
    priceUnit: 'diagnóstico + reparación menor',
    durationMin: 90,
    questions: [
      {
        id: 'sintoma',
        type: 'options',
        label: '¿Qué le pasa?',
        options: [
          { value: 'no-enciende', label: 'No enciende' },
          { value: 'no-centrifuga', label: 'No centrifuga' },
          { value: 'fuga', label: 'Bota agua' },
          { value: 'ruido', label: 'Hace ruido' },
        ],
        required: true,
      },
      {
        id: 'marca',
        type: 'text',
        label: 'Marca y modelo (opcional)',
        placeholder: 'Ej. Lavadora 18 kg',
      },
      photos,
    ],
  },
  {
    id: 'reparar-nevera',
    categoryId: 'electrodomesticos',
    name: 'Reparación de neveras',
    description: 'Neveras que no enfrían, hacen ruido o botan agua.',
    includes: ['Diagnóstico en casa', 'Mano de obra', 'Repuestos cotizados aparte'],
    priceType: 'fijo',
    price: 140000,
    priceUnit: 'diagnóstico + reparación menor',
    durationMin: 120,
    questions: [
      {
        id: 'sintoma',
        type: 'options',
        label: '¿Qué le pasa?',
        options: [
          { value: 'no-enfria', label: 'No enfría' },
          { value: 'ruido', label: 'Hace ruido' },
          { value: 'agua', label: 'Bota agua' },
        ],
        required: true,
      },
      photos,
    ],
  },

  /* ───────── Instalaciones ───────── */
  {
    id: 'instalar-tv',
    categoryId: 'instalaciones',
    name: 'Instalación de TV en pared',
    description: 'Instalamos tu TV en pared con soporte fijo o móvil y organizamos los cables.',
    includes: ['Anclaje seguro', 'Nivelación', 'Organización de cables'],
    priceType: 'fijo',
    price: 90000,
    priceUnit: 'por TV',
    durationMin: 60,
    questions: [
      {
        id: 'pulgadas',
        type: 'options',
        label: 'Tamaño del TV',
        options: [
          { value: '32-50', label: '32" a 50"' },
          { value: '55-65', label: '55" a 65"' },
          { value: '70+', label: '70" o más' },
        ],
        required: true,
      },
      {
        id: 'soporte',
        type: 'options',
        label: '¿Tienes el soporte?',
        options: [
          { value: 'si', label: 'Sí' },
          { value: 'no', label: 'No' },
        ],
      },
    ],
  },
  {
    id: 'instalar-cortinas',
    categoryId: 'instalaciones',
    name: 'Cortinas, repisas y cuadros',
    description: 'Instalamos cortinas, persianas, repisas, espejos y cuadros.',
    includes: ['Taladro y anclajes', 'Nivelación', 'Limpieza del área'],
    priceType: 'fijo',
    price: 90000,
    priceUnit: 'hasta 3 elementos',
    durationMin: 90,
    questions: [
      {
        id: 'cantidad',
        type: 'number',
        label: '¿Cuántos elementos?',
        placeholder: 'Ej. 3',
        min: 1,
        max: 20,
        required: true,
      },
      {
        id: 'detalle',
        type: 'text',
        label: '¿Qué vamos a instalar?',
        placeholder: 'Ej. 2 cortinas y 1 repisa',
      },
    ],
  },
]
