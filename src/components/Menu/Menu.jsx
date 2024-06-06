import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { Card, CardContent, Button, Badge, ListIcon }  from './Assets.jsx';
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
        <div className="bg-white p-6">
            <div className="mb-4">
                <label htmlFor="sucursal" className="block text-sm font-medium text-gray-700">
                    Seleccionar Sucursal
                </label>
                <select
                    id="sucursal"
                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                    onChange={handleSucursalChange}
                >
                    <option value="">Seleccione una sucursal</option>
                    {sucursales.map((sucursal) => (
                        <option key={sucursal.id} value={sucursal.id}>
                            {sucursal.nombre}
                        </option>
                    ))}
                </select>
            </div>

            <div className="flex justify-between items-center mb-6">
                <div className="flex space-x-4">
                    <Button variant="secondary" className="flex items-center space-x-1" onClick={() => setSelectedCategory(null)}>
                        <ListIcon className="w-5 h-5" /> <span>TODO</span>
                    </Button>
                    {categoriasPrincipales.slice(0, 5).map((categoria) => (
                        <Button
                            key={categoria.id}
                            variant="secondary"
                            className={`flex items-center space-x-1 ${selectedCategory === categoria.id ? 'bg-gray-400' : ''}`}
                            onClick={() => handleCategoryClick(categoria.id)}
                        >
                            <span>{categoria.denominacion}</span>
                        </Button>
                    ))}
                </div>
                {categoriasPrincipales.length > 5 && (
                    <Button variant="outline" className="flex items-center space-x-1" onClick={() => setModalIsOpen(true)}>
                        <span>Filter</span>
                    </Button>
                )}
            </div>

            <div className="grid grid-cols-3 gap-6">
                {selectedCategory
                    ? renderArticulos(categorias.filter(c => c.id === selectedCategory))
                    : categoriasPrincipales.flatMap(categoria => renderArticulos([categoria]))}
            </div>

            <Modal
                isOpen={modalIsOpen}
                onRequestClose={() => setModalIsOpen(false)}
                className="fixed top-0 right-0 h-full w-1/3 bg-white p-6 overflow-y-auto"
                overlayClassName="fixed inset-0 bg-black bg-opacity-50"
            >
                <h2 className="text-xl font-bold mb-4">Seleccionar Categorías</h2>
                <div className="grid grid-cols-2 gap-4">
                    {categoriasPrincipales.map((categoria) => (
                        <label key={categoria.id} className="flex items-center space-x-2">
                            <input
                                type="checkbox"
                                checked={filteredCategories.includes(categoria.id)}
                                onChange={() => handleFilterClick(categoria.id)}
                            />
                            <span>{categoria.denominacion}</span>
                        </label>
                    ))}
                </div>
                <div className="flex justify-end mt-4">
                    <Button variant="outline" onClick={() => setModalIsOpen(false)}>Cerrar</Button>
                </div>
            </Modal>
        </div>
    );
}
