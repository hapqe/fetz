<script lang="ts">
    const room = window.location.href.split('/').pop();
    export let full: boolean;
</script>

<div>
    <img src="players/{Math.floor(Math.random() * 4 - .001)}.png" alt="">
    {#if full}
        <h2>Room "{room}" is full.</h2>
    {:else}
        <h2>Room "{room}" was not found.</h2>
    {/if}
</div>

<style>
    div{
        height: 100%;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        position: absolute;
        top: 0;
        background-color: white;
    }
    img
    {
        top: calc(var(--height) * .25 - 2em);
        position: absolute;
        height: 4em;
    }
</style>