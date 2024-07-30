import React, { useState, useRef } from 'react';

interface Product {
    name: string;
    brandName: string;
    price: string;
    availability: string;
    description: string;
    imageUrls: string[];
    quantity: number;
    colorName: string;
    hexcode: string;
    sizeName: string;
}

interface BodyProps {
    product: Product;
}

const Body: React.FC<BodyProps> = ({ product }) => {
    const [isZoomed, setIsZoomed] = useState<boolean>(false);
    const [zoomPosition, setZoomPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
    const containerRef = useRef<HTMLDivElement>(null);
    const imageRef = useRef<HTMLImageElement>(null);
    const zoomBoxSize = 200; // Size of the zoomed-in area

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (containerRef.current && imageRef.current) {
            const container = containerRef.current;
            const { left: containerLeft, top: containerTop } = container.getBoundingClientRect();
            const mouseX = e.clientX - containerLeft;
            const mouseY = e.clientY - containerTop;
            const { width: containerWidth, height: containerHeight } = container.getBoundingClientRect();
            const { width: imageWidth, height: imageHeight } = imageRef.current;
            const zoomX = (mouseX / containerWidth) * imageWidth;
            const zoomY = (mouseY / containerHeight) * imageHeight;

            setZoomPosition({
                x: Math.min(Math.max(zoomX - zoomBoxSize / 2, 0), imageWidth - zoomBoxSize),
                y: Math.min(Math.max(zoomY - zoomBoxSize / 2, 0), imageHeight - zoomBoxSize)
            });
        }
    };

    const toggleZoom = (toggle: boolean) => {
        setIsZoomed(toggle);
    };

    const imageUrl = product.imageUrls && product.imageUrls.length > 0 ? product.imageUrls[0] : '/images/Image_not_available.png';

    return (
        <main className="py-8 mx-10 w-full px-10">
            <div className="w-6xl px-4 sm:px-6 lg:px-8 border-2 py-8">
                <div className="flex flex-col md:flex-row -mx-4">
                    <div className="md:flex-1 px-4">
                        <div
                            className="h-[460px] rounded-lg bg-gray-300 mb-4 relative overflow-hidden"
                            ref={containerRef}
                            onMouseMove={handleMouseMove}
                            onMouseEnter={() => toggleZoom(true)}
                            onMouseLeave={() => toggleZoom(false)}
                        >
                            <img
                                ref={imageRef}
                                src={imageUrl}
                                className="w-full h-full object-cover"
                                alt="Product Image"
                            />
                            {isZoomed && imageRef.current && (
                                <div
                                    className="absolute w-[200px] h-[200px] border border-gray-300 pointer-events-none"
                                    style={{
                                        left: zoomPosition.x,
                                        top: zoomPosition.y,
                                        backgroundImage: `url(${imageUrl})`,
                                        backgroundSize: `${imageRef.current.width}px ${imageRef.current.height}px`,
                                        backgroundPosition: `-${zoomPosition.x}px -${zoomPosition.y}px`,
                                    }}
                                />
                            )}
                        </div>
                        <div className="flex -mx-2 mb-4">
                            <div className="w-1/2 px-2">
                                <button className="w-full bg-gray-900 text-white py-2 px-4 rounded-full font-bold hover:bg-gray-800">Modify Product</button>
                            </div>
                            
                        </div>
                    </div>
                    <div className="md:flex-1 px-4">
                        <h2 className="text-2xl font-bold text-gray-800">{product.name}</h2>
                        <p className="text-gray-600 text-sm mb-4">
                            {product.brandName}
                        </p>
                        <div className="flex mb-4">
                            <div className="mr-4">
                                <span className="font-bold text-gray-700">Price:</span>
                                <span className="text-gray-600 ml-2">BDT {product.price}৳</span>
                            </div>
                            <div>
                                <span className="font-bold text-gray-700">Availability:</span>
                                <span className="text-gray-600 ml-2">{product.quantity}</span>
                            </div>
                            <div>
                                <span className="font-bold text-gray-700 ml-5">Brand:</span>
                                <span className="text-gray-600 ml-2">{product.brandName}</span>
                            </div>
                        </div>
                        <div className="mb-4 flex">
                            <span className="font-bold text-gray-700">Color:</span>
                            <div>
                                            <h3 className="text-gray-600 ml-2">{product.colorName}</h3>
                                            <svg width="30px" height="40px" viewBox="0 -2 24 24" id="meteor-icon-kit__solid-tshirt" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path fillRule="evenodd" clipRule="evenodd" d="M5.00009 9.3873L3.31634 9.9485C2.7924 10.1232 2.22609 9.84 2.05144 9.3161L0.0514698 3.31616C-0.105899 2.84405 0.107827 2.32807 0.552933 2.10552L4.55288 0.10555C4.69174 0.03612 4.84485 -0.00003 5.00009 -0.00003H8.00005C8.31481 -0.00003 8.61119 0.14817 8.80004 0.39997C9.61118 1.48148 10.6481 1.99995 12 1.99995C13.3519 1.99995 14.3888 1.48148 15.2 0.39997C15.3888 0.14817 15.6852 -0.00003 16 -0.00003H18.9999C19.1552 -0.00003 19.3083 0.03612 19.4471 0.10555L23.4471 2.10552C23.8922 2.32807 24.1059 2.84405 23.9485 3.31616L21.9486 9.3161C21.7739 9.84 21.2076 10.1232 20.6837 9.9485L18.9999 9.3873V18.9997C18.9999 19.552 18.5522 19.9997 17.9999 19.9997H6.00008C5.4478 19.9997 5.00009 19.552 5.00009 18.9997V9.3873z" fill={product.hexcode}/>
                                            </svg>
                                        </div>
                        </div>
                        <div className="mb-4">
                            <span className="font-bold text-gray-700">Size:</span>
                            <div className="flex items-center mt-2">
                                <button className="bg-gray-300 text-gray-700 py-2 px-4 rounded-full font-bold mr-2 hover:bg-gray-400">{product.sizeName}</button>
                            </div>
                        </div>
                        <div>
                            <span className="font-bold text-gray-700">Product Description:</span>
                            <p className="text-gray-600 text-sm mt-2">
                                {product.description}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default Body;
