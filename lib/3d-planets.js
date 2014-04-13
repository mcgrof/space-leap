function planet(scene, x, y, z, c, initial_pos_x) {
	this.scene = scene;
	this.geometry = new THREE.SphereGeometry(x, y, z );
	this.material = new THREE.MeshBasicMaterial( {color: c} );
	this.mesh = new THREE.Mesh(this.geometry, this.material);
	this.mesh.position.x = initial_pos_x;

	scene.add(this.mesh);
};
