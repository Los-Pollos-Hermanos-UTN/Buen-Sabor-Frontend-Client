import React, { useState, useEffect } from 'react';
import { useGlobalContext } from '../../context/GlobalContext.jsx';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { FaShoppingCart } from "react-icons/fa";
import ListIcon from './ListIcon';
import ChevronDownIcon from './ChevronDownIcon';
import DropdownItems from './DropdownItems';
import Articulos from './Articulos';

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
            let data = await response.json();
            data = filterEmptyCategorias(data);
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
        let selectedCategorias = [];

        if (categoryId !== null) {
            const getAllSubcategories = (categoriaId) => {
                const subCategorias = allCategorias.filter(categoria => categoria.padreId === categoriaId);
                subCategorias.forEach(subCategoria => {
                    selectedCategorias.push(subCategoria);
                    getAllSubcategories(subCategoria.id);
                });
            };

            const mainCategory = allCategorias.find(categoria => categoria.id === categoryId);
            if (mainCategory) {
                selectedCategorias.push(mainCategory);
                getAllSubcategories(mainCategory.id);
            }
        } else {
            selectedCategorias = allCategorias;
        }

        return selectedCategorias.flatMap(categoria =>
            categoria.articulos.filter(articulo =>
                !articulo.eliminado && articulo.precioVenta > 0
            ).map(articulo => ({ ...articulo, categoriaDenominacion: categoria.denominacion }))
        );
    };

    const filterEmptyCategorias = (categorias) => {
        return categorias.filter(categoria => {
            const validArticulos = categoria.articulos.filter(articulo =>
                !articulo.eliminado && articulo.precioVenta > 0
            );
            if (validArticulos.length > 0) {
                return true;
            } else if (categoria.subCategorias && categoria.subCategorias.length > 0) {
                categoria.subCategorias = filterEmptyCategorias(categoria.subCategorias);
                return categoria.subCategorias.length > 0;
            }
            return false;
        });
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
                        <DropdownItems categorias={categoriasPrincipales} handleCategoryClick={handleCategoryClick} selectedCategory={selectedCategory} />
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {isLoading ? (
                    <div className="flex justify-center items-center col-span-full h-64">
                        <p className="text-center text-xl">Cargando...</p>
                    </div>
                ) : (
                    <Articulos articulos={articulos} dispatch={dispatch} />
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
