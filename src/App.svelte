<script>
    import Router from 'svelte-spa-router'
    import customerregister from './customerregister.svelte';
    import navregister from './navregister.svelte'
    import sellerregister from './sellerregister.svelte';
    import signin from './signin.svelte'
</script>

<div class="container flex flex-col justify-center items-center w-screen h-screen mx-auto">
    <Router routes={{
        '/': signin,
        '/#/navregister':navregister,
        '/#/customerregister':customerregister,
        '/#/sellerregister':sellerregister
    }} />
</div>