<script lang="ts">
    import QRCode from 'qrcode';
    
    let qr: HTMLImageElement;

    function setQr(src: string) {
        qr!.src = src;
    }

    let l = '';

    window.addEventListener('new', (e: CustomEvent) => {
        l = "http://192.168.8.105:8000/r/" + e.detail.room;
        QRCode.toDataURL(l, {margin: 0}).then(url => {
            setQr(url);
        });
    });
</script>

<div id='container'>
    <a href="{l}" target="_blank" id="bg">
        <div id="wrapper">
            <img id="qr" bind:this="{qr}" src="" alt="">
        </div>
    </a>
</div>

<style>
    #container {
        width: 100vw;
        height: 100vh;
        display: flex;
        justify-content: center;
        align-items: center;
        position: absolute;
        flex-direction: column;
        transform: scale(0);

        animation: qr .3s ease-in-out;
        animation-delay: 1400ms;
        animation-fill-mode: forwards;
    }

    #bg {
        background-image: url("qr-frame.svg");
        height: 100vh;
        width: 100vh;
        background-size: cover;
    }

    #wrapper {
        height: 100%;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        overflow: hidden;
    }

    #qr {
        image-rendering: pixelated;
        height: 45vh;
    }

    @keyframes qr {
        0% {
            transform: scale(0);
        }
        50% {
            transform: scale(1.2);
        }
        100% {
            transform: scale(1);
        }
    }
</style>