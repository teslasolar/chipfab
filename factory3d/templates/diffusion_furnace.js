// 🔥 Diffusion furnace for doping and annealing (1100°C)
function createDiffusionFurnace(scene, position) {
    const furnace = new THREE.Group();
    furnace.position.set(position.x, position.y, position.z);

    // Main tube (horizontal)
    const tubeGeom = new THREE.CylinderGeometry(1.5, 1.5, 12, 32);
    const tubeMat = new THREE.MeshStandardMaterial({
        color: 0x666666,
        metalness: 0.8,
        roughness: 0.3
    });
    const tube = new THREE.Mesh(tubeGeom, tubeMat);
    tube.rotation.z = Math.PI / 2;
    tube.position.y = 4;
    tube.castShadow = true;
    furnace.add(tube);

    // Heating coils (glowing orange when hot)
    const coilGroup = new THREE.Group();
    for (let i = 0; i < 10; i++) {
        const coilGeom = new THREE.TorusGeometry(1.8, 0.15, 8, 32);
        const coilMat = new THREE.MeshStandardMaterial({
            color: 0xff3300,
            metalness: 0.9,
            roughness: 0.1,
            emissive: 0xff3300,
            emissiveIntensity: 0.8
        });
        const coil = new THREE.Mesh(coilGeom, coilMat);
        coil.position.x = -5 + i * 1.2;
        coil.position.y = 4;
        coil.rotation.y = Math.PI / 2;
        coilGroup.add(coil);
    }
    furnace.add(coilGroup);

    // Insulation casing
    const casingGeom = new THREE.BoxGeometry(14, 4, 4);
    const casingMat = new THREE.MeshStandardMaterial({
        color: 0x444444,
        metalness: 0.5,
        roughness: 0.7
    });
    const casing = new THREE.Mesh(casingGeom, casingMat);
    casing.position.y = 4;
    casing.castShadow = true;
    furnace.add(casing);

    // Viewing window (shows glowing interior)
    const windowGeom = new THREE.PlaneGeometry(2, 1.5);
    const windowMat = new THREE.MeshStandardMaterial({
        color: 0xff6600,
        emissive: 0xff3300,
        emissiveIntensity: 1,
        transparent: true,
        opacity: 0.7
    });
    const window1 = new THREE.Mesh(windowGeom, windowMat);
    window1.position.set(0, 4, 2.1);
    furnace.add(window1);

    // Control panel
    const panelGeom = new THREE.BoxGeometry(2, 3, 0.5);
    const panelMat = new THREE.MeshStandardMaterial({
        color: 0x222222,
        metalness: 0.6,
        roughness: 0.5
    });
    const panel = new THREE.Mesh(panelGeom, panelMat);
    panel.position.set(-8, 3, 0);
    furnace.add(panel);

    // Temperature display
    const displayGeom = new THREE.PlaneGeometry(1.5, 0.8);
    const displayMat = new THREE.MeshStandardMaterial({
        color: 0xff0000,
        emissive: 0xff0000,
        emissiveIntensity: 0.8
    });
    const display = new THREE.Mesh(displayGeom, displayMat);
    display.position.set(-8, 3.8, 0.3);
    furnace.add(display);

    // Wafer boats (inside tube, visible through ends)
    const boatGeom = new THREE.BoxGeometry(0.3, 2, 2);
    const boatMat = new THREE.MeshStandardMaterial({
        color: 0x888888,
        metalness: 0.7,
        roughness: 0.4
    });

    for (let i = 0; i < 5; i++) {
        const boat = new THREE.Mesh(boatGeom, boatMat);
        boat.position.set(-4 + i * 2, 4, 0);
        furnace.add(boat);

        // Wafers in boat
        for (let j = 0; j < 3; j++) {
            const waferGeom = new THREE.CylinderGeometry(0.8, 0.8, 0.05, 32);
            const waferMat = new THREE.MeshStandardMaterial({
                color: 0x6666ff,
                metalness: 0.8,
                roughness: 0.2,
                emissive: 0xff3300,
                emissiveIntensity: 0.3
            });
            const wafer = new THREE.Mesh(waferGeom, waferMat);
            wafer.position.set(-4 + i * 2, 3.5 + j * 0.5, 0);
            wafer.rotation.x = Math.PI / 2;
            furnace.add(wafer);
        }
    }

    // Gas inlet/outlet
    const gasInGeom = new THREE.CylinderGeometry(0.2, 0.2, 3, 8);
    const gasMat = new THREE.MeshStandardMaterial({
        color: 0x00ff00,
        metalness: 0.9,
        roughness: 0.1
    });
    const gasIn = new THREE.Mesh(gasInGeom, gasMat);
    gasIn.position.set(6, 5.5, 0);
    gasIn.rotation.z = Math.PI / 4;
    furnace.add(gasIn);

    const gasOut = new THREE.Mesh(gasInGeom, gasMat);
    gasOut.position.set(-6, 5.5, 0);
    gasOut.rotation.z = -Math.PI / 4;
    furnace.add(gasOut);

    // Thermocouple probes
    for (let i = 0; i < 3; i++) {
        const tcGeom = new THREE.CylinderGeometry(0.05, 0.05, 2, 8);
        const tcMat = new THREE.MeshStandardMaterial({
            color: 0xffaa00,
            metalness: 0.9
        });
        const tc = new THREE.Mesh(tcGeom, tcMat);
        tc.position.set(-3 + i * 3, 6, 0);
        furnace.add(tc);
    }

    // Heat shimmer effect (particles)
    const shimmerGeom = new THREE.PlaneGeometry(1, 1);
    const shimmerMat = new THREE.MeshBasicMaterial({
        color: 0xff6600,
        transparent: true,
        opacity: 0.2
    });
    const shimmerGroup = new THREE.Group();
    for (let i = 0; i < 20; i++) {
        const shimmer = new THREE.Mesh(shimmerGeom, shimmerMat);
        shimmer.position.set(
            (Math.random() - 0.5) * 12,
            4 + Math.random() * 2,
            (Math.random() - 0.5) * 3
        );
        shimmerGroup.add(shimmer);
    }
    furnace.add(shimmerGroup);

    scene.add(furnace);

    // Animation
    furnace.userData.animate = function(time) {
        // Heating coil intensity pulse
        const heatCycle = Math.sin(time * 1.5) * 0.5 + 0.5;
        coilGroup.children.forEach(coil => {
            coil.material.emissiveIntensity = 0.6 + heatCycle * 0.4;
        });

        // Window glow
        window1.material.emissiveIntensity = 0.8 + heatCycle * 0.4;

        // Temperature display flicker
        display.material.emissiveIntensity = 0.7 + Math.random() * 0.2;

        // Heat shimmer movement
        shimmerGroup.children.forEach((shimmer, i) => {
            shimmer.position.y += 0.02;
            if (shimmer.position.y > 8) {
                shimmer.position.y = 3;
            }
            shimmer.rotation.z += 0.01;
            shimmer.material.opacity = 0.1 + Math.sin(time * 3 + i) * 0.1;
        });

        // Wafers glow from heat
        furnace.children.forEach(child => {
            if (child.geometry && child.geometry.type === 'CylinderGeometry' && child.position.y > 3 && child.position.y < 5) {
                child.material.emissiveIntensity = 0.2 + heatCycle * 0.3;
            }
        });
    };

    return furnace;
}
