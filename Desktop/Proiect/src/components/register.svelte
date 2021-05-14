<script>
    export let menu = 1;
    let name="";
    let surname="";
    let email="";
    let password="";
    let companyName="";
    let companyAddress="";
    let contactPhone="";
    let companyEmail="";
    let passwordCompany="";

    let promise = Promise.resolve([]);

    let registerSuccesful = false;
    let user;

    console.log({ "user-type" : "customer",
                            "user" : {
                                "name" : name,
                                "surname" : surname,
                                "email" : email,
                                "password" : btoa(password)
                            }
                        })

    async function Register(name, surname, email, password){
        const url = 'http://localhost:3000/api/auth/register'
        const obj = {
                            "user-type" : "customer",
                            "user" : {
                                "name" : "name",
                                "surname" : "surname",
                                "email" : "new.customer1@gmail.com",
                                "password" : "X0ExYWRuc2Jhk"
                            }
                        }

        switch(menu) {
            case 1:
                const reponseCustomer = await fetch(url, {
                    method : "POST",
                    headers: {
                        'Accept' : 'application/json',
                        'Content-Type' : 'application/json',
                        'mode' : 'cors'
                    },
                    body : obj
                })
                
                const dataCustomer = await reponseCustomer.status
                if(dataCustomer === 201){
                    registerSuccesful = true
                    user = obj
                } else {
                    user = obj
                }

                break;

            case 2:
                const reponseSeller = await fetch(url, {
                    method : "POST",
                    body : {
                            "user-type" : "seller",
                            "user" : {
                                "company-name" : companyName,
                                "address" : companyAddress,
                                "phone" : phone,
                                "email" : email,
                                "password" : btoa(password)
                            }
                        }
                    })
                
                const dataSeller = await reponseSeller.status
                if(dataSeller === 201) {
                    registerSuccesful = true
                }
                break

            default:
                break;
            
        }
    }


    function handleSubmit(){
        promise = Register(name, surname, email, password)
    }

    function Redirect(path) {
        window.location.replace(path)
    }

</script>

<nav class="navbar" role="navigation" method="post">
    <div class="navbar-menu">
       <button class="button-customer"><a href="#/register"  class="register-customer" on:click|preventDefault={() => (menu = 1)}>Customer</a></button>
       <button class="button-seller"><a href="#/register" class="register-seller" on:click|preventDefault={() => (menu = 2)}>Seller</a></button>

    </div>
</nav>

{#if menu === 1}
    <form class="form1" method="post" on:submit={handleSubmit}>
        <label>Name
            <input name="name" type="text" bind:value="{name}" />
        </label>

        <label>Surname
            <input name="surname" type="text" bind:value="{surname}" />
        </label>

        <label>Email
            <input name="email" type="email" bind:value="{email}" />
        </label>

        <label> Password
            <input name="password" type="password" bind:value="{password}"/>
        </label>

        <button class="button-register">Sign up</button>

    </form>
{:else if menu === 2}
    <form class="form2" method="post" on:submit={handleSubmit}>
        <label>Name of the company
            <input name="companyName" type="text" bind:value="{companyName}" />
        </label>

        <label>Address of the company
            <input name="companyAddress" type="text" bind:value="{companyAddress}" />
        </label>

        <label>Phone number
            <input name="contactPhone" type="numeric" bind:value="{contactPhone}" />
        </label>

        <label>Email
            <input name="companyEmail" type="email" bind:value="{companyEmail}" />
        </label>

        <label> Password
            <input name="passwordCompany" type="password" bind:value="{passwordCompany}"/>
        </label>

        <button class="button-register">Sign up</button>

    </form>
{/if}


{#await promise}
    <p> Loading... </p>
{:then}
    {console.log({ "user-type" : "customer",
    "user" : {
        "name" : name,
        "surname" : surname,
        "email" : email,
        "password" : btoa(password)
    }
})}
    {user}
    {console.log(user)}
    {#if registerSuccesful === true}
        {Redirect('/')}
    {/if}
{:catch error}
    {error}
{/await}
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

    .form2 {
        background: #fff;
        margin : auto;
        padding: 30px;
        width: 400px;
        height: 455px;
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


</style>