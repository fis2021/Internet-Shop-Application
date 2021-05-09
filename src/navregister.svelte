<script>
    import A from './A.svelte'
</script>

<style>
    @media(min-width: 760px) {
        nav{
            border-bottom:solid gray 2px;
            text-align: center;
        }
    }
</style>

<nav class="navbar" role="navigation" aria-label="main navigation">
    <div class="navbar-brand"><A href="/#/navregister" class="navbar-item"> </A>
    <span
        class="navbar-burger"
        aria-label="menu"
        aria-expanded="false"
    >
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
    </span>
    </div>
    <div class="navbar-menu">
        <div class="navbar-start">
            <h4>Do you are for the first time to our website? Please, select one of the following options, that matches to you.</h4>
            <A href="/#/customerregister" class="navbar-item" >Register as customer</A>
            <A href="/#/sellerregister" class="navbar-item">Register as seller</A>
        </div>
    </div>
</nav>