/*
 * This is based on https://github.com/openleap/Three.leapControls but
 * created to be a library for space, star stuff.
 */
function stars(scene, vertices, img) {
	var particles, parameters, i, size, color;
	this.materials = [];
	this.geometry = new THREE.Geometry();
	for (i = 0; i < vertices; i ++ ) {
		var vertex = new THREE.Vector3();
		vertex.x = Math.random() * 2000 - 1000;
		vertex.y = Math.random() * 2000 - 1000;
		vertex.z = Math.random() * 2000 - 1000;
		this.geometry.vertices.push(vertex);
	}

	/*
	 * These are all the different star size possiblities we
	 * can use to create star stuff
	 */
	parameters = [
		       [ [  1.0,   1.0,   1.0  ], 5 ],
		       [ [  0.95,  1,     1    ], 4 ],
		       [ [  0.90,  1,     1    ], 3 ],
		       [ [  0.85,  1,     1    ], 2 ],
		       [ [  0.80,  1,     1    ], 1 ]
	];

	/*
	 * Each star gets multiplexed onto *each* single vertex on the
	 * geometric space.
	 */
	for (i = 0; i < parameters.length; i ++) {
		size  = parameters[i][1];
		color = parameters[i][0];
		this.materials[i] = new THREE.ParticleBasicMaterial(
			{
				size: size,
				map: THREE.ImageUtils.loadTexture(img),
				blending: THREE.AdditiveBlending,
				transparent: true,
				depthWrite: false,
		} );
		this.materials[i].color.setHSL( color[0], color[1], color[2] );
		particles = new THREE.ParticleSystem(this.geometry,
						     this.materials[i]);

		particles.rotation.x = Math.random() * 6;
		particles.rotation.y = Math.random() * 6;
		particles.rotation.z = Math.random() * 6;

		scene.add( particles );
	}

	scene.add(this.mesh);
};
