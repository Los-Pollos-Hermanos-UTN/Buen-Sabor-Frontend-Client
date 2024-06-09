import React, { useRef, useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useAuth } from "../../context/AuthContext.jsx";
import { UserIcon } from "lucide-react";
import { toast } from "react-toastify";

const Login = () => {
    const { isLoggedIn, username, login, logout } = useAuth();
    const [isRegistering, setIsRegistering] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        lastname: "",
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
                apellido: formData.lastname,
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
                toast.error("Hubo un error registrando el cliente");
            }

            login({ id: user.id, nombreUsuario: formData.email, rol: 'user' });
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
            } else {
                toast.error("Email o contraseña incorrectos.");
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
                            <h2 className="text-2xl font-bold">Bienvenido, {username}</h2>
                            <Button className="bg-primary hover:bg-secondary duration-200 text-white w-full" onClick={logout}>
                                Logout
                            </Button>
                        </>
                    ) : isRegistering ? (
                        <>
                            <h2 className="text-2xl font-bold">Register</h2>
                            <div className="space-y-2">
                                <Label htmlFor="name">Nombre</Label>
                                <Input
                                    id="name"
                                    type="text"
                                    placeholder="Ingresa tu nombre"
                                    className="w-full"
                                    autoComplete="off"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                />

                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="lastname">Apellido</Label>
                                <Input
                                    id="lastname"
                                    type="text"
                                    placeholder="Ingresa tu apellido"
                                    className="w-full"
                                    autoComplete="off"
                                    value={formData.lastname}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="Ingresa tu Email"
                                    className="w-full"
                                    autoComplete="off"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="password">Contraseña</Label>
                                <Input
                                    id="password"
                                    type="password"
                                    placeholder="Ingresa tu contraseña"
                                    className="w-full"
                                    autoComplete="off"
                                    value={formData.password}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="confirmPassword">Repetir Contraseña</Label>
                                <Input
                                    id="confirmPassword"
                                    type="password"
                                    placeholder="Repite tu contraseña"
                                    className="w-full"
                                    autoComplete="off"
                                    value={formData.confirmPassword}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <Button className="bg-primary hover:bg-secondary duration-200 text-white w-full"
                                    onClick={handleRegister}>
                                Registrarse
                            </Button>
                            <p className="text-center text-sm text-gray-500">
                                Ya tienes una cuenta?{" "}
                                <button type="button" className="font-medium underline" onClick={toggleRegistering}>
                                    Iniciar Sesión
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
