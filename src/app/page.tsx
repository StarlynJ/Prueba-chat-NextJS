import Navbar from '../components/Navbar';
import Carousel from '../components/Carousel';
import Footer from '../components/Footer';
import Chatbot from '../components/Chatbot';

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen pt-14">
      {/* Navbar fijo arriba */}
      <Navbar />

      {/* Carrusel centrado entre navbar y footer */}
      <Carousel />

      {/* Footer fijo abajo */}
      <Footer />

      {/* Chat siempre flotante abajo a la derecha */}
      <Chatbot />
    </main>
  );
}

