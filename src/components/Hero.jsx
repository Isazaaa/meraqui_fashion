import React from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

// Importa los estilos de Swiper
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const Hero = () => {
  const slides = [
    {
      id: 1,
      // Imagen de modelo con ropa elegante y contemporánea
      image: 'https://images.unsplash.com/photo-1551803091-e373c5d67ba3?auto=format&fit=crop&q=80&w=1964', 
      title: 'Viste con intención, define tu estilo',
      subtitle: 'Descubre prendas únicas que cuentan tu historia.',
      ctaText: 'Explorar Colección Mujer',
      ctaLink: '/categoria/mujer',
    },
    {
      id: 2,
      // Imagen de ropa casual en un ambiente urbano o relajado
      image: 'https://images.unsplash.com/photo-1596756857999-906d9bf3c9ac?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', 
      title: 'Moda que se adapta a tu ritmo',
      subtitle: 'Confección, estampado y bordado personalizado para ti.',
      ctaText: 'Personaliza tu estilo',
      ctaLink: '/contacto', 
    },
    {
      id: 3,
      // Imagen de prendas bien organizadas o detalles de texturas
      image: 'https://images.unsplash.com/photo-1560942502-3c8297d266e7?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', 
      title: 'Calidad y precio justo en cada prenda',
      subtitle: 'Envíos rápidos a todo el país. ¡No esperes más!',
      ctaText: 'Ver Novedades',
      ctaLink: '/categoria/novedades', 
    },
  ];

  return (
    <section className="w-full h-[75vh] relative overflow-hidden">
      <Swiper
        spaceBetween={0}
        slidesPerView={1}
        autoplay={{
          delay: 5000,
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
              className="relative w-full h-full bg-cover bg-center flex justify-center items-center text-center text-white-custom"
              style={{ backgroundImage: `url(${slide.image})` }}
            >
              {/* Overlay con menor opacidad: 'bg-black/25' en lugar de 'bg-black/35' */}
              <div className="absolute inset-0 bg-black/25"></div> 
              {/* Contenido de la diapositiva */}
              <div className="relative z-10 p-4 max-w-3xl"> 
                <h1 className="font-playfair text-4xl md:text-5xl lg:text-6xl font-bold mb-4 tracking-wide leading-tight drop-shadow-md">
                  {slide.title}
                </h1>
                <p className="font-montserrat text-lg md:text-xl mb-8 opacity-90 drop-shadow-sm">
                  {slide.subtitle}
                </p>
                <Link 
                  to={slide.ctaLink} 
                  className="inline-block bg-white-custom text-blue-serene py-4 px-8 rounded-md uppercase font-semibold text-base tracking-wide transition-all duration-300 shadow-lg hover:bg-gray-100 hover:translate-y-[-3px] hover:shadow-xl"
                >
                  {slide.ctaText}
                </Link>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default Hero;