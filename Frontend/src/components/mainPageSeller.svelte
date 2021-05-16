<script>
    import {product} from "./items";
    let prod = product;
    export let menu = 1;

    const handleClick = (id) => {
        prod = prod.filter((cmp) => cmp.id != id);
    }

</script>


<nav class="navbar" role="navigation" >
    <div class="navbar-menu">
        <a href="#/mainPageSeller"  class="mainPageSeller" on:click|preventDefault={() => (menu = 1)}>Seller mainpage</a>
        <button class="button-seller"><a href="#/myAccountPageSeller" class="register-seller">My account</a></button>
        <button class="button-funds"><a href="/" class="register-seller">log out</a></button>
    </div>
</nav>

{#if menu === 1}
    <div>
        <button class="button-add"><a href="#/addProduct" class="edit">ADD PRODUCTS</a></button>
    </div>
    <div class="display">
        {#each prod as cmp (cmp.id)}
            <div class="seller">
                <p>Image: {cmp.image}</p>
                <p>Product's name: {cmp.nameProduct}</p>
                <p>Price: {cmp.price} lei</p>
                <button class="button-delete" on:click={() => handleClick(cmp.id)}>DELETE</button>
                <button class="button-edit"><a href="#/editPage" class="edit">EDIT</a></button>
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

    .register-seller{
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

    .button-delete{
        background: #274472;
        color: white;
        text-transform: uppercase;
        border-radius: 25px;
        width: 150px;
        font-weight: bold;
        cursor: pointer;
        transition: all 300ms ease-in-out;  
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

    .button-add{
        background: #274472;
        color: white;
        text-transform: uppercase;
        border-radius: 25px;
        width: 150px;
        font-weight: bold;
        cursor: pointer;
        transition: all 300ms ease-in-out;
        margin:20px 50px;
    }

    .button-seller{
        background: #274472;
        text-transform: uppercase;
        border-radius: 25px;
        width: 150px;
        font-weight: bold;
        cursor: pointer;
        transition: all 300ms ease-in-out;
        margin-left:800px;
    }

    .button-funds{
        float:right;
        background: #274472;
        text-transform: uppercase;
        border-radius: 25px;
        width: 150px;
        font-weight: bold;
        cursor: pointer;
        transition: all 300ms ease-in-out;
    }

</style> 