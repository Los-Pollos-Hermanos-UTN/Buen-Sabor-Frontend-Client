// eslint-disable-next-line no-unused-vars
import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Preload, useGLTF } from "@react-three/drei";

import CanvasLoader from "./Loader.jsx";

// eslint-disable-next-line react/prop-types,no-unused-vars
const Burger = ({ scale }) => {
    const burger = useGLTF("./burger/scene.gltf");

    return (
        // eslint-disable-next-line react/no-unknown-property
        <primitive object={burger.scene} scale={0.00895} position-y={-1.5} rotation-x={0} />
    );
};

const BurgerCanvas = () => {
    // Define la escala para diferentes dispositivos
    const scale = window.innerWidth < 768 ? 0.007 : 0.00895;
    return (
        <Canvas
            shadows
            frameloop='always'
            linear={true}
            dpr={[1, 2]}
            gl={{ preserveDrawingBuffer: false }}
            camera={{
                fov: 45,
                near: 0.1,
                far: 200,
                position: [-4, 3, 6],
            }}
        >

            {/* Iluminación direccional desde diferentes ángulos */}
            {/* eslint-disable-next-line react/no-unknown-property */}
            <directionalLight position={[10, 10, 10]} intensity={2} color={"#F2EAD3"} />
            {/* eslint-disable-next-line react/no-unknown-property */}
            <directionalLight position={[-10, 10, 10]} intensity={2} color={"#F2EAD3"} />
            {/* eslint-disable-next-line react/no-unknown-property */}
            <directionalLight position={[10, -10, 10]} intensity={2} color={"#F2EAD3"} />
            {/* eslint-disable-next-line react/no-unknown-property */}
            <directionalLight position={[-10, -10, 10]} intensity={2} color={"#F2EAD3"} />
            {/* eslint-disable-next-line react/no-unknown-property */}
            <directionalLight position={[10, 10, -10]} intensity={2} color={"#F2EAD3"} />
            {/* eslint-disable-next-line react/no-unknown-property */}
            <directionalLight position={[-10, 10, -10]} intensity={2} color={"#F2EAD3"} />
            {/* eslint-disable-next-line react/no-unknown-property */}
            <directionalLight position={[10, -10, -10]} intensity={2} color={"#F2EAD3"} />
            {/* eslint-disable-next-line react/no-unknown-property */}
            <directionalLight position={[-10, -10, -10]} intensity={2} color={"#F2EAD3"} />
            {/* eslint-disable-next-line react/no-unknown-property */}
            <directionalLight position={[0, 10, 0]} intensity={2} color={"#F2EAD3"} />
            {/* eslint-disable-next-line react/no-unknown-property */}
            <directionalLight position={[0, -10, 0]} intensity={2} color={"#F2EAD3"} />
            {/* eslint-disable-next-line react/no-unknown-property */}
            <directionalLight position={[0, 0, 10]} intensity={2} color={"#F2EAD3"} />
            {/* eslint-disable-next-line react/no-unknown-property */}
            <directionalLight position={[0, 0, -10]} intensity={2} color={"#F2EAD3"} />

            <Suspense fallback={<CanvasLoader />}>
                <OrbitControls
                    autoRotate
                    enableZoom={false}
                    enablePan={false}
                    maxPolarAngle={Math.PI / 2}
                    minPolarAngle={Math.PI / 2}
                />
                {/* Pasa la escala como prop (No lo estoy usando por ahora)*/}
                <Burger scale={scale} />

                <Preload all />
            </Suspense>
        </Canvas>
    );
};

export default BurgerCanvas;
