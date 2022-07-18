export interface SearchResult {
	total: number;
	numpages: number;
	extensions: Extension[];
}

export interface Extension {
	uuid: string;
	name: string;
	creator: string;
	creator_url: string;
	pk: number;
	description: string;
	link: string;
	icon: string;
	screenshot: string | null | undefined;
	shell_version_map: {
		[shell_version: string]: {
			pk: number;
			version: number;
		};
	};
}

export interface Comment {
	gravatar: string;
	comment: string;
	is_extension_creator: boolean;
	author: {
		username: string;
		url: string;
	};
	date: {
		timestamp: string;
		standard: string;
	};
	rating?: number;
}

const normalizeLink = (link: string): string => {
	if (!link) return link;
	return new URL(link, "https://extensions.gnome.org").href;
};

export const normalizeExtension = (extension: Extension): Extension => {
	const toNormalize = ["icon", "screenshot"] as const;

	const normalized: Partial<Extension> = {};

	for (const key of toNormalize) {
		if (extension[key]) {
			normalized[key] = normalizeLink(extension[key] as string);
		}
	}

	return {
		...extension,
		...normalized,
	};
};

export const normalizeComment = (comment: Comment): Comment => {
	return {
		...comment,
		author: {
			...comment.author,
			url: normalizeLink(comment.author.url),
		}
	};
}

export const normalizeSearchResult = (result: SearchResult): SearchResult => {
	return {
		...result,
		extensions: result.extensions.map(normalizeExtension)
	};
}

const load = async (url: string): Promise<any> => {
	url = proxy(url);
	const response = await fetch(url, {
		headers: {
			"Origin": "https://extensions.gnome.org",
		}
	});
	// if you failed to parse it, it's a 404 (or 500 in case of comment)
	try {
		return await response.json();
	} catch {
		return null;
	}
}

const NON_PROXIED_URL = "https://extensions.gnome.org/";

const proxy = (url: string): string => {
	if (url.startsWith(NON_PROXIED_URL)) {
		url = url.replace(NON_PROXIED_URL, "");
	}
	if (url.startsWith("/api/proxy")) {
		url = url.replace("/api/proxy", "");
		url = decodeURIComponent(url);
	}
	return new URL(`/api/proxy?href=${encodeURIComponent(url)}`, window.location?.href || Deno.env.get("URL") || "http://localhost:8000").href;
}

export const getComments = (primaryKey: number, loadAll = false): Promise<Comment[]> => {
	return load(`/comments/all/?pk=${primaryKey}&all=${loadAll}`);
}

export const getExtension = (uuid: string): Promise<Extension | null> => {
	return load(`/extension-info/?uuid=${uuid}`);
}

export interface SearchOptions {
	page?: number;
	shell_version?: "all" | number;
	search?: string | undefined;
	sort?: undefined | "name" | "recent" | "downloads" | "popularity";
}

export const searchExtensions = (query = "", options: SearchOptions = {}): Promise<SearchResult> => {
	return load(`/extension-query/?${new URLSearchParams(Object.entries(options)).toString()}&search=${query}`);
}
