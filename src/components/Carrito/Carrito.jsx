import { Button } from "@/components/ui/button"

export default function Carrito() {
    return (
        <div className="flex justify-center items-center h-screen">
            <div className="bg-white p-4 rounded-lg shadow-md w-full max-w-md">
                <div className="flex items-center justify-between pb-4 border-b">
                    <h2 className="text-2xl font-bold">Cart (03)</h2>
                    <EllipsisVerticalIcon className="text-gray-400" />
                </div>
                <div className="space-y-4 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                            <img src="https://th.bing.com/th/id/OIP.vYCUqeltAX2vaIDv6ruSewAAAA?rs=1&pid=ImgDetMain" alt="Double Patty Burger" className="w-12 h-12 rounded-full" />
                            <div>
                                <p className="font-bold">Double Patty Burger</p>
                                <div className="flex items-center space-x-2">
                                    <Button variant="ghost" className="px-1">
                                        -
                                    </Button>
                                    <span>1</span>
                                    <Button variant="ghost" className="px-1">
                                        +
                                    </Button>
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center space-x-2">
                            <p className="text-lg font-bold">$50.20</p>
                            <XIcon className="text-gray-400" />
                        </div>
                    </div>
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                            <img src="https://revistaaventurero.com.mx/wp-content/uploads/2020/05/burger-4953465_1920.jpg" alt="All Combo" className="w-12 h-12 rounded-full" />
                            <div>
                                <p className="font-bold">All Combo</p>
                                <div className="flex items-center space-x-2">
                                    <Button variant="ghost" className="px-1">
                                        -
                                    </Button>
                                    <span>1</span>
                                    <Button variant="ghost" className="px-1">
                                        +
                                    </Button>
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center space-x-2">
                            <p className="text-lg font-bold">$50.20</p>
                            <XIcon className="text-gray-400" />
                        </div>
                    </div>
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                            <img src="https://th.bing.com/th/id/OIP.xpHtN8nOMEDD69KJLoiHDAHaHa?rs=1&pid=ImgDetMain" alt="Veg And crispy Burger" className="w-12 h-12 rounded-full" />
                            <div>
                                <p className="font-bold">Veg And crispy Burger</p>
                                <div className="flex items-center space-x-2">
                                    <Button variant="ghost" className="px-1">
                                        -
                                    </Button>
                                    <span>1</span>
                                    <Button variant="ghost" className="px-1">
                                        +
                                    </Button>
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center space-x-2">
                            <p className="text-lg font-bold">$50.20</p>
                            <XIcon className="text-gray-400" />
                        </div>
                    </div>
                </div>
                <div className="space-y-2 py-4 border-t border-b">
                    <div className="flex justify-between">
                        <p className="text-sm">Item Total</p>
                        <p className="text-sm">$55.00</p>
                    </div>
                    <div className="flex justify-between">
                        <p className="text-sm">Delivery Charges</p>
                        <p className="text-sm">$5.00</p>
                    </div>
                    <div className="flex justify-between">
                        <p className="text-sm">Govt Taxes & Other Charges</p>
                        <p className="text-sm">$3.50</p>
                    </div>
                </div>
                <div className="flex justify-between items-center py-4">
                    <p className="text-xl font-bold">Total</p>
                    <p className="text-xl font-bold">$63.50</p>
                </div>
                <Button className="w-full bg-primary hover:bg-secondary">
                    Order Now <ArrowRightIcon className="ml-2" />
                </Button>
            </div>
        </div>
    )
}

function ArrowRightIcon(props) {
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
            <path d="M5 12h14" />
            <path d="m12 5 7 7-7 7" />
        </svg>
    )
}


function EllipsisVerticalIcon(props) {
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
            <circle cx="12" cy="12" r="1" />
            <circle cx="12" cy="5" r="1" />
            <circle cx="12" cy="19" r="1" />
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