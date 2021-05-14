<script>
    let email = "";
    let password = "";
    let isLoggedIn = false;
    let processing = false;

    let promise = Promise.resolve([]);

    function handleSubmit() {
        promise = Login(email, password)
    }

    let user;

    async function Login(mail, pass){
        const url = 'http://localhost:3000/api/auth/login'
        const response = await fetch(url, {
            method : "POST",
            headers: {
                    'Content-Type': 'application/json'
                },
            body : {
                user : {
                    email : email,
                    password : btoa(password)
                }
            }
        })
        const data = await response
        user = data;
    }

    function redirect(path){
        console.log(user)
        // alert("I'm going to mainpage")
        // window.location.replace(path)
    }
</script>

<form method="post" on:submit={handleSubmit}>
    <h1>Login</h1>
    <label> Email
     <input name="email" type="email" bind:value="{email}" />
    </label>

    <label> Password
        <input name="password" type="password" bind:value="{password}"/>
    </label>

    <button class="button-register"> <a href="#/register" on:click class="register">Sign up</a></button>
    <button class="button-login">Login</button>

</form>

{#await promise}
    <p> Loading... </p>
{:then}
    {user}
    <!-- {redirect('#/register')} -->
{:catch error}
    {error}
{/await}




<style>
    form {
        background: #fff;
        margin : auto;
        padding: 50px;
        width: 400px;
        height: 400px;
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

    .register{
        background: #274472;
        color: white;
        text-decoration:none;
    }

    .button-register {
        margin-top: 20px;
        padding: 10px 0; 
        background: #274472;
        width: 150px;
        border-radius: 25px;
        text-transform: uppercase;
        font-weight: bold;
        cursor: pointer;
        transition: all 300ms ease-in-out;
        float:right;
    }

    .button-login {
        margin-top: 20px;
        background: #5885AF;
        color: white;
        margin-right: 50px;
        padding: 10px 0;
        width: 150px;
        border-radius: 25px;
        text-transform: uppercase;
        font-weight: bold;
        cursor: pointer;
        transition: all 300ms ease-in-out;
        float:left;
    }

</style>