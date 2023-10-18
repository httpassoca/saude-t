<script lang="ts">
	import Message from '../lib/Message.svelte';

	import { messages } from '../../public/posts.json';
	let searchText = '';
	let tagFiltered = '';
	let isInverted = false;

	const setFilter = (e: CustomEvent) => {
		tagFiltered = e.detail.tag;
	};
	let filteredMessages = messages;

	const toggleOrder = () => {
		isInverted = !isInverted;
	};

	$: {
		filteredMessages = messages.filter(
			(message) =>
				(message.tags.includes(tagFiltered) || !tagFiltered) &&
				(searchText ? isMessageMatchingSearch(message) : true)
		);
		if (isInverted) {
			filteredMessages = filteredMessages.reverse();
		}
	}
	const isMessageMatchingSearch = (message: any) => {
		if (!searchText) return true;
		return Object.values(message).some(
			(value) => typeof value === 'string' && value.includes(searchText)
		);
	};
</script>

<div class="container font-sans">
	<h1 class="text-3xl my-4">Saúde Tradicional Postagens</h1>

	<div id="tags">
		<label>
			Filtre por uma tag:
			<select bind:value={tagFiltered}>
				{#each [...new Set(messages.flatMap((msg) => msg.tags))] as tag}
					<option value={tag}>{tag}</option>
				{/each}
			</select>
		</label>
	</div>

	<label>
		Busca:
		<input type="text" bind:value={searchText} placeholder="Digite para buscar..." />
	</label>

	<!-- Button to toggle order -->
	<button on:click={toggleOrder}> Alterar ordem </button>
	<div id="messages">
		{#each filteredMessages as message}
			<Message on:filterByTag={setFilter} {message} />
		{/each}
	</div>
</div>
