/*
 * This is inspired on the example work by Robbie Tilton [0] leapmotion
 * example code posted on codepen.io [1]. According to codepen.io's licensing
 * page [2] all public code posted on codepen.io is licensed under the MIT
 * license. They apply the license to the code automatically when you view
 * an example code * (what they call a "pen") in its "Full Page" view.
 *
 * We at space-leap have modified modified Robbie's code to fit into a
 * library form, be dynamic and to address the cross domain issue on Chrome.
 *
 * [0] http://www.robbietilton.com/
 * [1] http://codepen.io/leapmotion/full/cEilz
 * [2] http://blog.codepen.io/legal/licensing/
 */
function focus_star(scene_zoom, img_sur_src, img_atm_src) {
	this.image_surface = new Image();
	this.image_atmosphere = new Image();

	this.image_surface_src = img_sur_src;
	this.image_atmosphere_src = img_atm_src;

	this.star = null;

	/* map function to be used to map values from leap into proper degrees (0-360) */
        this.map = function(value, inputMin, inputMax, outputMin, outputMax){
		outVal = ((value - inputMin) / (inputMax - inputMin) * (outputMax - outputMin) + outputMin);
		if(outVal >  outputMax){
			outVal = outputMax;
		}
		if(outVal <  outputMin){
			outVal = outputMin;
		}
		return outVal;
	}
	  
	this.redo = function redo(){
		/* add camera */
		WIDTH      = window.innerWidth,
		HEIGHT     = window.innerHeight,
		VIEW_ANGLE = 45,
		ASPECT     = WIDTH / HEIGHT,
		NEAR       = 0.1,
		FAR        = 10000
		window.camera = new THREE.PerspectiveCamera( VIEW_ANGLE, ASPECT, NEAR, FAR );
		camera.lookAt(scene_zoom.position)
		camera.position.set( 0, 0, 290 )
		/* console.log(camera); */
		document.body.appendChild(renderer.domElement);
		fov = camera.fov;

		/* create a Directional light as pretend sunshine. */
		directional = new THREE.DirectionalLight( 0xCCCCCC, 1.2 )
		directional.castShadow = true
		directional.position.set( 100, 200, 300 )
		directional.target.position.copy( new THREE.Vector3(0,0,0) )
		directional.shadowCameraTop     =  1000
		directional.shadowCameraRight   =  1000
		directional.shadowCameraBottom  = -1000
		directional.shadowCameraLeft    = -1000
		directional.shadowCameraNear    =  600
		directional.shadowCameraFar     = -600
		directional.shadowBias          =   -0.0001
		directional.shadowDarkness      =    0.4
		directional.shadowMapWidth      = directional.shadowMapHeight = 2048
		scene_zoom.add(directional)


		window.ambient = new THREE.AmbientLight( 0x666666 )
		scene_zoom.add(ambient)

		this.image_surface.crossOrigin = "anonymous";
		this.image_surface.src = this.image_surface_src;
		this.image_surface_load = function() {

			/* star object */
			var star_bump_image = THREE.ImageUtils.loadTexture(this.image_surface_src);
			var geometry = new THREE.SphereGeometry(50, 40, 40)

			/* atmosphere object */
			this.image_atmosphere.crossOrigin = "anonymous";
			this.image_atmosphere.src = this.image_atmosphere_src;
			this.image_atmosphere_load = function() {

			/* this blends the two together */
			var material = new THREE.MeshPhongMaterial( {
					map: THREE.ImageUtils.loadTexture(this.image_atmosphere_src),
			    		ambient: 0x050505,
			    		color: 0xFFFFFF,
			    		specular: 0x555555,
			    		bumpMap: star_bump_image,
			    		bumpScale: 19,
			    		metal: true } );
			window.star = new THREE.Mesh(geometry, material);
			scene_zoom.add(star);
			this.star = window.star;
			}
		}
		this.image_surface_src = img_sur_src;
		this.image_atmosphere_src = img_atm_src;

		this.image_surface.onload = this.image_surface_load();
		this.image_atmosphere.onload = this.image_atmosphere_load();
	}
};
