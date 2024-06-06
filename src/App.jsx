// App.jsx
import React from "react";
import {Route, Routes} from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Hero from "./components/Hero/Hero"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Footer from "./components/Footer/Footer";
import Menu from "./components/Menu/Menu.jsx"; // Importa el componente Menu
import AOS from "aos";
import "aos/dist/aos.css";
import Carrito from "@/components/Cart/Carrito.jsx";
import {GlobalProvider} from "@/context/GlobalContext.jsx";

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
            <GlobalProvider>
                <Navbar/>
                <ToastContainer />
                <Routes>
                    <Route path="/" element={<Hero/>}/>
                    <Route path="/carrito" element={<Carrito/>}/>
                    <Route path="/menu" element={<Menu/>}/> {/* Define la ruta para el componente Menu */}
                    {/* Agrega más rutas según sea necesario */}
                </Routes>
                <Footer/>
            </GlobalProvider>
        </div>
    );
};

export default App;
