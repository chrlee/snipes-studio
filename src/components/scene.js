import React from "react"
import * as THREE from "three"

import { noise } from "./perlin";

class Scene extends React.Component {

  componentDidMount() {
    this.scene = new THREE.Scene()
    //this.scene.background = new THREE.Color( 0xffffff );
    //this.camera = new THREE.PerspectiveCamera(75, this.mount.offsetWidth/this.mount.offsetHeight, 0.1, 1000)


    this.mouseVector = new THREE.Vector3();
    this.raycaster = new THREE.Raycaster();

    this.w = this.mount.clientWidth
    this.h = this.mount.clientHeight
    this.viewSize = this.h
    this.aspectRatio = this.w / this.h

    const _viewport = {
        viewSize: this.viewSize,
        aspectRatio: this.aspectRatio,
        left: (-this.aspectRatio * this.viewSize) / 2,
        right: (this.aspectRatio * this.viewSize) / 2,
        top: this.viewSize / 2,
        bottom: -this.viewSize / 2,
        near: 0,
        far: 300
    }

    this.camera = new THREE.OrthographicCamera ( 
        _viewport.left / 20, 
        _viewport.right / 20, 
        _viewport.top / 20, 
        _viewport.bottom / 20, 
        _viewport.near, 
        _viewport.far 
    )

    this.renderer = window.WebGLRenderingContext ? new THREE.WebGLRenderer({ alpha: true }) : new THREE.CanvasRenderer()
    this.renderer.setSize(this.w, this.h)
    this.renderer.setClearColor( 0xffffff, 0 )
    this.mount.appendChild(this.renderer.domElement)

    const controls = this.initControls()

    //const geometry = new THREE.BoxGeometry();
    //const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 })
    //const cube = new THREE.Mesh(geometry, material)
    //scene.add(cube)

    let scale = this.w < 1024 ? this.w/1024 : 1
    let terrainSize = Math.ceil(19*Math.pow(scale, 2)) + 11
    let segments = Math.ceil(50*Math.pow(scale, 2)) + 25

    const geometry = new THREE.PlaneBufferGeometry(terrainSize, terrainSize, segments, segments)
    const meshPhong = new THREE.MeshPhongMaterial({color: "black", specular: "gray", shininess: 3, flatShading: false, side: THREE.DoubleSide, wireframe: true})

    noise.seed(Math.random());
    let pos = geometry.getAttribute("position");
    let pa = pos.array;
    const hVerts = geometry.parameters.heightSegments + 1;
    const wVerts = geometry.parameters.widthSegments + 1;
    for (let j = 0; j < hVerts; j++) {
      for (let i = 0; i < wVerts; i++) {
        const ex = 1.1;
        pa[3 * (j * wVerts + i) + 2] =
          (noise.simplex2(i / 100, j / 100) +
            noise.simplex2((i + 200) / 50, j / 50) * Math.pow(ex, 1) +
            noise.simplex2((i + 400) / 25, j / 25) * Math.pow(ex, 2) +
            noise.simplex2((i + 600) / 12.5, j / 12.5) * Math.pow(ex, 3) +
            +(noise.simplex2((i + 800) / 6.25, j / 6.25) * Math.pow(ex, 4))) /
          2;
      }
    }
    pos.needsUpdate = true;

    const meshGroup = new THREE.Group()
    const terrain = new THREE.Mesh(geometry, meshPhong)
    //terrain.rotation.setFromVector3(new THREE.Vector3(-Math.PI / 2.8, 0, 0))
    meshGroup.add(terrain)

    var ambientLight = new THREE.AmbientLight(0xffffff, 0.3)
    ambientLight.position.set(0, 4, 0)
    this.scene.add(ambientLight)

    var dirLight = new THREE.DirectionalLight(0xffffff, 0.5)
    this.scene.add(dirLight)

    
    var light1 = new THREE.PointLight(0xffcc77, 0.5, 100);
    light1.position.set(-6, 3, -6)
    this.scene.add(light1);

    var light2 = new THREE.PointLight(0xffcc77, 0.5, 100);
    light2.position.set(6, 3, 6)
    this.scene.add(light2);

    const loader = new THREE.FontLoader();

    loader.load( 'https://threejs.org/examples/fonts/helvetiker_regular.typeface.json', function ( font ) {
      let textSize = 2
      let textHeight = 0.2
      const textGeometry = new THREE.TextGeometry( 'perlin noise', {
        font: font,
        size: textSize,
        height: textHeight,
        curveSegments: 1,
        bevelEnabled: false,
        bevelThickness: 0.1,
        bevelSize: .8,
        bevelOffset: 0,
        bevelSegments: 5
      } );
      textGeometry.center()
      textGeometry.computeBoundingBox()
  
      const textPhong = new THREE.MeshPhongMaterial({
        color: "hotpink",
        specular: "black", 
        shininess: 3, 
        flatShading: false, 
        side: THREE.DoubleSide, 
        wireframe: true,
        transparent: true,
        opacity: 0.5
      })
      const textMesh = new THREE.Mesh(textGeometry, textPhong)
      textMesh.scale.set(scale, scale, scale)
      textMesh.rotation.setFromVector3(new THREE.Vector3(Math.PI/2, Math.PI, 0))
      let box = new THREE.Box3().setFromObject( textMesh );
      textMesh.position.x += ((terrainSize - (box.max.x - box.min.x) - (1*scale)) / 2)
      textMesh.position.y -= (terrainSize) / 2
      textMesh.position.z -= (box.max.z - box.min.z + (2/Math.sqrt(scale)))/2

      meshGroup.add(textMesh)
    } );
    
    this.camera.position.z = -100
    this.camera.position.x = 0
    this.camera.position.y = 0

    meshGroup.rotation.setFromVector3(new THREE.Vector3(-Math.PI / 2.8, 0, 0 ))
    meshGroup.scale.set(Math.pow(scale, 0.2), Math.pow(scale, 0.2), Math.pow(scale, 0.2))

    this.scene.add(meshGroup)

    this.animate = function () {
      requestAnimationFrame(this.animate.bind(this))
      meshGroup.rotation.z += 0.0008
      controls.update();
      this.renderer.render(this.scene, this.camera)
    }

    this.animate()

    window.addEventListener('resize', this.onWindowResize.bind(this), false)
    document.getElementsByTagName("canvas")[0].addEventListener('mousedown', this.onMouseDown.bind(this), false)
  }

  onWindowResize() {
    if (this.mount) {
        /*
      this.camera.aspect = this.mount.offsetWidth / this.mount.offsetHeight
      this.camera.updateProjectionMatrix()
      this.renderer.setSize(this.mount.offsetWidth, this.mount.offsetHeight)
        */
      this.w = this.mount.clientWidth
      this.h = this.mount.clientHeight
      this.aspectRatio = this.w / this.h
      this.camera.left = (-this.aspectRatio * this.viewSize / 2) / 20;
      this.camera.right = (this.aspectRatio * this.viewSize  / 2) / 20;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(this.w, this.h);
    }
  }

  onMouseDown(e) {
      if (this.mount) {
        e.preventDefault();
        this.mouseVector.x = 2 * (e.clientX / this.w) - 1;
        this.mouseVector.y = 1 - 2 * ( e.clientY / this.h );
        this.raycaster.setFromCamera( this.mouseVector, this.camera );
        var intersects = this.raycaster.intersectObject( this.scene, true );
        for( var i = 0; i < intersects.length; i++ ) {
          var intersection = intersects[ i ],
          obj = intersection.object;
          console.log("Intersected object", obj);
        }
      }
  }

  initControls(){
    const OrbitControls = require('three-orbit-controls')(THREE)
    const controls = new OrbitControls( this.camera, this.renderer.domElement )

    controls.enablePan = false
    controls.enableZoom = false
    controls.rotateSpeed = 0.25

    let rotationDelta = Math.PI/ 6
    controls.minPolarAngle = Math.PI/2 - rotationDelta
    controls.maxPolarAngle = Math.PI/2 + rotationDelta

    return controls
  }
  render() {
    return (
      <div id="sceneWrapper" ref={ref => (this.mount = ref)}></div>
    )
  }
}

export default Scene