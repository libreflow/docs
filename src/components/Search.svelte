<script lang="ts">
	import Fuse from "fuse.js";
	import { onMount } from "svelte";
	export let list: any[];

	const fuse = new Fuse(list, {
		keys: [{
			name: "data.title",
			weight: 5
		}, {
			name: "data.description",
			weight: 3
		}, {
			name: "slug",
			weight: 4
		}, {
			name: "body",
			weight: 1
		}],
		includeMatches: true,
		minMatchCharLength: 2,
		threshold: 0.5,
		distance: 2000,
		useExtendedSearch: true
	});

	let focusedEntries: any[] = [];
	let showSearchEntries = false;
	const handleSearch = (
		e: Event & { currentTarget: EventTarget & HTMLInputElement }
	) => {
		const posts = fuse
			.search(e.currentTarget.value)
			.map((result) => result.item)
			.slice(0, 5);
		focusedEntries = posts;

		showSearchEntries = true;
	};

	onMount(() =>
		document.body.addEventListener(
			"click",
			() => (showSearchEntries = false)
		)
	);
</script>

<input
	type="text"
	on:input={handleSearch}
	class="rounded-lg border px-3 py-1 outline-none focus:bg-slate-100 hover:bg-slate-50 transition-colors"
	placeholder="Search..."
/>

{#if showSearchEntries}
	<div
		class="fixed top-[4rem] right-0 bg-white w-[100%] border-b flex flex-col gap-4 py-4 rounded-b-lg lg:w-[400px] lg:border-l"
	>
		{#if focusedEntries.length > 0}
			{#each focusedEntries as entry}
				<a href={"/" + entry.slug} class="hover:bg-slate-100 px-4">
					<h2 class="underline"><strong>{entry.data.section}</strong>/{entry.data.title}</h2>
					<p class="text-slate-600">{entry.data.description}</p>
				</a>
			{/each}
		{:else}
			<h2 class="px-4">We couldn't find anything that matches your search...</h2>
		{/if}
	</div>
{/if}
