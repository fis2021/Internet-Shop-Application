<script>
    let menu = 1;
    let email="sergiu.bunea@gmail.com", cardcredit="425766545", totalComenzi=14,Sold=134;
</script>

<nav class="navbar" role="navigation" >
    <div class="navbar-menu">
        <a href="#/myAccountCustomer"  class="mainPageSeller" on:click|preventDefault={() => (menu = 1)}>My account</a>
        <button class="button-seller"><a href="#/mainPagecustomer" class="register-seller">Go back</a></button>
        <button class="button-funds"><a href="/" class="register-seller">LOG OUT</a></button>
    </div>
</nav>
{#if menu ===1}
    <div class="account">
        <p>Email: {email}</p>
        <p>Numar card credit: {cardcredit}</p>
        <p>Totalul comenzilor: {totalComenzi}</p>
        <p>Sold curent: {Sold}</p>
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

    .button-seller{
        background: #274472;
        text-transform: uppercase;
        border-radius: 25px;
        width: 150px;
        font-weight: bold;
        cursor: pointer;
        transition: all 300ms ease-in-out;
        margin-left:850px;
    }

    .register-seller{
        background: #274472;
        color: white;
        text-decoration:none;
    }

    .account{
        padding:20px;
        background: white;
        border-radius: 6px;
        box-shadow: 0px 2px 4px;
        align-items: center;
        margin-left: 150px;
        margin-bottom: 150px;
        margin-top:150px;
        margin-right:150px;
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