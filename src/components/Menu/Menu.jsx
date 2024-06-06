import React, { useState, useEffect } from 'react';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
export default function Menu() {
    const [sucursales, setSucursales] = useState([]);
    const [selectedSucursal, setSelectedSucursal] = useState(null);
    const [categorias, setCategorias] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [filteredCategories, setFilteredCategories] = useState([]);
    const [modalIsOpen, setModalIsOpen] = useState(false);

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

    const handleSucursalChange = (event) => {
        setSelectedSucursal(event.target.value);
        setSelectedCategory(null);
        setFilteredCategories([]);
    };

    const handleCategoryClick = (categoryId) => {
        setSelectedCategory(categoryId);
    };

    const handleFilterClick = (categoryId) => {
        if (filteredCategories.includes(categoryId)) {
            setFilteredCategories(filteredCategories.filter(c => c !== categoryId));
        } else {
            setFilteredCategories([...filteredCategories, categoryId]);
        }
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

    const renderArticulos = (categorias) => {
        const allCategorias = flattenCategorias(categorias);
        return allCategorias.flatMap(categoria =>
            categoria.articulos.filter(articulo =>
                !articulo.eliminado && articulo.precioVenta > 0
            ).map(articulo => (
                <Card className="w-full" key={articulo.id}>
                    <div className="relative">
                        <Badge variant="secondary" className="absolute top left">
                            {categoria.denominacion.toUpperCase()}
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
                    </CardContent>
                </Card>
            ))
        );
    };

    const categoriasPrincipales = categorias.filter(categoria => !categoria.padreId);


        return (
            <div className="bg-white p-6 md:p-8 lg:p-10">
                <div className="flex flex-col md:flex-row justify-between items-center mb-6">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="secondary" className="flex items-center space-x-1 w-full md:w-auto">
                                <ListIcon className="w-5 h-5" />
                                <span>Categories</span>
                                <ChevronDownIcon className="w-4 h-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="start" className="w-full md:w-auto">
                            <DropdownMenuItem className="flex items-center space-x-1 w-full md:w-auto">
                                <ListIcon className="w-5 h-5" />
                                <span>ALL</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem className="flex items-center space-x-1 w-full md:w-auto">
                                <SnowflakeIcon className="w-5 h-5" />
                                <span>COLD DRINK</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem className="flex items-center space-x-1 w-full md:w-auto">
                                <PizzaIcon className="w-5 h-5" />
                                <span>PIZZA</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem className="flex items-center space-x-1 w-full md:w-auto">
                                <SaladIcon className="w-5 h-5" />
                                <span>SALAD</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem className="flex items-center space-x-1 w-full md:w-auto">
                                <CandyIcon className="w-5 h-5" />
                                <span>SWEETS</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem className="flex items-center space-x-1 w-full md:w-auto">
                                <CherryIcon className="w-5 h-5" />
                                <span>SPICY</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem className="flex items-center space-x-1 w-full md:w-auto">
                                <SandwichIcon className="w-5 h-5" />
                                <span>BURGER</span>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                    <Button variant="outline" className="flex items-center space-x-1 mt-4 md:mt-0">
                        <FilterIcon className="w-5 h-5" />
                        <span>Filter</span>
                    </Button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    <Card className="w-full">
                        <div className="relative">
                            <Badge variant="secondary" className="absolute top-2 left-2">
                                TOP SELLER
                            </Badge>
                            <img
                                src="/placeholder.svg"
                                alt="Burger"
                                className="w-full h-48 sm:h-56 md:h-64 object-cover rounded-t-lg"
                            />
                        </div>
                        <CardContent className="space-y-2 p-4 sm:p-6 md:p-8 flex flex-col items-center">
                            <h3 className="text-lg sm:text-xl md:text-2xl font-bold">Burger</h3>
                            <p className="text-sm sm:text-base md:text-lg text-gray-500">
                                It is a long established fact that a reader will be distracted by the readable.
                            </p>
                            <p className="text-lg sm:text-xl md:text-2xl font-bold">$4.56</p>
                        </CardContent>
                    </Card>
                    <Card className="w-full">
                        <div className="relative">
                            <Badge variant="secondary" className="absolute top-2 left-2">
                                TOP SELLER
                            </Badge>
                            <img
                                src="/placeholder.svg"
                                alt="Chicken Burger"
                                className="w-full h-48 sm:h-56 md:h-64 object-cover rounded-t-lg"
                            />
                        </div>
                        <CardContent className="space-y-2 p-4 sm:p-6 md:p-8 flex flex-col items-center">
                            <h3 className="text-lg sm:text-xl md:text-2xl font-bold">Chicken Burger</h3>
                            <p className="text-sm sm:text-base md:text-lg text-gray-500">
                                It is a long established fact that a reader will be distracted by the readable.
                            </p>
                            <p className="text-lg sm:text-xl md:text-2xl font-bold">$4.56</p>
                        </CardContent>
                    </Card>
                    <Card className="w-full">
                        <div className="relative">
                            <Badge variant="secondary" className="absolute top-2 left-2">
                                TOP SELLER
                            </Badge>
                            <img
                                src="/placeholder.svg"
                                alt="Pineapple Pizza"
                                className="w-full h-48 sm:h-56 md:h-64 object-cover rounded-t-lg"
                            />
                        </div>
                        <CardContent className="space-y-2 p-4 sm:p-6 md:p-8 flex flex-col items-center">
                            <h3 className="text-lg sm:text-xl md:text-2xl font-bold">Pineapple Pizza</h3>
                            <p className="text-sm sm:text-base md:text-lg text-gray-500">
                                It is a long established fact that a reader will be distracted by the readable.
                            </p>
                            <p className="text-lg sm:text-xl md:text-2xl font-bold">$4.56</p>
                        </CardContent>
                    </Card>
                </div>
            </div>
        )
    }

    function CandyIcon(props) {
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
                <path d="m9.5 7.5-2 2a4.95 4.95 0 1 0 7 7l2-2a4.95 4.95 0 1 0-7-7Z" />
                <path d="M14 6.5v10" />
                <path d="M10 7.5v10" />
                <path d="m16 7 1-5 1.37.68A3 3 0 0 0 19.7 3H21v1.3c0 .46.1.92.32 1.33L22 7l-5 1" />
                <path d="m8 17-1 5-1.37-.68A3 3 0 0 0 4.3 21H3v-1.3a3 3 0 0 0-.32-1.33L2 17l5-1" />
            </svg>
        )
    }


    function CherryIcon(props) {
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
                <path d="M2 17a5 5 0 0 0 10 0c0-2.76-2.5-5-5-3-2.5-2-5 .24-5 3Z" />
                <path d="M12 17a5 5 0 0 0 10 0c0-2.76-2.5-5-5-3-2.5-2-5 .24-5 3Z" />
                <path d="M7 14c3.22-2.91 4.29-8.75 5-12 1.66 2.38 4.94 9 5 12" />
                <path d="M22 9c-4.29 0-7.14-2.33-10-7 5.71 0 10 4.67 10 7Z" />
            </svg>
        )
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
                <path d="m6 9 6 6 6-6" />
            </svg>
        )
    }


    function FilterIcon(props) {
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
                <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
            </svg>
        )
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
                <line x1="8" x2="21" y1="6" y2="6" />
                <line x1="8" x2="21" y1="12" y2="12" />
                <line x1="8" x2="21" y1="18" y2="18" />
                <line x1="3" x2="3.01" y1="6" y2="6" />
                <line x1="3" x2="3.01" y1="12" y2="12" />
                <line x1="3" x2="3.01" y1="18" y2="18" />
            </svg>
        )
    }


    function PizzaIcon(props) {
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
                <path d="M15 11h.01" />
                <path d="M11 15h.01" />
                <path d="M16 16h.01" />
                <path d="m2 16 20 6-6-20A20 20 0 0 0 2 16" />
                <path d="M5.71 17.11a17.04 17.04 0 0 1 11.4-11.4" />
            </svg>
        )
    }


    function SaladIcon(props) {
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
                <path d="M7 21h10" />
                <path d="M12 21a9 9 0 0 0 9-9H3a9 9 0 0 0 9 9Z" />
                <path d="M11.38 12a2.4 2.4 0 0 1-.4-4.77 2.4 2.4 0 0 1 3.2-2.77 2.4 2.4 0 0 1 3.47-.63 2.4 2.4 0 0 1 3.37 3.37 2.4 2.4 0 0 1-1.1 3.7 2.51 2.51 0 0 1 .03 1.1" />
                <path d="m13 12 4-4" />
                <path d="M10.9 7.25A3.99 3.99 0 0 0 4 10c0 .73.2 1.41.54 2" />
            </svg>
        )
    }


    function SandwichIcon(props) {
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
                <path d="M3 11v3a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1v-3" />
                <path d="M12 19H4a1 1 0 0 1-1-1v-2a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-3.83" />
                <path d="m3 11 7.77-6.04a2 2 0 0 1 2.46 0L21 11H3Z" />
                <path d="M12.97 19.77 7 15h12.5l-3.75 4.5a2 2 0 0 1-2.78.27Z" />
            </svg>
        )
    }


    function SnowflakeIcon(props) {
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
                <line x1="2" x2="22" y1="12" y2="12" />
                <line x1="12" x2="12" y1="2" y2="22" />
                <path d="m20 16-4-4 4-4" />
                <path d="m4 8 4 4-4 4" />
                <path d="m16 4-4 4-4-4" />
                <path d="m8 20 4-4 4 4" />
            </svg>
        )
    }