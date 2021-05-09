<script>
    import A from './A.svelte'

</script>

<style>
    .box {
        background-color: rgba(14, 13, 13, 0.8);
        border-radius: 10px;
        box-shadow: 0 15px 25px rgba(0, 0, 0, 0.8);
        margin: auto auto;
        padding: 40px;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }
    .box h2 {
        margin: 0 0 30px 0;
        padding: 0;
        color: #fff;
        text-align: center;
    }
    .box .inputBox label {
        color: #fff;
    }
    .box .inputBox input {
        background: transparent;
        border: none;
        border-bottom: 1px solid #fff;
        color: #fff;
        font-size: 18px;
        letter-spacing: 2px;
        margin-bottom: 30px;
        outline: none;
        padding: 10px 0;
        width: 100%;
    }
    .box{
        font-family: sans-serif;
        background: #03a9f4;
        font-size: 11px;
        border: none;
        border-radius: 5px;
        color: #fff;
        cursor: pointer;
        font-weight: 600;
        padding: 10px 20px;
        letter-spacing: 2px;
        outline: none;
        text-transform: uppercase;
        text-decoration: none;
        margin: 2px 10px 2px 0;
        display: inline-block;
    }
    .box{
        opacity: 0.8;
    }
</style>

<main class="box">
    <h2>Sign in</h2>
    <form>
        <div class="inputBox">
            <label for="email">Email</label>
            <input type="email" Email="email" id="email"/>
        </div>
        <div class="inputBox">
            <label for="userPassword">Password</label>
            <input type="password" name="userPassword" id="userPassword" minlength = 8 maxlength = 32/>
        </div>
        <A href="/#/navregister">Register now</A>
        <button type="submit" name="" style="float: right;">Sign in</button>
    </form>
</main>

<footer>
</footer>