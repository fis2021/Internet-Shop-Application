<script>
    export let menu = 1;
    let email="";
    let password="";
    // let promise = Promise.resolve([]);
    // let registerSuccesful = false;
    // let user;
    // async function Login(nameC, surnameC, emailC, passwordC){
    //     const urlRegister = 'http://localhost:3000/api/auth/register'
    //     const urlLogin =    'http://localhost:3000/api/auth/login'
    //     function getUserObj(type){
    //         if(type === 1) {
    //             return {
    //                     "user-type" : "customer",
    //                     "user" : {
    //                         "name" : name,
    //                         "surname" : surname,
    //                         "email" : email,
    //                         "password" : btoa(password)
    //                     }
    //                 }
    //             }
    //         if(type === 2) {
    //             return {
    //                     "user-type" : "seller",
    //                     "user" : {
    //                         "company-name" : companyName,
    //                         "address" : companyAddress,
    //                         "phone" : contactPhone,
    //                         "email" : companyEmail,
    //                         "password" : btoa(passwordCompany)
    //                 }
    //             }
    //         }
    //     }
    //     const objHard = {
    //                         "user-type" : "customer",
    //                         "user" : {
    //                             "name" : "name",
    //                             "surname" : "surname",
    //                             "email" : "new.customer31@gmail.com",
    //                             "password" : "X0ExYWRuc2Jhk"
    //                         }
    //                     }
    //     switch(menu){
    //         case 1:
    //             const responseCustomer = await fetch(urlRegister, {
    //                 method : "POST",
    //                 headers: {
    //                     // 'Accept' : 'application/json',
    //                     'Content-Type' : 'application/json',
    //                     // 'mode' : 'cors'
    //                 },
    //                 body : JSON.stringify(objHard)
    //             })
    //             if(responseCustomer.status === 201){
    //                 const loginReponse = await fetch(urlLogin, {
    //                     method : "POST",
    //                     headers: {
    //                     // 'Accept' : 'application/json',
    //                         'Content-Type' : 'application/json',
    //                     // 'mode' : 'cors'
    //                     },
    //                     body : JSON.stringify({
    //                         "user" : {
    //                             "email" : email,
    //                             "password" : btoa(password)
    //                         }
    //                     })})
    //                     const loginCustomer = await loginReponse.json()
    //                     if(loginReponse.status === 201 && loginCustomer !== undefined){
    //                         registerSuccesful = true
    //                         // setContext("user", {
    //                         //     "userType" : "customer",
    //                         //     "session_token" : loginRepose
    //                         // })
    //                         console.log(nameC, surnameC, emailC, passwordC)
    //                         alert("YES")
    //                     }
    //                 }
                          
    //             break;
    //         case 2:
    //             const reponseSeller = await fetch(url, {
    //                 method : "POST",
    //                 body : JSON.stringify(getUserObj(2))
    //             })
                
    //             // const reponseSeller = await reponseSeller.status
    //             // if(dataSeller === 201) {
                    
    //             // }
    //             break
    //         default:
    //             break;
            
    //     }
    // }
   
    // // function redirect(path){
    // //     window.location.replace(path)
    // // }
</script>

<nav class="navbar" role="navigation" method="post">
    <div class="navbar-menu">
       <button class="button-customer"><a href="/"  class="register-customer" on:click|preventDefault={() => (menu = 1)}>Customer</a></button>
       <button class="button-seller"><a href="/" class="register-seller" on:click|preventDefault={() => (menu = 2)}>Seller</a></button>

    </div>
</nav>

{#if menu === 1}
<form class="form1">
    <h1>Login</h1>
    <label> Email
     <input name="email" type="email" bind:value="{email}" />
    </label>

    <label> Password
        <input name="password" type="password" bind:value="{password}"/>
    </label>

    <button class="button-login"> <a href="#/register" on:click class="register-customer">Sign up</a></button>
    <button class="button-register"><a href="#/mainPagecustomer" on:click class="register-seller">Login</a></button>


</form>
{:else if menu === 2}
<form class="form1">
    <h1>Login</h1>
    <label> Email
     <input name="email" type="email" bind:value="{email}" />
    </label>

    <label> Password
        <input name="password" type="password" bind:value="{password}"/>
    </label>

    <button class="button-register"> <a href="#/register" on:click class="register-seller">Sign up</a></button>
    <button class="button-login"><a href="#/mainPageSeller" on:click class="register-seller">Login</a></button>

</form>
{/if}


<!-- {#await promise}
    <p> Loading... </p>
{:then}
    {console.log(name, surname, email, password)}
    {#if registerSuccesful}
        {redirect('/mainpage')}
    {/if}
{/await} -->

<style>
    nav {
         border-bottom: solid rgb(134, 134, 192) 2px;
   }
   .navbar-menu{
       align-items: center;
   }   
   .button-customer{
       background: #274472;
       text-transform: uppercase;
       border-radius: 25px;
       width: 150px;
       font-weight: bold;
       cursor: pointer;
       transition: all 300ms ease-in-out;
       margin-left: 450px;
   }
   .register-customer{
       background: #274472;
       color: white;
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
       margin-right: 450px;
   }
   .register-seller{
       background: #274472;
       color: white;
       text-decoration:none;
   }
   .form1 {
       background: #fff;
       margin : auto;
       padding: 50px;
       width: 400px;
       height: 350px;
       border: 1px solid gray;  
   }
   label {
       margin: 10px 0;
       align-self: flex-start;
       font-weight: 500;
   }
   input {
       border: none;
       border-bottom: 1px solid #ccc;
       margin-bottom: 20px;
       transition: all 300ms ease-in-out;
       width: 100%;
   }
   input:focus {
       outline: 0;
       border-bottom: 1px solid #666;
   }
   .button-register {
       background: #274472;
       color: white;
       text-transform: uppercase;
       border-radius: 25px;
       width: 150px;
       font-weight: bold;
       cursor: pointer;
       transition: all 300ms ease-in-out;
       float:right;
   }
   .button-login {
       background: #274472;
       color: white;
       text-transform: uppercase;
       border-radius: 25px;
       width: 150px;
       font-weight: bold;
       cursor: pointer;
       transition: all 300ms ease-in-out;
       float:left;
   }
</style>