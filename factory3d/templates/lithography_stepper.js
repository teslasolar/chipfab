// 📏 Lithography stepper for UV pattern exposure
function createLithographyStepper(scene, position) {
    const stepper = new THREE.Group();
    stepper.position.set(position.x, position.y, position.z);

    // Base frame
    const frameGeom = new THREE.BoxGeometry(8, 2, 8);
    const frameMat = new THREE.MeshStandardMaterial({
        color: 0x444444,
        metalness: 0.7,
        roughness: 0.4
    });
    const frame = new THREE.Mesh(frameGeom, frameMat);
    frame.position.y = 1;
    frame.castShadow = true;
    stepper.add(frame);

    // Vertical columns
    const columnGeom = new THREE.BoxGeometry(0.5, 10, 0.5);
    const columnMat = new THREE.MeshStandardMaterial({
        color: 0x666666,
        metalness: 0.8,
        roughness: 0.3
    });

    for (let i = 0; i < 4; i++) {
        const column = new THREE.Mesh(columnGeom, columnMat);
        const angle = (i / 4) * Math.PI * 2;
        column.position.set(Math.cos(angle) * 3, 7, Math.sin(angle) * 3);
        column.castShadow = true;
        stepper.add(column);
    }

    // Wafer stage (moves in X-Y)
    const stageGeom = new THREE.CylinderGeometry(3, 3, 0.5, 32);
    const stageMat = new THREE.MeshStandardMaterial({
        color: 0x00ffff,
        metalness: 0.8,
        roughness: 0.2,
        emissive: 0x003333
    });
    const stage = new THREE.Mesh(stageGeom, stageMat);
    stage.position.y = 3;
    stage.castShadow = true;
    stepper.add(stage);

    // Wafer on stage
    const waferGeom = new THREE.CylinderGeometry(2, 2, 0.1, 32);
    const waferMat = new THREE.MeshStandardMaterial({
        color: 0x8888ff,
        metalness: 0.9,
        roughness: 0.1
    });
    const wafer = new THREE.Mesh(waferGeom, waferMat);
    wafer.position.y = 3.5;
    stepper.add(wafer);

    // Photoresist layer (glowing)
    const prGeom = new THREE.CylinderGeometry(2.01, 2.01, 0.05, 32);
    const prMat = new THREE.MeshStandardMaterial({
        color: 0xff00ff,
        metalness: 0.5,
        roughness: 0.3,
        emissive: 0x330033,
        transparent: true,
        opacity: 0.7
    });
    const prLayer = new THREE.Mesh(prGeom, prMat);
    prLayer.position.y = 3.55;
    stepper.add(prLayer);

    // Mask holder (top assembly)
    const maskHolderGeom = new THREE.BoxGeometry(5, 1, 5);
    const maskHolderMat = new THREE.MeshStandardMaterial({
        color: 0x333333,
        metalness: 0.8,
        roughness: 0.3
    });
    const maskHolder = new THREE.Mesh(maskHolderGeom, maskHolderMat);
    maskHolder.position.y = 10;
    maskHolder.castShadow = true;
    stepper.add(maskHolder);

    // Photomask (transparent with pattern)
    const maskGeom = new THREE.BoxGeometry(4, 0.2, 4);
    const maskMat = new THREE.MeshStandardMaterial({
        color: 0xaaaaaa,
        metalness: 0.3,
        roughness: 0.7,
        transparent: true,
        opacity: 0.5
    });
    const mask = new THREE.Mesh(maskGeom, maskMat);
    mask.position.y = 9;
    stepper.add(mask);

    // UV light source
    const uvLightGeom = new THREE.CylinderGeometry(1.5, 1.5, 0.5, 16);
    const uvLightMat = new THREE.MeshStandardMaterial({
        color: 0x8800ff,
        emissive: 0x8800ff,
        emissiveIntensity: 0.8
    });
    const uvLight = new THREE.Mesh(uvLightGeom, uvLightMat);
    uvLight.position.y = 11;
    stepper.add(uvLight);

    // UV beam (when exposing)
    const beamGeom = new THREE.CylinderGeometry(2, 2, 6, 16, 1, true);
    const beamMat = new THREE.MeshBasicMaterial({
        color: 0x8800ff,
        transparent: true,
        opacity: 0.3,
        side: THREE.DoubleSide
    });
    const beam = new THREE.Mesh(beamGeom, beamMat);
    beam.position.y = 7;
    stepper.add(beam);

    // Alignment markers
    for (let i = 0; i < 4; i++) {
        const markerGeom = new THREE.BoxGeometry(0.2, 0.2, 0.2);
        const markerMat = new THREE.MeshStandardMaterial({
            color: 0xff0000,
            emissive: 0xff0000,
            emissiveIntensity: 1
        });
        const marker = new THREE.Mesh(markerGeom, markerMat);
        const angle = (i / 4) * Math.PI * 2;
        marker.position.set(Math.cos(angle) * 1.5, 3.6, Math.sin(angle) * 1.5);
        stepper.add(marker);
    }

    scene.add(stepper);

    // Animation
    stepper.userData.animate = function(time) {
        // Stage moves in stepper motion (X-Y scanning)
        stage.position.x = Math.sin(time * 0.5) * 0.5;
        stage.position.z = Math.cos(time * 0.3) * 0.5;
        wafer.position.x = stage.position.x;
        wafer.position.z = stage.position.z;
        prLayer.position.x = stage.position.x;
        prLayer.position.z = stage.position.z;

        // Mask lowers during exposure
        const exposure = Math.sin(time * 0.7);
        mask.position.y = 9 - Math.max(0, exposure) * 2;
        maskHolder.position.y = 10 - Math.max(0, exposure) * 2;

        // UV light pulses during exposure
        if (exposure > 0) {
            uvLight.material.emissiveIntensity = 0.8 + exposure * 0.5;
            beam.material.opacity = 0.3 * exposure;
            prLayer.material.emissiveIntensity = exposure * 0.5;
        } else {
            uvLight.material.emissiveIntensity = 0.3;
            beam.material.opacity = 0;
            prLayer.material.emissiveIntensity = 0;
        }

        // Wafer rotates slightly for alignment
        wafer.rotation.y += 0.002;
        prLayer.rotation.y = wafer.rotation.y;
    };

    return stepper;
}
