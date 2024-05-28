<!-- <script>
import {db} from "./firebase.js";
import {collectionData} from "rxfire/firestore";
import {startWith} from "rxjs/operators";

    export let user;
    export let logout;

    let message = "";

    const query = db.collection("chats").orderBy("sentAt");
    const chats = collectionData(query, "id").pipe(startWith([]));

    function sendMessage(){
        db.collection("chats").add({
            uid:user.uid,
            message:message,
            avatar:user.photoURL,
            sentAt:+new Date()
        })
        message = "";
    }
</script> -->

<script>
    import { db } from "./firebase.js";
    import { collectionData } from "rxfire/firestore";
    import { startWith } from "rxjs/operators";
    import { collection, addDoc, query, orderBy } from "firebase/firestore";
    
    export let user;
    export let logout;
    
    let message = "";
    
    const q = query(collection(db, "chats"), orderBy("sentAt"));
    const chats = collectionData(q, "id").pipe(startWith([]));
    
    async function sendMessage() {
        try {
            await addDoc(collection(db, "chats"), {
                uid: user.uid,
                message: message,
                avatar: user.photoURL,
                sentAt: +new Date()
            });
            message = "";
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    }
    </script>

<style>

</style>

<main>
    <div class="header">
        <div class="logo">Chatroom </div>
        <button on:click={logout}>Logout</button>
    </div>
    <div class="messages">
        {#each $chats as chat}
            {#if user.uid == chat.uid}
                <div class="message my-message">
                    <div class="text">
                        {chat.message}
                    </div>
                </div>
            {:else}
                <div class="message other-message">
                    <div class="avatar">
                        <img alt="Profile" src="{chat.avatar}">
                    </div>
                    <div class="text">
                        {chat.message}
                    </div>
                </div>
            {/if}
        {/each}
    </div>
    <div class="form">
        <input type="text" bind:value={message}>
        <button on:click={sendMessage}>
            <i class="fa fa-paper-plane"></i>
        </button>
    </div>
</main>