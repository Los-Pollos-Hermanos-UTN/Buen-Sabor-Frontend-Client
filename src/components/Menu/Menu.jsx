import React, { useState, useEffect } from 'react';
import { useGlobalContext } from '../../context/GlobalContext.jsx';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {FaShoppingCart} from "react-icons/fa";

export default function Menu() {
    const { state, dispatch } = useGlobalContext();
    const [sucursales, setSucursales] = useState([]);
    const [selectedSucursal, setSelectedSucursal] = useState(null);
    const [categorias, setCategorias] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        fetchSucursales();
    }, []);

    useEffect(() => {
        if (selectedSucursal) {
            setIsLoading(true);
            fetchCategorias(selectedSucursal);
        }
    }, [selectedSucursal]);

    const fetchSucursales = async () => {
        try {
            const response = await fetch(`http://localhost:8080/sucursal/listByEmpresa/1`);
            const data = await response.json();
            setSucursales(data);
        } catch (error) {
            console.error('Error fetching sucursales:', error);
        }
    };

    const fetchCategorias = async (sucursalId) => {
        try {
            const response = await fetch(`http://localhost:8080/categoria/listBySucursal/${sucursalId}`);
            const data = await response.json();
            setCategorias(data);
            setIsLoading(false);
        } catch (error) {
            console.error('Error fetching categorias:', error);
            setIsLoading(false);
        }
    };

    const handleSucursalChange = (sucursalId) => {
        setSelectedSucursal(sucursalId);
        setSelectedCategory(null);
    };

    const handleCategoryClick = (categoryId) => {
        setSelectedCategory(categoryId);
    };

    const flattenCategorias = (categorias) => {
        return categorias.reduce((acc, categoria) => {
            acc.push(categoria);
            if (categoria.subCategorias && categoria.subCategorias.length > 0) {
                acc = acc.concat(flattenCategorias(categoria.subCategorias));
            }
            return acc;
        }, []);
    };

    const getArticulos = (categorias, categoryId) => {
        const allCategorias = flattenCategorias(categorias);
        if (categoryId) {
            const selectedCategorias = allCategorias.filter(
                categoria => categoria.id === categoryId || categoria.padreId === categoryId
            );
            return selectedCategorias.flatMap(categoria =>
                categoria.articulos.filter(articulo =>
                    !articulo.eliminado && articulo.precioVenta > 0
                ).map(articulo => ({ ...articulo, categoriaDenominacion: categoria.denominacion }))
            );
        } else {
            return allCategorias.flatMap(categoria =>
                categoria.articulos.filter(articulo =>
                    !articulo.eliminado && articulo.precioVenta > 0
                ).map(articulo => ({ ...articulo, categoriaDenominacion: categoria.denominacion }))
            );
        }
    };

    const renderArticulos = (articulos) => {
        return articulos.map(articulo => (
            <Card className="w-full" key={articulo.id}>
                <div className="relative">
                    <Badge variant="secondary" className="absolute top left rounded-md rounded-bl-none rounded-tr-none bg-primary hover:bg-primary">
                        {articulo.categoriaDenominacion.toUpperCase()}
                    </Badge>
                    {articulo.imagenes[0]?.url && (
                        <img
                            src={articulo.imagenes[0].url}
                            alt={articulo.denominacion}
                            className="w-full h-48 object-cover rounded-t-lg"
                        />
                    )}
                </div>
                <CardContent className="space-y-2 p-4 text-center relative">
                    <div className="flex items-center justify-center">
                        <h3 className="text-lg font-bold">{articulo.denominacion}</h3>
                    </div>

                    <div className="flex items-center justify-center space-x-2">
                        <p className="text-lg font-bold">${articulo.precioVenta}</p>
                    </div>
                    <div className="absolute bottom-4 right-4">
                        <button
                            className="text-primary hover:text-secondary"
                            onClick={() => dispatch({ type: 'ADD_TO_CART', payload: articulo })}
                        >
                            <FaShoppingCart className="w-6 h-6" />
                        </button>
                    </div>
                </CardContent>

            </Card>
        ));
    };

    const categoriasPrincipales = [{ id: null, denominacion: 'Todo' }, ...categorias.filter(categoria => !categoria.padreId && (categoria.articulos.length > 0 || categoria.subCategorias.some(sub => sub.articulos.length > 0)))];

    const articulos = getArticulos(categorias, selectedCategory);

    return (
        <div className="bg-white p-6 md:p-8 lg:p-10">
            <div className="flex flex-col md:flex-row justify-between items-center mb-6">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="secondary" className="flex items-center space-x-1 w-full md:w-auto">
                            <ListIcon className="w-5 h-5" />
                            <span>Sucursales</span>
                            <ChevronDownIcon className="w-4 h-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start" className="w-full md:w-auto">
                        {sucursales.map(sucursal => (
                            <DropdownMenuItem
                                key={sucursal.id}
                                className={`flex items-center space-x-1 w-full md:w-auto ${selectedSucursal === sucursal.id ? 'bg-gray-200' : ''}`}
                                onClick={() => handleSucursalChange(sucursal.id)}
                            >
                                <ListIcon className="w-5 h-5" />
                                <span>{sucursal.nombre}</span>
                            </DropdownMenuItem>
                        ))}
                    </DropdownMenuContent>
                </DropdownMenu>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="secondary" className="flex items-center space-x-1 w-full md:w-auto mt-4 md:mt-0">
                            <ListIcon className="w-5 h-5" />
                            <span>Categorías</span>
                            <ChevronDownIcon className="w-4 h-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start" className="w-full md:w-auto">
                        {categoriasPrincipales.map(categoria => (
                            <React.Fragment key={categoria.id}>
                                <DropdownMenuItem
                                    className={`flex items-center space-x-1 w-full md:w-auto ${selectedCategory === categoria.id ? 'bg-gray-200' : ''}`}
                                    onClick={() => handleCategoryClick(categoria.id)}
                                >
                                    <ListIcon className="w-5 h-5" />
                                    <span>{categoria.denominacion}</span>
                                </DropdownMenuItem>
                                {categoria.subCategorias && categoria.subCategorias.length > 0 && (
                                    categoria.subCategorias.map(subCategoria => (
                                        <DropdownMenuItem
                                            key={subCategoria.id}
                                            className={`flex items-center space-x-1 w-full md:w-auto pl-8 ${selectedCategory === subCategoria.id ? 'bg-gray-200' : ''}`}
                                            onClick={() => handleCategoryClick(subCategoria.id)}
                                        >
                                            <ListIcon className="w-5 h-5" />
                                            <span>{subCategoria.denominacion}</span>
                                        </DropdownMenuItem>
                                    ))
                                )}
                            </React.Fragment>
                        ))}
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {isLoading ? (
                    <div className="flex justify-center items-center col-span-full h-64">
                        <p className="text-center text-xl">Cargando...</p>
                    </div>
                ) : (
                    renderArticulos(articulos)
                )}
            </div>
            {!selectedSucursal && !isLoading && (
                <div className="flex justify-center items-center h-64">
                    <p className="text-center text-xl">Seleccione una sucursal</p>
                </div>
            )}
        </div>
    );
}
function ListIcon(props) {
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
            <line x1="8" y1="6" x2="21" y2="6" />
            <line x1="8" y1="12" x2="21" y2="12" />
            <line x1="8" y1="18" x2="21" y2="18" />
            <line x1="3" y1="6" x2="3" y2="6" />
            <line x1="3" y1="12" x2="3" y2="12" />
            <line x1="3" y1="18" x2="3" y2="18" />
        </svg>
    );
}

function ChevronDownIcon(props) {
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
            <polyline points="6 9 12 15 18 9" />
        </svg>
    );
}
