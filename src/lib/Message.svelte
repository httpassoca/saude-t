<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import type { messages } from '../../public/posts.json';
	type IMessage = (typeof messages)[0];
	export let message: IMessage;

	const dispatch = createEventDispatcher();

	function filterByTag(tag: string) {
		dispatch('filterByTag', { tag });
	}

	const date = new Date(message.date);
</script>

<article class="message">
	<div class="photos">
		{#each message.photoLinks as photo}
			<img src={'https://picsum.photos/200/300'} alt="Photo" />
		{/each}
	</div>

	<div class="content">{@html message.text.replaceAll('\n', '<br/>')}</div>
	<small class="mt-2 italic text-gray-500">
		Post feito em {date.toLocaleDateString('pt-BR')} por {message.author} às {date
			.toLocaleTimeString('pt-BR')
			.slice(0, -3)}
	</small>

	<div class="tags">
		{#each message.tags as tag, i}
			<!-- svelte-ignore a11y-click-events-have-key-events -->
			<!-- svelte-ignore a11y-no-static-element-interactions -->
			<small class="cursor-pointer hover:text-white transition" on:click={() => filterByTag(tag)}>
				{tag}

				{#if i < message.tags.length - 1}
					•
				{/if}
			</small>
		{/each}
	</div>
</article>
