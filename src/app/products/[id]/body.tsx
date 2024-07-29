import React, { useState, useRef } from 'react';

interface Product {
    name: string;
    price: string;
    availability: string;
    description: string;
    imageUrl: string[];
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

    const imageUrl = product.imageUrl && product.imageUrl.length > 0 ? product.imageUrl[0] : '/images/Image_not_available.png';

    return (
        <main>
            <div className="mt-10 py-8">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row -mx-4">
                        {/* Image and Zoom Section */}
                        <div className="md:flex-1 px-4">
                            <div
                                className="h-[460px] sm:h-[600px] rounded-lg bg-gray-100 mb-4 relative overflow-hidden"
                                ref={containerRef}
                                onMouseMove={handleMouseMove}
                                onMouseEnter={() => toggleZoom(true)}
                                onMouseLeave={() => toggleZoom(false)}
                            >
                                <img
                                    ref={imageRef}
                                    src={imageUrl}
                                    className="relative inset-0 w-full h-full object-contain transition-transform duration-300 transform-gpu"
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
                        </div>
                        {/* Product Details Section */}
                        <div className="md:flex-1 px-4">
                            <h2 className="text-2xl font-bold text-gray-800 mb-2">{product.name}</h2>
                            <div className="flex flex-col sm:flex-row mb-4">
                                <div className="mr-4 mb-2 sm:mb-0">
                                    <span className="font-bold text-gray-700">Price: </span>
                                    <span className="text-gray-600">${product.price}</span>
                                </div>
                                <div>
                                    <span className="font-bold text-gray-700">Availability: </span>
                                    <span className="text-gray-600">{product.availability}</span>
                                </div>
                            </div>
                            <div className="mt-5">
                                <span className="font-bold text-gray-700">Product Description:</span>
                                <p className="text-gray-600 text-sm mt-2">
                                    {product.description}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default Body;
