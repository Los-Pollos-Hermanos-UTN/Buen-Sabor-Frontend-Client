import React from 'react';

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
    const baseClasses = "px-2 py-1 text-xs rounded-br-lg rounded-tl-lg";
    const variantClasses = variant === "secondary" ? "bg-[#ffc001]" : "bg-gray-200";
    return <span className={`${baseClasses} ${variantClasses} ${className}`}>{children}</span>;
};

export function ListIcon(props) {
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

export function StarIcon(props) {
    return (
        <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
    );
}

export { Card, CardContent, Button, Badge };