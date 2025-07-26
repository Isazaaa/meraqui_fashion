export const garments = [
  {
    id: 1,
    name: 'Camiseta',
    colors: [
      { name: 'Negro', value: '#000000' },
      { name: 'Blanco', value: '#FFFFFF' },
      { name: 'Gris Oscuro', value: '#4B4B4B' },
      { name: 'Camel', value: '#C19A6B' },
      { name: 'Gris Claro', value: '#D3D3D3' },
      { name: 'Azul Rey', value: '#003087' },
      { name: 'Verde', value: '#2ECC71' },
      { name: 'Amarillo', value: '#F1C40F' },
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    imageUrlPrefix: 'camiseta'
  },
  {
    id: 2,
    name: 'Buso',
    colors: [
      { name: 'Negro', value: '#000000' },
      { name: 'Blanco', value: '#FFFFFF' },
      { name: 'Gris Oscuro', value: '#4B4B4B' },
      { name: 'Camel', value: '#C19A6B' },
      { name: 'Gris Claro', value: '#D3D3D3' },
      { name: 'Azul Rey', value: '#003087' },
      { name: 'Verde', value: '#2ECC71' },
      { name: 'Amarillo', value: '#F1C40F' },
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    imageUrlPrefix: 'buso'
  },
  {
    id: 3,
    name: 'Blusón',
    colors: [
      { name: 'Negro', value: '#000000' },
      { name: 'Blanco', value: '#FFFFFF' },
      { name: 'Gris Oscuro', value: '#4B4B4B' },
      { name: 'Camel', value: '#C19A6B' },
      { name: 'Gris Claro', value: '#D3D3D3' },
      { name: 'Azul Rey', value: '#003087' },
      { name: 'Verde', value: '#2ECC71' },
      { name: 'Amarillo', value: '#F1C40F' },
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    imageUrlPrefix: 'bluson',
    gender: 'Mujer' // Restringir Blusón a Mujer
  },
];

export const garmentImages = {
  Camiseta: {
    Hombre: {
      Negro: {
        delante: 'https://res.cloudinary.com/dacdd3m0j/image/upload/v1753466556/negra-delante_ualjjl.jpg',
        espalda: 'https://res.cloudinary.com/dacdd3m0j/image/upload/v1753466557/negra-espalda_o1ciqg.jpg'
      },
      Blanco: {
        delante: 'https://res.cloudinary.com/dacdd3m0j/image/upload/v1753466553/blanca-delante_k4moa9.jpg',
        espalda: 'https://res.cloudinary.com/dacdd3m0j/image/upload/v1753466553/blanca-espalda_owwu5h.jpg'
      },
      'Gris Oscuro': {
        delante: 'https://res.cloudinary.com/dacdd3m0j/image/upload/v1753466555/grisocuro-delante_j0uqud.jpg',
        espalda: 'https://res.cloudinary.com/dacdd3m0j/image/upload/v1753466555/grisoscuro-espalda_jbrke2.jpg'
      },
      Camel: {
        delante: 'https://res.cloudinary.com/dacdd3m0j/image/upload/v1753466554/camel-delante_alzezh.jpg',
        espalda: 'https://res.cloudinary.com/dacdd3m0j/image/upload/v1753466554/camel-espalda_ubxhxr.jpg'
      },
      'Gris Claro': {
        delante: 'https://res.cloudinary.com/dacdd3m0j/image/upload/v1753466554/grisclaro-delante_mptbfg.jpg',
        espalda: 'https://res.cloudinary.com/dacdd3m0j/image/upload/v1753466555/grisclaro-espalda_nfhfkq.jpg'
      },
      'Azul Rey': {
        delante: 'https://res.cloudinary.com/dacdd3m0j/image/upload/v1753466553/azul-adelante_t9tejg.jpg',
        espalda: 'https://res.cloudinary.com/dacdd3m0j/image/upload/v1753466553/azul-espalda_iuuptl.jpg'
      },
      Verde: {
        delante: 'https://res.cloudinary.com/dacdd3m0j/image/upload/placeholder.jpg', // Añade la URL de la imagen para Verde (delante)
        espalda: 'https://res.cloudinary.com/dacdd3m0j/image/upload/placeholder.jpg'  // Añade la URL de la imagen para Verde (espalda)
      },
      Amarillo: {
        delante: 'https://res.cloudinary.com/dacdd3m0j/image/upload/v1753466553/amarrillo-delante_mplu1b.jpg',
        espalda: 'https://res.cloudinary.com/dacdd3m0j/image/upload/v1753466553/amarrillo-espalda_msv6t8.jpg'
      }
    },
    Mujer: {
      Negro: {
        delante: 'https://res.cloudinary.com/dacdd3m0j/image/upload/v1753466556/negra-delante_ualjjl.jpg', // Añade la URL específica para Mujer si es diferente
        espalda: 'https://res.cloudinary.com/dacdd3m0j/image/upload/v1753466557/negra-espalda_o1ciqg.jpg'
      },
      Blanco: {
        delante: 'https://res.cloudinary.com/dacdd3m0j/image/upload/v1753466553/blanca-delante_k4moa9.jpg',
        espalda: 'https://res.cloudinary.com/dacdd3m0j/image/upload/v1753466553/blanca-espalda_owwu5h.jpg'
      },
      'Gris Oscuro': {
        delante: 'https://res.cloudinary.com/dacdd3m0j/image/upload/v1753466555/grisocuro-delante_j0uqud.jpg',
        espalda: 'https://res.cloudinary.com/dacdd3m0j/image/upload/v1753466555/grisoscuro-espalda_jbrke2.jpg'
      },
      Camel: {
        delante: 'https://res.cloudinary.com/dacdd3m0j/image/upload/v1753466554/camel-delante_alzezh.jpg',
        espalda: 'https://res.cloudinary.com/dacdd3m0j/image/upload/v1753466554/camel-espalda_ubxhxr.jpg'
      },
      'Gris Claro': {
        delante: 'https://res.cloudinary.com/dacdd3m0j/image/upload/v1753466554/grisclaro-delante_mptbfg.jpg',
        espalda: 'https://res.cloudinary.com/dacdd3m0j/image/upload/v1753466555/grisclaro-espalda_nfhfkq.jpg'
      },
      'Azul Rey': {
        delante: 'https://res.cloudinary.com/dacdd3m0j/image/upload/v1753466553/azul-adelante_t9tejg.jpg',
        espalda: 'https://res.cloudinary.com/dacdd3m0j/image/upload/v1753466553/azul-espalda_iuuptl.jpg'
      },
      Verde: {
        delante: 'https://res.cloudinary.com/dacdd3m0j/image/upload/placeholder.jpg',
        espalda: 'https://res.cloudinary.com/dacdd3m0j/image/upload/placeholder.jpg'
      },
      Amarillo: {
        delante: 'https://res.cloudinary.com/dacdd3m0j/image/upload/v1753466553/amarrillo-delante_mplu1b.jpg',
        espalda: 'https://res.cloudinary.com/dacdd3m0j/image/upload/v1753466553/amarrillo-espalda_msv6t8.jpg'
      }
    },
    Niños: {
      Negro: {
        delante: 'https://res.cloudinary.com/dacdd3m0j/image/upload/v1753466556/negra-delante_ualjjl.jpg',
        espalda: 'https://res.cloudinary.com/dacdd3m0j/image/upload/v1753466557/negra-espalda_o1ciqg.jpg'
      },
      Blanco: {
        delante: 'https://res.cloudinary.com/dacdd3m0j/image/upload/v1753466553/blanca-delante_k4moa9.jpg',
        espalda: 'https://res.cloudinary.com/dacdd3m0j/image/upload/v1753466553/blanca-espalda_owwu5h.jpg'
      },
      'Gris Oscuro': {
        delante: 'https://res.cloudinary.com/dacdd3m0j/image/upload/v1753466555/grisocuro-delante_j0uqud.jpg',
        espalda: 'https://res.cloudinary.com/dacdd3m0j/image/upload/v1753466555/grisoscuro-espalda_jbrke2.jpg'
      },
      Camel: {
        delante: 'https://res.cloudinary.com/dacdd3m0j/image/upload/v1753466554/camel-delante_alzezh.jpg',
        espalda: 'https://res.cloudinary.com/dacdd3m0j/image/upload/v1753466554/camel-espalda_ubxhxr.jpg'
      },
      'Gris Claro': {
        delante: 'https://res.cloudinary.com/dacdd3m0j/image/upload/v1753466554/grisclaro-delante_mptbfg.jpg',
        espalda: 'https://res.cloudinary.com/dacdd3m0j/image/upload/v1753466555/grisclaro-espalda_nfhfkq.jpg'
      },
      'Azul Rey': {
        delante: 'https://res.cloudinary.com/dacdd3m0j/image/upload/v1753466553/azul-adelante_t9tejg.jpg',
        espalda: 'https://res.cloudinary.com/dacdd3m0j/image/upload/v1753466553/azul-espalda_iuuptl.jpg'
      },
      Verde: {
        delante: 'https://res.cloudinary.com/dacdd3m0j/image/upload/placeholder.jpg',
        espalda: 'https://res.cloudinary.com/dacdd3m0j/image/upload/placeholder.jpg'
      },
      Amarillo: {
        delante: 'https://res.cloudinary.com/dacdd3m0j/image/upload/v1753466553/amarrillo-delante_mplu1b.jpg',
        espalda: 'https://res.cloudinary.com/dacdd3m0j/image/upload/v1753466553/amarrillo-espalda_msv6t8.jpg'
      }
    }
  },
  Buso: {
    Hombre: {
      Negro: {
        delante: 'https://res.cloudinary.com/dacdd3m0j/image/upload/placeholder.jpg', // Añade la URL
        espalda: 'https://res.cloudinary.com/dacdd3m0j/image/upload/placeholder.jpg'
      },
      Blanco: {
        delante: 'https://res.cloudinary.com/dacdd3m0j/image/upload/placeholder.jpg',
        espalda: 'https://res.cloudinary.com/dacdd3m0j/image/upload/placeholder.jpg'
      },
      'Gris Oscuro': {
        delante: 'https://res.cloudinary.com/dacdd3m0j/image/upload/placeholder.jpg',
        espalda: 'https://res.cloudinary.com/dacdd3m0j/image/upload/placeholder.jpg'
      },
      Camel: {
        delante: 'https://res.cloudinary.com/dacdd3m0j/image/upload/placeholder.jpg',
        espalda: 'https://res.cloudinary.com/dacdd3m0j/image/upload/placeholder.jpg'
      },
      'Gris Claro': {
        delante: 'https://res.cloudinary.com/dacdd3m0j/image/upload/placeholder.jpg',
        espalda: 'https://res.cloudinary.com/dacdd3m0j/image/upload/placeholder.jpg'
      },
      'Azul Rey': {
        delante: 'https://res.cloudinary.com/dacdd3m0j/image/upload/placeholder.jpg',
        espalda: 'https://res.cloudinary.com/dacdd3m0j/image/upload/placeholder.jpg'
      },
      Verde: {
        delante: 'https://res.cloudinary.com/dacdd3m0j/image/upload/placeholder.jpg',
        espalda: 'https://res.cloudinary.com/dacdd3m0j/image/upload/placeholder.jpg'
      },
      Amarillo: {
        delante: 'https://res.cloudinary.com/dacdd3m0j/image/upload/placeholder.jpg',
        espalda: 'https://res.cloudinary.com/dacdd3m0j/image/upload/placeholder.jpg'
      }
    },
    Mujer: {
      Negro: {
        delante: 'https://res.cloudinary.com/dacdd3m0j/image/upload/placeholder.jpg',
        espalda: 'https://res.cloudinary.com/dacdd3m0j/image/upload/placeholder.jpg'
      },
      Blanco: {
        delante: 'https://res.cloudinary.com/dacdd3m0j/image/upload/placeholder.jpg',
        espalda: 'https://res.cloudinary.com/dacdd3m0j/image/upload/placeholder.jpg'
      },
      'Gris Oscuro': {
        delante: 'https://res.cloudinary.com/dacdd3m0j/image/upload/placeholder.jpg',
        espalda: 'https://res.cloudinary.com/dacdd3m0j/image/upload/placeholder.jpg'
      },
      Camel: {
        delante: 'https://res.cloudinary.com/dacdd3m0j/image/upload/placeholder.jpg',
        espalda: 'https://res.cloudinary.com/dacdd3m0j/image/upload/placeholder.jpg'
      },
      'Gris Claro': {
        delante: 'https://res.cloudinary.com/dacdd3m0j/image/upload/placeholder.jpg',
        espalda: 'https://res.cloudinary.com/dacdd3m0j/image/upload/placeholder.jpg'
      },
      'Azul Rey': {
        delante: 'https://res.cloudinary.com/dacdd3m0j/image/upload/placeholder.jpg',
        espalda: 'https://res.cloudinary.com/dacdd3m0j/image/upload/placeholder.jpg'
      },
      Verde: {
        delante: 'https://res.cloudinary.com/dacdd3m0j/image/upload/placeholder.jpg',
        espalda: 'https://res.cloudinary.com/dacdd3m0j/image/upload/placeholder.jpg'
      },
      Amarillo: {
        delante: 'https://res.cloudinary.com/dacdd3m0j/image/upload/placeholder.jpg',
        espalda: 'https://res.cloudinary.com/dacdd3m0j/image/upload/placeholder.jpg'
      }
    },
    Niños: {
      Negro: {
        delante: 'https://res.cloudinary.com/dacdd3m0j/image/upload/placeholder.jpg',
        espalda: 'https://res.cloudinary.com/dacdd3m0j/image/upload/placeholder.jpg'
      },
      Blanco: {
        delante: 'https://res.cloudinary.com/dacdd3m0j/image/upload/placeholder.jpg',
        espalda: 'https://res.cloudinary.com/dacdd3m0j/image/upload/placeholder.jpg'
      },
      'Gris Oscuro': {
        delante: 'https://res.cloudinary.com/dacdd3m0j/image/upload/placeholder.jpg',
        espalda: 'https://res.cloudinary.com/dacdd3m0j/image/upload/placeholder.jpg'
      },
      Camel: {
        delante: 'https://res.cloudinary.com/dacdd3m0j/image/upload/placeholder.jpg',
        espalda: 'https://res.cloudinary.com/dacdd3m0j/image/upload/placeholder.jpg'
      },
      'Gris Claro': {
        delante: 'https://res.cloudinary.com/dacdd3m0j/image/upload/placeholder.jpg',
        espalda: 'https://res.cloudinary.com/dacdd3m0j/image/upload/placeholder.jpg'
      },
      'Azul Rey': {
        delante: 'https://res.cloudinary.com/dacdd3m0j/image/upload/placeholder.jpg',
        espalda: 'https://res.cloudinary.com/dacdd3m0j/image/upload/placeholder.jpg'
      },
      Verde: {
        delante: 'https://res.cloudinary.com/dacdd3m0j/image/upload/placeholder.jpg',
        espalda: 'https://res.cloudinary.com/dacdd3m0j/image/upload/placeholder.jpg'
      },
      Amarillo: {
        delante: 'https://res.cloudinary.com/dacdd3m0j/image/upload/placeholder.jpg',
        espalda: 'https://res.cloudinary.com/dacdd3m0j/image/upload/placeholder.jpg'
      }
    }
  },
  Blusón: {
    Mujer: {
      Negro: {
        delante: 'https://res.cloudinary.com/dacdd3m0j/image/upload/placeholder.jpg', // Añade la URL
        espalda: 'https://res.cloudinary.com/dacdd3m0j/image/upload/placeholder.jpg'
      },
      Blanco: {
        delante: 'https://res.cloudinary.com/dacdd3m0j/image/upload/placeholder.jpg',
        espalda: 'https://res.cloudinary.com/dacdd3m0j/image/upload/placeholder.jpg'
      },
      'Gris Oscuro': {
        delante: 'https://res.cloudinary.com/dacdd3m0j/image/upload/placeholder.jpg',
        espalda: 'https://res.cloudinary.com/dacdd3m0j/image/upload/placeholder.jpg'
      },
      Camel: {
        delante: 'https://res.cloudinary.com/dacdd3m0j/image/upload/placeholder.jpg',
        espalda: 'https://res.cloudinary.com/dacdd3m0j/image/upload/placeholder.jpg'
      },
      'Gris Claro': {
        delante: 'https://res.cloudinary.com/dacdd3m0j/image/upload/placeholder.jpg',
        espalda: 'https://res.cloudinary.com/dacdd3m0j/image/upload/placeholder.jpg'
      },
      'Azul Rey': {
        delante: 'https://res.cloudinary.com/dacdd3m0j/image/upload/placeholder.jpg',
        espalda: 'https://res.cloudinary.com/dacdd3m0j/image/upload/placeholder.jpg'
      },
      Verde: {
        delante: 'https://res.cloudinary.com/dacdd3m0j/image/upload/placeholder.jpg',
        espalda: 'https://res.cloudinary.com/dacdd3m0j/image/upload/placeholder.jpg'
      },
      Amarillo: {
        delante: 'https://res.cloudinary.com/dacdd3m0j/image/upload/placeholder.jpg',
        espalda: 'https://res.cloudinary.com/dacdd3m0j/image/upload/placeholder.jpg'
      }
    }
  }
};