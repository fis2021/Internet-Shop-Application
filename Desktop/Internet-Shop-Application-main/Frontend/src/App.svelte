<script>
	import { onMount, setContext } from "svelte";
	import { Router, Route, Link } from "svelte-navigator";
	import Login from "./pages/Login.svelte";
	import Register from './pages/Register.svelte'
	import {submitLogin, submitNewCustomer, submitNewSeller} from './scripts/submit'
	import {userContext, genContext} from './scripts/context'

	onMount(() => {
    	setContext(userContext, genContext());
  	});


</script>

<Router>
	<main>
		<Route path="/" component="{Login}"/>
		<Route path="register" component="{Register}"/>
	</main>
</Router>

<section>
	<Login {submitLogin}/>
	<Register {submitNewCustomer, submitNewSeller}>
</section>

