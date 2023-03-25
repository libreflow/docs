<script lang="ts">
	import type { CollectionEntry } from "astro:content";

	export let docs: CollectionEntry<"docs">[];
	export let url: string;

	type Entry = CollectionEntry<"docs"> | undefined;

	let last: Entry, next: Entry;
	for (let i = 0; i < docs.length; i++) {
		const article = docs[i];

		if (article.slug === url) {
			last = docs[i - 1];
			next = docs[i + 1];
			break;
		}
	}
</script>

<dl
	class="flex pt-6 mt-6 border-t border-slate-200 max-w-[1200px] mx-auto w-full"
>
	{#if last}
		<div class="mr-auto text-left">
			<dt class="text-sm font-normal tracking-tight text-slate-600">
				Previous
			</dt>
			<dd class="mt-1">
				<a
					href={"/" + last.slug}
					class="text-base font-semibold text-slate-900 hover:underline"
				>
					{last.data.section || ""}/{last.data.title}
				</a>
			</dd>
		</div>
	{/if}

	{#if next}
		<div class="ml-auto text-right">
			<dt class="text-sm font-normal tracking-tight text-slate-600">
				Next
			</dt>
			<dd class="mt-1">
				<a
					href={"/" + next.slug}
					class="text-base font-semibold text-slate-900 hover:underline"
				>
					{next.data.section || ""}/{next.data.title}
				</a>
			</dd>
		</div>
	{/if}
</dl>
