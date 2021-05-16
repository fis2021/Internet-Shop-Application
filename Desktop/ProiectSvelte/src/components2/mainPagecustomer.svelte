<script>
    
    let menu = 1;

    export let product = [
        {image:'img1', nameProduct:'miere', price: 20, id: 1},
        {image:'img2', nameProduct:'tricou', price: 70, id: 2},
        {image:'img3', nameProduct:'jeans', price: 98, id: 3},
        {image:'img4', nameProduct:'carte', price: 30, id: 4},
        {image:'img5', nameProduct:'stilou', price: 25, id: 5}
    ];

</script>


<nav class="navbar" role="navigation" >
    <div class="navbar-menu">
        <a href="/"  class="mainPageSeller" on:click|preventDefault={() => (menu = 1)}>Customer mainpage</a>
        <button class="button-seller"><a href="/" class="edit-product">My account</a></button>
    </div>
</nav>

{#if menu === 1}
    <div class="display">
        {#each product as pr (pr.id)}
            <div class="seller">
                <p>Image: {pr.image}</p>
                <p>Product's name: {pr.nameProduct}</p>
                <p>Price: {pr.price} lei</p>
                <button class="button-edit"><a href="/" class="edit">EDIT</a></button>
            </div>
        {/each}
    </div>
{/if}



<style>
    nav {
         border-bottom: solid rgb(134, 134, 192) 2px;
   }

   .mainPageSeller{
        color: #274472;
        text-decoration:none;
    }

    .display{
        display: grid;
        margin: 0 50px;
        grid-template-columns: 1fr 1fr;
        grid-gap: 20px;
    }

    .button-seller{
        background: #274472;
        text-transform: uppercase;
        border-radius: 25px;
        width: 150px;
        font-weight: bold;
        cursor: pointer;
        transition: all 300ms ease-in-out;
        margin-left:900px;
    }

    .edit-product{
        background: #274472;
        color: white;
        text-decoration:none;
    }

    .seller{
        padding:20px;
        background: white;
        border-radius: 6px;
        box-shadow: 0px 2px 4px;
    }

    .button-edit{
        background: #274472;
        color: white;
        text-transform: uppercase;
        border-radius: 25px;
        width: 150px;
        font-weight: bold;
        cursor: pointer;
        transition: all 300ms ease-in-out;
        margin-left: 15px;
    }

    .edit{
        background: #274472;
        color: white;
        text-decoration:none;
    }

</style> 