import React, { useState, useEffect } from 'react';
import { useGlobalContext } from '../../context/GlobalContext.jsx';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function Menu() {
    const { state, dispatch } = useGlobalContext();
    const [sucursales, setSucursales] = useState([]);
    const [selectedSucursal, setSelectedSucursal] = useState(null);
    const [categorias, setCategorias] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);

    useEffect(() => {
        fetchSucursales();
    }, []);

    useEffect(() => {
        if (selectedSucursal) {
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
        } catch (error) {
            console.error('Error fetching categorias:', error);
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
                )
            );
        } else {
            return allCategorias.flatMap(categoria =>
                categoria.articulos.filter(articulo =>
                    !articulo.eliminado && articulo.precioVenta > 0
                )
            );
        }
    };

    const renderArticulos = (articulos) => {
        return articulos.map(articulo => (
            <Card className="w-full" key={articulo.id}>
                <div className="relative">
                    <Badge variant="secondary" className="absolute top left">
                        {articulo.denominacion.toUpperCase()}
                    </Badge>
                    {articulo.imagenes[0]?.url && (
                        <img
                            src={articulo.imagenes[0].url}
                            alt={articulo.denominacion}
                            className="w-full h-48 object-cover rounded-t-lg"
                        />
                    )}
                </div>
                <CardContent className="space-y-2 p-4">
                    <div className="flex items-center justify-between">
                        <h3 className="text-lg font-bold">{articulo.denominacion}</h3>
                    </div>
                    <p className="text-sm text-gray-500">
                        {articulo.denominacion}
                    </p>
                    <p className="text-lg font-bold">${articulo.precioVenta}</p>
                    <Button
                        variant="primary"
                        onClick={() => dispatch({ type: 'ADD_TO_CART', payload: articulo })}
                    >
                        Agregar al carrito
                    </Button>
                </CardContent>
            </Card>
        ));
    };

    const categoriasPrincipales = categorias.filter(categoria => !categoria.padreId);

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
                        <Button variant="secondary" className="flex items-center space-x-1 w-full md:w-auto">
                            <ListIcon className="w-5 h-5" />
                            <span>Categorías</span>
                            <ChevronDownIcon className="w-4 h-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start" className="w-full md:w-auto">
                        {categoriasPrincipales.map(categoria => (
                            <div key={categoria.id}>
                                <DropdownMenuItem
                                    className={`flex items-center space-x-1 w-full md:w-auto ${selectedCategory === categoria.id ? 'bg-gray-200' : ''}`}
                                    onClick={() => handleCategoryClick(categoria.id)}
                                >
                                    <ListIcon className="w-5 h-5" />
                                    <span>{categoria.denominacion.toUpperCase()}</span>
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
                            </div>
                        ))}
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {renderArticulos(articulos)}
            </div>
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
            <line x1="3" y1="6" x2="3.01" y2="6" />
            <line x1="3" y1="12" x2="3.01" y2="12" />
            <line x1="3" y1="18" x2="3.01" y2="18" />
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
            <path d="M6 9l6 6 6-6" />
        </svg>
    );
}
