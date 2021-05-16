<script>

</script>

<div class="edit">
    <div class="edit2">
        <label> Image:
            <input name="image" type="text" />
        </label>
       
        <label> Company's name:
             <input name="text" type="text" />
        </label>

        <label> Price:
            <input name="text" type="text" />
       </label>

       <button class="button-add"><a href="#/mainPageSeller" class="edit3">Add product</a></button>

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
        margin-bottom: 20px;
        text-align: center;
        background:white;
    }

    input {
        border-color: blue;
        margin-bottom: 20px;
        transition: all 300ms ease-in-out;
        width: 100%;
    }

    .edit3{
        background: #274472;
        color: white;
        text-decoration:none;
    }

    .button-add{
        background: #274472;
        color: white;
        text-transform: uppercase;
        border-radius: 25px;
        width: 150px;
        font-weight: bold;
        cursor: pointer;
        transition: all 300ms ease-in-out;
        margin:20px 50px;
    }

</style>