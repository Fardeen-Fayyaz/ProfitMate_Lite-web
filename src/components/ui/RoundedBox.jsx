// src/components/ui/RoundedBox.jsx

import React, { useMemo } from 'react';
import * as THREE from 'three';

const RoundedBoxGeometry = ({ width = 1, height = 1, depth = 1, radius = 0.1, segments = 4 }) => {
    const geometry = useMemo(() => {
        const shape = new THREE.Shape();
        const eps = 0.00001;
        const r = radius;
        const x = width / 2 - r;
        const y = height / 2 - r;

        shape.moveTo(x, y + r);
        shape.lineTo(x, height / 2 - eps);
        shape.lineTo(-x + eps, height / 2);
        shape.lineTo(-x, y + r);
        shape.lineTo(-x, -y - r + eps);
        shape.lineTo(-x + eps, -height / 2);
        shape.lineTo(x, -height / 2 + eps);
        shape.lineTo(x, -y - r);

        const extrudeSettings = {
            steps: 1,
            depth: depth - r * 2,
            bevelEnabled: true,
            bevelThickness: r,
            bevelSize: r,
            bevelSegments: segments,
        };

        return new THREE.ExtrudeGeometry(shape, extrudeSettings);
    }, [width, height, depth, radius, segments]);

    return <primitive object={geometry} attach="geometry" />;
};

export default RoundedBoxGeometry;