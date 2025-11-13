// 🌀 Spin coater for photoresist application
function createSpinCoater(scene, position) {
    const coater = new THREE.Group();
    coater.position.set(position.x, position.y, position.z);

    // Base unit
    const baseGeom = new THREE.CylinderGeometry(2.5, 3, 2, 8);
    const baseMat = new THREE.MeshStandardMaterial({
        color: 0x444444,
        metalness: 0.7,
        roughness: 0.4
    });
    const base = new THREE.Mesh(baseGeom, baseMat);
    base.position.y = 1;
    base.castShadow = true;
    coater.add(base);

    // Rotating platform (chuck)
    const chuckGeom = new THREE.CylinderGeometry(2, 2, 0.3, 32);
    const chuckMat = new THREE.MeshStandardMaterial({
        color: 0x00ff88,
        metalness: 0.9,
        roughness: 0.1,
        emissive: 0x002200
    });
    const chuck = new THREE.Mesh(chuckGeom, chuckMat);
    chuck.position.y = 2.5;
    chuck.castShadow = true;
    coater.add(chuck);

    // Wafer on chuck
    const waferGeom = new THREE.CylinderGeometry(1.9, 1.9, 0.1, 32);
    const waferMat = new THREE.MeshStandardMaterial({
        color: 0x8888ff,
        metalness: 0.9,
        roughness: 0.1
    });
    const wafer = new THREE.Mesh(waferGeom, waferMat);
    wafer.position.y = 2.7;
    coater.add(wafer);

    // Photoresist layer (being spun)
    const prGeom = new THREE.CylinderGeometry(1.95, 1.95, 0.02, 32);
    const prMat = new THREE.MeshStandardMaterial({
        color: 0xff00ff,
        metalness: 0.3,
        roughness: 0.7,
        emissive: 0x330033,
        transparent: true,
        opacity: 0.8
    });
    const prLayer = new THREE.Mesh(prGeom, prMat);
    prLayer.position.y = 2.75;
    coater.add(prLayer);

    // Dispenser nozzle
    const nozzleGeom = new THREE.CylinderGeometry(0.1, 0.2, 3, 8);
    const nozzleMat = new THREE.MeshStandardMaterial({
        color: 0xff6600,
        metalness: 0.8,
        roughness: 0.3
    });
    const nozzle = new THREE.Mesh(nozzleGeom, nozzleMat);
    nozzle.position.set(0, 5, 0);
    coater.add(nozzle);

    // PR droplet (when dispensing)
    const dropletGeom = new THREE.SphereGeometry(0.15, 16, 16);
    const dropletMat = new THREE.MeshStandardMaterial({
        color: 0xff00ff,
        metalness: 0.2,
        roughness: 0.8,
        transparent: true,
        opacity: 0.9
    });
    const droplet = new THREE.Mesh(dropletGeom, dropletMat);
    droplet.position.set(0, 3.5, 0);
    coater.add(droplet);

    // Motor housing
    const motorGeom = new THREE.CylinderGeometry(1, 1, 1, 12);
    const motorMat = new THREE.MeshStandardMaterial({
        color: 0x666666,
        metalness: 0.8,
        roughness: 0.3
    });
    const motor = new THREE.Mesh(motorGeom, motorMat);
    motor.position.y = 0.5;
    coater.add(motor);

    // Control panel
    const panelGeom = new THREE.BoxGeometry(1, 2, 0.5);
    const panelMat = new THREE.MeshStandardMaterial({
        color: 0x222222,
        metalness: 0.6,
        roughness: 0.5
    });
    const panel = new THREE.Mesh(panelGeom, panelMat);
    panel.position.set(-3, 2, 0);
    coater.add(panel);

    // Speed display
    const displayGeom = new THREE.PlaneGeometry(0.7, 0.4);
    const displayMat = new THREE.MeshStandardMaterial({
        color: 0x00ffff,
        emissive: 0x00ffff,
        emissiveIntensity: 0.8
    });
    const display = new THREE.Mesh(displayGeom, displayMat);
    display.position.set(-3, 2.5, 0.3);
    coater.add(display);

    // Vacuum ring
    const ringGeom = new THREE.TorusGeometry(1.7, 0.1, 8, 32);
    const ringMat = new THREE.MeshStandardMaterial({
        color: 0x888888,
        metalness: 0.9,
        roughness: 0.2
    });
    const vacRing = new THREE.Mesh(ringGeom, ringMat);
    vacRing.position.y = 2.4;
    vacRing.rotation.x = Math.PI / 2;
    coater.add(vacRing);

    // Containment bowl (splash guard)
    const bowlGeom = new THREE.CylinderGeometry(3, 2.5, 3, 32, 1, true);
    const bowlMat = new THREE.MeshStandardMaterial({
        color: 0x666666,
        metalness: 0.6,
        roughness: 0.4,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.3
    });
    const bowl = new THREE.Mesh(bowlGeom, bowlMat);
    bowl.position.y = 3.5;
    coater.add(bowl);

    // Status light
    const lightGeom = new THREE.SphereGeometry(0.2, 16, 16);
    const lightMat = new THREE.MeshStandardMaterial({
        color: 0x00ff00,
        emissive: 0x00ff00,
        emissiveIntensity: 1
    });
    const statusLight = new THREE.Mesh(lightGeom, lightMat);
    statusLight.position.set(-3, 3, 0.3);
    coater.add(statusLight);

    scene.add(coater);

    // Animation
    coater.userData.animate = function(time) {
        // Spin speed cycles: slow -> fast -> slow
        const cycle = Math.sin(time * 0.5);
        const spinSpeed = 2 + Math.abs(cycle) * 8; // 2-10 rps

        // Rotate chuck and wafer
        chuck.rotation.y += spinSpeed * 0.1;
        wafer.rotation.y = chuck.rotation.y;
        prLayer.rotation.y = chuck.rotation.y;
        vacRing.rotation.z = chuck.rotation.y;

        // PR layer thickness changes as it spreads
        const thickness = 0.02 - Math.abs(cycle) * 0.015;
        prLayer.scale.y = thickness / 0.02;
        prLayer.position.y = 2.75 + (0.02 - thickness) / 2;

        // PR spreads outward when spinning fast
        const spreadFactor = 1 + Math.abs(cycle) * 0.1;
        prLayer.scale.x = spreadFactor;
        prLayer.scale.z = spreadFactor;

        // Droplet falls during dispense phase
        if (cycle > 0.8) {
            droplet.visible = true;
            droplet.position.y = 5.5 - (cycle - 0.8) * 10;
            droplet.scale.setScalar(1 - (cycle - 0.8) * 5);
        } else {
            droplet.visible = false;
        }

        // Display shows RPM
        const rpm = Math.floor(spinSpeed * 60);
        display.material.emissiveIntensity = 0.6 + Math.abs(cycle) * 0.4;

        // Status light blinks during spin
        statusLight.material.emissiveIntensity = 0.5 + Math.abs(cycle) * 0.5;

        // Bowl vibrates slightly at high speed
        bowl.position.y = 3.5 + Math.sin(time * 20) * 0.02 * Math.abs(cycle);
    };

    return coater;
}
