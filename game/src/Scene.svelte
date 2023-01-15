<script lang="ts">
    import { Canvas } from "@threlte/core";
    import Game from "./lib/Game.svelte";


</script>

<div>
    <Canvas>
        <Game/>
    </Canvas>
</div>

<style>
    div {
        height: 100vh;
        width: 100vw;
    }
</style>