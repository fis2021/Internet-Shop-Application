<script>
    import {validatePassword, validateEmail} from "../scripts/validation";
    import { LoginFormData } from '../request' 

    
    let email = "";
    let password = "";

    let isLoading = false;
    let isSuccess = false;

    let errors = {};

    const handleSubmit = () => {
        errors = {};
        if (email.length === 0) {
            errors.email = "Email should not be empty.";
        }
        if (password.length === 0) {
            errors.password = "Password should not be empty.";
        }
        if(validatePassword(password) === false){
            errors.password = "Password should contain a digit, upper case and lower case letter and a special character."
        }
        if(validateEmail(email) === false){
            errors.email = "Please insert a valid email."
        }

        if (Object.keys(errors).length === 0) {
            isLoading = true;
            // console.log(LoginFormData(email, password))
            submitLogin(email, password)
                .then(() => {
                    isSuccess = true;
                    console.log("Success")
                    isLoading = false;
                })
                .catch(err => {
                    errors.server = err;
                    isLoading = false;
                });
        }
    };

</script>

<style>
    form {
        background: #fff;
        margin : auto;
        padding: 50px;
        width: 400px;
        height: 500px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
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

    button:hover {
        transform: translateY(-2.5px);
        box-shadow: 0px 1px 10px 0px rgba(0, 0, 0, 0.58);
    }
    .errors {
        list-style-type: none;
        padding: 10px;
        margin: 0;
        border: 2px solid #be6283;
        color: #be6283;
        background: rgba(190, 98, 131, 0.3);
    }
    .success {
        font-size: 24px;
        text-align: center;
    }

    .button-register {
        margin-top: 20px;
        background: #274472;
        color: white;
        padding: 10px 0;
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
    .buttons-align {
        align-items: normal;
    }
</style>

<form method="post" on:submit|preventDefault={handleSubmit}>
    {#if isSuccess}
        <div class="success">
            <h3>You've been successfully logged in.</h3>
        </div>
    {:else}
        <!-- svelte-ignore a11y-label-has-associated-control -->
        <label> Email </label>
        <input name="email" placeholder="name@example.com" bind:value={email} />

        <!-- svelte-ignore a11y-label-has-associated-control -->
        <label> Password </label>
        <input name="password" type="password" bind:value={password} />

        <div class="buttons-align">
            <button class="button-login" type="submit">
                {#if isLoading}Logging in...{:else}Log in {/if}
            </button>

            <button class="button-register" type="button" on:click={()=>{window.location.replace('/')}}>
                Sign Up
            </button>
        </div>

        {#if Object.keys(errors).length > 0}
            <ul class="errors">
                {#each Object.keys(errors) as field}
                    <li>{errors[field]}</li>
                {/each}
            </ul>
        {/if}
    {/if}
</form>


