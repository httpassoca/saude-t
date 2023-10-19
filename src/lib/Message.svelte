<script lang="ts">
	import { createEventDispatcher, onMount } from 'svelte';
	import type messages from '../../public/posts.json';
	import 'photoswipe/style.css';
	import PhotoSwipeLightbox from 'photoswipe/lightbox';

	type IMessage = (typeof messages)[0];
	export let message: IMessage;

	const dispatch = createEventDispatcher();

	function filterByTag(tag: string) {
		window.scrollTo({ top: 0, behavior: 'smooth' });
		dispatch('filterByTag', { tag });
	}

	$: date = new Date(message.date);
	const imageUrlPath = `${
		import.meta.env.VITE_SUPABASE_URL
	}/storage/v1/object/public/posts_images/`;

	onMount(() => {
		let lightbox = new PhotoSwipeLightbox({
			gallery: '#msg' + message.id,
			children: 'a',
			showHideAnimationType: 'zoom',
			pswpModule: () => import('photoswipe')
		});
		lightbox.init();
	});
</script>

<article class="message">
	<div
		class="pswp-gallery flex gap-1 max-w-full overflow-x-auto justify-center"
		id={'msg' + message.id.toString()}
	>
		{#each message.photos as image}
			<a
				href={imageUrlPath + image.link.replace('_thumb', '')}
				data-pswp-width={image.width}
				data-pswp-height={image.height}
				rel="noreferrer"
			>
				<img src={imageUrlPath + image.link} alt="" class="drop-shadow-xl rounded-md" />
			</a>
		{/each}
	</div>

	<div class:mt-3={message.photos.length} class="textContent">
		{@html message.text.replaceAll('\n', '<br/>')}
	</div>
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

<style>
	:global(.textContent a) {
		color: white;
		border-bottom: 1px solid var(--primary);
	}
</style>
