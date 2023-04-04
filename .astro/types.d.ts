declare module 'astro:content' {
	interface Render {
		'.mdx': Promise<{
			Content: import('astro').MarkdownInstance<{}>['Content'];
			headings: import('astro').MarkdownHeading[];
			remarkPluginFrontmatter: Record<string, any>;
		}>;
	}
}

declare module 'astro:content' {
	interface Render {
		'.md': Promise<{
			Content: import('astro').MarkdownInstance<{}>['Content'];
			headings: import('astro').MarkdownHeading[];
			remarkPluginFrontmatter: Record<string, any>;
		}>;
	}
}

declare module 'astro:content' {
	export { z } from 'astro/zod';
	export type CollectionEntry<C extends keyof typeof entryMap> =
		(typeof entryMap)[C][keyof (typeof entryMap)[C]];

	export const image: () => import('astro/zod').ZodObject<{
		src: import('astro/zod').ZodString;
		width: import('astro/zod').ZodNumber;
		height: import('astro/zod').ZodNumber;
		format: import('astro/zod').ZodString;
	}>;

	type BaseSchemaWithoutEffects =
		| import('astro/zod').AnyZodObject
		| import('astro/zod').ZodUnion<import('astro/zod').AnyZodObject[]>
		| import('astro/zod').ZodDiscriminatedUnion<string, import('astro/zod').AnyZodObject[]>
		| import('astro/zod').ZodIntersection<
				import('astro/zod').AnyZodObject,
				import('astro/zod').AnyZodObject
		  >;

	type BaseSchema =
		| BaseSchemaWithoutEffects
		| import('astro/zod').ZodEffects<BaseSchemaWithoutEffects>;

	type BaseCollectionConfig<S extends BaseSchema> = {
		schema?: S;
		slug?: (entry: {
			id: CollectionEntry<keyof typeof entryMap>['id'];
			defaultSlug: string;
			collection: string;
			body: string;
			data: import('astro/zod').infer<S>;
		}) => string | Promise<string>;
	};
	export function defineCollection<S extends BaseSchema>(
		input: BaseCollectionConfig<S>
	): BaseCollectionConfig<S>;

	type EntryMapKeys = keyof typeof entryMap;
	type AllValuesOf<T> = T extends any ? T[keyof T] : never;
	type ValidEntrySlug<C extends EntryMapKeys> = AllValuesOf<(typeof entryMap)[C]>['slug'];

	export function getEntryBySlug<
		C extends keyof typeof entryMap,
		E extends ValidEntrySlug<C> | (string & {})
	>(
		collection: C,
		// Note that this has to accept a regular string too, for SSR
		entrySlug: E
	): E extends ValidEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;
	export function getCollection<C extends keyof typeof entryMap, E extends CollectionEntry<C>>(
		collection: C,
		filter?: (entry: CollectionEntry<C>) => entry is E
	): Promise<E[]>;
	export function getCollection<C extends keyof typeof entryMap>(
		collection: C,
		filter?: (entry: CollectionEntry<C>) => unknown
	): Promise<CollectionEntry<C>[]>;

	type InferEntrySchema<C extends keyof typeof entryMap> = import('astro/zod').infer<
		Required<ContentConfig['collections'][C]>['schema']
	>;

	const entryMap: {
		"docs": {
"00-libreflow.mdx": {
  id: "00-libreflow.mdx",
  slug: "00-libreflow",
  body: string,
  collection: "docs",
  data: any
} & { render(): Render[".mdx"] },
"01-foreword.mdx": {
  id: "01-foreword.mdx",
  slug: "01-foreword",
  body: string,
  collection: "docs",
  data: any
} & { render(): Render[".mdx"] },
"02-introduction.mdx": {
  id: "02-introduction.mdx",
  slug: "02-introduction",
  body: string,
  collection: "docs",
  data: any
} & { render(): Render[".mdx"] },
"03-getting-started/00-installation.mdx": {
  id: "03-getting-started/00-installation.mdx",
  slug: "03-getting-started/00-installation",
  body: string,
  collection: "docs",
  data: any
} & { render(): Render[".mdx"] },
"03-getting-started/01-headless-server-installation.mdx": {
  id: "03-getting-started/01-headless-server-installation.mdx",
  slug: "03-getting-started/01-headless-server-installation",
  body: string,
  collection: "docs",
  data: any
} & { render(): Render[".mdx"] },
"04-workspaces/00-index.mdx": {
  id: "04-workspaces/00-index.mdx",
  slug: "04-workspaces/00-index",
  body: string,
  collection: "docs",
  data: any
} & { render(): Render[".mdx"] },
"04-workspaces/01-creating-a-new-workspace.mdx": {
  id: "04-workspaces/01-creating-a-new-workspace.mdx",
  slug: "04-workspaces/01-creating-a-new-workspace",
  body: string,
  collection: "docs",
  data: any
} & { render(): Render[".mdx"] },
"05-boards/00-index.mdx": {
  id: "05-boards/00-index.mdx",
  slug: "05-boards/00-index",
  body: string,
  collection: "docs",
  data: any
} & { render(): Render[".mdx"] },
"05-boards/01-creating-boards.mdx": {
  id: "05-boards/01-creating-boards.mdx",
  slug: "05-boards/01-creating-boards",
  body: string,
  collection: "docs",
  data: any
} & { render(): Render[".mdx"] },
"06-kanban-lists/00-index.mdx": {
  id: "06-kanban-lists/00-index.mdx",
  slug: "06-kanban-lists/00-index",
  body: string,
  collection: "docs",
  data: any
} & { render(): Render[".mdx"] },
"06-kanban-lists/01-managing-a-kanban-list.mdx": {
  id: "06-kanban-lists/01-managing-a-kanban-list.mdx",
  slug: "06-kanban-lists/01-managing-a-kanban-list",
  body: string,
  collection: "docs",
  data: any
} & { render(): Render[".mdx"] },
},

	};

	type ContentConfig = never;
}
