<script>
	import {auth, googleProvider} from "./firebase";
	// import { getAuth, signOut } from 'firebase/auth';
	import { authState } from "rxfire/auth";
	import { signInWithPopup } from 'firebase/auth';
	import Chatroom from "./Chatroom.svelte";

	let user;

	const unsubscribe = authState(auth).subscribe(usr => user = usr);
	
	async function login() {
		try {
			await signInWithPopup(auth, googleProvider);
		} catch (error) {
			console.error("Error signing in with Google: ", error);
		}
	}

	function logout(){
		auth.signOut();
	}
// 	async function logout() {
//     try {
//         await signOut(auth);
//     } catch (error) {
//         console.error("Error signing out: ", error);
//     }
// }

</script>

<style>
	main {
		position: fixed;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		width: 100%;
		height: 100%;
		max-width: 400px;
		max-height: 500px;
		background: #fff;
		border: 1px solid #fff;
		box-shadow: 0px 5px 10px rgba(0,0,0,0.05);
	}
	.login-form {
		position: fixed;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
	}
	.login-form button {
		padding: 10px;
		background: #fff;
		color: #111;
		font-size: 10px;
		cursor: pointer;
		outline: none;
		border: 1px solid #bbb;
	}
	.login-form button i.fab {
		padding-right: 10px;
		border-right: 1px solid #ddd;
		color: #555;
	}

</style>

<main>
	{#if user}
		<Chatroom user={user} logout={logout}/>
	{:else}
		<div class="login-form">
			<button on:click={login}>
				<i class="fab fa-google"></i>
				Sign in with Google
			</button>
		</div>
	{/if}
</main>
