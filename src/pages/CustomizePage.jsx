import React, { useState, useEffect, useRef, useCallback } from "react";
import { garments, garmentImages } from "../data/garmentData";
import "./CustomizePage.css";

const CustomizePage = () => {
  const [selectedGarment, setSelectedGarment] = useState(garments[0]);
  const [selectedColor, setSelectedColor] = useState(garments[0].colors[0]);
  const [selectedSize, setSelectedSize] = useState(garments[0].sizes[0]);
  const [selectedGender, setSelectedGender] = useState(
    garments[0].gender || "Hombre"
  );
  const [selectedLocation, setSelectedLocation] = useState("Frente");
  const [uploadedImage, setUploadedImage] = useState(null);
  const [designPosition, setDesignPosition] = useState({ x: 0, y: 0 });
  const [designSize, setDesignSize] = useState({ width: 200, height: 200 });
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [resizeStartMouse, setResizeStartMouse] = useState({ x: 0, y: 0 });
  const [resizeStartSize, setResizeStartSize] = useState({
    width: 0,
    height: 0,
  });
  const [resizeStartPos, setResizeStartPos] = useState({ x: 0, y: 0 });

  const fileInputRef = useRef(null);
  const garmentImageWrapperRef = useRef(null);
  const designStampRef = useRef(null);
  const garmentImageRef = useRef(null);

  useEffect(() => {
    if (uploadedImage && garmentImageWrapperRef.current) {
      const garmentRect =
        garmentImageWrapperRef.current.getBoundingClientRect();
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
        initialWidth = Math.max(initialWidth, 20);
        initialHeight = Math.max(initialHeight, 20);
        setDesignSize({ width: initialWidth, height: initialHeight });
        setDesignPosition({
          x: garmentRect.width / 2 - initialWidth / 2,
          y: garmentRect.height / 2 - initialHeight / 2,
        });
      };
    }
  }, [uploadedImage, garmentImageWrapperRef]);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file && (file.type === "image/jpeg" || file.type === "image/png")) {
      if (file.size > 5 * 1024 * 1024) {
        alert(
          "La imagen excede el tamaño máximo de 5MB. Por favor, sube una imagen más pequeña."
        );
        return;
      }
      const reader = new FileReader();
      reader.onload = () => {
        setUploadedImage(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      alert(
        "Formato de imagen no válido. Por favor, sube una imagen en formato JPG o PNG."
      );
      setUploadedImage(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const handleMouseDown = useCallback(
    (e) => {
      e.preventDefault();
      if (designStampRef.current && e.target === designStampRef.current) {
        setIsDragging(true);
        setDragOffset({
          x: e.clientX - designPosition.x,
          y: e.clientY - designPosition.y,
        });
      }
    },
    [designPosition]
  );

  const handleMouseMove = useCallback(
    (e) => {
      if (
        isDragging &&
        garmentImageWrapperRef.current &&
        designStampRef.current
      ) {
        const garmentRect =
          garmentImageWrapperRef.current.getBoundingClientRect();
        const designRect = designStampRef.current.getBoundingClientRect();
        let newX = e.clientX - dragOffset.x;
        let newY = e.clientY - dragOffset.y;
        newX = Math.max(
          0,
          Math.min(newX, garmentRect.width - designRect.width)
        );
        newY = Math.max(
          0,
          Math.min(newY, garmentRect.height - designRect.height)
        );
        setDesignPosition({ x: newX, y: newY });
      } else if (
        isResizing &&
        garmentImageWrapperRef.current &&
        designStampRef.current
      ) {
        const garmentRect =
          garmentImageWrapperRef.current.getBoundingClientRect();
        const dx = e.clientX - resizeStartMouse.x;
        const dy = e.clientY - resizeStartMouse.y;
        let newWidth = resizeStartSize.width + dx;
        let newHeight = resizeStartSize.height + dy;
        const aspectRatio = resizeStartSize.width / resizeStartSize.height;
        if (aspectRatio && !isNaN(aspectRatio) && isFinite(aspectRatio)) {
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
    },
    [
      isDragging,
      dragOffset,
      isResizing,
      resizeStartMouse,
      resizeStartSize,
      resizeStartPos,
    ]
  );

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
    setIsResizing(false);
  }, []);

  // Funciones para manejar eventos táctiles (móvil)
  const handleTouchStart = useCallback(
    (e) => {
      // Solo prevenir el comportamiento por defecto si es el elemento del diseño
      if (designStampRef.current && e.target === designStampRef.current) {
        e.preventDefault(); // Solo prevenir aquí
        const touch = e.touches[0];
        setIsDragging(true);
        setDragOffset({
          x: touch.clientX - designPosition.x,
          y: touch.clientY - designPosition.y,
        });
      }
    },
    [designPosition]
  );

  const handleTouchMove = useCallback(
    (e) => {
      // Solo prevenir scroll si estamos arrastrando o redimensionando
      if (isDragging || isResizing) {
        e.preventDefault();
      }

      if (
        isDragging &&
        garmentImageWrapperRef.current &&
        designStampRef.current &&
        e.touches.length === 1
      ) {
        const touch = e.touches[0];
        const garmentRect =
          garmentImageWrapperRef.current.getBoundingClientRect();
        const designRect = designStampRef.current.getBoundingClientRect();
        let newX = touch.clientX - dragOffset.x;
        let newY = touch.clientY - dragOffset.y;
        newX = Math.max(
          0,
          Math.min(newX, garmentRect.width - designRect.width)
        );
        newY = Math.max(
          0,
          Math.min(newY, garmentRect.height - designRect.height)
        );
        setDesignPosition({ x: newX, y: newY });
      } else if (
        isResizing &&
        garmentImageWrapperRef.current &&
        designStampRef.current &&
        e.touches.length === 1
      ) {
        const touch = e.touches[0];
        const garmentRect =
          garmentImageWrapperRef.current.getBoundingClientRect();
        const dx = touch.clientX - resizeStartMouse.x;
        const dy = touch.clientY - resizeStartMouse.y;
        let newWidth = resizeStartSize.width + dx;
        let newHeight = resizeStartSize.height + dy;
        const aspectRatio = resizeStartSize.width / resizeStartSize.height;
        if (aspectRatio && !isNaN(aspectRatio) && isFinite(aspectRatio)) {
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
    },
    [
      isDragging,
      dragOffset,
      isResizing,
      resizeStartMouse,
      resizeStartSize,
      resizeStartPos,
    ]
  );

  const handleTouchEnd = useCallback(() => {
    setIsDragging(false);
    setIsResizing(false);
  }, []);

  const handleResizeTouchStart = useCallback(
    (e) => {
      e.preventDefault();
      e.stopPropagation();
      const touch = e.touches[0];
      setIsResizing(true);
      setResizeStartMouse({ x: touch.clientX, y: touch.clientY });
      setResizeStartSize({
        width: designSize.width,
        height: designSize.height,
      });
      setResizeStartPos({ x: designPosition.x, y: designPosition.y });
    },
    [designSize, designPosition]
  );

  useEffect(() => {
    // Eventos de mouse (desktop)
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);

    // Eventos táctiles con passive: false solo cuando sea necesario
    const touchMoveOptions = { passive: false };
    document.addEventListener("touchmove", handleTouchMove, touchMoveOptions);
    document.addEventListener("touchend", handleTouchEnd);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("touchmove", handleTouchMove);
      document.removeEventListener("touchend", handleTouchEnd);
    };
  }, [handleMouseMove, handleMouseUp, handleTouchMove, handleTouchEnd]);

  const generateCombinedImage = async () => {
    if (
      !uploadedImage ||
      !garmentImageRef.current ||
      !designStampRef.current ||
      !garmentImageWrapperRef.current
    ) {
      alert("Por favor, sube un diseño para generar la imagen.");
      return null;
    }
    const garmentImgElement = garmentImageRef.current;
    const garmentWrapperRect =
      garmentImageWrapperRef.current.getBoundingClientRect();
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const renderWidth = garmentImgElement.clientWidth;
    const renderHeight = garmentImgElement.clientHeight;
    canvas.width = renderWidth;
    canvas.height = renderHeight;
    const garmentImage = new Image();
    garmentImage.crossOrigin = "Anonymous";
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
        console.error(
          "Error al cargar la imagen de la prenda para el canvas. Se usará placeholder."
        );
        const placeholderImg = new Image();
        placeholderImg.src =
          "https://res.cloudinary.com/dacdd3m0j/image/upload/v1753466553/blanca-delante_k4moa9.jpg";
        placeholderImg.onload = () => {
          ctx.drawImage(placeholderImg, 0, 0, canvas.width, canvas.height);
          resolve();
        };
        placeholderImg.onerror = () => resolve();
      };
    });
    const designImage = new Image();
    designImage.crossOrigin = "Anonymous";
    designImage.src = uploadedImage;
    await new Promise((resolve) => {
      designImage.onload = () => {
        const scaleX = canvas.width / garmentWrapperRect.width;
        const scaleY = canvas.height / garmentWrapperRect.height;
        const designXOnCanvas = designPosition.x * scaleX;
        const designYOnCanvas = designPosition.y * scaleY;
        const designWidthOnCanvas = designSize.width * scaleX;
        const designHeightOnCanvas = designSize.height * scaleY;
        ctx.drawImage(
          designImage,
          designXOnCanvas,
          designYOnCanvas,
          designWidthOnCanvas,
          designHeightOnCanvas
        );
        resolve();
      };
      designImage.onerror = () => {
        console.error("Error al cargar la imagen del diseño para el canvas.");
        resolve();
      };
    });
    return canvas.toDataURL("image/png");
  };

  const handleDownloadDesign = async () => {
    if (!uploadedImage) {
      alert("Por favor, sube tu diseño para poder descargarlo.");
      return;
    }
    const dataUrl = await generateCombinedImage();
    if (dataUrl) {
      const a = document.createElement("a");
      a.href = dataUrl;
      a.download = `mi-diseno-personalizado-${selectedGarment.name.toLowerCase()}-${selectedColor.name.toLowerCase()}.png`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }
  };

  const generateWhatsAppLink = () => {
    const productName = encodeURIComponent(selectedGarment.name);
    const color = encodeURIComponent(selectedColor.name);
    const size = encodeURIComponent(selectedSize);
    const gender = encodeURIComponent(selectedGender);
    const location = encodeURIComponent(selectedLocation);
    const message = `¡Hola! Quiero personalizar una ${productName} (${gender}) en color ${color}, talla ${size}, con un diseño en la ${location}. (Si descargaste la imagen, por favor adjúntala aquí).`;
    return `https://wa.me/573205646710?text=${encodeURIComponent(message)}`;
  };

  const getGarmentImage = () => {
    const view = selectedLocation === "Espalda" ? "espalda" : "delante";
    const imageUrl =
      garmentImages[selectedGarment.name]?.[selectedGender]?.[
        selectedColor.name
      ]?.[view];

    if (!imageUrl || imageUrl.includes("placeholder.jpg")) {
      const garmentName =
        selectedGarment.imageUrlPrefix || selectedGarment.name.toLowerCase();
      const gender = selectedGender.toLowerCase();
      const color = selectedColor.name.toLowerCase().replace(/\s/g, "");
      return `/images/${garmentName}-${gender}-${color}-${view}.jpg`;
    }

    return imageUrl;
  };

  const handleGarmentChange = (garment) => {
    setSelectedGarment(garment);
    setSelectedColor(garment.colors[0]);
    setSelectedSize(garment.sizes[0]);
    if (garment.name === "Blusón") {
      setSelectedGender("Mujer");
    }
  };

  return (
    <div className="design-page-container">
      <div className="design-content-wrapper">
        <h1 className="design-main-title">Diseña Tu Prenda Perfecta</h1>
        <p className="design-subtitle-text">
          Sube tu diseño y personaliza cada detalle: elige la prenda, color,
          talla, género y dónde ubicar tu estampado.
        </p>

        <div className="design-grid-layout">
          {/* Design Preview Area */}
          <div className="design-preview-area">
            <div
              ref={garmentImageWrapperRef}
              className="design-garment-display"
            >
              <img
                ref={garmentImageRef}
                src={getGarmentImage()}
                alt={`${selectedGarment.name} ${selectedGender} ${selectedColor.name} ${selectedLocation}`}
                className="design-garment-image"
                onError={(e) => {
                  e.target.src =
                    "https://res.cloudinary.com/dacdd3m0j/image/upload/v1753466553/blanca-delante_k4moa9.jpg";
                  e.target.alt = "Imagen no disponible";
                }}
              />
              {uploadedImage && (
                <div
                  ref={designStampRef}
                  className="design-stamp-overlay"
                  style={{
                    backgroundImage: `url(${uploadedImage})`,
                    left: designPosition.x,
                    top: designPosition.y,
                    width: designSize.width,
                    height: designSize.height,
                  }}
                  onMouseDown={handleMouseDown}
                  onTouchStart={handleTouchStart}
                >
                  <div
                    className="design-resize-handle"
                    onMouseDown={handleResizeMouseDown}
                    onTouchStart={handleResizeTouchStart}
                  ></div>
                </div>
              )}
              {!uploadedImage && (
                <div className="design-no-image-placeholder">
                  <p>Sube tu diseño para verlo aquí</p>
                </div>
              )}
            </div>
          </div>

          {/* Controls Panel */}
          <div className="design-controls-panel">
            <div className="design-section-group">
              <h2 className="design-section-heading">1. Sube tu diseño</h2>
              <label htmlFor="file-upload" className="design-upload-label">
                <svg
                  className="design-upload-icon"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M3 17a1 1 0 01-1-1V6a1 1 0 011-1h5.172a2 2 0 001.414-.586L10 3.414A2 2 0 0111.414 3h5.172a1 1 0 011 1v12a1 1 0 01-1 1H3zm6.414-2.707a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L8 15.414V17a1 1 0 102 0v-1.586l.293.293a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L10 13.586l-3-3a1 1 0 00-1.414 0zM10 11a1 1 0 100-2 1 1 0 000 2z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                {uploadedImage ? "Cambiar Diseño" : "Seleccionar Diseño"}
              </label>
              <input
                id="file-upload"
                type="file"
                accept="image/jpeg,image/png"
                className="design-file-input"
                onChange={handleImageUpload}
                ref={fileInputRef}
              />
              <p className="design-upload-info-text">
                Formatos aceptados: JPG, PNG (máximo 5MB).
              </p>
              {uploadedImage && (
                <div className="flex justify-center mt-4">
                  <button
                    onClick={() => {
                      setUploadedImage(null);
                      if (fileInputRef.current) fileInputRef.current.value = "";
                    }}
                    className="design-remove-button"
                  >
                    <svg
                      className="design-remove-icon"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm6 0a1 1 0 11-2 0v6a1 1 0 112 0V8z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                    Quitar diseño
                  </button>
                </div>
              )}
            </div>

            <div className="design-section-group">
              <h2 className="design-section-heading">2. Elige tu prenda</h2>
              <div className="design-options-grid">
                {garments
                  .filter((garment) => garment.name === "Camiseta")
                  .map((garment) => (
                    <button
                      key={garment.id}
                      className={`design-option-button ${
                        selectedGarment.id === garment.id ? "active" : ""
                      }`}
                      onClick={() => handleGarmentChange(garment)}
                    >
                      {garment.name}
                    </button>
                  ))}
                {/* Comentado temporalmente */}
                {/* {garments.filter(garment => garment.name !== 'Camiseta').map((garment) => (
                  <button
                    key={garment.id}
                    className={`design-option-button ${selectedGarment.id === garment.id ? 'active' : ''}`}
                    onClick={() => handleGarmentChange(garment)}
                  >
                    {garment.name}
                  </button>
                ))} */}
              </div>
            </div>

            <div className="design-section-group">
              <h2 className="design-section-heading">3. Elige el color</h2>
              <div className="design-options-grid design-color-options-scroll">
                {selectedGarment.colors.map((color) => (
                  <div
                    key={color.name}
                    className={`design-color-swatch-wrapper ${
                      selectedColor.name === color.name ? "active" : ""
                    }`}
                    onClick={() => setSelectedColor(color)}
                    title={color.name}
                  >
                    <div
                      className="design-color-swatch"
                      style={{ backgroundColor: color.value }}
                    >
                      {selectedColor.name === color.name && (
                        <svg
                          className="design-color-swatch-check"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M5 13l4 4L19 7"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="design-section-group">
              <h2 className="design-section-heading">4. Elige el género</h2>
              <div className="design-options-grid">
                {["Hombre", "Mujer", "Niños"].map((gender) => (
                  <button
                    key={gender}
                    className={`design-option-button ${
                      selectedGender === gender ? "active" : ""
                    } ${
                      selectedGarment.name === "Blusón" && gender !== "Mujer"
                        ? "disabled"
                        : ""
                    }`}
                    onClick={() => {
                      if (
                        selectedGarment.name !== "Blusón" ||
                        gender === "Mujer"
                      ) {
                        setSelectedGender(gender);
                      }
                    }}
                    disabled={
                      selectedGarment.name === "Blusón" && gender !== "Mujer"
                    }
                  >
                    {gender}
                  </button>
                ))}
              </div>
            </div>

            <div className="design-section-group">
              <h2 className="design-section-heading">5. Elige la talla</h2>
              <div className="design-options-grid">
                {selectedGarment.sizes.map((size) => (
                  <button
                    key={size}
                    className={`design-option-button ${
                      selectedSize === size ? "active" : ""
                    }`}
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <div className="design-section-group">
              {" "}
              {/* Sección 6 de Ubicación del diseño */}
              <h2 className="design-section-heading">
                6. Ubicación del diseño
              </h2>
              <div className="design-options-grid">
                {["Frente", "Espalda"].map((area) => (
                  <button
                    key={area}
                    className={`design-option-button ${
                      selectedLocation === area ? "active" : ""
                    }`}
                    onClick={() => setSelectedLocation(area)}
                  >
                    {area}
                  </button>
                ))}
              </div>
            </div>

            {uploadedImage && (
              <div className="design-section-group">
                {" "}
                {/* Nueva sección para "Finaliza tu diseño" */}
                <h2 className="design-section-heading">
                  7. Finaliza tu diseño
                </h2>
                <p className="design-finalize-text">
                  Si deseas que tu pedido incluya la imagen de cómo quieres tu
                  diseño, descárgala aquí y adjúntala manualmente en WhatsApp:
                </p>
                <button
                  className="design-download-button"
                  onClick={handleDownloadDesign}
                >
                  <div className="design-download-button-content">
                    <svg
                      className="design-download-icon"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                      ></path>
                    </svg>
                    <span>Descargar Diseño Personalizado</span>
                  </div>
                </button>
                <p className="design-finalize-text">
                  O, si prefieres solo enviar los detalles (sin imagen), haz
                  clic en el botón de WhatsApp:
                </p>
              </div>
            )}

            {/* El botón de WhatsApp se renderiza aquí, fuera del último design-section-group si uploadedImage es false */}
            <button
              className={`design-whatsapp-button ${
                uploadedImage ? "" : "disabled"
              }`}
              disabled={!uploadedImage}
              onClick={() => window.open(generateWhatsAppLink(), "_blank")}
            >
              <div className="design-whatsapp-button-content">
                <svg
                  className="design-whatsapp-icon"
                  xmlns="http://www.w3.org/2000/svg"
                  x="0px"
                  y="0px"
                  width="100"
                  height="100"
                  viewBox="0 0 48 48"
                >
                  <path
                    fill="#fff"
                    d="M4.9,43.3l2.7-9.8C5.9,30.6,5,27.3,5,24C5,13.5,13.5,5,24,5c5.1,0,9.8,2,13.4,5.6	C41,14.2,43,18.9,43,24c0,10.5-8.5,19-19,19c0,0,0,0,0,0h0c-3.2,0-6.3-0.8-9.1-2.3L4.9,43.3z"
                  ></path>
                  <path
                    fill="#fff"
                    d="M4.9,43.8c-0.1,0-0.3-0.1-0.4-0.1c-0.1-0.1-0.2-0.3-0.1-0.5L7,33.5c-1.6-2.9-2.5-6.2-2.5-9.6	C4.5,13.2,13.3,4.5,24,4.5c5.2,0,10.1,2,13.8,5.7c3.7,3.7,5.7,8.6,5.7,13.8c0,10.7-8.7,19.5-19.5,19.5c-3.2,0-6.3-0.8-9.1-2.3L5,43.8C5,43.8,4.9,43.8,4.9,43.8z"
                  ></path>
                  <path
                    fill="#cfd8dc"
                    d="M24,5c5.1,0,9.8,2,13.4,5.6C41,14.2,43,18.9,43,24c0,10.5-8.5,19-19,19h0c-3.2,0-6.3-0.8-9.1-2.3	L4.9,43.3l2.7-9.8C5.9,30.6,5,27.3,5,24C5,13.5,13.5,5,24,5 M24,43L24,43L24,43 M24,43L24,43L24,43 M24,4L24,4C13,4,4,13,4,24	c0,3.4,0.8,6.7,2.5,9.6L3.9,43c-0.1,0.3,0,0.7,0.3,1c0.2,0.2,0.4,0.3,0.7,0.3c0.1,0,0.2,0,0.3,0l9.7-2.5c2.8,1.5,6,2.2,9.2,2.2	c11,0,20-9,20-20c0-5.3-2.1-10.4-5.8-14.1C34.4,6.1,29.4,4,24,4L24,4z"
                  ></path>
                  <path
                    fill="#40c351"
                    d="M35.2,12.8c-3-3-6.9-4.6-11.2-4.6C15.3,8.2,8.2,15.3,8.2,24c0,3,0.8,5.9,2.4,8.4L11,33l-1.6,5.8	l6-1.6l0.6,0.3c2.4,1.4,5.2,2.2,8,2.2h0c8.7,0,15.8-7.1,15.8-15.8C39.8,19.8,38.2,15.8,35.2,12.8z"
                  ></path>
                  <path
                    fill="#fff"
                    fill-rule="evenodd"
                    d="M19.3,16c-0.4-0.8-0.7-0.8-1.1-0.8c-0.3,0-0.6,0-0.9,0s-0.8,0.1-1.3,0.6c-0.4,0.5-1.7,1.6-1.7,4s1.7,4.6,1.9,4.9s3.3,5.3,8.1,7.2c4,1.6,4.8,1.3,5.7,1.2c0.9-0.1,2.8-1.1,3.2-2.3	c0.4-1.1,0.4-2.1,0.3-2.3c-0.1-0.2-0.4-0.3-0.9-0.6s-2.8-1.4-3.2-1.5c-0.4-0.2-0.8-0.2-1.1,0.2c-0.3,0.5-1.2,1.5-1.5,1.9	c-0.3,0.3-0.6,0.4-1,0.1c-0.5-0.2-2-0.7-3.8-2.4c-1.4-1.3-2.4-2.8-2.6-3.3c-0.3-0.5,0-0.7,0.2-1c0.2-0.2,0.5-0.6,0.7-0.8	c0.2-0.3,0.3-0.5,0.5-0.8c0.2-0.3,0.1-0.6,0-0.8C20.6,19.3,19.7,17,19.3,16z"
                    clip-rule="evenodd"
                  ></path>
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
