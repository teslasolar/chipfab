// 🧠 Test station with probe card and AI analysis
function createTestStation(scene, position) {
    const station = new THREE.Group();
    station.position.set(position.x, position.y, position.z);

    // Base platform
    const baseGeom = new THREE.BoxGeometry(6, 2, 6);
    const baseMat = new THREE.MeshStandardMaterial({
        color: 0x333333,
        metalness: 0.7,
        roughness: 0.4
    });
    const base = new THREE.Mesh(baseGeom, baseMat);
    base.position.y = 1;
    base.castShadow = true;
    station.add(base);

    // Wafer chuck (moves in X-Y-Z)
    const chuckGeom = new THREE.CylinderGeometry(2, 2, 0.5, 32);
    const chuckMat = new THREE.MeshStandardMaterial({
        color: 0x666666,
        metalness: 0.8,
        roughness: 0.3
    });
    const chuck = new THREE.Mesh(chuckGeom, chuckMat);
    chuck.position.y = 3;
    chuck.castShadow = true;
    station.add(chuck);

    // Wafer being tested
    const waferGeom = new THREE.CylinderGeometry(1.9, 1.9, 0.1, 32);
    const waferMat = new THREE.MeshStandardMaterial({
        color: 0x4444ff,
        metalness: 0.9,
        roughness: 0.1
    });
    const wafer = new THREE.Mesh(waferGeom, waferMat);
    wafer.position.y = 3.5;
    station.add(wafer);

    // Die grid on wafer (individual chips)
    const dieGroup = new THREE.Group();
    for (let i = -2; i <= 2; i++) {
        for (let j = -2; j <= 2; j++) {
            const dieGeom = new THREE.BoxGeometry(0.3, 0.01, 0.3);
            const dieMat = new THREE.MeshStandardMaterial({
                color: 0x00ff00,
                emissive: 0x00ff00,
                emissiveIntensity: 0.3,
                metalness: 0.7
            });
            const die = new THREE.Mesh(dieGeom, dieMat);
            die.position.set(i * 0.35, 3.6, j * 0.35);
            die.userData.good = Math.random() > 0.4; // 60% yield
            if (!die.userData.good) {
                die.material.color.set(0xff0000);
                die.material.emissive.set(0xff0000);
            }
            dieGroup.add(die);
        }
    }
    station.add(dieGroup);

    // Probe card holder (top assembly)
    const holderGeom = new THREE.BoxGeometry(4, 1, 4);
    const holderMat = new THREE.MeshStandardMaterial({
        color: 0x444444,
        metalness: 0.8,
        roughness: 0.3
    });
    const holder = new THREE.Mesh(holderGeom, holderMat);
    holder.position.y = 8;
    holder.castShadow = true;
    station.add(holder);

    // Probe card with needles
    const probeGroup = new THREE.Group();
    probeGroup.position.y = 7;

    // Create probe needles
    for (let i = 0; i < 16; i++) {
        const angle = (i / 16) * Math.PI * 2;
        const radius = 1.2;

        const needleGeom = new THREE.CylinderGeometry(0.02, 0.01, 2, 8);
        const needleMat = new THREE.MeshStandardMaterial({
            color: 0xffaa00,
            metalness: 0.9,
            roughness: 0.1
        });
        const needle = new THREE.Mesh(needleGeom, needleMat);
        needle.position.set(Math.cos(angle) * radius, -1, Math.sin(angle) * radius);
        needle.userData.angle = angle;
        probeGroup.add(needle);
    }
    station.add(probeGroup);

    // Microscope/camera
    const cameraGeom = new THREE.CylinderGeometry(0.5, 0.7, 1.5, 16);
    const cameraMat = new THREE.MeshStandardMaterial({
        color: 0x222222,
        metalness: 0.8,
        roughness: 0.3
    });
    const camera = new THREE.Mesh(cameraGeom, cameraMat);
    camera.position.set(0, 10, 0);
    camera.rotation.x = Math.PI;
    station.add(camera);

    // Camera lens
    const lensGeom = new THREE.CylinderGeometry(0.3, 0.3, 0.3, 32);
    const lensMat = new THREE.MeshStandardMaterial({
        color: 0x000088,
        metalness: 0.9,
        roughness: 0.05,
        emissive: 0x0000ff,
        emissiveIntensity: 0.3
    });
    const lens = new THREE.Mesh(lensGeom, lensMat);
    lens.position.y = 9;
    station.add(lens);

    // AI analysis display
    const displayGeom = new THREE.PlaneGeometry(2, 1.5);
    const displayMat = new THREE.MeshStandardMaterial({
        color: 0x00ff00,
        emissive: 0x00ff00,
        emissiveIntensity: 0.5
    });
    const display = new THREE.Mesh(displayGeom, displayMat);
    display.position.set(-4, 5, 0);
    display.rotation.y = Math.PI / 4;
    station.add(display);

    // Signal analyzer box
    const analyzerGeom = new THREE.BoxGeometry(2, 3, 2);
    const analyzerMat = new THREE.MeshStandardMaterial({
        color: 0x444444,
        metalness: 0.6,
        roughness: 0.5
    });
    const analyzer = new THREE.Mesh(analyzerGeom, analyzerMat);
    analyzer.position.set(4, 2.5, 0);
    station.add(analyzer);

    // Waveform display on analyzer
    const waveformGeom = new THREE.PlaneGeometry(1.5, 1);
    const waveformMat = new THREE.MeshStandardMaterial({
        color: 0x00ffff,
        emissive: 0x00ffff,
        emissiveIntensity: 0.6
    });
    const waveform = new THREE.Mesh(waveformGeom, waveformMat);
    waveform.position.set(4, 3, 1.1);
    station.add(waveform);

    // Status indicators
    const indicators = [
        { color: 0x00ff00, pos: [4, 2, 1.1] },
        { color: 0xff0000, pos: [4, 1.5, 1.1] },
        { color: 0x0000ff, pos: [4, 1, 1.1] }
    ];

    indicators.forEach(ind => {
        const indGeom = new THREE.BoxGeometry(0.3, 0.2, 0.1);
        const indMat = new THREE.MeshStandardMaterial({
            color: ind.color,
            emissive: ind.color,
            emissiveIntensity: 0.8
        });
        const indicator = new THREE.Mesh(indGeom, indMat);
        indicator.position.set(...ind.pos);
        station.add(indicator);
    });

    // Test probes (cables)
    for (let i = 0; i < 4; i++) {
        const cableGeom = new THREE.CylinderGeometry(0.05, 0.05, 3, 8);
        const cableMat = new THREE.MeshStandardMaterial({
            color: [0xff0000, 0x00ff00, 0x0000ff, 0xffff00][i],
            metalness: 0.3,
            roughness: 0.7
        });
        const cable = new THREE.Mesh(cableGeom, cableMat);
        cable.position.set(-2 + i, 3, 4);
        cable.rotation.x = Math.PI / 4;
        station.add(cable);
    }

    scene.add(station);

    // Animation
    station.userData.animate = function(time) {
        // Chuck moves for die-to-die stepping
        chuck.position.x = Math.sin(time * 0.3) * 0.5;
        chuck.position.z = Math.cos(time * 0.3) * 0.5;
        wafer.position.x = chuck.position.x;
        wafer.position.z = chuck.position.z;
        dieGroup.position.x = chuck.position.x;
        dieGroup.position.z = chuck.position.z;

        // Probes lower to contact wafer
        const contactCycle = Math.sin(time * 0.8);
        const probeHeight = 7 - Math.max(0, contactCycle) * 2;
        probeGroup.position.y = probeHeight;

        // Probe needles vibrate when in contact
        if (contactCycle > 0) {
            probeGroup.children.forEach((needle, i) => {
                needle.position.y = -1 + Math.sin(time * 10 + i) * 0.02;
            });
        }

        // Test dies in sequence
        const currentDie = Math.floor((time * 2) % dieGroup.children.length);
        dieGroup.children.forEach((die, i) => {
            if (i === currentDie && contactCycle > 0) {
                die.material.emissiveIntensity = 1;
                // Flash red/green based on pass/fail
                if (die.userData.good) {
                    die.material.emissive.setHex(0x00ff00);
                } else {
                    die.material.emissive.setHex(0xff0000);
                }
            } else {
                die.material.emissiveIntensity = 0.2;
            }
        });

        // Camera focus (lens movement)
        lens.position.y = 9 + Math.sin(time * 1.5) * 0.1;
        lens.material.emissiveIntensity = 0.3 + Math.abs(contactCycle) * 0.3;

        // Display shows AI analysis
        display.material.emissiveIntensity = 0.4 + Math.sin(time * 4) * 0.2;

        // Waveform oscillates
        waveform.material.emissiveIntensity = 0.5 + Math.sin(time * 8) * 0.3;

        // Analyzer indicators blink
        indicators.forEach((ind, i) => {
            const blink = Math.sin(time * 5 + i * 2) > 0;
            station.children.forEach(child => {
                if (child.position.equals(new THREE.Vector3(...ind.pos))) {
                    child.material.emissiveIntensity = blink ? 1 : 0.3;
                }
            });
        });
    };

    return station;
}
