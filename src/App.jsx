// App.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Hero from "./components/Hero/Hero";
import Services from "./components/Services/Services";
import Banner from "./components/Banner/Banner";
import Pruebas from "./components/Pruebas/Pruebas";
import Testimonial from "./components/Testimonial/Testimonial";
import Footer from "./components/Footer/Footer";
import Menu from "./components/Menu/Menu.jsx"; // Importa el componente Menu
import AOS from "aos";
import "aos/dist/aos.css";
import Carrito from "./components/Carrito/Carrito.jsx";

const App = () => {
    React.useEffect(() => {
        AOS.init({
            offset: 100,
            duration: 500,
            easing: "ease-in-sine",
            delay: 100,
        });
        AOS.refresh();
    }, []);

    return (
        <div className="bg-white dark:bg-gray-900 dark:text-white duration-200">
            <Navbar />
            <Routes>
                <Route path="/" element={<Hero />} />
                <Route path="/services" element={<Services />} />
                <Route path="/carrito" element={<Carrito />} />
                <Route path="/menu" element={<Menu />} /> {/* Define la ruta para el componente Menu */}
                {/* Agrega más rutas según sea necesario */}
            </Routes>
            <Footer />
        </div>
    );
};

export default App;
