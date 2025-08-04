import React from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// Importar la imagen local
import personalizar from "../assets/personalizar.png";

const Hero = () => {
  const slides = [
    {
      id: 1,
      image: personalizar,
      title: "Tu Estilo, Tus Reglas",
      subtitle: "Diseña tu prenda única con estampado",
      ctaText: "¡Empieza a Personalizar!",
      ctaLink: "/customizePage",
    },
    {
      id: 2,
      image:
        "https://images.unsplash.com/photo-1551803091-e373c5d67ba3?auto=format&fit=crop&q=80&w=1964",
      title: "Viste con intención, define tu estilo",
      subtitle: "Descubre prendas únicas que cuentan tu historia.",
    },
    {
      id: 3,
      image:
        "https://images.unsplash.com/photo-1596756857999-906d9bf3c9ac?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      title: "Moda que se adapta a tu ritmo",
      subtitle: "Confección, estampado y bordado personalizado para ti.",
    },
  ];

  const commonDelay = 6000;

  return (
    <section className="w-full h-[75vh] relative overflow-hidden">
      <Swiper
        spaceBetween={0}
        slidesPerView={1}
        autoplay={{
          delay: commonDelay,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper w-full h-full"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div
              className="relative w-full h-full bg-cover bg-center flex justify-center items-center text-center font-sans"
              style={{ backgroundImage: `url(${slide.image})` }}
            >
              <div className="absolute inset-0 bg-black/35"></div>
              <div className="relative z-10 p-4 max-w-3xl text-white">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 tracking-wide leading-tight drop-shadow-md">
                  {slide.title}
                </h1>
                <p className="text-lg md:text-xl mb-8 opacity-95 drop-shadow-sm">
                  {slide.subtitle}
                </p>
                {slide.id === 1 && (
                  <Link
                    to={slide.ctaLink}
                    className="inline-block py-3 px-6 rounded-full uppercase font-semibold text-base md:text-lg tracking-wide border-2 transition-all duration-300 ease-in-out shadow-md hover:shadow-lg transform hover:scale-105"
                    style={{
                      backgroundColor: "#FFFFFF", // blanco por defecto
                      color: "#305f7f", // azul meraqui por defecto
                      borderColor: "#305f7f",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = "#305f7f";
                      e.currentTarget.style.color = "#FFFFFF";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = "#FFFFFF";
                      e.currentTarget.style.color = "#305f7f";
                    }}
                  >
                    {slide.ctaText}
                  </Link>
                )}
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default Hero;
