<script lang="ts">
    import { T } from '@threlte/core'
    import * as THREE from 'three';

    const vert = `
        varying vec2 vUv;
    
        void main() {
            vUv = uv / 1.5;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
    `;
    
    const frag = `
        varying vec2 vUv;
    
        void main() {
            float x = 1.0;
            x *= vUv.y * x * (vUv.x + .1) * (1.0-vUv.x);
            x = 1.0 - x;
            gl_FragColor = vec4(x, x, x, 1.0);
        }
    `;

    const material = new THREE.ShaderMaterial(
        {
            vertexShader: vert,
            fragmentShader: frag,
            transparent: true,
        }
    );
</script>

<T.Mesh args={[undefined, material]} scale.y={2} rotation.x={Math.PI / 2} position.z={-1.001}>
    <T.BoxGeometry/>
</T.Mesh>