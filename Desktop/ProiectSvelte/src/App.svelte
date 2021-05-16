<script>
	import Router from "svelte-spa-router";
	import login from "./components/login.svelte";
	import register from "./components/register.svelte";
	import mainPageSeller from "./components/mainPageSeller.svelte";
	import myAccountPageSeller from "./components/myAccountPageSeller.svelte";
	import editPage from "./components/editPage.svelte";
	import addProduct from "./components/addProduct.svelte";
	import showfunds from "./components/showFunds.svelte";
	import mainPagecustomer from "./components2/mainPagecustomer.svelte";
	import myaccountcustomer from "./components2/myaccountcustomer.svelte";

	const routes = {
		"/": login,
		"/register": register,
		"/mainPageSeller": mainPageSeller,
		"/myAccountPageSeller":myAccountPageSeller,
		"/editPage": editPage,
		"/addProduct": addProduct,
		"/showfunds": showfunds,
		"/mainPagecustomer": mainPagecustomer,
		"/myaccountcustomer": myaccountcustomer,
	}

</script>

<Router {routes} />

<style>

</style>