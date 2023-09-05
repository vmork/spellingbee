<script>
	export let showModal; // boolean

    import { fade } from 'svelte/transition';
    import { createEventDispatcher, onDestroy } from 'svelte';

	let dialog; // HTMLDialogElement
    const dispatch = createEventDispatcher();

    $: if (!showModal) dispatch('closeModal');

	$: if (dialog && showModal) dialog.showModal();
</script>

<!-- svelte-ignore a11y-click-events-have-key-events a11y-no-noninteractive-element-interactions -->
<dialog 
	bind:this={dialog}
	on:close={() => (showModal = false)}
	on:click|self={() => dialog.close()}
>
	<!-- svelte-ignore a11y-no-static-element-interactions -->
	<div on:click|stopPropagation transition:fade> 
		<!-- svelte-ignore a11y-autofocus -->
		<button autofocus on:click={() => { dialog.close() }}>
            <i class="bi bi-x"></i>
        </button>
		<slot />
	</div>
</dialog>

<style lang="scss">
	dialog {
        width: 95%;
        max-width: 700px;
        height: 80%;
		border-radius: 0.2em;
		padding: 0;
        border: 1px solid #bab8b8;
        background-color: #F6F6F6;
	}
	dialog::backdrop {
        background: rgba(78, 75, 75, 0.747);
	}
	dialog > div {
        background-color: #F6F6F6;
		padding: 1em;
	}
	dialog[open] {
		animation: zoom 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
	}
	@keyframes zoom {
		from {
			transform: scale(0.95);
		}
		to {
			transform: scale(1);
		}
	}
	dialog[open]::backdrop {
		animation: fade 0.2s ease-out;
	}
	@keyframes fade {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}
	button {
        font-size: 2em;
        position: absolute;
        left: 1px;
        top: 1px;
        background-color: white;
        border: none;
        border-radius: 2.5em;
        cursor: pointer;
	}
</style>
