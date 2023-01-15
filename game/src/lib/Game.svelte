<script lang="ts">
	import { Canvas, T, useFrame, useThrelte } from '@threlte/core'
    import { OrthographicCamera } from 'three';
    import Board from './Board.svelte';

  const { camera } = useThrelte();

  useFrame(() => {
    if($camera instanceof OrthographicCamera) {
      $camera.zoom = window.innerHeight;
      $camera.lookAt(0, 0, 0);
      $camera.updateProjectionMatrix();
    }
  });

  (async () => {
    const response = await fetch('/new');
    const data = await response.json();
    window.dispatchEvent(new CustomEvent('new', { detail: data }));
  })();
  
</script>

<div>
  <T.OrthographicCamera makeDefault position={[10, 10, 10]}>
  </T.OrthographicCamera>

  <Board/>
</div>

<style>
	div {
		height: 100vh;
		width: 100vw;
	}
</style>