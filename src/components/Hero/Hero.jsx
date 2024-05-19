// eslint-disable-next-line no-unused-vars
import React from "react";
import Vector from "../../assets/vector3.png";
import BurgerCanvas from "../Canvas/Burger.jsx";


const Hero = () => {

  const bgImage = {
    backgroundImage: `url(${Vector})`,
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    height: "100%",
    width: "100%",
  };

  return (
    <>
      <div
        className="min-h-[550px] sm:min-h-[600px] bg-gray-100 flex justify-center items-center dark:bg-gray-950 dark:text-white duration-200"
        style={bgImage}
      >
        <div className="container pb-8 sm:pb-0">
          <div className="grid grid-cols-1 sm:grid-cols-2">
            {/* text content section */}
            <div
              data-aos="zoom-out"
              data-aos-duration="400"
              data-aos-once="true"
              className="flex flex-col justify-center gap-4  sm:pt-0 text-center sm:text-left order-2 sm:order-1"
            >
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold">
                Bienvenido al{" "}
                <span className="bg-clip-text text-transparent bg-gradient-to-b from-primary to-secondary ">
                  Buen Sabor
                </span>{" "}
              </h1>
              <p className="text-sm ">
                ¡En El Buen Sabor, creemos que disfrutar de comida rápida no significa sacrificar el sabor ni la calidad! Porque sabemos que cada bocado cuenta, nos esforzamos por ofrecerte una experiencia que satisfaga tus antojos y te haga sonreír con cada mordisco.              </p>
              <div>
                <button className="bg-gradient-to-r from-primary to-secondary hover:scale-105 duration-200 text-white py-2 px-4 rounded-full">
                  Pedir ahora
                </button>
              </div>
            </div>
            {/* Image section */}
            <div className="min-h-[450px] sm:min-h-[450px] flex justify-center items-center relative order-1 sm:order-2 ">
                <BurgerCanvas/>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Hero;