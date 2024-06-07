// src/components/Login.js
import React, { useRef, useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useAuth } from "../../context/AuthContext.jsx";
import { UserIcon } from "lucide-react";

const Login = () => {
    const { isLoggedIn, username, login, logout } = useAuth();
    const [isRegistering, setIsRegistering] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        image: null
    });

    const popoverRef = useRef();

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [id]: value
        }));
    };

    const handleImageChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            image: e.target.files[0]
        }));
    };

    const handleRegister = async () => {
        const userPayload = {
            id: 0,
            eliminado: false,
            auth0Id: formData.password,
            userName: formData.email
        };

        try {
            const userResponse = await fetch("http://localhost:8080/usuarioCliente/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(userPayload)
            });

            if (!userResponse.ok) {
                throw new Error("Error creating user");
            }

            const user = await userResponse.json();

            const clientPayload = {
                id: 0,
                eliminado: false,
                nombre: formData.name,
                apellido: "",
                telefono: "",
                email: formData.email,
                fechaNac: new Date().toISOString().split('T')[0],
                usuario: user,
                imagenCliente: null,
                domicilios: [],
                pedidos: []
            };

            const formDataToSend = new FormData();
            formDataToSend.append('data', JSON.stringify(clientPayload));
            if (formData.image) {
                formDataToSend.append('imagenes', formData.image);
            }

            const clientResponse = await fetch("http://localhost:8080/cliente/save", {
                method: "POST",
                body: formDataToSend
            });

            if (!clientResponse.ok) {
                throw new Error("Error creating client");
            }

            login({ id: user.id, nombreUsuario: formData.email, rol: 'user' });
            console.log("Client registered successfully");
        } catch (error) {
            console.error("Error:", error);
        }
    };

    const handleLogin = async () => {
        try {
            const response = await fetch("http://localhost:8080/usuarioCliente");
            if (!response.ok) {
                throw new Error("Error fetching users");
            }

            const users = await response.json();
            const user = users.find(user => user.userName === formData.email && user.auth0Id === formData.password);

            if (user) {
                login({ id: user.id, nombreUsuario: formData.email, rol: 'user' });
                console.log("Login successful");
            } else {
                console.error("Invalid email or password");
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    const toggleRegistering = () => {
        setIsRegistering((prevState) => !prevState);
        setFormData({
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
            image: null
        });
    };

    return (
        <Popover ref={popoverRef}>
            <PopoverTrigger asChild>
                <Button variant="outline" className="relative">
                    <UserIcon className="w-5 h-5" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[400px] rounded-lg p-4 bg-white shadow-xl">
                <div className="space-y-4">
                    {isLoggedIn ? (
                        <>
                            <h2 className="text-2xl font-bold">Welcome, {username}</h2>
                            <div className="flex items-center space-x-2">
                                <p>{username}</p>
                            </div>
                            <Button className="bg-primary hover:bg-secondary duration-200 text-white w-full" onClick={logout}>
                                Logout
                            </Button>
                        </>
                    ) : isRegistering ? (
                        <>
                            <h2 className="text-2xl font-bold">Register</h2>
                            <div className="space-y-2">
                                <Label htmlFor="name">Name</Label>
                                <Input
                                    id="name"
                                    type="text"
                                    placeholder="Enter your name"
                                    className="w-full"
                                    autoComplete="off"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="Enter your email"
                                    className="w-full"
                                    autoComplete="off"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="password">Password</Label>
                                <Input
                                    id="password"
                                    type="password"
                                    placeholder="Enter your password"
                                    className="w-full"
                                    autoComplete="off"
                                    value={formData.password}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="confirmPassword">Confirm Password</Label>
                                <Input
                                    id="confirmPassword"
                                    type="password"
                                    placeholder="Confirm your password"
                                    className="w-full"
                                    autoComplete="off"
                                    value={formData.confirmPassword}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="image">Image</Label>
                                <Input id="image" type="file" className="w-full" onChange={handleImageChange} />
                            </div>
                            <Button className="bg-primary hover:bg-secondary duration-200 text-white w-full" onClick={handleRegister}>
                                Register
                            </Button>
                            <p className="text-center text-sm text-gray-500">
                                Already have an account?{" "}
                                <button type="button" className="font-medium underline" onClick={toggleRegistering}>
                                    Login
                                </button>
                            </p>
                        </>
                    ) : (
                        <>
                            <h2 className="text-2xl font-bold">Login</h2>
                            <div className="space-y-2">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="Enter your email"
                                    className="w-full"
                                    autoComplete="off"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="password">Password</Label>
                                <Input
                                    id="password"
                                    type="password"
                                    placeholder="Enter your password"
                                    className="w-full"
                                    autoComplete="off"
                                    value={formData.password}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <Button className="bg-primary hover:bg-secondary duration-200 text-white w-full" onClick={handleLogin}>
                                Login
                            </Button>
                            <p className="text-center text-sm text-gray-500">
                                Don't have an account?{" "}
                                <button type="button" className="font-medium underline" onClick={toggleRegistering}>
                                    Register
                                </button>
                            </p>
                        </>
                    )}
                </div>
            </PopoverContent>
        </Popover>
    );
};

export default Login;
