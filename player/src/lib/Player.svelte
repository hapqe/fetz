<script lang="ts">
    import RoomNotFound from "./CantJoin.svelte";

    let playerIcon: HTMLImageElement;
    
    const colors = [
        [
            '#DD5454'
        ],
        [
            '#9ED5C5'
        ],
        [
            '#FFD8A9'
        ],
        [
            '#8D72E1'
        ]
    ] as const;
    
    let joined: boolean | undefined = undefined;
    let dragging = false;
    let full = false;

    const room = window.location.href.split('/').pop();
    
    (async () => {
        const res = await fetch('/join/' + room, {method: 'post'});

        const data = await res.json();
        const id = data.id;
        if(typeof id === 'number' && id >= 0){
            document.documentElement.style.setProperty('--color', colors[id][0]);
            playerIcon.src = '/r/players/' + id + '.png';
            
            joined = true;
        }
        else {
            joined = false;
            full = id === -1;
        }
    })();

    function setScreenSize() {
        document.documentElement.style.setProperty('--width', window.innerWidth + 'px');
        document.documentElement.style.setProperty('--height', window.innerHeight + 'px');
    }

    window.addEventListener('resize', setScreenSize);
    setScreenSize();
    
</script>

<div class="{joined===true?'show':''}">
    <h2>You are Player</h2>
    <img bind:this={playerIcon} src="" alt="">
    <h2>!</h2>
</div>

{#if joined === false}
    <RoomNotFound {full} />
{/if}

<style>
    div{
        height: 100%;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        transform: scale(0);
    }
    img {
        height: 2em;
        margin: .5em;
    }
    @keyframes show {
        0% {
            transform: scale(0);
        }
        50% {
            transform: scale(1.3);
        }
        100% {
            transform: scale(1);
        }
    }
    .show {
        animation: show .3s ease-in-out;
        animation-fill-mode: forwards;
    }
</style>

<svelte:window 
    on:pointerdown="{() => {
        dragging = true;
    }}"
    on:pointerup="{() => {
        dragging = false;
    }}"
    on:pointermove="{(e) => {
        if(dragging) {
            const x = e.clientX / window.innerWidth;
            const y = e.clientY / window.innerHeight;
            
            fetch('/pos/' + room, {
                method: 'post',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({x, y})
            });
        }
    }}"
/>