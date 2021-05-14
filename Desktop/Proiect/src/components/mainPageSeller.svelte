<script>
    export let menu = 1;

    let spiderVerse = [
       {name: 'Spider-Gwen', id: 'Gwen Stacy'},
       {name: 'Spider-Man', id: 'Miles Morales'},
       {name: 'Spider-Ham', id: 'Peter Porker'}
    ]       

</script>

<nav class="navbar" role="navigation" method="post">
    <div class="navbar-menu">
        <a href="#/mainPageSeller"  class="mainPageSeller" on:click|preventDefault={() => (menu = 1)}><h1>Seller mainpage</h1>Seller mainpage</a>
        <button class="button-seller"><a href="#/myAccountPageSeller" class="register-seller">My account</a></button>
    </div>
</nav>

{#if menu === 1}

  <h1>SpiderVerse</h1>
  <ul>
    {#each spiderVerse as spider}
      <li>{spider.name}</li>
    {/each}
  </ul>
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
        margin-left:900px;
    }

    .register-seller{
        background: #274472;
        color: white;
        text-decoration:none;
    }

</style> 