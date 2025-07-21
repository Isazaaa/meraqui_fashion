export const products = [
  {
    // --- Campos que ya tenías ---
    id: 1,
    name: "Conjunto short + camiseta Burberry",
    category: 'mujer',
    image: 'https://res.cloudinary.com/dacdd3m0j/image/upload/v1752719642/short-bulberry_ppkqz4.jpg',

    // --- CAMPOS NUEVOS Y NECESARIOS ---
    retailPrice: 50000, //Precio Detal
    wholesalePrice: 40000, //Precio por mayor
    specialFabricPrice: 48000, //Precio tela fría
    materials: 'Jogger en burda, camiseta en licra de algodón.',
    sizes: ['S', 'M', 'L', 'XL'] // ¡Este arreglo es el que causa el error si falta!
  },
  {
    // --- OTRO PRODUCTO COMPLETO ---
    id: 2,
    name: "Conjunto short + camiseta Mickey",
    category: 'mujer',
    image: 'https://res.cloudinary.com/dacdd3m0j/image/upload/v1753108576/short-micki_ktrnjd.jpg',

    retailPrice: 50000, //Precio Detal
    wholesalePrice: 40000, //Precio por mayor
    specialFabricPrice: 48000, //Precio tela fría
    materials: 'Short en burda y camiseta en licra de algodón',
    sizes: ['S', 'M', 'L', 'XL'] // Cada producto debe tener su propio arreglo de tallas
  },
  
    {
    // --- OTRO PRODUCTO COMPLETO ---
    id: 3,
    name: "Conjunto short + camiseta Nike",
    category: 'mujer',
    image: 'https://res.cloudinary.com/dacdd3m0j/image/upload/v1752719574/nike-short_q31qp9.jpg',

    retailPrice: 50000, //Precio Detal
    wholesalePrice: 40000, //Precio por mayor
    specialFabricPrice: 48000, //Precio tela fría
    materials: 'Short en burda y camiseta en licra de algodón',
    sizes: ['S', 'M', 'L', 'XL'] // Cada producto debe tener su propio arreglo de tallas
  },

      {
    // --- OTRO PRODUCTO COMPLETO ---
    id: 4,
    name: "Conjunto short + camiseta Osos",
    category: 'mujer',
    image: 'https://res.cloudinary.com/dacdd3m0j/image/upload/v1752769628/short-oso-ok_tbpxbs.jpg',

    retailPrice: 50000, //Precio Detal
    wholesalePrice: 40000, //Precio por mayor
    specialFabricPrice: 48000, //Precio tela fría
    materials: 'Short en burda y camiseta en licra de algodón',
    sizes: ['S', 'M', 'L', 'XL'] // Cada producto debe tener su propio arreglo de tallas
  },


      {
    // --- OTRO PRODUCTO COMPLETO ---
    id: 5,
    name: "Conjunto short + camiseta Gucci",
    category: 'mujer',
    image: 'https://res.cloudinary.com/dacdd3m0j/image/upload/v1752769573/short-gucci_iob2fd.jpg',

    retailPrice: 50000, //Precio Detal
    wholesalePrice: 40000, //Precio por mayor
    specialFabricPrice: 48000, //Precio tela fría
    materials: 'Short en burda y camiseta en licra de algodón',
    sizes: ['S', 'M', 'L', 'XL'] // Cada producto debe tener su propio arreglo de tallas
  },


      {
    // --- OTRO PRODUCTO COMPLETO ---
    id: 6,
    name: "Conjunto short + camiseta Corazones",
    category: 'mujer',
    image: 'https://res.cloudinary.com/dacdd3m0j/image/upload/v1752769572/short-corazones_efhhda.jpg',

    retailPrice: 50000, //Precio Detal
    wholesalePrice: 40000, //Precio por mayor
    specialFabricPrice: 48000, //Precio tela fría
    materials: 'Short en burda y camiseta en licra de algodón',
    sizes: ['S', 'M', 'L', 'XL'] // Cada producto debe tener su propio arreglo de tallas
  },

      {
    // --- OTRO PRODUCTO COMPLETO ---
    id: 7,
    name: "Conjunto short + buso cuello redondo",
    category: 'mujer',
    image: 'https://res.cloudinary.com/dacdd3m0j/image/upload/v1752769627/short-buzo_ni2lwk.jpg',

    retailPrice: 58000, //Precio Detal
    wholesalePrice: 48000, //Precio por mayor
    materials: 'Tela burda licrada',
    sizes: ['S', 'M', 'L', 'XL'] // Cada producto debe tener su propio arreglo de tallas
  },

       {
    // --- OTRO PRODUCTO COMPLETO ---
    id: 8,
    name: "Conjunto short + buso cuello redondo",
    category: 'mujer',
    image: 'https://res.cloudinary.com/dacdd3m0j/image/upload/v1752769587/short-buzo-marcas_vnnahh.jpg',

    retailPrice: 58000, // Precio Detal
    wholesalePrice: 48000, //Precio por mayor
    materials: 'Tela burda licrada',
    sizes: ['S', 'M', 'L', 'XL'] // Cada producto debe tener su propio arreglo de tallas
  },

       {
    // --- OTRO PRODUCTO COMPLETO ---
    id: 9,
    name: "Trío short + top + gorra",
    category: 'mujer',
    image: 'https://res.cloudinary.com/dacdd3m0j/image/upload/v1753105488/short-top-nike_rcttx5.jpg',

    retailPrice: 55000, //Precio Detal
    wholesalePrice: 45000, //Precio por mayor
    materials: 'Tela burda licrada',
    sizes: ['S', 'M', 'L', 'XL'] // Cada producto debe tener su propio arreglo de tallas
  },

       {
    // --- OTRO PRODUCTO COMPLETO ---
    id: 10,
    name: "Trío short + camisilla + gorra",
    category: 'mujer',
    image: 'https://res.cloudinary.com/dacdd3m0j/image/upload/v1753105480/short-camisola_wiskaf.jpg',

    retailPrice: 55000, //Precio Detal
    wholesalePrice: 45000, //Precio por mayor
    materials: 'Tela burda licrada',
    sizes: ['S', 'M', 'L', 'XL'] // Cada producto debe tener su propio arreglo de tallas
  },

       {
    // --- OTRO PRODUCTO COMPLETO ---
    id: 11,
    name: "Conjunto short + top",
    category: 'mujer',
    image: 'https://res.cloudinary.com/dacdd3m0j/image/upload/v1753105392/short-top-enresortado_ajaqqi.jpg',

    retailPrice: 42000, //Precio Detal
    wholesalePrice: 32000, //Precio por mayor
    specialFabricPrice: 48000, //Precio tela fría
    materials: 'Tela burda licrada',
    sizes: ['S', 'M', 'L', 'XL'] // Cada producto debe tener su propio arreglo de tallas
  },

         {
    // --- OTRO PRODUCTO COMPLETO ---
    id: 12,
    name: "Conjunto short + top",
    category: 'mujer',
    image: 'https://res.cloudinary.com/dacdd3m0j/image/upload/v1753105392/short-top-enresortado2_xgyrpa.jpg',

    retailPrice: 42000, //Precio Detal
    wholesalePrice: 32000, //Precio por mayor
    specialFabricPrice: 48000, //Precio tela fría
    materials: 'Tela burda licrada',
    sizes: ['S', 'M', 'L', 'XL'] // Cada producto debe tener su propio arreglo de tallas
  },
  
  {
    // --- OTRO PRODUCTO COMPLETO ---
    id: 13,
    name: "Conjunto short + camiseta LA",
    category: 'mujer',
    image: 'https://res.cloudinary.com/dacdd3m0j/image/upload/v1753108041/short-camiseta-basica_yhy7f2.jpg',

    retailPrice: 50000, //Precio Detal
    wholesalePrice: 40000, //Precio por mayor
    specialFabricPrice: 48000, //Precio tela fría
    materials: 'Short en burda y camiseta en licra de algodón',
    sizes: ['S', 'M', 'L', 'XL'] // Cada producto debe tener su propio arreglo de tallas
  },

      {
    // --- OTRO PRODUCTO COMPLETO ---
    id: 30,
    name: "Conjunto joger + camiseta NY",
    category: 'hombre',
    image: 'https://res.cloudinary.com/dacdd3m0j/image/upload/v1752764412/conjunto-nike_gxjgxx.jpg',

    retailPrice: 57000, //Precio Detal
    wholesalePrice: 47000, //Precio por mayor
    specialFabricPrice: 58000, //Precio tela fría
    materials: 'Joger en burda y camiseta en licra de algodón',
    sizes: ['S', 'M', 'L', 'XL'] // Cada producto debe tener su propio arreglo de tallas
  },
];