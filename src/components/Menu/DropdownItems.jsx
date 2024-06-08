import React from 'react';
import { DropdownMenuItem } from '@/components/ui/dropdown-menu';
import ListIcon from './ListIcon';

export default function DropdownItems({ categorias, handleCategoryClick, selectedCategory, indent = 0 }) {
    return categorias.map(categoria => (
        <React.Fragment key={categoria.id}>
            <DropdownMenuItem
                className={`flex items-center space-x-1 w-full md:w-auto ${selectedCategory === categoria.id ? 'bg-gray-200' : ''}`}
                style={{ paddingLeft: `${indent * 16}px` }}
                onClick={() => handleCategoryClick(categoria.id)}
            >
                <ListIcon className="w-5 h-5" />
                <span>{categoria.denominacion}</span>
            </DropdownMenuItem>
            {categoria.subCategorias && categoria.subCategorias.length > 0 && (
                <DropdownItems categorias={categoria.subCategorias} handleCategoryClick={handleCategoryClick} selectedCategory={selectedCategory} indent={indent + 1} />
            )}
        </React.Fragment>
    ));
}
