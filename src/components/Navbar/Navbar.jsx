import React, { useRef } from "react";
import { Link } from "react-router-dom";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useGlobalContext } from "../../context/GlobalContext";
import Logo from "../../assets/food-logo.png";
import Login from "../user/Login";

const Navbar = () => {
    const { state, dispatch } = useGlobalContext();
    const cartItems = state.cart;
    const cartQuantity = cartItems.length;
    const totalCartPrice = cartItems.reduce((total, item) => total + item.precioVenta * item.quantity, 0).toFixed(2);
    const popoverRef = useRef();

    const closePopover = () => {
        if (popoverRef.current) {
            popoverRef.current.close();
        }
    };

    return (
        <header className="bg-white shadow-md dark:bg-gray-900 dark:text-white duration-200">
            <nav className="flex justify-between items-center px-4 py-2 container mx-auto">
                <div className="flex items-center">
                    <Link to="/" className="font-bold text-2xl sm:text-3xl flex gap-2 items-center">
                        <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
                            <img src={Logo} alt="Logo" className="w-full h-full object-cover" />
                        </div>
                        <span className="flex flex-col justify-center">Buen Sabor</span>
                    </Link>
                </div>
                <div className="flex items-center space-x-4 relative">
                    <Login />
                    <Popover ref={popoverRef}>
                        <PopoverTrigger asChild>
                            <Button variant="outline" className="relative">
                                <ShoppingCartIcon className="w-5 h-5" />
                                <Badge variant="secondary" className="absolute top-0 right-0 translate-x-1/2 -translate-y-1/2">
                                    {cartQuantity}
                                </Badge>
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-[400px] rounded-lg p-4 bg-white shadow-xl">
                            <div className="">
                                <ScrollArea className="space-y-4 h-48 ">
                                    {cartItems.length > 0 ? cartItems.map((item) => (
                                        <div key={item.id} className="flex items-center justify-between border-t">
                                            <div className="flex items-center space-x-2">
                                                <img src={item.imagenes[0]?.url || "/placeholder.svg"}
                                                     alt={item.denominacion} width={40} height={40}
                                                     className="w-10 h-10 rounded"/>
                                                <p>{item.denominacion}</p>
                                            </div>
                                            <p className="font-bold">${(item.precioVenta * item.quantity).toFixed(2)}</p>
                                            <Button variant="ghost" aria-label="Remove item" onClick={() => dispatch({
                                                type: 'REMOVE_FROM_CART',
                                                payload: {id: item.id}
                                            })}>
                                                <XIcon className="w-4 h-4 text-red-500"/>
                                            </Button>
                                        </div>

                                    )) : <p className="text-center">Tu carrito está vacío.</p>}
                                </ScrollArea>
                            </div>
                            <div className="flex justify-between items-center font-bold mt-4 border-t pt-4">
                                <p className="text-secondary">Total:</p>
                                <p className="text-secondary">${parseFloat(totalCartPrice).toFixed(2)}</p>
                            </div>
                            <div className="flex space-x-2 mt-4">
                                <Link to="/carrito" className="w-1/2" onClick={closePopover}>
                                    <Button className="bg-primary hover:bg-secondary duration-200 text-white w-full">Ver Carrito</Button>
                                </Link>
                                <Link to="/menu" className="w-1/2" onClick={closePopover}>
                                    <Button variant="outline" className="w-full border-primary text-primary hover:text-secondary hover:border-secondary">Menu</Button>
                                </Link>
                            </div>
                        </PopoverContent>
                    </Popover>
                </div>
            </nav>
        </header>
    );
}

function ShoppingCartIcon(props) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <circle cx="8" cy="21" r="1" />
            <circle cx="19" cy="21" r="1" />
            <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
        </svg>
    );
}

function XIcon(props) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M18 6 6 18" />
            <path d="m6 6 12 12" />
        </svg>
    );
}

export default Navbar;
