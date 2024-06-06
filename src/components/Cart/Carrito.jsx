import React from 'react';
import { useGlobalContext } from '../../context/GlobalContext';
import { toast } from 'react-toastify';
import { Button } from '@/components/ui/button';
import {Link} from "react-router-dom";

export default function Carrito() {
    const { state, dispatch } = useGlobalContext();
    const { cart, user } = state;

    const totalProductos = cart.reduce((acc, item) => acc + item.precioVenta * item.quantity, 0);
    const cargosPorDelivery = totalProductos * 0.05;
    const total = totalProductos + cargosPorDelivery;

    const handleCheckout = () => {
        if (!user) {
            toast.error('Por favor, inicie sesión para proceder al pago.');
            return;
        }
        // Redirigir a la página de pago o realizar la acción de pago
    };

    return (
        <div className="flex justify-center items-center h-auto p-6">
            <div className="bg-white p-4 rounded-lg shadow-md w-full max-w-md">
                <div className="flex items-center justify-between pb-4 border-b">
                    <h2 className="text-2xl font-bold">Carrito ({cart.length})</h2>
                    <EllipsisVerticalIcon className="text-gray-400" />
                </div>
                <div className="space-y-4 py-4">
                    {cart.map(item => (
                        <div className="flex items-center justify-between" key={item.id}>
                            <div className="flex items-center space-x-2">
                                {item.imagenes[0]?.url && (
                                    <img src={item.imagenes[0].url} alt={item.denominacion} className="w-12 h-12 rounded-full" />
                                )}
                                <div>
                                    <p className="font-bold">{item.denominacion}</p>
                                    <div className="flex items-center space-x-2">
                                        <Button variant="ghost" className="px-1" onClick={() => dispatch({ type: 'UPDATE_CART_QUANTITY', payload: { id: item.id, quantity: item.quantity - 1 } })} disabled={item.quantity <= 1}>
                                            -
                                        </Button>
                                        <span>{item.quantity}</span>
                                        <Button variant="ghost" className="px-1" onClick={() => dispatch({ type: 'UPDATE_CART_QUANTITY', payload: { id: item.id, quantity: item.quantity + 1 } })}>
                                            +
                                        </Button>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center space-x-2">
                                <p className="text-lg font-bold">${(item.precioVenta * item.quantity).toFixed(2)}</p>
                                <XIcon className="text-gray-400" onClick={() => dispatch({ type: 'REMOVE_FROM_CART', payload: item })} />
                            </div>
                        </div>
                    ))}
                </div>
                <div className="space-y-2 py-4 border-t border-b">
                    <div className="flex justify-between">
                        <p className="text-sm">Total Productos</p>
                        <p className="text-sm">${totalProductos.toFixed(2)}</p>
                    </div>
                    <div className="flex justify-between">
                        <p className="text-sm">Cargos por Delivery</p>
                        <p className="text-sm">${cargosPorDelivery.toFixed(2)}</p>
                    </div>
                </div>
                <div className="flex justify-between items-center py-4">
                    <p className="text-xl font-bold">Total</p>
                    <p className="text-xl font-bold">${total.toFixed(2)}</p>
                </div>

                <Button className="w-full bg-primary hover:bg-secondary" onClick={handleCheckout}>
                    Ir a Pagar <ArrowRightIcon className="ml-2" />
                </Button>
            </div>
        </div>
    );
}

function ArrowRightIcon(props) {
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
            <path d="M5 12h14" />
            <path d="m12 5 7 7-7 7" />
        </svg>
    );
}

function EllipsisVerticalIcon(props) {
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
            <circle cx="12" cy="12" r="1" />
            <circle cx="12" cy="5" r="1" />
            <circle cx="12" cy="19" r="1" />
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
