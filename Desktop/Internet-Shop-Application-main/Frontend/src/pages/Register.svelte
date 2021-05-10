<script>
    import { Router, Route, Link } from "svelte-navigator";
    import {submitNewCustomer, submitNewSeller} from '../scripts/submit'

    let userType;
    let name, surname, email, password; //customer
    let companyName, address, phone; //seller

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

        if (name.length === 0) {
            errors.email = "Name should not be empty.";
        }

        if (surname.length === 0) {
            errors.surname = "Surname should not be empty.";
        }

        if (companyName.length === 0) {
            errors.companyName = "Name of the company should not be empty.";
        }

        if (address.length === 0) {
            errors.address = "Adress should not be empty.";
        }

        if (phone.length === 0) {
            errors.phone = "The phone number should not be empty.";
        }

        if (Object.keys(errors).length === 0) {
            isLoading = true;

            switch(userType) {
                case "seller":
                    submitNewCustomer(name, surname, email, password)
                break

                case "customer":
                    submitNewSeller(companyName, aDeferredPermissionRequest, phone, email, password)
                break

                default:
                    break
            }
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

    .button-signup {
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
    .button-align {
        align-items: normal;
    }
</style>

<Router>
      <nav>
        <Link to="customer">Customer</Link>
        <Link to="seller">Seller</Link>
      </nav>
    <main>
        <Route path="customer">
            <form on:submit|preventDefault={handleSubmit}>
                {#if isSuccess}
                  <div class="success">
                    🔓
                    <br />
                    You've been successfully signed up.
                  </div>
                {:else}
                  {userType = "customer"}
                  <!-- svelte-ignore a11y-label-has-associated-control -->
                  <label>Name</label>
                  <input name="name" bind:value={name} />

                  <!-- svelte-ignore a11y-label-has-associated-control -->
                  <label>Surname</label>
                  <input name="surname" bind:value={surname} />

                  <!-- svelte-ignore a11y-label-has-associated-control -->
                  <label>Email</label>
                  <input name="email" bind:value={email} />
              
                  <!-- svelte-ignore a11y-label-has-associated-control -->
                  <label>Password</label>
                  <input name="password" type="password" bind:value={password} />

                  <button class="button-signup" type="submit"> Sign up </button>
              
                  {#if Object.keys(errors).length > 0}
                    <ul class="errors">
                      {#each Object.keys(errors) as field}
                        <li>{field}: {errors[field]}</li>
                      {/each}
                    </ul>
                  {/if}
                {/if}
              </form>
              
        </Route>
  
        <Route path="seller">
            <form on:submit|preventDefault={handleSubmit}>
                {#if isSuccess}
                  <div class="success">
                    🔓
                    <br />
                    You've been successfully signed up.
                  </div>
                {:else}
                    {userType = "seller"}
                  <!-- svelte-ignore a11y-label-has-associated-control -->
                  <label>Company name</label>
                  <input com="companyName" bind:value={companyName} />

                  <!-- svelte-ignore a11y-label-has-associated-control -->
                  <label>Company address</label>
                  <input name="address" bind:value={address} />

                  <!-- svelte-ignore a11y-label-has-associated-control -->
                  <label>Contact phone</label>
                  <input name="phone" bind:value={phone} />

                  <!-- svelte-ignore a11y-label-has-associated-control -->
                  <label>Company email</label>
                  <input name="email" bind:value={email} />
              
                  <!-- svelte-ignore a11y-label-has-associated-control -->
                  <label>Password</label>
                  <input name="password" type="password" bind:value={password} />

                  <button class="button-signup" type="submit"> Sign up </button>
              
                  {#if Object.keys(errors).length > 0}
                    <ul class="errors">
                      {#each Object.keys(errors) as field}
                        <li>{field}: {errors[field]}</li>
                      {/each}
                    </ul>
                  {/if}
                {/if}
              </form>
              
      </Route>
    </main>
</Router>