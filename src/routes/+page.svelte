<script lang="ts">
	import Message from '../lib/Message.svelte';

	import { messages } from '../../public/posts.json';

	let tagFiltered = '';

	const setFilter = (e: CustomEvent) => {
		tagFiltered = e.detail.tag;
	};
</script>

<h1>Saúde Tradicional Postagens</h1>

<div id="tags">
	<label>
		Filtre por uma tag
		<select bind:value={tagFiltered}>
			{#each [...new Set(messages.flatMap((msg) => msg.tags))] as tag}
				<option value={tag}>{tag}</option>
			{/each}
		</select>
	</label>
</div>

<div id="messages">
	{#each messages as message}
		{#if message.tags.includes(tagFiltered) || !tagFiltered}
			<Message on:filterByTag={setFilter} {message} />
		{/if}
	{/each}
</div>
