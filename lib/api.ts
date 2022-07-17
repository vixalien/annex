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

export interface Extension {
  uuid: string;
  name: string;
  creator: string;
  creator_url: string;
  pk: number;
  description: string;
  link: string;
  icon: string;
  screenshot: string | undefined;
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

// extension info url
// https://extensions.gnome.org/extension-info/?uuid=gsconnect@andyholmes.github.io

const sampleExtension: Extension = {
  "uuid": "gsconnect@andyholmes.github.io",
  "name": "GSConnect",
  "creator": "dlandau",
  "creator_url": "/accounts/profile/dlandau",
  "pk": 1319,
  "description":
    "GSConnect is a complete implementation of KDE Connect especially for GNOME Shell with Nautilus, Chrome and Firefox integration. It does not rely on the KDE Connect desktop application and will not work with it installed.\n\nKDE Connect allows devices to securely share content like notifications or files and other features like SMS messaging and remote control. The KDE Connect team has applications for Linux, BSD, Android, Sailfish and Windows.\n\nPlease report issues on Github!",
  "link": "/extension/1319/gsconnect/",
  "icon": "/extension-data/icons/icon_1319_4X2QAtk.png",
  "screenshot": "/ex/extension-info/tension-data/screenshots/screenshot_1319_1NByhZ8.png",
  "shell_version_map": {
    "40": {
      "pk": 25303,
      "version": 47,
    },
    "41": {
      "pk": 30306,
      "version": 49,
    },
    "42": {
      "pk": 30321,
      "version": 50,
    },
    "3.24": {
      "pk": 8326,
      "version": 12,
    },
    "3.26": {
      "pk": 8326,
      "version": 12,
    },
    "3.28": {
      "pk": 12823,
      "version": 28,
    },
    "3.30": {
      "pk": 12823,
      "version": 28,
    },
    "3.32": {
      "pk": 12823,
      "version": 28,
    },
    "3.34": {
      "pk": 14243,
      "version": 33,
    },
    "3.36": {
      "pk": 30336,
      "version": 53,
    },
    "3.38": {
      "pk": 30333,
      "version": 51,
    },
  },
};

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

export const extension = normalizeExtension(sampleExtension);

const comments: Comment[] = [{
  "gravatar":
    "https://secure.gravatar.com/avatar/f2efecf11b2345dfb4ef5627e1b3430b?d=mm&s=70",
  "is_extension_creator": false,
  "comment":
    "<p>Working on Pop!_OS 22.04 The flatpak, available in the Pop!_Shop doesn&#x27;t even launch!</p>",
  "author": {
    "username": "Islamic.Audiobooks.Central",
    "url": "/accounts/profile/Islamic.Audiobooks.Central",
  },
  "date": { "timestamp": "2022-07-13T11:18:53", "standard": "July 13, 2022" },
  "rating": 5,
}, {
  "gravatar":
    "https://secure.gravatar.com/avatar/b7bac390764b8567fee99550d713f89f?d=mm&s=70",
  "is_extension_creator": false,
  "comment": "<p>Super useful utility!</p>",
  "author": {
    "username": "theCalcaholic",
    "url": "/accounts/profile/theCalcaholic",
  },
  "date": { "timestamp": "2022-07-11T17:19:07", "standard": "July 11, 2022" },
  "rating": 4,
}, {
  "gravatar":
    "https://secure.gravatar.com/avatar/81a5c34db4a6df4cf6784136805b30d6?d=mm&s=70",
  "is_extension_creator": false,
  "comment":
    "<p>Hi,<br>On May 21, 2022, I posted that the SFTP mount is not working for Gnome 42 Fedora 36. The situation is still the same. Please let me if you need any more inputs to debug.<br>Thanks,<br>Mallikarjun</p>",
  "author": { "username": "ms.patil", "url": "/accounts/profile/ms.patil" },
  "date": { "timestamp": "2022-06-28T11:50:49", "standard": "June 28, 2022" },
}, {
  "gravatar":
    "https://secure.gravatar.com/avatar/ad06e69f6525f4a2f88d6c93efde970f?d=mm&s=70",
  "is_extension_creator": false,
  "comment":
    "<p>When I really need it always fails, can&#x27;t send files, can&#x27;t mount. Only work to see my phone notifications. I don&#x27;t have time to see what happens, searching in forums, etc.</p>",
  "author": { "username": "Madbyte", "url": "/accounts/profile/Madbyte" },
  "date": { "timestamp": "2022-06-23T13:23:51", "standard": "June 23, 2022" },
  "rating": 1,
}, {
  "gravatar":
    "https://secure.gravatar.com/avatar/f85bf3f6fc0b0623dcfa2da111163def?d=mm&s=70",
  "is_extension_creator": false,
  "comment":
    "<p>Great extension, but I don&#x27;t know why it floods my log files until my disk is out of space, in Ubuntu 20.04.3 :(</p>",
  "author": {
    "username": "argentina2021",
    "url": "/accounts/profile/argentina2021",
  },
  "date": { "timestamp": "2022-06-22T12:59:42", "standard": "June 22, 2022" },
  "rating": 4,
}];

export const sampleComments = comments.map(comment => {
  comment.author = {
    ...comment.author,
    url: normalizeLink(comment.author.url),
  };
  return comment;
})

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
