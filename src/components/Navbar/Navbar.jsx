import React from "react";
import Logo from "../../assets/food-logo.png";
import { Link } from "react-router-dom";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";

const Menu = [
    { id: 2, name: "Menu", link: "/menu" },
];

const Navbar = () => {
    return (
        <header className="bg-white shadow-md dark:bg-gray-900 dark:text-white duration-200">
            <nav className="flex justify-between items-center px-4 py-2 container mx-auto">
                <div className="flex items-center">
                    <Link to="/" className="font-bold text-2xl sm:text-3xl flex gap-2 items-center">
                        <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
                            <img src={Logo} alt="Logo" className="w-full h-full object-cover" />
                        </div>
                        <span className="flex flex-col justify-center">Buen Sabor</span>
                    </Link>
                </div>
                <div className="flex items-center space-x-4 relative">
                    <ul className="hidden sm:flex items-center gap-4">
                        {Menu.map((menu) => (
                            <li key={menu.id}>
                                <Link to={menu.link} className="inline-block py-4 px-4 hover:text-yellow-500">
                                    {menu.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button variant="outline" className="relative">
                                <UserIcon className="w-5 h-5" />
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="fixed top-0 right-0 bottom-0 w-full max-w-md bg-white shadow-xl p-6 flex flex-col">
                            <div className="space-y-4">
                                <h2 className="text-2xl font-bold">Login</h2>
                                <div className="space-y-2">
                                    <Label htmlFor="email">Email</Label>
                                    <Input id="email" type="email" placeholder="Enter your email" className="w-full" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="password">Password</Label>
                                    <Input id="password" type="password" placeholder="Enter your password" className="w-full" />
                                </div>
                                <Button className="w-full">Login</Button>
                                <p className="text-center text-sm text-gray-500">
                                    Not registered?{" "}
                                    <Link to="/register" className="font-medium underline">
                                        Register
                                    </Link>
                                </p>
                            </div>
                        </PopoverContent>
                    </Popover>
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button variant="outline" className="relative">
                                <ShoppingCartIcon className="w-5 h-5" />
                                <Badge variant="secondary" className="absolute top-0 right-0 translate-x-1/2 -translate-y-1/2">
                                    6
                                </Badge>
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-[400px] rounded-lg p-4 bg-white shadow-xl">
                            <div className="py-4">
                                <ScrollArea className="space-y-4 h-48">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center space-x-2">
                                            <img src="/placeholder.svg" alt="Double Burger" width={40} height={40} className="w-10 h-10" />
                                            <p>Double Burger</p>
                                        </div>
                                        <p>$28.00</p>
                                        <Button variant="ghost" aria-label="Remove item">
                                            <XIcon className="w-4 h-4" />
                                        </Button>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center space-x-2">
                                            <img src="/placeholder.svg" alt="Cheese Burger" width={40} height={40} className="w-10 h-10" />
                                            <p>Cheese Burger</p>
                                        </div>
                                        <p>$20.00</p>
                                        <Button variant="ghost" aria-label="Remove item">
                                            <XIcon className="w-4 h-4" />
                                        </Button>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center space-x-2">
                                            <img src="/placeholder.svg" alt="Burger" width={40} height={40} className="w-10 h-10" />
                                            <p>Burger</p>
                                        </div>
                                        <p>$15.00</p>
                                        <Button variant="ghost" aria-label="Remove item">
                                            <XIcon className="w-4 h-4" />
                                        </Button>
                                    </div>
                                </ScrollArea>
                            </div>
                            <div className="flex justify-between items-center font-bold mt-4">
                                <p>Total:</p>
                                <p>$63</p>
                            </div>
                            <div className="flex space-x-2 mt-4">
                                <Link to={"/carrito"} className={"w-1/2"}>
                                <Button className="w-full">View Cart</Button>
                                </Link>
                                <Link to={"/menu"} className="w-1/2">
                                <Button variant="outline" className="w-full">
                                    Menu
                                </Button>
                                </Link>
                            </div>
                        </PopoverContent>
                    </Popover>
                </div>
            </nav>
        </header>
    );
}

function ShoppingCartIcon(props) {
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
            <circle cx="8" cy="21" r="1" />
            <circle cx="19" cy="21" r="1" />
            <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
        </svg>
    )
}

function UserIcon(props) {
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
            <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
            <circle cx="12" cy="7" r="4" />
        </svg>
    )
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
    )
}

export default Navbar;
