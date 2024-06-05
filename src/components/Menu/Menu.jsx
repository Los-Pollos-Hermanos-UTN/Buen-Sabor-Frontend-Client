import React, { useState, useEffect } from 'react';
import Modal from 'react-modal'; // Asegúrate de instalar react-modal

// Definir componentes básicos para Button, Card, CardContent y Badge
const Button = ({ variant, className, onClick, children }) => {
    const baseClasses = "px-4 py-2 rounded-md";
    const variantClasses = variant === "secondary" ? "bg-gray-200" : variant === "outline" ? "border border-gray-300" : "bg-transparent";
    return <button onClick={onClick} className={`${baseClasses} ${variantClasses} ${className}`}>{children}</button>;
};

const Card = ({ children, className }) => {
    return <div className={`bg-white shadow rounded-lg ${className}`}>{children}</div>;
};

const CardContent = ({ children, className }) => {
    return <div className={`p-4 ${className}`}>{children}</div>;
};

const Badge = ({ variant, className, children }) => {
    const baseClasses = "px-2 py-1 text-xs rounded-md";
    const variantClasses = variant === "secondary" ? "bg-gray-300" : "bg-gray-200";
    return <span className={`${baseClasses} ${variantClasses} ${className}`}>{children}</span>;
};

// Definir iconos directamente
function ListIcon(props) {
    return (
        <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="8" x2="21" y1="6" y2="6" />
            <line x1="8" x2="21" y1="12" y2="12" />
            <line x1="8" x2="21" y1="18" y2="18" />
            <line x1="3" x2="3.01" y1="6" y2="6" />
            <line x1="3" x2="3.01" y1="12" y2="12" />
            <line x1="3" x2="3.01" y1="18" y2="18" />
        </svg>
    );
}

function StarIcon(props) {
    return (
        <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
    );
}

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
        setSelectedCategory(null); // Reset category selection when changing sucursal
        setFilteredCategories([]); // Reset filtered categories when changing sucursal
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

    const renderArticulos = (categoria) => {
        return categoria.articulos.filter(articulo =>
            !articulo.eliminado && articulo.precioVenta > 0 &&
            (!selectedCategory || selectedCategory === categoria.id) &&
            (filteredCategories.length === 0 || filteredCategories.includes(categoria.id))
        ).map(articulo => (
            <Card className="w-full" key={articulo.id}>
                <div className="relative">
                    <Badge variant="secondary" className="absolute top-2 left-2">
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
                        <div className="flex items-center">
                            <StarIcon className="w-4 h-4 text-yellow-400" />
                            <span className="ml-1 text-sm font-semibold">4.5</span>
                        </div>
                    </div>
                    <p className="text-sm text-gray-500">
                        {articulo.denominacion}
                    </p>
                    <p className="text-lg font-bold">${articulo.precioVenta}</p>
                </CardContent>
            </Card>
        ));
    };

    const renderCategoriasRecursivamente = (categorias) => {
        return categorias.flatMap(categoria => (
            <>
                {renderArticulos(categoria)}
                {renderCategoriasRecursivamente(categoria.subCategorias)}
            </>
        ));
    };

    const categoriasConArticulos = categorias.filter(categoria =>
        categoria.articulos.some(articulo => !articulo.eliminado && articulo.precioVenta > 0)
    );

    const renderCategoryButtonsRecursively = (categorias, parentIndex = '') => {
        return categorias.flatMap((categoria, index) => (
            <React.Fragment key={`${parentIndex}-${index}`}>
                <Button
                    variant="secondary"
                    className={`flex items-center space-x-1 ${selectedCategory === categoria.id ? 'bg-gray-400' : ''}`}
                    onClick={() => handleCategoryClick(categoria.id)}
                >
                    <span>{categoria.denominacion}</span>
                </Button>
                {renderCategoryButtonsRecursively(categoria.subCategorias, `${parentIndex}-${index}`)}
            </React.Fragment>
        ));
    };

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
                <div className="flex space-x-4 overflow-x-auto">
                    <Button variant="secondary" className="flex items-center space-x-1" onClick={() => setSelectedCategory(null)}>
                        <ListIcon className="w-5 h-5" /> <span>ALL</span>
                    </Button>
                    {renderCategoryButtonsRecursively(categoriasConArticulos)}
                </div>
                {categoriasConArticulos.length > 5 && (
                    <Button variant="outline" className="flex items-center space-x-1" onClick={() => setModalIsOpen(true)}>
                        <span>Filter</span>
                    </Button>
                )}
            </div>

            <div className="grid grid-cols-3 gap-6">
                {renderCategoriasRecursivamente(categorias)}
            </div>

            <Modal
                isOpen={modalIsOpen}
                onRequestClose={() => setModalIsOpen(false)}
                className="fixed top-0 right-0 h-full w-1/3 bg-white p-6 overflow-y-auto"
                overlayClassName="fixed inset-0 bg-black bg-opacity-50"
            >
                <h2 className="text-xl font-bold mb-4">Seleccionar Categorías</h2>
                <div className="grid grid-cols-2 gap-4">
                    {categoriasConArticulos.map((categoria) => (
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
