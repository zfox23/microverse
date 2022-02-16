import {
    THREE, Actor, Pawn, mix, AM_Smoothed, PM_Smoothed, PM_ThreeVisible} from "@croquet/worldcore";

import { DCardActor, DCardPawn } from "./DCard.js";

import skyFront from "../assets/sky/sh_ft.png";
import skyBack from "../assets/sky/sh_bk.png";
import skyRight from "../assets/sky/sh_rt.png";
import skyLeft from "../assets/sky/sh_lf.png";
import skyUp from "../assets/sky/sh_up.png";
import skyDown from "../assets/sky/sh_dn.png";

export class DLight extends DCardActor {
    get pawn() {return DLightPawn;}
}
DLight.register('DLight');

class DLightPawn extends DCardPawn {
    constructor(options) {
        super(options);
        this.addToLayers('light');
        let scene = window.scene =  this.service("ThreeRenderManager").scene;

        let group = new THREE.Group();

        this.background = scene.background = new THREE.CubeTextureLoader().load([skyFront, skyBack, skyUp, skyDown, skyRight, skyLeft]);
        // xyzzy    const ambient = new THREE.AmbientLight( 0xffffff, 0.25 );
        const ambient = new THREE.AmbientLight( 0xffffff, .75 );
 
        group.add(ambient);

        const sun = this.sun = new THREE.DirectionalLight( 0xffe0b5, 1 );
        //sun.position.set(-200, 800, 100);
        sun.position.set(-400, 500, 100);

        let side = 15;

        //Set up shadow properties for the light
        sun.castShadow = true;
        sun.shadow.camera.near = 0.5; // default
        sun.shadow.camera.far = 1000; // default
        sun.shadow.mapSize.width = 2048;
        sun.shadow.mapSize.height = 2048;
        sun.shadow.camera.zoom = 0.125;
        sun.shadow.bias = -0.0001;
        sun.shadow.camera.top = side;
        sun.shadow.camera.bottom = -side;
        sun.shadow.camera.left = side;
        sun.shadow.camera.right = -side;
        group.add(sun);

        // xyzzy this.moon = new THREE.DirectionalLight( 0x6cbbff, 0.12 );
        this.moon = new THREE.DirectionalLight( 0x6cbbff, 0.5 );
        this.moon.position.set(200, 100, -100);
        group.add(this.moon);

        const hemiLight = this.hemiLight = new THREE.HemisphereLight(0xffeeb1, 0xc7ccff, 0.25);
        group.add(hemiLight);
        this.setRenderObject(group);
    }

    destroy() {
        super.destroy();
        this.background.dispose();
        this.sun.dispose();
        this.hemiLight.dispose();
    }
}
