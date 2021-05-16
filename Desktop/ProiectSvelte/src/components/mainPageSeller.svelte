<script>
    
    export let menu = 1;

    export let company = [
        {image:'img1', nameProduct:'product1', price: 20, id: 1},
        {image:'img2', nameProduct:'product2', price: 30, id: 2},
        {image:'img3', nameProduct:'product3', price: 25, id: 3}
    ];

    const handleClick = (id) => {
        company = company.filter((cmp) => cmp.id != id);
    }

</script>


<nav class="navbar" role="navigation" >
    <div class="navbar-menu">
        <a href="#/mainPageSeller"  class="mainPageSeller" on:click|preventDefault={() => (menu = 1)}>Seller mainpage</a>
        <button class="button-seller"><a href="#/myAccountPageSeller" class="register-seller">My account</a></button>
    </div>
</nav>

{#if menu === 1}
    <div>
        <button class="button-add"><a href="#/addProduct" class="edit">ADD PRODUCTS</a></button>
    </div>
    <div class="display">
        {#each company as cmp (cmp.id)}
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

</style> 