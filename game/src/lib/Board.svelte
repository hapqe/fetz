<script lang="ts">
    import { T, useFrame } from '@threlte/core'
    import { PlaneGeometry, ShaderMaterial } from 'three';
    import * as THREE from 'three';
    import Ground from './Ground.svelte';
    import { lerp } from 'three/src/math/MathUtils';
    import { spring } from 'svelte/motion';
    
    const vert = `
        varying vec2 vUv;
        uniform float outline;

        void main() {
            vUv = uv * (1.0 + outline) - outline / 2.0;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
    `;
    
    const frag = `
        uniform float subdivisions;

        varying vec2 vUv;
    
        void main() {
            float x = fract(vUv.x * subdivisions * .5) > .5 ^^ fract(vUv.y * subdivisions * .5) > .5 ? 1.0 : 0.0;
            float a = .1;
            gl_FragColor = vec4(a,a,a,x);
        }
    `;
    
    const material = new ShaderMaterial(
        {
            vertexShader: vert,
            fragmentShader: frag,
            uniforms: {
                subdivisions: {value: 10},
                outline: {value: .03},
            },
            transparent: true,
        }
    );

    const boardY = spring(-2, {stiffness: .01, damping: .06, precision: .001});

    function showBoard() {
        boardY.set(0);
    }
</script>

<T.Mesh position.y={$boardY} rotation.x={-Math.PI / 2} args={[undefined, material]}>
    <T.PlaneGeometry/>
    <Ground/>
</T.Mesh>