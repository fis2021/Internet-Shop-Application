<script>
    let sum=123251;
</script>

<div class="edit">
    <div class="edit2">
        <p>Your account:{sum} lei</p>
        <button class="button-seller"><a href="#/mainPageSeller" class="register-seller">Back to Main Page</a></button>
    </div>
</div>

<style>
    .edit{
        width: 100%;
        height: 100%;
        position: fixed;
        background:rgba(0,0,0,0.8);
    }

    .edit2{
        padding: 150px;
        border-radius: 10px;
        max-width: 600px;
        margin: 10% auto;
        text-align: center;
        background:white;
    }

    .button-seller{
        background: #274472;
        text-transform: uppercase;
        border-radius: 25px;
        width: 175px;
        font-weight: bold;
        cursor: pointer;
        transition: all 300ms ease-in-out;
    }

    .register-seller{
        background: #274472;
        color: white;
        text-decoration:none;
    }

</style>