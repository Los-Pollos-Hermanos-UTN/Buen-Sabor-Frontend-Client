import React from 'react';

// Definir componentes básicos para Button, Card, CardContent y Badge
const Button = ({ variant, className, children }) => {
    const baseClasses = "px-4 py-2 rounded-md";
    const variantClasses = variant === "secondary" ? "bg-gray-200" : variant === "outline" ? "border border-gray-300" : "bg-transparent";
    return <button className={`${baseClasses} ${variantClasses} ${className}`}>{children}</button>;
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

// Definir otros iconos (CandyIcon, CherryIcon, FilterIcon, PizzaIcon, SaladIcon, SandwichIcon, SnowflakeIcon, StarIcon)
// Aquí está un ejemplo de uno más:
function StarIcon(props) {
    return (
        <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
    );
}

export default function Menu() {
    return (
        <div className="bg-white p-6">
            <div className="flex justify-between items-center mb-6">
                <div className="flex space-x-4">
                    <Button variant="secondary" className="flex items-center space-x-1">
                        <ListIcon className="w-5 h-5" /> <span>ALL</span>
                    </Button>
                    {/* Definir más botones aquí */}
                </div>
                <Button variant="outline" className="flex items-center space-x-1">
                    <span>Filter</span>
                </Button>
            </div>
            <div className="grid grid-cols-3 gap-6">
                <Card className="w-full">
                    <div className="relative">
                        <Badge variant="secondary" className="absolute top-2 left-2">
                            TOP SELLER
                        </Badge>
                        <img src="https://th.bing.com/th/id/OIP.xpHtN8nOMEDD69KJLoiHDAHaHa?rs=1&pid=ImgDetMain" alt="Burger" className="w-full h-48 object-cover rounded-t-lg" />
                    </div>
                    <CardContent className="space-y-2 p-4">
                        <div className="flex items-center justify-between">
                            <h3 className="text-lg font-bold">Burger</h3>
                            <div className="flex items-center">
                                <StarIcon className="w-4 h-4 text-yellow-400" />
                                <span className="ml-1 text-sm font-semibold">4.5</span>
                            </div>
                        </div>
                        <p className="text-sm text-gray-500">
                            It is a long established fact that a reader will be distracted by the readable.
                        </p>
                        <p className="text-lg font-bold">$4.56</p>
                    </CardContent>
                </Card>
                {/* Definir más tarjetas aquí */}
            </div>
        </div>
    );
}
