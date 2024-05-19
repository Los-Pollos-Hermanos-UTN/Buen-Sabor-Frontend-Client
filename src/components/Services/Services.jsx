import React, { useState } from "react";
import Img2 from "../../assets/biryani2.png";
import Combo1 from "../../assets/combo1.png";
import { FaShoppingCart } from "react-icons/fa";

const ServicesData = [
  {
    id: 1,
    img: Combo1,
    name: "Supreme King",
    price: "$11.500"
  },
  {
    id: 2,
    img: Combo1,
    name: "Combo Simple",
    price: "$5.700"
  },
  {
    id: 3,
    img: Combo1,
    name: "Triple Cheddar",
    price: "$9.400"
  },
];

const Services = () => {
  const [hovered, setHovered] = useState(false);

  return (
      <>
        <span id="services"></span>
        <div className="py-10">
          <div className="container">
            <div className="text-center mb-20 max-w-[400px] mx-auto">
              <p className="text-sm bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary ">
                Tu mejor opción para el almuerzo está acá.
              </p>
              <h1 className="text-3xl font-bold">Promociones</h1>
              <p className="text-xs text-gray-400"></p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-14 md:gap-5 place-items-center">
              {ServicesData.map((service) => (
                  <div
                      key={service.id}
                      data-aos="zoom-in"
                      data-aos-duration="300"
                      className="rounded-2xl bg-white dark:bg-gray-800 hover:bg-primary dark:hover:bg-primary hover:text-white relative shadow-xl duration-high group max-w-[300px]"
                      onMouseEnter={() => setHovered(true)}
                      onMouseLeave={() => setHovered(false)}
                  >
                    <div className="h-[100px] mb-8 w-[200px]">
                      <img
                          src={service.img}
                          alt=""
                          className="max-w-[190px] block mx-auto transform -translate-y-14 group-hover:scale-105 group-hover:rotate-6 duration-300"
                      />
                    </div>
                    <h1 className="text-xl text-center font-bold">{service.name}</h1>
                    <div className="p-4 text-center relative flex justify-between">
                      <p className={`text-yellow-500 font-bold group-hover:text-white `}>
                        {service.price}
                      </p>
                      <button className="text-gray-500 hover:text-gray-700 transition duration-300">
                        <FaShoppingCart size={20}/>
                      </button>
                    </div>
                  </div>
              ))}
            </div>
          </div>
        </div>
      </>
  );
};

export default Services;
