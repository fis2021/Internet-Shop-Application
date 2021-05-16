<script>
    let menu = 1;
    let companyName="Shop Industries", address="Bucuresti", phone="0725342810", email="shop.industries@gmail.com";
</script>

<nav class="navbar" role="navigation" >
    <div class="navbar-menu">
        <a href="#/myAccountPageSeller"  class="mainPageSeller" on:click|preventDefault={() => (menu = 1)}>My account</a>
        <button class="button-seller"><a href="#/mainPageSeller" class="register-seller">Go back</a></button>
        <button class="button-funds"><a href="#/showfunds" class="register-seller">Show funds</a></button>
    </div>
</nav>
{#if menu ===1}
    <div class="account">
        <p>Company name: {companyName}</p>
        <p>Address: {address}</p>
        <p>Phone number: {phone}</p>
        <p>Email: {email}</p>
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