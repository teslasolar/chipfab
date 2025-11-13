// ⚡ Plasma etching chamber for material removal
function createEtchingChamber(scene, position) {
    const chamber = new THREE.Group();
    chamber.position.set(position.x, position.y, position.z);

    // Main chamber body (cylinder)
    const bodyGeom = new THREE.CylinderGeometry(3, 3, 6, 32);
    const bodyMat = new THREE.MeshStandardMaterial({
        color: 0x555555,
        metalness: 0.9,
        roughness: 0.2
    });
    const body = new THREE.Mesh(bodyGeom, bodyMat);
    body.position.y = 3;
    body.castShadow = true;
    chamber.add(body);

    // Viewing window (transparent)
    const windowGeom = new THREE.RingGeometry(1, 2, 32);
    const windowMat = new THREE.MeshStandardMaterial({
        color: 0x00ffff,
        transparent: true,
        opacity: 0.3,
        side: THREE.DoubleSide,
        emissive: 0x00ffff,
        emissiveIntensity: 0.2
    });
    const window1 = new THREE.Mesh(windowGeom, windowMat);
    window1.rotation.y = Math.PI / 2;
    window1.position.set(3, 3, 0);
    chamber.add(window1);

    // Top dome
    const domeGeom = new THREE.SphereGeometry(3, 32, 16, 0, Math.PI * 2, 0, Math.PI / 2);
    const dome = new THREE.Mesh(domeGeom, bodyMat);
    dome.position.y = 6;
    dome.castShadow = true;
    chamber.add(dome);

    // Base platform
    const baseGeom = new THREE.CylinderGeometry(3.5, 4, 1, 8);
    const base = new THREE.Mesh(baseGeom, bodyMat);
    base.position.y = 0.5;
    chamber.add(base);

    // Wafer chuck inside
    const chuckGeom = new THREE.CylinderGeometry(2, 2, 0.5, 32);
    const chuckMat = new THREE.MeshStandardMaterial({
        color: 0x00ff00,
        metalness: 0.7,
        roughness: 0.4,
        emissive: 0x002200
    });
    const chuck = new THREE.Mesh(chuckGeom, chuckMat);
    chuck.position.y = 2;
    chamber.add(chuck);

    // Wafer being etched
    const waferGeom = new THREE.CylinderGeometry(1.8, 1.8, 0.1, 32);
    const waferMat = new THREE.MeshStandardMaterial({
        color: 0x6666ff,
        metalness: 0.8,
        roughness: 0.2
    });
    const wafer = new THREE.Mesh(waferGeom, waferMat);
    wafer.position.y = 2.5;
    chamber.add(wafer);

    // Plasma glow (when etching active)
    const plasmaGeom = new THREE.CylinderGeometry(2.5, 2.5, 3, 32, 1, true);
    const plasmaMat = new THREE.MeshBasicMaterial({
        color: 0xff00ff,
        transparent: true,
        opacity: 0.4,
        side: THREE.DoubleSide
    });
    const plasma = new THREE.Mesh(plasmaGeom, plasmaMat);
    plasma.position.y = 3.5;
    chamber.add(plasma);

    // Gas inlet pipes
    for (let i = 0; i < 3; i++) {
        const pipeGeom = new THREE.CylinderGeometry(0.15, 0.15, 2, 8);
        const pipeMat = new THREE.MeshStandardMaterial({
            color: 0x888888,
            metalness: 0.9,
            roughness: 0.1
        });
        const pipe = new THREE.Mesh(pipeGeom, pipeMat);
        const angle = (i / 3) * Math.PI * 2;
        pipe.position.set(Math.cos(angle) * 3.5, 5, Math.sin(angle) * 3.5);
        pipe.rotation.z = Math.PI / 2;
        pipe.rotation.y = angle;
        chamber.add(pipe);
    }

    // Exhaust pump
    const pumpGeom = new THREE.CylinderGeometry(0.5, 0.7, 2, 8);
    const pumpMat = new THREE.MeshStandardMaterial({
        color: 0xff6600,
        metalness: 0.7,
        roughness: 0.3
    });
    const pump = new THREE.Mesh(pumpGeom, pumpMat);
    pump.position.set(0, 0, 4);
    chamber.add(pump);

    // RF coil (for plasma generation)
    const coilGroup = new THREE.Group();
    for (let i = 0; i < 8; i++) {
        const coilRingGeom = new THREE.TorusGeometry(2.2, 0.1, 8, 32);
        const coilMat = new THREE.MeshStandardMaterial({
            color: 0xffaa00,
            metalness: 0.9,
            roughness: 0.1,
            emissive: 0xff6600,
            emissiveIntensity: 0.3
        });
        const coilRing = new THREE.Mesh(coilRingGeom, coilMat);
        coilRing.position.y = 4 + i * 0.3;
        coilRing.rotation.x = Math.PI / 2;
        coilGroup.add(coilRing);
    }
    chamber.add(coilGroup);

    // Status indicators
    const indicators = [
        { color: 0x00ff00, label: 'POWER' },
        { color: 0xff0000, label: 'PLASMA' },
        { color: 0x0000ff, label: 'VACUUM' }
    ];

    indicators.forEach((ind, i) => {
        const indGeom = new THREE.BoxGeometry(0.3, 0.3, 0.1);
        const indMat = new THREE.MeshStandardMaterial({
            color: ind.color,
            emissive: ind.color,
            emissiveIntensity: 0.8
        });
        const indicator = new THREE.Mesh(indGeom, indMat);
        indicator.position.set(-4, 5 - i * 0.5, 0);
        chamber.add(indicator);
    });

    scene.add(chamber);

    // Animation
    chamber.userData.animate = function(time) {
        // Plasma pulsing effect
        const plasmaPulse = Math.sin(time * 4) * 0.5 + 0.5;
        plasma.material.opacity = 0.3 * plasmaPulse;
        plasma.scale.x = 1 + plasmaPulse * 0.1;
        plasma.scale.z = 1 + plasmaPulse * 0.1;

        // Coil glow during etching
        coilGroup.children.forEach((coil, i) => {
            coil.material.emissiveIntensity = 0.3 + plasmaPulse * 0.5;
            coil.rotation.z = time * 2 + i * 0.5;
        });

        // Wafer surface being etched (slight scale change)
        wafer.scale.y = 1 - Math.sin(time * 0.5) * 0.1;

        // Chuck heats up (color shift)
        chuck.material.emissiveIntensity = plasmaPulse * 0.3;

        // Window glow
        window1.material.emissiveIntensity = 0.2 + plasmaPulse * 0.3;
    };

    return chamber;
}
