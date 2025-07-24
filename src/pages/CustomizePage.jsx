import React, { useState, useEffect, useRef, useCallback } from 'react';
import './CustomizePage.css';

const CustomizePage = () => {
  const garments = [
    { id: 1, name: 'Camiseta', colors: ['Blanco', 'Negro', 'Azul'], sizes: ['S', 'M', 'L', 'XL'], imageUrlPrefix: 'camiseta' },
    { id: 2, name: 'Buso', colors: ['Blanco', 'Gris', 'Negro'], sizes: ['S', 'M', 'L', 'XL'], imageUrlPrefix: 'buso' },
    { id: 3, name: 'Blusón', colors: ['Blanco', 'Rojo', 'Azul'], sizes: ['S', 'M', 'L', 'XL'], imageUrlPrefix: 'bluson' },
  ];

  const [selectedGarment, setSelectedGarment] = useState(garments[0]);
  const [selectedColor, setSelectedColor] = useState(garments[0].colors[0]);
  const [selectedSize, setSelectedSize] = useState(garments[0].sizes[0]);
  const [selectedGender, setSelectedGender] = useState('Hombre');
  const [selectedLocation, setSelectedLocation] = useState('Frente');
  const [uploadedImage, setUploadedImage] = useState(null);

  const [designPosition, setDesignPosition] = useState({ x: 0, y: 0 });
  const [designSize, setDesignSize] = useState({ width: 200, height: 200 });
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [resizeStartMouse, setResizeStartMouse] = useState({ x: 0, y: 0 });
  const [resizeStartSize, setResizeStartSize] = useState({ width: 0, height: 0 });
  const [resizeStartPos, setResizeStartPos] = useState({ x: 0, y: 0 });

  const fileInputRef = useRef(null);
  const garmentImageWrapperRef = useRef(null);
  const designStampRef = useRef(null);
  const garmentImageRef = useRef(null);

  // Efecto para centrar y ajustar tamaño inicial del diseño
  useEffect(() => {
    if (uploadedImage && garmentImageWrapperRef.current) { // designStampRef.current is not needed here as it might not be rendered yet
      const garmentRect = garmentImageWrapperRef.current.getBoundingClientRect();
      
      const img = new Image();
      img.src = uploadedImage;
      img.onload = () => {
        const aspectRatio = img.width / img.height;
        let initialWidth = Math.min(garmentRect.width * 0.5, 200);
        let initialHeight = initialWidth / aspectRatio;

        if (initialHeight > garmentRect.height * 0.5) {
            initialHeight = Math.min(garmentRect.height * 0.5, 200);
            initialWidth = initialHeight * aspectRatio;
        }

        setDesignSize({ width: initialWidth, height: initialHeight });
        setDesignPosition({
          x: (garmentRect.width / 2) - (initialWidth / 2),
          y: (garmentRect.height / 2) - (initialHeight / 2),
        });
      };
    }
  }, [uploadedImage, garmentImageWrapperRef]);

  // Manejar la subida de imagen
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file && (file.type === 'image/jpeg' || file.type === 'image/png')) {
      if (file.size > 5 * 1024 * 1024) {
        alert('La imagen excede el tamaño máximo de 5MB. Por favor, sube una imagen más pequeña.');
        return;
      }
      const reader = new FileReader();
      reader.onload = () => {
        setUploadedImage(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      alert('Formato de imagen no válido. Por favor, sube una imagen en formato JPG o PNG.');
      setUploadedImage(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  // --- Lógica de Arrastre (Drag) ---
  const handleMouseDown = useCallback((e) => {
    e.preventDefault();
    if (designStampRef.current && e.target === designStampRef.current) {
      setIsDragging(true);
      setDragOffset({
        x: e.clientX - designPosition.x,
        y: e.clientY - designPosition.y,
      });
    }
  }, [designPosition]);

  const handleMouseMove = useCallback((e) => {
    if (isDragging && garmentImageWrapperRef.current && designStampRef.current) {
      const garmentRect = garmentImageWrapperRef.current.getBoundingClientRect();
      const designRect = designStampRef.current.getBoundingClientRect();

      let newX = e.clientX - dragOffset.x;
      let newY = e.clientY - dragOffset.y;

      newX = Math.max(0, Math.min(newX, garmentRect.width - designRect.width));
      newY = Math.max(0, Math.min(newY, garmentRect.height - designRect.height));

      setDesignPosition({ x: newX, y: newY });
    } else if (isResizing && garmentImageWrapperRef.current && designStampRef.current) {
      const garmentRect = garmentImageWrapperRef.current.getBoundingClientRect();
      const dx = e.clientX - resizeStartMouse.x;
      const dy = e.clientY - resizeStartMouse.y;

      let newWidth = resizeStartSize.width + dx;
      let newHeight = resizeStartSize.height + dy;

      const aspectRatio = resizeStartSize.width / resizeStartSize.height;
      if (aspectRatio && !isNaN(aspectRatio)) {
          if (Math.abs(dx) > Math.abs(dy)) {
            newHeight = newWidth / aspectRatio;
          } else {
            newWidth = newHeight * aspectRatio;
          }
      }

      const minSize = 20;
      const maxWidth = garmentRect.width * 0.9;
      const maxHeight = garmentRect.height * 0.9;

      newWidth = Math.max(minSize, Math.min(newWidth, maxWidth));
      newHeight = Math.max(minSize, Math.min(newHeight, maxHeight));

      let newX = resizeStartPos.x;
      let newY = resizeStartPos.y;

      if (newX + newWidth > garmentRect.width) {
        newX = garmentRect.width - newWidth;
      }
      if (newY + newHeight > garmentRect.height) {
        newY = garmentRect.height - newHeight;
      }

      setDesignSize({ width: newWidth, height: newHeight });
      setDesignPosition({ x: newX, y: newY });
    }
  }, [isDragging, dragOffset, isResizing, resizeStartMouse, resizeStartSize, resizeStartPos, garmentImageWrapperRef, designStampRef]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
    setIsResizing(false);
  }, []);

  useEffect(() => {
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [handleMouseMove, handleMouseUp]);

  const handleResizeMouseDown = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsResizing(true);
    setResizeStartMouse({ x: e.clientX, y: e.clientY });
    setResizeStartSize({ width: designSize.width, height: designSize.height });
    setResizeStartPos({ x: designPosition.x, y: designPosition.y });
  }, [designSize, designPosition]);

  // --- FUNCIÓN CENTRAL: Generar la imagen combinada (retorna dataUrl) ---
  const generateCombinedImage = async () => {
    if (!uploadedImage || !garmentImageRef.current || !designStampRef.current || !garmentImageWrapperRef.current) {
      alert('Por favor, sube un diseño para generar la imagen.');
      return null;
    }

    const garmentImgElement = garmentImageRef.current;
    const garmentWrapperRect = garmentImageWrapperRef.current.getBoundingClientRect();

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    const renderWidth = garmentImgElement.clientWidth;
    const renderHeight = garmentImgElement.clientHeight;

    canvas.width = renderWidth;
    canvas.height = renderHeight;

    const garmentImage = new Image();
    garmentImage.crossOrigin = 'Anonymous';
    garmentImage.src = garmentImgElement.src;

    await new Promise((resolve) => {
      garmentImage.onload = () => {
        const imgAspectRatio = garmentImage.width / garmentImage.height;
        const canvasAspectRatio = canvas.width / canvas.height;

        let drawWidth = canvas.width;
        let drawHeight = canvas.height;
        let offsetX = 0;
        let offsetY = 0;

        if (imgAspectRatio > canvasAspectRatio) {
          drawHeight = canvas.width / imgAspectRatio;
          offsetY = (canvas.height - drawHeight) / 2;
        } else {
          drawWidth = canvas.height * imgAspectRatio;
          offsetX = (canvas.width - drawWidth) / 2;
        }

        ctx.drawImage(garmentImage, offsetX, offsetY, drawWidth, drawHeight);
        resolve();
      };
      garmentImage.onerror = () => {
        console.error("Error al cargar la imagen de la prenda para el canvas.");
        resolve();
      };
    });

    const designImage = new Image();
    designImage.crossOrigin = 'Anonymous';
    designImage.src = uploadedImage;

    await new Promise((resolve) => {
      designImage.onload = () => {
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

    return canvas.toDataURL('image/png');
  };

  // --- NUEVA FUNCIÓN: Manejar Descarga de Diseño ---
  const handleDownloadDesign = async () => {
    const dataUrl = await generateCombinedImage();
    if (dataUrl) {
      const a = document.createElement('a');
      a.href = dataUrl;
      a.download = `mi-diseño-personalizado-${selectedGarment.name.toLowerCase()}-${selectedColor.toLowerCase()}.png`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      alert('¡Diseño descargado! Ahora puedes adjuntarlo a tu mensaje de WhatsApp.');
    }
  };

  // --- FUNCIÓN ORIGINAL: Generar enlace de WhatsApp (solo texto) ---
  const generateWhatsAppLink = () => {
    const productName = encodeURIComponent(selectedGarment.name);
    const color = encodeURIComponent(selectedColor);
    const size = encodeURIComponent(selectedSize);
    const gender = encodeURIComponent(selectedGender);
    const location = encodeURIComponent(selectedLocation);

    const message = `¡Hola! Quiero personalizar una ${productName} (${gender}) en color ${color}, talla ${size}, con un diseño en la ${location}. (Si descargaste la imagen, por favor adjúntala aquí).`;
    return `https://wa.me/573205646710?text=${encodeURIComponent(message)}`;
  };

  // Función para obtener la imagen de la prenda base
  const getGarmentImage = () => {
    const garmentName = selectedGarment.imageUrlPrefix || selectedGarment.name.toLowerCase();
    const gender = selectedGender.toLowerCase();
    const color = selectedColor.toLowerCase();
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
              <img
                ref={garmentImageRef}
                src={getGarmentImage()}
                alt={`${selectedGarment.name} ${selectedGender} ${selectedColor} ${selectedLocation}`}
                className="w-auto h-full object-contain transition-all duration-300 ease-in-out"
                onError={(e) => {
                  e.target.src = '/images/placeholder.jpg';
                  e.target.alt = "Imagen no disponible";
                }}
              />
              {uploadedImage && (
                <div
                  ref={designStampRef}
                  className="customize-stamp absolute bg-contain bg-no-repeat bg-center border-2 border-dashed border-gray-400 opacity-80"
                  style={{
                    backgroundImage: `url(${uploadedImage})`,
                    left: designPosition.x,
                    top: designPosition.y,
                    width: designSize.width,
                    height: designSize.height,
                  }}
                  onMouseDown={handleMouseDown}
                >
                  <div className="resize-handle bottom-right" onMouseDown={handleResizeMouseDown}></div>
                </div>
              )}
              {!uploadedImage && (
                  <div className="absolute inset-0 flex items-center justify-center text-gray-500 text-base md:text-lg p-4 bg-gray-100 bg-opacity-80 rounded-xl">
                      <p className="text-center">Sube tu diseño para verlo aquí</p>
                  </div>
              )}
            </div>
          </div>

          {/* Sección de controles */}
          <div className="customize-controls-container p-6 md:p-8 bg-gray-50 rounded-xl shadow-lg border border-gray-100">
            {/* Sección de subida de imagen */}
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

            {/* Resto de secciones de control (Prenda, Color, Género, Talla, Ubicación) */}
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
                                setSelectedColor(garment.colors[0]);
                                setSelectedSize(garment.sizes[0]);
                            }}
                        >
                            {garment.name}
                        </button>
                    ))}
                </div>
            </div>

            <div className="customize-section mb-6">
                <h2 className="customize-section-title font-bold text-xl text-gray-900 mb-4">3. Elige el color</h2>
                <div className="customize-options flex flex-wrap gap-3">
                    {selectedGarment.colors.map((color) => (
                        <button
                            key={color}
                            className={`customize-option-button ${
                                selectedColor === color
                                    ? 'active'
                                    : ''
                            }`}
                            onClick={() => setSelectedColor(color)}
                        >
                            {color}
                        </button>
                    ))}
                </div>
            </div>

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

            {/* NUEVO APARTADO: Descargar y WhatsApp */}
            {uploadedImage && (
                <div className="customize-section mb-8 border-b pb-6 border-gray-200">
                    <h2 className="customize-section-title font-bold text-xl text-gray-900 mb-4">7. Finaliza tu diseño</h2>
                    <p className="text-sm text-gray-600 mb-4 text-center">
                        Si deseas que tu pedido incluya la imagen de cómo quieres tu diseño, descárgala aquí y adjúntala manualmente en WhatsApp.
                    </p>
                    <button
                        className="customize-download-button block w-full text-white text-center py-3 rounded-lg no-underline text-lg font-semibold transition-all duration-300 ease-in-out transform hover:scale-105 mb-4"
                        onClick={handleDownloadDesign}
                    >
                        <div className="flex items-center justify-center gap-2">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
                            <span>Descargar Diseño Personalizado</span>
                        </div>
                    </button>

                    <p className="text-sm text-gray-600 mb-4 text-center">
                        O, si prefieres solo enviar los detalles, haz clic en el botón de WhatsApp:
                    </p>
                </div>
            )}
            
            {/* Botón de WhatsApp (solo texto) */}
            <button
              className={`customize-submit-button block w-full text-white text-center py-4 rounded-lg no-underline text-xl font-semibold transition-all duration-300 ease-in-out transform hover:scale-105 ${
                uploadedImage ? 'bg-[#25D366] hover:bg-[#1DAE54]' : 'bg-gray-400 opacity-70 cursor-not-allowed'
              }`}
              disabled={!uploadedImage}
              onClick={() => window.open(generateWhatsAppLink(), '_blank')}
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