// 🤖 Wafer handling robot with articulated arm
function createWaferRobot(scene, position) {
    const robot = new THREE.Group();
    robot.position.set(position.x, position.y, position.z);

    // Base platform
    const baseGeom = new THREE.CylinderGeometry(2, 2.5, 1, 8);
    const baseMat = new THREE.MeshStandardMaterial({
        color: 0x333333,
        metalness: 0.8,
        roughness: 0.3
    });
    const base = new THREE.Mesh(baseGeom, baseMat);
    base.position.y = 0.5;
    base.castShadow = true;
    robot.add(base);

    // Rotating column
    const columnGeom = new THREE.CylinderGeometry(0.8, 0.8, 8, 12);
    const columnMat = new THREE.MeshStandardMaterial({
        color: 0x00ff00,
        metalness: 0.6,
        roughness: 0.4,
        emissive: 0x002200
    });
    const column = new THREE.Mesh(columnGeom, columnMat);
    column.position.y = 5;
    column.castShadow = true;
    robot.add(column);

    // Shoulder joint
    const shoulderGeom = new THREE.SphereGeometry(1, 16, 16);
    const shoulderMat = new THREE.MeshStandardMaterial({
        color: 0x666666,
        metalness: 0.9,
        roughness: 0.2
    });
    const shoulder = new THREE.Mesh(shoulderGeom, shoulderMat);
    shoulder.position.y = 9;
    robot.add(shoulder);

    // Upper arm
    const upperArmGeom = new THREE.BoxGeometry(1, 6, 1);
    const armMat = new THREE.MeshStandardMaterial({
        color: 0x00aaff,
        metalness: 0.7,
        roughness: 0.3
    });
    const upperArm = new THREE.Mesh(upperArmGeom, armMat);
    upperArm.position.set(0, 12, 0);
    upperArm.castShadow = true;
    robot.add(upperArm);

    // Elbow joint
    const elbowGeom = new THREE.SphereGeometry(0.7, 12, 12);
    const elbow = new THREE.Mesh(elbowGeom, shoulderMat);
    elbow.position.y = 15;
    robot.add(elbow);

    // Lower arm (wafer gripper)
    const lowerArmGeom = new THREE.BoxGeometry(0.8, 4, 0.8);
    const lowerArm = new THREE.Mesh(lowerArmGeom, armMat);
    lowerArm.position.set(0, 17, 0);
    lowerArm.castShadow = true;
    robot.add(lowerArm);

    // Wafer gripper (end effector)
    const gripperGroup = new THREE.Group();
    const gripperGeom = new THREE.BoxGeometry(0.3, 1, 3);
    const gripperMat = new THREE.MeshStandardMaterial({
        color: 0xff6600,
        metalness: 0.8,
        roughness: 0.2
    });

    const gripper1 = new THREE.Mesh(gripperGeom, gripperMat);
    gripper1.position.set(-0.5, 19, 0);
    gripperGroup.add(gripper1);

    const gripper2 = new THREE.Mesh(gripperGeom, gripperMat);
    gripper2.position.set(0.5, 19, 0);
    gripperGroup.add(gripper2);

    robot.add(gripperGroup);

    // Wafer (when held)
    const waferGeom = new THREE.CylinderGeometry(2, 2, 0.1, 32);
    const waferMat = new THREE.MeshStandardMaterial({
        color: 0x8888ff,
        metalness: 0.9,
        roughness: 0.1,
        emissive: 0x000044
    });
    const wafer = new THREE.Mesh(waferGeom, waferMat);
    wafer.rotation.x = Math.PI / 2;
    wafer.position.set(0, 19.5, 0);
    robot.add(wafer);

    // Status light
    const lightGeom = new THREE.SphereGeometry(0.3, 16, 16);
    const lightMat = new THREE.MeshStandardMaterial({
        color: 0x00ff00,
        emissive: 0x00ff00,
        emissiveIntensity: 1
    });
    const statusLight = new THREE.Mesh(lightGeom, lightMat);
    statusLight.position.set(0, 10, 1.5);
    robot.add(statusLight);

    scene.add(robot);

    // Animation function
    robot.userData.animate = function(time) {
        // Rotate base slowly
        column.rotation.y = Math.sin(time * 0.5) * 0.3;

        // Arm movement (picking/placing)
        upperArm.rotation.z = Math.sin(time * 0.8) * 0.2;
        lowerArm.rotation.z = Math.cos(time * 0.8) * 0.15;

        // Gripper open/close
        gripper1.position.x = -0.5 - Math.sin(time * 2) * 0.2;
        gripper2.position.x = 0.5 + Math.sin(time * 2) * 0.2;

        // Wafer moves with gripper
        wafer.position.y = 19.5 + Math.sin(time * 0.8) * 1;

        // Status light blink
        statusLight.material.emissiveIntensity = 0.5 + Math.sin(time * 5) * 0.5;
    };

    return robot;
}
