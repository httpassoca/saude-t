<script lang="ts">
	import Message from '../lib/Message.svelte';

	import messages from '../../public/posts.json';
	let searchText = '';
	let tagFiltered = '';
	let isInverted = false;
	let debounceTimeout: NodeJS.Timeout;

	const setFilter = (e: CustomEvent) => {
		tagFiltered = e.detail.tag;
	};
	let filteredMessages = messages;

	const toggleOrder = () => {
		isInverted = !isInverted;
	};

	const setSearchTextWithDebounce = (e: Event) => {
		const value = (e.target as HTMLInputElement).value;
		clearTimeout(debounceTimeout);
		debounceTimeout = setTimeout(() => {
			searchText = value;
		}, 500); // 500ms delay
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
			(value) =>
				typeof value === 'string' &&
				value.toLocaleLowerCase().includes(searchText.toLocaleLowerCase())
		);
	};
</script>

<div class="container max-w-[768px]">
	<h1 class="text-3xl my-4">Saúde Tradicional Postagens</h1>
	<p>
		Compilação de Posts feito no canal <a
			class="text-white border-solid border-b-2 border-sky-500"
			href="https://t.me/SAUDETRADICIONAL">Saúde Tradicional</a
		> até 16/10/2023
	</p>

	<div class="flex flex-col md:flex-row gap-2 md:gap-4 mt-2">
		<label class="text-sm grow">
			Filtre por uma tag:
			<select bind:value={tagFiltered} class="h-12 mt-1">
				<option value={''} selected>Todas</option>
				{#each [...new Set(messages.flatMap((msg) => msg.tags))] as tag}
					<option value={tag}>{tag}</option>
				{/each}
			</select>
		</label>

		<!-- Button to toggle order -->
		<div class="grow-0">
			<button
				on:click={toggleOrder}
				class="flex h-12 mt-0 md:mt-6 bg-sky-600 text-white items-center gap-2 justify-center p-4"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					stroke-width="1.5"
					stroke="currentColor"
					class="w-6 h-6"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						d="M3 7.5L7.5 3m0 0L12 7.5M7.5 3v13.5m13.5 0L16.5 21m0 0L12 16.5m4.5 4.5V7.5"
					/>
				</svg>

				Ordem
			</button>
		</div>
	</div>

	<label class="text-sm mt-2">
		Busca:
		<input
			type="search"
			class="mt-1"
			on:input={setSearchTextWithDebounce}
			placeholder="Digite para buscar..."
		/>
	</label>
	<div id="messages">
		{#each filteredMessages as message}
			<Message on:filterByTag={setFilter} {message} />
		{/each}
	</div>
</div>
