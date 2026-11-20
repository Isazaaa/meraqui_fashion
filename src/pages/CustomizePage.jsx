import React, { useState, useEffect, useRef } from "react";
import { garments, garmentImages } from "../data/garmentData";
import useDesignTransform from "../hooks/useDesignTransform";
import { exportDesignImage } from "../utils/exportDesign";
import Seo from "../components/Seo";
import WhatsAppIcon from "../components/WhatsAppIcon";
import "./CustomizePage.css";

const FALLBACK_GARMENT_URL =
  "https://res.cloudinary.com/dacdd3m0j/image/upload/v1753466553/blanca-delante_k4moa9.jpg";
const MAX_UPLOAD_BYTES = 5 * 1024 * 1024;

// Only t-shirts are offered for now; the garment step hides itself while there
// is a single option.
const availableGarments = garments.filter((garment) => garment.name === "Camiseta");
const GENDERS = ["Hombre", "Mujer", "Niños"];
const LOCATIONS = ["Frente", "Espalda"];

const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-serene focus-visible:ring-offset-2";
const primaryButton = `flex h-12 w-full items-center justify-center gap-2 bg-black-meraqui px-4 text-xs font-medium uppercase tracking-[0.16em] text-white transition-colors hover:bg-neutral-800 disabled:cursor-not-allowed disabled:bg-neutral-200 disabled:text-neutral-500 ${focusRing}`;
const secondaryButton = `flex h-12 w-full items-center justify-center gap-2 border border-black-meraqui bg-white px-4 text-xs font-medium uppercase tracking-[0.16em] text-black-meraqui transition-colors hover:bg-neutral-100 disabled:cursor-not-allowed disabled:border-neutral-200 disabled:text-neutral-400 disabled:hover:bg-white ${focusRing}`;
const textButton = `inline-flex min-h-11 items-center px-1 text-xs font-medium uppercase tracking-[0.14em] text-black-meraqui underline underline-offset-4 hover:text-blue-serene ${focusRing}`;

const Step = ({ number, label, value, children }) => (
  <fieldset className="min-w-0 border-t border-neutral-200 py-6">
    <legend className="float-left w-full text-[11px] font-medium uppercase tracking-[0.16em] text-neutral-500">
      <span className="mr-3 text-black-meraqui">{String(number).padStart(2, "0")}</span>
      {label}
      {value && <span className="ml-2 normal-case tracking-normal text-black-meraqui">{value}</span>}
    </legend>
    <div className="clear-both pt-4">{children}</div>
  </fieldset>
);

const OptionGroup = ({ name, options, value, onChange }) => (
  <div className="flex flex-wrap gap-2">
    {options.map((option) => {
      const id = `${name}-${option.value}`;
      return (
        <div key={option.value} className="relative">
          <input
            type="radio"
            id={id}
            name={name}
            value={option.value}
            checked={value === option.value}
            disabled={option.disabled}
            onChange={() => onChange(option.value)}
            className="peer sr-only"
          />
          <label
            htmlFor={id}
            className="flex h-11 min-w-11 cursor-pointer items-center justify-center border border-neutral-300 px-4 text-sm text-black-meraqui transition-colors hover:border-black-meraqui peer-checked:border-black-meraqui peer-checked:bg-black-meraqui peer-checked:text-white peer-disabled:cursor-not-allowed peer-disabled:text-neutral-400 peer-disabled:hover:border-neutral-300 peer-focus-visible:ring-2 peer-focus-visible:ring-blue-serene peer-focus-visible:ring-offset-2"
          >
            {option.label}
          </label>
        </div>
      );
    })}
  </div>
);

const CustomizePage = () => {
  const [selectedGarment, setSelectedGarment] = useState(garments[0]);
  const [selectedColor, setSelectedColor] = useState(garments[0].colors[0]);
  const [selectedSize, setSelectedSize] = useState(garments[0].sizes[0]);
  const [selectedGender, setSelectedGender] = useState(
    garments[0].gender || "Hombre"
  );
  const [selectedLocation, setSelectedLocation] = useState("Frente");
  // Object URL of the uploaded design (revoked when replaced / on unmount).
  const [uploadedImage, setUploadedImage] = useState(null);
  const [uploadedName, setUploadedName] = useState("");
  const [uploadError, setUploadError] = useState("");
  const [exportError, setExportError] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const [isExporting, setIsExporting] = useState(false);

  const fileInputRef = useRef(null);
  // The stage is the garment <img> box: the stamp is positioned inside it and
  // the export is a scaled copy of it, which is what makes the export WYSIWYG.
  const stageRef = useRef(null);
  const garmentImageRef = useRef(null);

  const { transform, aspect, placeDesign, clearDesign, stampHandlers, resizeHandlers } =
    useDesignTransform(stageRef);

  // Latest object URL requested by the user; used to ignore stale image loads.
  const pendingUrlRef = useRef(null);
  // Object URL currently committed to state.
  const committedUrlRef = useRef(null);
  // Garment image URL that failed to load; the fallback is derived from it.
  const [failedGarmentSrc, setFailedGarmentSrc] = useState(null);

  useEffect(() => {
    return () => {
      // Revoke on unmount: committed URL and any upload still loading.
      if (pendingUrlRef.current) URL.revokeObjectURL(pendingUrlRef.current);
      if (committedUrlRef.current && committedUrlRef.current !== pendingUrlRef.current) {
        URL.revokeObjectURL(committedUrlRef.current);
      }
      pendingUrlRef.current = null;
      committedUrlRef.current = null;
    };
  }, []);

  const commitUploadedImage = (url) => {
    const previous = committedUrlRef.current;
    committedUrlRef.current = url;
    setUploadedImage(url);
    if (previous && previous !== url) URL.revokeObjectURL(previous);
  };

  const resetFileInput = () => {
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const processFile = (file) => {
    if (!file) return;
    if (file.type !== "image/jpeg" && file.type !== "image/png") {
      setUploadError("Formato no válido. Sube una imagen en formato JPG o PNG.");
      resetFileInput();
      return;
    }
    if (file.size > MAX_UPLOAD_BYTES) {
      setUploadError("La imagen supera el tamaño máximo de 5 MB. Sube una más pequeña.");
      resetFileInput();
      return;
    }
    const url = URL.createObjectURL(file);
    // A newer upload supersedes any load still in flight.
    if (pendingUrlRef.current && pendingUrlRef.current !== committedUrlRef.current) {
      URL.revokeObjectURL(pendingUrlRef.current);
    }
    pendingUrlRef.current = url;
    const img = new Image();
    img.onload = () => {
      // Stale load (superseded, removed or unmounted): its URL is already revoked.
      if (pendingUrlRef.current !== url) return;
      if (!img.naturalWidth || !img.naturalHeight) {
        pendingUrlRef.current = null;
        URL.revokeObjectURL(url);
        setUploadError("La imagen no tiene dimensiones válidas. Prueba con otro archivo.");
        resetFileInput();
        return;
      }
      placeDesign(img.naturalWidth / img.naturalHeight);
      commitUploadedImage(url);
      setUploadedName(file.name);
      setUploadError("");
      setExportError("");
    };
    img.onerror = () => {
      if (pendingUrlRef.current !== url) return;
      pendingUrlRef.current = null;
      URL.revokeObjectURL(url);
      setUploadError("No se pudo leer la imagen. Prueba con otro archivo.");
      resetFileInput();
    };
    img.src = url;
  };

  const handleImageUpload = (e) => processFile(e.target.files[0]);

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    processFile(e.dataTransfer.files[0]);
  };

  const handleRemoveDesign = () => {
    if (pendingUrlRef.current && pendingUrlRef.current !== committedUrlRef.current) {
      URL.revokeObjectURL(pendingUrlRef.current);
    }
    pendingUrlRef.current = null;
    clearDesign();
    commitUploadedImage(null);
    setUploadedName("");
    setUploadError("");
    setExportError("");
    resetFileInput();
  };

  const handleDownloadDesign = async () => {
    const garmentImg = garmentImageRef.current;
    if (!uploadedImage || !transform || !stageRef.current || !garmentImg) return;
    setIsExporting(true);
    setExportError("");
    try {
      const blob = await exportDesignImage({
        stageEl: stageRef.current,
        garmentSrc: garmentImg.currentSrc || garmentImg.src,
        designSrc: uploadedImage,
        transform,
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `mi-diseno-personalizado-${selectedGarment.name.toLowerCase()}-${selectedColor.name.toLowerCase()}.png`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      setTimeout(() => URL.revokeObjectURL(url), 1000);
    } catch (error) {
      console.error("Error al generar la imagen del diseño:", error);
      setExportError("No se pudo generar la imagen. Inténtalo de nuevo.");
    } finally {
      setIsExporting(false);
    }
  };

  const generateWhatsAppLink = () => {
    const productName = encodeURIComponent(selectedGarment.name);
    const color = encodeURIComponent(selectedColor.name);
    const size = encodeURIComponent(selectedSize);
    const gender = encodeURIComponent(selectedGender);
    const location = encodeURIComponent(selectedLocation);
    const message = `¡Hola! Quiero personalizar una ${productName} (${gender}) en color ${color}, talla ${size}, con un diseño ubicado en ${location}. (Si descargaste la imagen, por favor adjúntala aquí).`;
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
      return `/images/${garmentName}-${gender}-${color}-${view}.webp`;
    }

    return imageUrl;
  };

  const handleGarmentChange = (garmentId) => {
    const garment = availableGarments.find((g) => String(g.id) === garmentId);
    if (!garment) return;
    setSelectedGarment(garment);
    setSelectedColor(garment.colors[0]);
    setSelectedSize(garment.sizes[0]);
    if (garment.name === "Blusón") {
      setSelectedGender("Mujer");
    }
  };

  const requestedGarmentSrc = getGarmentImage();
  const garmentFailed = failedGarmentSrc === requestedGarmentSrc;
  const garmentSrc = garmentFailed ? FALLBACK_GARMENT_URL : requestedGarmentSrc;

  const hasDesign = Boolean(uploadedImage);
  const showGarmentStep = availableGarments.length > 1;
  let stepNumber = 0;
  const nextStep = () => ++stepNumber;

  return (
    <div className="mx-auto max-w-[1440px] px-5 pb-24 pt-10 md:px-10 md:pt-16 lg:px-16">
      <Seo
        title="Personaliza tu prenda"
        description="Diseña tu prenda en línea: elige la prenda y el color, sube tu diseño y pídela con estampado o bordado personalizado."
      />

      <header className="max-w-2xl">
        <p className="text-xs font-medium uppercase tracking-[0.18em] text-neutral-500">Personaliza</p>
        <h1 className="mt-3 text-3xl font-medium tracking-tight text-black-meraqui md:text-4xl">
          Crea tu prenda
        </h1>
        <p className="mt-4 text-sm leading-6 text-neutral-600">
          Elige el color, sube tu diseño y colócalo sobre la prenda. Después envíanos tu pedido por WhatsApp.
        </p>
      </header>

      <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] lg:gap-16">
        {/* Preview */}
        <div className="lg:sticky lg:top-24 lg:self-start">
          <div className="bg-neutral-100 p-4 sm:p-8">
            <div ref={stageRef} className="design-garment-stage">
              <img
                ref={garmentImageRef}
                src={garmentSrc}
                alt={garmentFailed ? "Imagen no disponible" : `${selectedGarment.name} ${selectedGender} ${selectedColor.name} ${selectedLocation}`}
                className="design-garment-image"
                crossOrigin="anonymous"
                draggable={false}
                onError={() => {
                  if (garmentSrc !== FALLBACK_GARMENT_URL) setFailedGarmentSrc(requestedGarmentSrc);
                }}
              />
              {uploadedImage && transform && (
                <div
                  className="design-stamp-overlay"
                  style={{
                    backgroundImage: `url(${uploadedImage})`,
                    left: `${transform.x * 100}%`,
                    top: `${transform.y * 100}%`,
                    width: `${transform.w * 100}%`,
                    aspectRatio: aspect,
                  }}
                  {...stampHandlers}
                >
                  <div className="design-resize-handle" {...resizeHandlers}></div>
                </div>
              )}
            </div>
          </div>
          <p className="mt-3 text-xs text-neutral-500">
            {hasDesign
              ? "Arrastra el diseño para moverlo y usa la esquina para cambiar su tamaño."
              : "Sube tu diseño para verlo sobre la prenda."}
          </p>
        </div>

        {/* Options */}
        <div className="border-b border-neutral-200">
          {showGarmentStep && (
            <Step number={nextStep()} label="Prenda" value={selectedGarment.name}>
              <OptionGroup
                name="garment"
                options={availableGarments.map((g) => ({ value: String(g.id), label: g.name }))}
                value={String(selectedGarment.id)}
                onChange={handleGarmentChange}
              />
            </Step>
          )}

          <Step number={nextStep()} label="Color" value={selectedColor.name}>
            <div className="flex flex-wrap gap-1">
              {selectedGarment.colors.map((color) => {
                const id = `color-${color.name.replace(/\s/g, "-")}`;
                return (
                  <div key={color.name} className="relative">
                    <input
                      type="radio"
                      id={id}
                      name="color"
                      value={color.name}
                      checked={selectedColor.name === color.name}
                      onChange={() => setSelectedColor(color)}
                      className="peer sr-only"
                    />
                    <label
                      htmlFor={id}
                      title={color.name}
                      className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border-2 border-transparent peer-checked:border-black-meraqui peer-focus-visible:ring-2 peer-focus-visible:ring-blue-serene peer-focus-visible:ring-offset-2"
                    >
                      <span
                        className="block h-8 w-8 rounded-full border border-neutral-300"
                        style={{ backgroundColor: color.value }}
                      />
                      <span className="sr-only">{color.name}</span>
                    </label>
                  </div>
                );
              })}
            </div>
          </Step>

          <Step number={nextStep()} label="Género" value={selectedGender}>
            <OptionGroup
              name="gender"
              options={GENDERS.map((gender) => ({
                value: gender,
                label: gender,
                disabled: selectedGarment.name === "Blusón" && gender !== "Mujer",
              }))}
              value={selectedGender}
              onChange={setSelectedGender}
            />
          </Step>

          <Step number={nextStep()} label="Talla" value={selectedSize}>
            <OptionGroup
              name="size"
              options={selectedGarment.sizes.map((size) => ({ value: size, label: size }))}
              value={selectedSize}
              onChange={setSelectedSize}
            />
          </Step>

          <Step number={nextStep()} label="Ubicación" value={selectedLocation}>
            <OptionGroup
              name="location"
              options={LOCATIONS.map((area) => ({ value: area, label: area }))}
              value={selectedLocation}
              onChange={setSelectedLocation}
            />
          </Step>

          <section className="border-t border-neutral-200 py-6" aria-labelledby="design-step-heading">
            <h2
              id="design-step-heading"
              className="text-[11px] font-medium uppercase tracking-[0.16em] text-neutral-500"
            >
              <span className="mr-3 text-black-meraqui">{String(nextStep()).padStart(2, "0")}</span>
              Tu diseño
            </h2>

            <input
              id="file-upload"
              type="file"
              accept="image/jpeg,image/png"
              className="peer sr-only"
              onChange={handleImageUpload}
              ref={fileInputRef}
              aria-describedby="upload-hint upload-error"
            />

            {hasDesign ? (
              <div className="mt-4 flex items-center justify-between gap-4 border border-neutral-200 px-4 py-2">
                <p className="min-w-0 truncate text-sm text-black-meraqui" title={uploadedName}>
                  {uploadedName}
                </p>
                <div className="flex shrink-0 items-center gap-3">
                  <label htmlFor="file-upload" className={`cursor-pointer ${textButton}`}>
                    Cambiar
                  </label>
                  <button type="button" onClick={handleRemoveDesign} className={textButton}>
                    Quitar
                  </button>
                </div>
              </div>
            ) : (
              <label
                htmlFor="file-upload"
                onDragOver={(e) => {
                  e.preventDefault();
                  setIsDragging(true);
                }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={handleDrop}
                className={`mt-4 flex min-h-32 cursor-pointer flex-col items-center justify-center gap-1 border border-dashed px-4 py-6 text-center transition-colors peer-focus-visible:ring-2 peer-focus-visible:ring-blue-serene peer-focus-visible:ring-offset-2 ${
                  isDragging ? "border-black-meraqui bg-neutral-100" : "border-neutral-300 hover:border-black-meraqui"
                }`}
              >
                <span className="text-sm font-medium text-black-meraqui">Selecciona o arrastra tu imagen</span>
                <span id="upload-hint" className="text-xs text-neutral-500">
                  JPG o PNG, máximo 5 MB
                </span>
              </label>
            )}
            <p id="upload-error" role="alert" className="mt-2 min-h-4 text-sm text-red-700">
              {uploadError}
            </p>
          </section>

          <div className="space-y-3 border-t border-neutral-200 py-6">
            {hasDesign ? (
              <a
                href={generateWhatsAppLink()}
                target="_blank"
                rel="noopener noreferrer"
                className={primaryButton}
              >
                <WhatsAppIcon className="h-5 w-5" />
                Pedir por WhatsApp
                <span className="sr-only"> (se abre en una pestaña nueva)</span>
              </a>
            ) : (
              <button
                type="button"
                disabled
                aria-describedby="design-hint"
                className={primaryButton}
              >
                <WhatsAppIcon className="h-5 w-5" />
                Pedir por WhatsApp
              </button>
            )}
            <button
              type="button"
              onClick={handleDownloadDesign}
              disabled={!hasDesign || isExporting}
              aria-describedby={hasDesign ? undefined : "design-hint"}
              className={secondaryButton}
            >
              {isExporting ? "Generando imagen..." : "Descargar diseño"}
            </button>
            {hasDesign ? (
              <p className="text-xs leading-5 text-neutral-500">
                Descarga la imagen y adjúntala en la conversación de WhatsApp para que veamos tu diseño.
              </p>
            ) : (
              <p id="design-hint" className="text-xs leading-5 text-neutral-500">
                Sube tu diseño para continuar
              </p>
            )}
            <p role="alert" className="min-h-4 text-sm text-red-700">
              {exportError}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomizePage;
