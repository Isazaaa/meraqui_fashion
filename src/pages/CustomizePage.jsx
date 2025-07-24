import React, { useState, useEffect, useRef, useCallback } from 'react';
import './CustomizePage.css'; // Asegúrate de que este archivo CSS existe

// Definición de las prendas con la nueva estructura de colores (nombre y valor HEX)
const garments = [
  {
    id: 1,
    name: 'Camiseta',
    colors: [
      { name: 'Blanco', value: '#FFFFFF' },
      { name: 'Negro', value: '#000000' },
      { name: 'Azul Claro', value: '#3498DB' },
      { name: 'Rojo', value: '#E74C3C' },
      { name: 'Verde', value: '#2ECC71' },
      { name: 'Amarillo', value: '#F1C40F' },
      { name: 'Rosa', value: '#FFC0CB' },
      { name: 'Morado', value: '#9B59B6' },
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    imageUrlPrefix: 'camiseta'
  },
  {
    id: 2,
    name: 'Buso',
    colors: [
      { name: 'Blanco', value: '#FFFFFF' },
      { name: 'Gris', value: '#95A5A6' },
      { name: 'Negro', value: '#000000' },
      { name: 'Azul Oscuro', value: '#2C3E50' },
      { name: 'Verde Militar', value: '#7F8C8D' },
      { name: 'Marrón', value: '#8B4513' },
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    imageUrlPrefix: 'buso'
  },
  {
    id: 3,
    name: 'Blusón',
    colors: [
      { name: 'Blanco', value: '#FFFFFF' },
      { name: 'Rojo', value: '#C0392B' },
      { name: 'Azul', value: '#2980B9' },
      { name: 'Rosa Pálido', value: '#FADADD' },
      { name: 'Verde Menta', value: '#ABEBC6' },
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    imageUrlPrefix: 'bluson'
  },
];


const CustomizePage = () => {
  const [selectedGarment, setSelectedGarment] = useState(garments[0]);
  // selectedColor ahora guarda el OBJETO completo { name: 'Blanco', value: '#FFFFFF' }
  const [selectedColor, setSelectedColor] = useState(garments[0].colors[0]);
  const [selectedSize, setSelectedSize] = useState(garments[0].sizes[0]);
  const [selectedGender, setSelectedGender] = useState('Hombre');
  const [selectedLocation, setSelectedLocation] = useState('Frente');
  const [uploadedImage, setUploadedImage] = useState(null); // URL Base64 de la imagen subida

  // Estados para la manipulación del diseño (posición y tamaño)
  const [designPosition, setDesignPosition] = useState({ x: 0, y: 0 });
  const [designSize, setDesignSize] = useState({ width: 200, height: 200 }); // Tamaño inicial por defecto
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 }); // Offset inicial para arrastre
  const [resizeStartMouse, setResizeStartMouse] = useState({ x: 0, y: 0 }); // Posición del mouse al iniciar redimensionamiento
  const [resizeStartSize, setResizeStartSize] = useState({ width: 0, height: 0 }); // Tamaño del diseño al iniciar redimensionamiento
  const [resizeStartPos, setResizeStartPos] = useState({ x: 0, y: 0 }); // Posición del diseño al iniciar redimensionamiento

  // Refs para elementos DOM para obtener dimensiones y manejar eventos
  const fileInputRef = useRef(null); // Input de tipo file
  const garmentImageWrapperRef = useRef(null); // Contenedor del espacio de previsualización de la prenda
  const designStampRef = useRef(null); // Div del diseño adjuntado (el que se arrastra/redimensiona)
  const garmentImageRef = useRef(null); // Imagen base de la prenda (para el canvas)


  // Efecto para centrar y ajustar tamaño inicial del diseño CUANDO SE SUBE UNA IMAGEN
  useEffect(() => {
    // Solo se ejecuta si hay una imagen subida y el contenedor de la prenda está renderizado
    if (uploadedImage && garmentImageWrapperRef.current) {
      const garmentRect = garmentImageWrapperRef.current.getBoundingClientRect();
      
      // Cargar la imagen subida para obtener sus dimensiones reales y calcular el aspecto
      const img = new Image();
      img.src = uploadedImage;
      img.onload = () => {
        const aspectRatio = img.width / img.height;
        // Calcular un tamaño inicial que sea el 50% del ancho del contenedor o 200px (el menor)
        let initialWidth = Math.min(garmentRect.width * 0.5, 200);
        let initialHeight = initialWidth / aspectRatio;

        // Si la altura calculada es demasiado grande para el contenedor, ajustar por altura
        if (initialHeight > garmentRect.height * 0.5) {
            initialHeight = Math.min(garmentRect.height * 0.5, 200);
            initialWidth = initialHeight * aspectRatio;
        }

        // Asegurarse de que el tamaño mínimo sea respetado
        initialWidth = Math.max(initialWidth, 20); // Mínimo de 20px
        initialHeight = Math.max(initialHeight, 20); // Mínimo de 20px

        setDesignSize({ width: initialWidth, height: initialHeight });

        // Centrar el diseño en el contenedor de la prenda
        setDesignPosition({
          x: (garmentRect.width / 2) - (initialWidth / 2),
          y: (garmentRect.height / 2) - (initialHeight / 2),
        });
      };
    }
  }, [uploadedImage, garmentImageWrapperRef]); // Dependencias: se dispara cuando `uploadedImage` o el contenedor cambian


  // Manejar la subida de imagen desde el input de archivo
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file && (file.type === 'image/jpeg' || file.type === 'image/png')) {
      if (file.size > 5 * 1024 * 1024) { // Límite de 5MB
        alert('La imagen excede el tamaño máximo de 5MB. Por favor, sube una imagen más pequeña.');
        return;
      }
      const reader = new FileReader();
      reader.onload = () => {
        setUploadedImage(reader.result); // Guarda la URL Base64 de la imagen
      };
      reader.readAsDataURL(file); // Lee el archivo como URL Base64
    } else {
      alert('Formato de imagen no válido. Por favor, sube una imagen en formato JPG o PNG.');
      setUploadedImage(null); // Limpia la imagen si el formato no es válido
      if (fileInputRef.current) {
        fileInputRef.current.value = ''; // Limpia el input de archivo
      }
    }
  };

  // --- Lógica de Arrastre (Drag) ---
  const handleMouseDown = useCallback((e) => {
    e.preventDefault(); // Evita la selección de texto o el arrastre de imagen nativo
    // Solo inicia el arrastre si el clic es directamente en el div del diseño (no en los handles)
    if (designStampRef.current && e.target === designStampRef.current) {
      setIsDragging(true);
      // Calcula el offset desde el clic hasta la esquina superior izquierda del diseño
      setDragOffset({
        x: e.clientX - designPosition.x,
        y: e.clientY - designPosition.y,
      });
    }
  }, [designPosition]); // Depende de la posición actual del diseño

  // --- Lógica de Movimiento del Mouse (para arrastre y redimensionamiento) ---
  const handleMouseMove = useCallback((e) => {
    if (isDragging && garmentImageWrapperRef.current && designStampRef.current) {
      const garmentRect = garmentImageWrapperRef.current.getBoundingClientRect(); // Dimensiones del contenedor de la prenda
      const designRect = designStampRef.current.getBoundingClientRect(); // Dimensiones actuales del diseño

      let newX = e.clientX - dragOffset.x; // Nueva posición X
      let newY = e.clientY - dragOffset.y; // Nueva posición Y

      // Limitar el arrastre dentro de los límites del contenedor de la prenda
      newX = Math.max(0, Math.min(newX, garmentRect.width - designRect.width));
      newY = Math.max(0, Math.min(newY, garmentRect.height - designRect.height));

      setDesignPosition({ x: newX, y: newY });
    } else if (isResizing && garmentImageWrapperRef.current && designStampRef.current) {
      const garmentRect = garmentImageWrapperRef.current.getBoundingClientRect(); // Dimensiones del contenedor de la prenda
      
      const dx = e.clientX - resizeStartMouse.x; // Cambio en X desde el inicio del redimensionamiento
      const dy = e.clientY - resizeStartMouse.y; // Cambio en Y desde el inicio del redimensionamiento

      let newWidth = resizeStartSize.width + dx; // Nuevo ancho tentativo
      let newHeight = resizeStartSize.height + dy; // Nueva altura tentativa

      // Mantener la relación de aspecto del diseño
      const aspectRatio = resizeStartSize.width / resizeStartSize.height;
      if (aspectRatio && !isNaN(aspectRatio) && isFinite(aspectRatio)) { // Asegurar que aspectRatio es un número válido y no Infinity
          if (Math.abs(dx) > Math.abs(dy)) { // Si el movimiento horizontal es mayor, ajustar altura
            newHeight = newWidth / aspectRatio;
          } else { // Si el movimiento vertical es mayor, ajustar ancho
            newWidth = newHeight * aspectRatio;
          }
      }

      // Limitar el tamaño mínimo y máximo del diseño
      const minSize = 20; // Tamaño mínimo de 20px
      const maxWidth = garmentRect.width * 0.9; // Máximo 90% del ancho del contenedor
      const maxHeight = garmentRect.height * 0.9; // Máximo 90% del alto del contenedor

      newWidth = Math.max(minSize, Math.min(newWidth, maxWidth));
      newHeight = Math.max(minSize, Math.min(newHeight, maxHeight));

      // Ajustar la posición para que el diseño no se salga del contenedor al crecer
      let newX = resizeStartPos.x;
      let newY = resizeStartPos.y;

      // Si el diseño crece más allá del límite derecho o inferior, ajusta su posición
      if (newX + newWidth > garmentRect.width) {
        newX = garmentRect.width - newWidth;
      }
      if (newY + newHeight > garmentRect.height) {
        newY = garmentRect.height - newHeight;
      }

      setDesignSize({ width: newWidth, height: newHeight });
      setDesignPosition({ x: newX, y: newY }); // Actualizar posición también
    }
  }, [isDragging, dragOffset, isResizing, resizeStartMouse, resizeStartSize, resizeStartPos, garmentImageWrapperRef, designStampRef]);

  // --- Lógica al Soltar el Mouse (terminar arrastre/redimensionamiento) ---
  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
    setIsResizing(false);
  }, []);

  // Efecto para añadir y limpiar los listeners de mouse al documento completo
  // Esto es crucial para que el arrastre/redimensionamiento funcione incluso si el cursor se sale del elemento
  useEffect(() => {
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [handleMouseMove, handleMouseUp]); // Depende de las funciones de manejo de mouse


  // --- Lógica para Iniciar Redimensionamiento ---
  const handleResizeMouseDown = useCallback((e) => {
    e.preventDefault(); // Evita comportamiento por defecto
    e.stopPropagation(); // Evita que el evento se propague al diseño (para no arrastrar al redimensionar)
    setIsResizing(true);
    setResizeStartMouse({ x: e.clientX, y: e.clientY }); // Posición del mouse al inicio
    setResizeStartSize({ width: designSize.width, height: designSize.height }); // Tamaño actual del diseño
    setResizeStartPos({ x: designPosition.x, y: designPosition.y }); // Posición actual del diseño
  }, [designSize, designPosition]);


  // --- FUNCIÓN CENTRAL: Generar la imagen combinada (retorna dataUrl) ---
  const generateCombinedImage = async () => {
    // Verificar que todos los elementos necesarios estén disponibles
    if (!uploadedImage || !garmentImageRef.current || !designStampRef.current || !garmentImageWrapperRef.current) {
      alert('Por favor, sube un diseño para generar la imagen.');
      return null; // Retorna null si no se puede generar
    }

    const garmentImgElement = garmentImageRef.current; // La imagen <img> de la prenda
    const garmentWrapperRect = garmentImageWrapperRef.current.getBoundingClientRect(); // Dimensiones del contenedor que la muestra

    // Crear un elemento canvas temporal en memoria
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    // Establecer el tamaño del canvas al tamaño visual de la imagen de la prenda
    // Esto es crucial para que la imagen generada coincida con lo que el usuario ve
    const renderWidth = garmentImgElement.clientWidth;
    const renderHeight = garmentImgElement.clientHeight;

    canvas.width = renderWidth;
    canvas.height = renderHeight;

    // Dibujar la imagen de la prenda en el canvas
    const garmentImage = new Image();
    garmentImage.crossOrigin = 'Anonymous'; // Importante para evitar problemas de CORS si la imagen viene de otro dominio
    garmentImage.src = garmentImgElement.src;

    // Esperar a que la imagen de la prenda cargue antes de dibujarla
    await new Promise((resolve) => {
      garmentImage.onload = () => {
        // Calcular cómo dibujar la imagen de la prenda en el canvas para que se vea igual que en el DOM (object-contain)
        const imgAspectRatio = garmentImage.width / garmentImage.height;
        const canvasAspectRatio = canvas.width / canvas.height;

        let drawWidth = canvas.width;
        let drawHeight = canvas.height;
        let offsetX = 0;
        let offsetY = 0;

        if (imgAspectRatio > canvasAspectRatio) { // Imagen más ancha que el canvas
          drawHeight = canvas.width / imgAspectRatio;
          offsetY = (canvas.height - drawHeight) / 2;
        } else { // Imagen más alta que el canvas
          drawWidth = canvas.height * imgAspectRatio;
          offsetX = (canvas.width - drawWidth) / 2;
        }

        ctx.drawImage(garmentImage, offsetX, offsetY, drawWidth, drawHeight);
        resolve(); // Resuelve la promesa cuando la imagen cargue
      };
      garmentImage.onerror = () => {
        console.error("Error al cargar la imagen de la prenda para el canvas. Se usará placeholder.");
        // Opcional: dibujar placeholder si falla
        const placeholderImg = new Image();
        placeholderImg.src = '/images/placeholder.jpg';
        placeholderImg.onload = () => {
          ctx.drawImage(placeholderImg, 0, 0, canvas.width, canvas.height);
          resolve();
        };
        placeholderImg.onerror = () => resolve(); // Resolver incluso si el placeholder falla
      };
    });

    // Dibujar el diseño del usuario encima de la prenda
    const designImage = new Image();
    designImage.crossOrigin = 'Anonymous'; // Importante para CORS
    designImage.src = uploadedImage;

    // Esperar a que la imagen del diseño cargue
    await new Promise((resolve) => {
      designImage.onload = () => {
        // Calcular la posición y el tamaño del diseño en relación con el canvas
        // (escalando las coordenadas de React al tamaño del canvas)
        const scaleX = canvas.width / garmentWrapperRect.width;
        const scaleY = canvas.height / garmentWrapperRect.height;

        const designXOnCanvas = designPosition.x * scaleX;
        const designYOnCanvas = designPosition.y * scaleY;
        const designWidthOnCanvas = designSize.width * scaleX;
        const designHeightOnCanvas = designSize.height * scaleY;

        ctx.drawImage(designImage, designXOnCanvas, designYOnCanvas, designWidthOnCanvas, designHeightOnCanvas);
        resolve();
      };
      designImage.onerror = () => {
        console.error("Error al cargar la imagen del diseño para el canvas.");
        resolve();
      };
    });

    // Retornar la URL de la imagen combinada
    return canvas.toDataURL('image/png'); // O 'image/jpeg' con un segundo parámetro para calidad (ej. 0.9)
  };

  // --- NUEVA FUNCIÓN: Manejar la descarga del diseño personalizado ---
  const handleDownloadDesign = async () => {
    if (!uploadedImage) {
      alert('Por favor, sube tu diseño para poder descargarlo.');
      return;
    }
    const dataUrl = await generateCombinedImage(); // Generar la imagen
    if (dataUrl) {
      // Crear un enlace temporal para la descarga
      const a = document.createElement('a');
      a.href = dataUrl;
      a.download = `mi-diseño-personalizado-${selectedGarment.name.toLowerCase()}-${selectedColor.name.toLowerCase()}.png`;
      document.body.appendChild(a);
      a.click(); // Simular clic para iniciar la descarga
      document.body.removeChild(a); // Eliminar el enlace temporal
      // No alert aquí, el texto al lado del botón lo explica
    }
  };

  // --- FUNCIÓN PARA GENERAR EL ENLACE DE WHATSAPP (solo texto) ---
  const generateWhatsAppLink = () => {
    const productName = encodeURIComponent(selectedGarment.name);
    // ¡CORRECCIÓN AQUÍ! Acceder a .name del objeto selectedColor
    const color = encodeURIComponent(selectedColor.name);
    const size = encodeURIComponent(selectedSize);
    const gender = encodeURIComponent(selectedGender);
    const location = encodeURIComponent(selectedLocation);

    const message = `¡Hola! Quiero personalizar una ${productName} (${gender}) en color ${color}, talla ${size}, con un diseño en la ${location}. (Si descargaste la imagen, por favor adjúntala aquí).`;
    return `https://wa.me/573205646710?text=${encodeURIComponent(message)}`;
  };

  // Función para obtener la URL de la imagen de la prenda base
  const getGarmentImage = () => {
    const garmentName = selectedGarment.imageUrlPrefix || selectedGarment.name.toLowerCase();
    const gender = selectedGender.toLowerCase();
    // ¡CORRECCIÓN AQUÍ! Acceder a .name del objeto selectedColor
    const color = selectedColor.name.toLowerCase();
    // La vista se basa en la selectedLocation. Si es 'Espalda', usa 'espalda', de lo contrario 'frente'.
    // Esto es para que las mangas se vean en la vista frontal de la prenda base.
    const view = (selectedLocation === 'Espalda') ? 'espalda' : 'frente';

    const imagePath = `/images/${garmentName}-${gender}-${color}-${view}.jpg`;
    return imagePath;
  };

  return (
    <div className="customize-page bg-gray-50 min-h-screen py-12 px-5 md:px-10 lg:px-20">
      <div className="max-w-[1200px] mx-auto bg-white rounded-xl shadow-2xl overflow-hidden p-8 md:p-12">
        <h1 className="text-4xl md:text-5xl lg:text-6xl text-gray-900 font-extrabold mb-4 text-center">
          Diseña Tu Prenda Perfecta
        </h1>
        <p className="text-lg md:text-xl text-gray-600 mb-10 text-center max-w-3xl mx-auto">
          Sube tu diseño y personaliza cada detalle: elige la prenda, color, talla, género y dónde ubicar tu estampado.
        </p>

        <div className="customize-grid grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Sección de previsualización */}
          <div className="customize-preview-container bg-gray-100 rounded-xl overflow-hidden shadow-inner flex items-center justify-center p-4 relative">
            <div ref={garmentImageWrapperRef} className="customize-image-wrapper relative w-full h-[500px] flex items-center justify-center">
              {/* Imagen de la prenda base */}
              <img
                ref={garmentImageRef} // Referencia para el canvas
                src={getGarmentImage()} // Usa la función para obtener la URL de la imagen
                alt={`${selectedGarment.name} ${selectedGender} ${selectedColor.name} ${selectedLocation}`}
                className="w-auto h-full object-contain transition-all duration-300 ease-in-out"
                onError={(e) => { // En caso de que la imagen no cargue, usa un placeholder
                  e.target.src = '/images/placeholder.jpg';
                  e.target.alt = "Imagen no disponible";
                }}
              />
              {/* Div para el diseño adjuntado (arrastrable y redimensionable) */}
              {uploadedImage && ( // Solo muestra el diseño si hay una imagen subida
                <div
                  ref={designStampRef} // Referencia para la manipulación
                  className="customize-stamp absolute bg-contain bg-no-repeat bg-center border-2 border-dashed border-gray-400 opacity-90"
                  style={{
                    backgroundImage: `url(${uploadedImage})`, // El diseño subido como fondo
                    left: designPosition.x, // Posición X dinámica
                    top: designPosition.y, // Posición Y dinámica
                    width: designSize.width, // Ancho dinámico
                    height: designSize.height, // Alto dinámico
                  }}
                  onMouseDown={handleMouseDown} // Inicia el arrastre
                >
                  {/* Handle para redimensionar en la esquina inferior derecha */}
                  <div className="resize-handle bottom-right" onMouseDown={handleResizeMouseDown}></div>
                </div>
              )}
              {/* Mensaje si no hay diseño subido */}
              {!uploadedImage && (
                  <div className="absolute inset-0 flex items-center justify-center text-gray-500 text-base md:text-lg p-4 bg-gray-100 bg-opacity-80 rounded-xl">
                      <p className="text-center">Sube tu diseño para verlo aquí</p>
                  </div>
              )}
            </div>
          </div>

          {/* Sección de controles */}
          <div className="customize-controls-container p-6 md:p-8 bg-gray-50 rounded-xl shadow-lg border border-gray-100">
            {/* Sección 1: Sube tu diseño */}
            <div className="customize-section mb-8 border-b pb-6 border-gray-200">
                <h2 className="customize-section-title font-bold text-xl text-gray-900 mb-4">1. Sube tu diseño</h2>
                <label htmlFor="file-upload" className="customize-file-upload-label flex items-center justify-center py-3 px-6 bg-blue-serene text-white rounded-lg shadow-md hover:bg-blue-600 cursor-pointer transition-colors duration-300">
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M3 17a1 1 0 01-1-1V6a1 1 0 011-1h5.172a2 2 0 001.414-.586L10 3.414A2 2 0 0111.414 3h5.172a1 1 0 011 1v12a1 1 0 01-1 1H3zm6.414-2.707a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L8 15.414V17a1 1 0 102 0v-1.586l.293.293a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L10 13.586l-3-3a1 1 0 00-1.414 0zM10 11a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd"></path></svg>
                    {uploadedImage ? 'Cambiar Diseño' : 'Seleccionar Diseño'}
                </label>
                <input
                    id="file-upload"
                    type="file"
                    accept="image/jpeg,image/png"
                    className="hidden"
                    onChange={handleImageUpload}
                    ref={fileInputRef}
                />
                <p className="text-sm text-gray-500 mt-2 text-center">Formatos aceptados: JPG, PNG (máximo 5MB).</p>
                {uploadedImage && (
                    <div className="flex justify-center mt-4">
                        <button
                            onClick={() => { setUploadedImage(null); if(fileInputRef.current) fileInputRef.current.value = ''; }}
                            className="text-red-500 hover:text-red-700 text-sm font-medium flex items-center"
                        >
                            <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm6 0a1 1 0 11-2 0v6a1 1 0 112 0V8z" clipRule="evenodd"></path></svg>
                            Quitar diseño
                        </button>
                    </div>
                )}
            </div>

            {/* Sección 2: Elige tu prenda */}
            <div className="customize-section mb-6">
                <h2 className="customize-section-title font-bold text-xl text-gray-900 mb-4">2. Elige tu prenda</h2>
                <div className="customize-options flex flex-wrap gap-3">
                    {garments.map((garment) => (
                        <button
                            key={garment.id}
                            className={`customize-option-button ${
                                selectedGarment.id === garment.id
                                    ? 'active'
                                    : ''
                            }`}
                            onClick={() => {
                                setSelectedGarment(garment);
                                // Al cambiar de prenda, el color y la talla se resetean al primer valor de la nueva prenda
                                setSelectedColor(garment.colors[0]);
                                setSelectedSize(garment.sizes[0]);
                            }}
                        >
                            {garment.name}
                        </button>
                    ))}
                </div>
            </div>

            {/* Sección 3: Elige el color (usando muestras de color) */}
            <div className="customize-section mb-6">
              <h2 className="customize-section-title font-bold text-xl text-gray-900 mb-4">3. Elige el color</h2>
              <div className="customize-options flex flex-wrap gap-3 max-h-40 overflow-y-auto pr-2 custom-scroll"> {/* max-h y overflow para scroll si hay muchos */}
                {selectedGarment.colors.map((color) => (
                  <div
                    key={color.name}
                    className={`customize-color-swatch-container relative cursor-pointer transition-all duration-200 ease-in-out group ${
                      selectedColor.name === color.name ? 'active' : ''
                    }`}
                    onClick={() => setSelectedColor(color)}
                    title={color.name} // Tooltip al pasar el mouse
                  >
                    <div
                      className="customize-color-swatch w-10 h-10 rounded-full border-2 border-gray-300 flex items-center justify-center transition-all duration-200 ease-in-out"
                      style={{ backgroundColor: color.value }} // Usa el valor HEX para el color de fondo
                    >
                      {/* Ícono de "check" para el color seleccionado */}
                      {selectedColor.name === color.name && (
                        <svg className="w-5 h-5 text-white stroke-current" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M5 13l4 4L19 7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Sección 4: Elige el género */}
            <div className="customize-section mb-6">
                <h2 className="customize-section-title font-bold text-xl text-gray-900 mb-4">4. Elige el género</h2>
                <div className="customize-options flex flex-wrap gap-3">
                    {['Hombre', 'Mujer', 'Niños'].map((gender) => (
                        <button
                            key={gender}
                            className={`customize-option-button ${
                                selectedGender === gender
                                    ? 'active'
                                    : ''
                            }`}
                            onClick={() => setSelectedGender(gender)}
                        >
                            {gender}
                        </button>
                    ))}
                </div>
            </div>

            {/* Sección 5: Elige la talla */}
            <div className="customize-section mb-6">
                <h2 className="customize-section-title font-bold text-xl text-gray-900 mb-4">5. Elige la talla</h2>
                <div className="customize-options flex flex-wrap gap-3">
                    {selectedGarment.sizes.map((size) => (
                        <button
                            key={size}
                            className={`customize-option-button ${
                                selectedSize === size
                                    ? 'active'
                                    : ''
                            }`}
                            onClick={() => setSelectedSize(size)}
                        >
                            {size}
                        </button>
                    ))}
                </div>
            </div>

            {/* Sección 6: Ubicación del diseño */}
            <div className="customize-section mb-8">
                <h2 className="customize-section-title font-bold text-xl text-gray-900 mb-4">6. Ubicación del diseño</h2>
                <div className="customize-options flex flex-wrap gap-3">
                    {['Frente', 'Espalda', 'Manga Derecha', 'Manga Izquierda'].map((area) => (
                        <button
                            key={area}
                            className={`customize-option-button ${
                                selectedLocation === area
                                    ? 'active'
                                    : ''
                            }`}
                            onClick={() => setSelectedLocation(area)}
                        >
                            {area}
                        </button>
                    ))}
                </div>
            </div>

            {/* Sección 7: Finaliza tu diseño (Descarga + WhatsApp) */}
            {uploadedImage && ( // Solo muestra esta sección si hay un diseño subido
                <div className="customize-section mb-8 border-b pb-6 border-gray-200">
                    <h2 className="customize-section-title font-bold text-xl text-gray-900 mb-4">7. Finaliza tu diseño</h2>
                    <p className="text-sm text-gray-600 mb-4 text-center">
                        Si deseas que tu pedido incluya la imagen de cómo quieres tu diseño, descárgala aquí y adjúntala manualmente en WhatsApp:
                    </p>
                    {/* Botón para descargar el diseño personalizado */}
                    <button
                        className="customize-download-button block w-full text-white text-center py-3 rounded-lg no-underline text-lg font-semibold transition-all duration-300 ease-in-out transform hover:scale-105 mb-4"
                        onClick={handleDownloadDesign} // Llama a la función de descarga
                    >
                        <div className="flex items-center justify-center gap-2">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 0 003 3h10a3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
                            <span>Descargar Diseño Personalizado</span>
                        </div>
                    </button>

                    <p className="text-sm text-gray-600 mb-4 text-center">
                        O, si prefieres solo enviar los detalles (sin imagen), haz clic en el botón de WhatsApp:
                    </p>
                </div>
            )}
            
            {/* Botón de WhatsApp (solo texto) */}
            <button
              className={`customize-submit-button block w-full text-white text-center py-4 rounded-lg no-underline text-xl font-semibold transition-all duration-300 ease-in-out transform hover:scale-105 ${
                uploadedImage ? 'bg-[#25D366] hover:bg-[#1DAE54]' : 'bg-gray-400 opacity-70 cursor-not-allowed'
              }`}
              disabled={!uploadedImage} // Deshabilitado si no hay imagen subida
              onClick={() => window.open(generateWhatsAppLink(), '_blank')} // Abre WhatsApp con el mensaje de texto
            >
              <div className="flex items-center justify-center gap-2">
                <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.5 3.44 1.46 4.96L2 22l5.24-1.38c1.45.79 3.09 1.22 4.6 1.22 5.46 0 9.91-4.45 9.91-9.91s-4.45-9.91-9.91-9.91zm5.04 14.89l-.33.22c-1.41.93-3.21 1.44-4.54 1.44-1.33 0-2.6-.37-3.7-1.12l-.2-.12-2.07.54.55-2.02-.13-.22c-.8-1.42-1.24-3.03-1.24-4.73 0-4.43 3.58-8.01 8.01-8.01s8.01 3.58 8.01 8.01c0 1.76-.56 3.4-1.5 4.7l-.23.32zM12.04 6.75c-3.13 0-5.69 2.56-5.69 5.69s2.56 5.69 5.69 5.69c1.03 0 2.02-.27 2.89-.75l.62-.35.19.1c.95.5 2.01.76 3.11.76.12 0 .24 0 .36-.01l-.73-2.65-.1-.28c.45-.48.83-1.03 1.14-1.63.31-.6.55-1.24.7-1.92h-.01c.2-.95.3-1.94.3-2.95 0-3.13-2.56-5.69-5.69-5.69zm-.04 1.62c.49 0 .96.06 1.41.17l-.2-.48c-.76-.17-1.5-.26-2.27-.26-2.06 0-3.75 1.69-3.75 3.75s1.69 3.75 3.75 3.75c0-.77-.25-1.48-.68-2.06l-.27-.37.36-.05c.87-.13 1.7-.35 2.5-.66l.09-.04.2-.47c-.57-.45-1.24-.76-1.96-.92l-.37-.08-.07.36c-.16.78-.45 1.51-.86 2.19l-.17.29c-.3.5-.64.96-1.02 1.39l-.3.33-.2-.07c-.42-.14-.85-.23-1.28-.23z"/>
                </svg>
                <span>Enviar Detalles por WhatsApp</span>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomizePage;