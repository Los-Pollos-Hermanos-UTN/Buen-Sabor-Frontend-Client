import React, { useState } from "react";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

const Login = () => {
    const [isRegistering, setIsRegistering] = useState(false);

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button variant="outline" className="relative">
                    <UserIcon className="w-5 h-5" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[400px] rounded-lg p-4 bg-white shadow-xl">
                <div className="space-y-4">
                    {isRegistering ? (
                        <>
                            <h2 className="text-2xl font-bold">Register</h2>
                            <div className="space-y-2">
                                <Label htmlFor="name">Name</Label>
                                <Input id="name" type="text" placeholder="Enter your name" className="w-full" autocomplete="off" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="email">Email</Label>
                                <Input id="email" type="email" placeholder="Enter your email" className="w-full" autocomplete="off" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="password">Password</Label>
                                <Input id="password" type="password" placeholder="Enter your password" className="w-full" autocomplete="new-password" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="confirm-password">Confirm Password</Label>
                                <Input id="confirm-password" type="password" placeholder="Confirm your password" className="w-full" autocomplete="new-password" />
                            </div>
                            <Button className="w-full">Register</Button>
                            <p className="text-center text-sm text-gray-500">
                                Already have an account?{" "}
                                <button
                                    type="button"
                                    className="font-medium underline"
                                    onClick={() => setIsRegistering(false)}
                                >
                                    Login
                                </button>
                            </p>
                        </>
                    ) : (
                        <>
                            <h2 className="text-2xl font-bold">Login</h2>
                            <div className="space-y-2">
                                <Label htmlFor="email">Email</Label>
                                <Input id="email" type="email" placeholder="Enter your email" className="w-full" autocomplete="off" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="password">Password</Label>
                                <Input id="password" type="password" placeholder="Enter your password" className="w-full" autocomplete="new-password" />
                            </div>
                            <Button className="w-full">Login</Button>
                            <p className="text-center text-sm text-gray-500">
                                Not registered?{" "}
                                <button
                                    type="button"
                                    className="font-medium underline"
                                    onClick={() => setIsRegistering(true)}
                                >
                                    Register
                                </button>
                            </p>
                        </>
                    )}
                </div>
            </PopoverContent>
        </Popover>
    );
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
    );
}

export default Login;
