interface Search {
	// url https://extensions.gnome.org/extension-query/?page=1&shell_version=42.3.1&search=he
	params: {
		page: number;
		shell_version: "all" | number;
		search: string | undefined;
		sort: undefined | "name" | "recent" | "downloads" | "popularity";
	};
	response: {
		total: number;
		numpages: number;
		extensions: Extension[];
	};
}

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
	return new URL(`/api/proxy?href=${encodeURIComponent(url)}`, window.location?.href || "http://localhost:8000").href;
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

const sampleExtensions: Search["response"] = {
	"extensions": [
		{
			"uuid": "user-theme@gnome-shell-extensions.gcampax.github.com",
			"name": "User Themes",
			"creator": "fmuellner",
			"creator_url": "/accounts/profile/fmuellner",
			"pk": 19,
			"description": "Load shell themes from user directory.",
			"link": "/extension/19/user-themes/",
			"icon": "/static/images/plugin.png",
			"screenshot": null,
			"shell_version_map": {
				"40": {
					"pk": 24962,
					"version": 46
				},
				"41": {
					"pk": 28483,
					"version": 48
				},
				"42": {
					"pk": 29921,
					"version": 49
				},
				"3.3.2": {
					"pk": 41,
					"version": 2
				},
				"3.3.3": {
					"pk": 503,
					"version": 3
				},
				"3.3.4": {
					"pk": 646,
					"version": 4
				},
				"3.3.90": {
					"pk": 837,
					"version": 5
				},
				"3.4": {
					"pk": 1015,
					"version": 6
				},
				"3.5.5": {
					"pk": 1697,
					"version": 7
				},
				"3.5.90": {
					"pk": 1743,
					"version": 8
				},
				"3.5.91": {
					"pk": 1814,
					"version": 9
				},
				"3.6": {
					"pk": 2218,
					"version": 11
				},
				"3.7.5": {
					"pk": 2498,
					"version": 13
				},
				"3.7.90": {
					"pk": 2569,
					"version": 14
				},
				"3.7.92": {
					"pk": 2649,
					"version": 15
				},
				"3.8": {
					"pk": 3223,
					"version": 18
				},
				"3.10": {
					"pk": 3254,
					"version": 19
				},
				"3.12": {
					"pk": 3746,
					"version": 20
				},
				"3.14": {
					"pk": 4386,
					"version": 22
				},
				"3.15.1": {
					"pk": 4451,
					"version": 23
				},
				"3.15.3": {
					"pk": 4568,
					"version": 24
				},
				"3.16": {
					"pk": 4752,
					"version": 25
				},
				"3.18": {
					"pk": 5212,
					"version": 26
				},
				"3.20": {
					"pk": 5753,
					"version": 27
				},
				"3.21.2": {
					"pk": 5970,
					"version": 28
				},
				"3.22": {
					"pk": 6202,
					"version": 29
				},
				"3.26": {
					"pk": 7480,
					"version": 32
				},
				"3.24": {
					"pk": 7481,
					"version": 33
				},
				"3.28": {
					"pk": 8103,
					"version": 34
				},
				"3.30": {
					"pk": 8388,
					"version": 35
				},
				"3.32": {
					"pk": 10231,
					"version": 37
				},
				"3.34": {
					"pk": 13345,
					"version": 39
				},
				"3.36": {
					"pk": 14396,
					"version": 40
				},
				"3.38": {
					"pk": 21666,
					"version": 42
				},
				"40.0": {
					"pk": 22817,
					"version": 44
				}
			}
		},
		{
			"uuid": "apps-menu@gnome-shell-extensions.gcampax.github.com",
			"name": "Applications Menu",
			"creator": "fmuellner",
			"creator_url": "/accounts/profile/fmuellner",
			"pk": 6,
			"description": "Add a category-based menu for applications.\nThis extension is part of Classic Mode and is officially supported by GNOME. Please do not report bugs using the form below, use GNOME's GitLab instance instead.",
			"link": "/extension/6/applications-menu/",
			"icon": "/extension-data/icons/icon_6.png",
			"screenshot": "/extension-data/screenshots/screenshot_6_5MMPK4p.png",
			"shell_version_map": {
				"40": {
					"pk": 24975,
					"version": 48
				},
				"41": {
					"pk": 28466,
					"version": 50
				},
				"42": {
					"pk": 29906,
					"version": 51
				},
				"3.2": {
					"pk": 284,
					"version": 5
				},
				"3.2.0": {
					"pk": 6,
					"version": 1
				},
				"3.3.2": {
					"pk": 33,
					"version": 3
				},
				"3.2.1": {
					"pk": 52,
					"version": 4
				},
				"3.2.3": {
					"pk": 284,
					"version": 5
				},
				"3.3.4": {
					"pk": 640,
					"version": 7
				},
				"3.3.90": {
					"pk": 831,
					"version": 8
				},
				"3.4": {
					"pk": 1008,
					"version": 9
				},
				"3.5.5": {
					"pk": 1690,
					"version": 10
				},
				"3.5.90": {
					"pk": 1736,
					"version": 11
				},
				"3.5.91": {
					"pk": 1807,
					"version": 12
				},
				"3.6": {
					"pk": 2213,
					"version": 14
				},
				"3.7.5": {
					"pk": 2489,
					"version": 16
				},
				"3.7.90": {
					"pk": 2560,
					"version": 17
				},
				"3.7.92": {
					"pk": 2640,
					"version": 18
				},
				"3.8": {
					"pk": 3216,
					"version": 21
				},
				"3.10": {
					"pk": 3247,
					"version": 22
				},
				"3.12": {
					"pk": 3739,
					"version": 23
				},
				"3.14": {
					"pk": 4332,
					"version": 24
				},
				"3.15.1": {
					"pk": 4463,
					"version": 25
				},
				"3.15.3": {
					"pk": 4582,
					"version": 26
				},
				"3.16": {
					"pk": 4763,
					"version": 27
				},
				"3.18": {
					"pk": 5320,
					"version": 29
				},
				"3.20": {
					"pk": 5764,
					"version": 30
				},
				"3.21.2": {
					"pk": 5980,
					"version": 31
				},
				"3.22": {
					"pk": 6209,
					"version": 32
				},
				"3.24": {
					"pk": 6867,
					"version": 34
				},
				"3.26": {
					"pk": 7470,
					"version": 36
				},
				"3.28": {
					"pk": 8121,
					"version": 38
				},
				"3.30": {
					"pk": 8381,
					"version": 39
				},
				"3.32": {
					"pk": 10201,
					"version": 41
				},
				"3.34": {
					"pk": 13363,
					"version": 43
				},
				"3.36": {
					"pk": 14372,
					"version": 44
				},
				"3.38": {
					"pk": 21648,
					"version": 46
				},
				"40.0": {
					"pk": 22834,
					"version": 47
				}
			}
		},
		{
			"uuid": "gsconnect@andyholmes.github.io",
			"name": "GSConnect",
			"creator": "dlandau",
			"creator_url": "/accounts/profile/dlandau",
			"pk": 1319,
			"description": "GSConnect is a complete implementation of KDE Connect especially for GNOME Shell with Nautilus, Chrome and Firefox integration. It does not rely on the KDE Connect desktop application and will not work with it installed.\n\nKDE Connect allows devices to securely share content like notifications or files and other features like SMS messaging and remote control. The KDE Connect team has applications for Linux, BSD, Android, Sailfish and Windows.\n\nPlease report issues on Github!",
			"link": "/extension/1319/gsconnect/",
			"icon": "/extension-data/icons/icon_1319_4X2QAtk.png",
			"screenshot": "/extension-data/screenshots/screenshot_1319_1NByhZ8.png",
			"shell_version_map": {
				"40": {
					"pk": 25303,
					"version": 47
				},
				"41": {
					"pk": 30306,
					"version": 49
				},
				"42": {
					"pk": 30321,
					"version": 50
				},
				"3.24": {
					"pk": 8326,
					"version": 12
				},
				"3.26": {
					"pk": 8326,
					"version": 12
				},
				"3.28": {
					"pk": 12823,
					"version": 28
				},
				"3.30": {
					"pk": 12823,
					"version": 28
				},
				"3.32": {
					"pk": 12823,
					"version": 28
				},
				"3.34": {
					"pk": 14243,
					"version": 33
				},
				"3.36": {
					"pk": 30336,
					"version": 53
				},
				"3.38": {
					"pk": 30333,
					"version": 51
				}
			}
		},
		{
			"uuid": "extension-list@tu.berry",
			"name": "Extension List",
			"creator": "grroot",
			"creator_url": "/accounts/profile/grroot",
			"pk": 3088,
			"description": "Simple GNOME Shell extension manager in the top panel\n\nFor support, please report any issues via the homepage link below.",
			"link": "/extension/3088/extension-list/",
			"icon": "/extension-data/icons/icon_3088_kg3nMr4.png",
			"screenshot": "/extension-data/screenshots/screenshot_3088_qvsLsl1.png",
			"shell_version_map": {
				"40": {
					"pk": 25767,
					"version": 27
				},
				"41": {
					"pk": 27392,
					"version": 29
				},
				"42": {
					"pk": 30107,
					"version": 30
				},
				"3.36": {
					"pk": 20063,
					"version": 19
				},
				"3.38": {
					"pk": 23066,
					"version": 25
				}
			}
		},
		{
			"uuid": "drive-menu@gnome-shell-extensions.gcampax.github.com",
			"name": "Removable Drive Menu",
			"creator": "fmuellner",
			"creator_url": "/accounts/profile/fmuellner",
			"pk": 7,
			"description": "A status menu for accessing and unmounting removable devices.",
			"link": "/extension/7/removable-drive-menu/",
			"icon": "/extension-data/icons/icon_7.png",
			"screenshot": "/extension-data/screenshots/screenshot_7_H2ZqrXt.png",
			"shell_version_map": {
				"40": {
					"pk": 24969,
					"version": 47
				},
				"41": {
					"pk": 28469,
					"version": 50
				},
				"42": {
					"pk": 29909,
					"version": 51
				},
				"3.2": {
					"pk": 287,
					"version": 6
				},
				"3.2.0": {
					"pk": 7,
					"version": 1
				},
				"3.3.2": {
					"pk": 36,
					"version": 3
				},
				"3.2.1": {
					"pk": 53,
					"version": 4
				},
				"3.2.2": {
					"pk": 58,
					"version": 5
				},
				"3.2.3": {
					"pk": 287,
					"version": 6
				},
				"3.3.3": {
					"pk": 499,
					"version": 7
				},
				"3.3.4": {
					"pk": 643,
					"version": 8
				},
				"3.3.90": {
					"pk": 834,
					"version": 9
				},
				"3.4": {
					"pk": 1011,
					"version": 10
				},
				"3.5.5": {
					"pk": 1693,
					"version": 11
				},
				"3.5.90": {
					"pk": 1739,
					"version": 12
				},
				"3.5.91": {
					"pk": 1810,
					"version": 13
				},
				"3.6": {
					"pk": 2215,
					"version": 15
				},
				"3.7.5": {
					"pk": 2492,
					"version": 17
				},
				"3.7.90": {
					"pk": 2563,
					"version": 18
				},
				"3.7.92": {
					"pk": 2643,
					"version": 19
				},
				"3.8": {
					"pk": 3218,
					"version": 22
				},
				"3.10": {
					"pk": 3249,
					"version": 23
				},
				"3.12": {
					"pk": 3741,
					"version": 24
				},
				"3.14": {
					"pk": 4333,
					"version": 25
				},
				"3.15.1": {
					"pk": 4458,
					"version": 26
				},
				"3.15.3": {
					"pk": 4575,
					"version": 27
				},
				"3.16": {
					"pk": 4758,
					"version": 28
				},
				"3.18": {
					"pk": 5207,
					"version": 29
				},
				"3.20": {
					"pk": 5759,
					"version": 30
				},
				"3.21.2": {
					"pk": 5976,
					"version": 31
				},
				"3.22": {
					"pk": 6207,
					"version": 32
				},
				"3.24": {
					"pk": 6682,
					"version": 33
				},
				"3.26": {
					"pk": 7474,
					"version": 35
				},
				"3.28": {
					"pk": 8120,
					"version": 37
				},
				"3.30": {
					"pk": 8383,
					"version": 38
				},
				"3.32": {
					"pk": 10207,
					"version": 40
				},
				"3.34": {
					"pk": 13369,
					"version": 42
				},
				"3.36": {
					"pk": 14378,
					"version": 43
				},
				"3.38": {
					"pk": 21654,
					"version": 45
				},
				"40.0": {
					"pk": 22829,
					"version": 46
				}
			}
		},
		{
			"uuid": "date-menu-formatter@marcinjakubowski.github.com",
			"name": "Date Menu Formatter",
			"creator": "mjakubowski",
			"creator_url": "/accounts/profile/mjakubowski",
			"pk": 4655,
			"description": "Allows customization of the date display in the panel.\n\nMight be especially useful if you're using a horizontal panel which does not at all work well with the default date display.\n\nCHANGELOG\nVersion 5: added support for multiple Dash To Panel panels\nVersion 6: fixed issues on earlier Gnome Shell versions",
			"link": "/extension/4655/date-menu-formatter/",
			"icon": "/static/images/plugin.png",
			"screenshot": "/extension-data/screenshots/screenshot_4655_k7VWDPx.png",
			"shell_version_map": {
				"40": {
					"pk": 31494,
					"version": 7
				},
				"41": {
					"pk": 31494,
					"version": 7
				},
				"42": {
					"pk": 31494,
					"version": 7
				}
			}
		},
		{
			"uuid": "appindicatorsupport@rgcjonas.gmail.com",
			"name": "AppIndicator and KStatusNotifierItem Support",
			"creator": "3v1n0",
			"creator_url": "/accounts/profile/3v1n0",
			"pk": 615,
			"description": "Adds AppIndicator, KStatusNotifierItem and legacy Tray icons support to the Shell",
			"link": "/extension/615/appindicator-support/",
			"icon": "/static/images/plugin.png",
			"screenshot": "/extension-data/screenshots/screenshot_615.png",
			"shell_version_map": {
				"40": {
					"pk": 29801,
					"version": 42
				},
				"41": {
					"pk": 29801,
					"version": 42
				},
				"42": {
					"pk": 29801,
					"version": 42
				},
				"3.6": {
					"pk": 2779,
					"version": 8
				},
				"3.8": {
					"pk": 4670,
					"version": 15
				},
				"3.7.92": {
					"pk": 2779,
					"version": 8
				},
				"3.10": {
					"pk": 4670,
					"version": 15
				},
				"3.12": {
					"pk": 4670,
					"version": 15
				},
				"3.14": {
					"pk": 4670,
					"version": 15
				},
				"3.16": {
					"pk": 10006,
					"version": 26
				},
				"3.18": {
					"pk": 10006,
					"version": 26
				},
				"3.17.91": {
					"pk": 10006,
					"version": 26
				},
				"3.20": {
					"pk": 10006,
					"version": 26
				},
				"3.22": {
					"pk": 10006,
					"version": 26
				},
				"3.24": {
					"pk": 10006,
					"version": 26
				},
				"3.26": {
					"pk": 10006,
					"version": 26
				},
				"3.32": {
					"pk": 10318,
					"version": 29
				},
				"3.28": {
					"pk": 10006,
					"version": 26
				},
				"3.30": {
					"pk": 10006,
					"version": 26
				},
				"3.34": {
					"pk": 29801,
					"version": 42
				},
				"3.36": {
					"pk": 29801,
					"version": 42
				},
				"3.38": {
					"pk": 29801,
					"version": 42
				},
				"40.beta": {
					"pk": 23000,
					"version": 36
				}
			}
		},
		{
			"uuid": "places-menu@gnome-shell-extensions.gcampax.github.com",
			"name": "Places Status Indicator",
			"creator": "fmuellner",
			"creator_url": "/accounts/profile/fmuellner",
			"pk": 8,
			"description": "Add a menu for quickly navigating places in the system.\nThis extension is part of Classic Mode and is officially supported by GNOME. Please do not report bugs using the form below, use GNOME's GitLab instance instead.",
			"link": "/extension/8/places-status-indicator/",
			"icon": "/extension-data/icons/icon_8.png",
			"screenshot": "/extension-data/screenshots/screenshot_8_mVLeGic.png",
			"shell_version_map": {
				"40": {
					"pk": 24965,
					"version": 51
				},
				"41": {
					"pk": 28475,
					"version": 53
				},
				"42": {
					"pk": 29916,
					"version": 54
				},
				"3.2": {
					"pk": 289,
					"version": 5
				},
				"3.2.0": {
					"pk": 8,
					"version": 1
				},
				"3.3.2": {
					"pk": 39,
					"version": 3
				},
				"3.2.1": {
					"pk": 54,
					"version": 4
				},
				"3.2.3": {
					"pk": 289,
					"version": 5
				},
				"3.3.3": {
					"pk": 501,
					"version": 6
				},
				"3.3.4": {
					"pk": 644,
					"version": 7
				},
				"3.3.90": {
					"pk": 836,
					"version": 8
				},
				"3.4": {
					"pk": 1214,
					"version": 10
				},
				"3.5.5": {
					"pk": 1695,
					"version": 11
				},
				"3.5.90": {
					"pk": 1741,
					"version": 12
				},
				"3.5.91": {
					"pk": 1812,
					"version": 13
				},
				"3.6": {
					"pk": 2968,
					"version": 22
				},
				"3.7.5": {
					"pk": 2495,
					"version": 18
				},
				"3.7.90": {
					"pk": 2566,
					"version": 19
				},
				"3.7.92": {
					"pk": 2646,
					"version": 20
				},
				"3.8": {
					"pk": 3221,
					"version": 24
				},
				"3.10": {
					"pk": 3252,
					"version": 25
				},
				"3.12": {
					"pk": 3744,
					"version": 26
				},
				"3.14": {
					"pk": 4331,
					"version": 27
				},
				"3.15.1": {
					"pk": 4462,
					"version": 28
				},
				"3.15.3": {
					"pk": 4579,
					"version": 29
				},
				"3.16": {
					"pk": 4762,
					"version": 30
				},
				"3.18": {
					"pk": 5210,
					"version": 31
				},
				"3.20": {
					"pk": 5763,
					"version": 32
				},
				"3.21.2": {
					"pk": 5979,
					"version": 33
				},
				"3.22": {
					"pk": 6204,
					"version": 34
				},
				"3.24": {
					"pk": 6866,
					"version": 36
				},
				"3.26": {
					"pk": 7471,
					"version": 38
				},
				"3.28": {
					"pk": 8116,
					"version": 40
				},
				"3.30": {
					"pk": 8386,
					"version": 41
				},
				"3.32": {
					"pk": 10216,
					"version": 43
				},
				"3.34": {
					"pk": 13339,
					"version": 45
				},
				"3.36": {
					"pk": 14390,
					"version": 46
				},
				"3.38": {
					"pk": 21663,
					"version": 48
				},
				"40.0": {
					"pk": 22823,
					"version": 50
				}
			}
		},
		{
			"uuid": "CoverflowAltTab@palatis.blogspot.com",
			"name": "Coverflow Alt-Tab",
			"creator": "dsheeler",
			"creator_url": "/accounts/profile/dsheeler",
			"pk": 97,
			"description": "Replacement of Alt-Tab, iterates through windows in a cover-flow manner.",
			"link": "/extension/97/coverflow-alt-tab/",
			"icon": "/extension-data/icons/icon_97_2.png",
			"screenshot": "/extension-data/screenshots/screenshot_97_7.png",
			"shell_version_map": {
				"40": {
					"pk": 27362,
					"version": 49
				},
				"41": {
					"pk": 27362,
					"version": 49
				},
				"42": {
					"pk": 32700,
					"version": 54
				},
				"3.2.1": {
					"pk": 441,
					"version": 8
				},
				"3.2": {
					"pk": 1125,
					"version": 12
				},
				"3.4": {
					"pk": 8317,
					"version": 33
				},
				"3.6": {
					"pk": 8317,
					"version": 33
				},
				"3.8": {
					"pk": 8317,
					"version": 33
				},
				"3.10": {
					"pk": 8317,
					"version": 33
				},
				"3.12": {
					"pk": 8317,
					"version": 33
				},
				"3.14": {
					"pk": 8317,
					"version": 33
				},
				"3.16": {
					"pk": 8317,
					"version": 33
				},
				"3.18": {
					"pk": 8317,
					"version": 33
				},
				"3.20": {
					"pk": 8317,
					"version": 33
				},
				"3.21.91": {
					"pk": 6184,
					"version": 26
				},
				"3.22": {
					"pk": 8317,
					"version": 33
				},
				"3.24": {
					"pk": 8317,
					"version": 33
				},
				"3.26": {
					"pk": 8317,
					"version": 33
				},
				"3.28": {
					"pk": 8514,
					"version": 36
				},
				"3.30": {
					"pk": 16855,
					"version": 42
				},
				"3.32": {
					"pk": 16855,
					"version": 42
				},
				"3.34": {
					"pk": 16855,
					"version": 42
				},
				"3.36": {
					"pk": 19141,
					"version": 44
				},
				"3.38": {
					"pk": 19141,
					"version": 44
				}
			}
		},
		{
			"uuid": "sound-output-device-chooser@kgshank.net",
			"name": "Sound Input & Output Device Chooser",
			"creator": "kgshank",
			"creator_url": "/accounts/profile/kgshank",
			"pk": 906,
			"description": "Shows a list of sound output and input devices (similar to gnome sound settings) in the status menu below the volume slider. Various active ports like HDMI , Speakers etc. of the same device are also displayed for selection. V20+ needs python as dependency. If you want to continue with the old method without Python, use options to switch off New Port identification. But it works with only English",
			"link": "/extension/906/sound-output-device-chooser/",
			"icon": "/extension-data/icons/icon_906.png",
			"screenshot": "/extension-data/screenshots/screenshot_906.png",
			"shell_version_map": {
				"40": {
					"pk": 31779,
					"version": 43
				},
				"41": {
					"pk": 31779,
					"version": 43
				},
				"42": {
					"pk": 31779,
					"version": 43
				},
				"3.14": {
					"pk": 4834,
					"version": 3
				},
				"3.16": {
					"pk": 4834,
					"version": 3
				},
				"3.18": {
					"pk": 8531,
					"version": 17
				},
				"3.20": {
					"pk": 8531,
					"version": 17
				},
				"3.22": {
					"pk": 8531,
					"version": 17
				},
				"3.24": {
					"pk": 8531,
					"version": 17
				},
				"3.26": {
					"pk": 8531,
					"version": 17
				},
				"3.28": {
					"pk": 8531,
					"version": 17
				},
				"3.30": {
					"pk": 8531,
					"version": 17
				},
				"3.34": {
					"pk": 31779,
					"version": 43
				},
				"3.32": {
					"pk": 31779,
					"version": 43
				},
				"3.36": {
					"pk": 31779,
					"version": 43
				},
				"3.38": {
					"pk": 31779,
					"version": 43
				}
			}
		}
	],
	"total": 10,
	"numpages": 51
}

export const extensions = {
	...sampleExtensions,
	extensions: sampleExtensions.extensions.map(normalizeExtension)
}
