# Annex

A site that provides GNOME Shell Extensions in a fashion similar to the [GNOME Apps](https://apps.gnome.org) website.

Even if this project was made to make the extensions experience more smooth and good-looking, the official [GNOME Extensions website](https://extensions.gnome.org) is probably the one you are looking on as it actually works, and is operated by the GNOME team.

This project has a few quirks:

1. It uses Deno (and Typescript hence)
2. It uses the [Fresh](https://fresh.deno.dev) next-gen web framework
3. It uses _plain CSS_ (no SASS and/or transpilers).
4. It accesses the GNOME Extensions API (undocumented, I don't know if it is even allowed to use the API but Extension Manager uses it so...)
5. **Does not work.** This is a demo at least for now. It can't manage or install extensions (yet, until I figure out how to use the GNOME Extensions Add-on bindings)

### TODO

If you are looking to contribute, here are a few things that would like to be implemented:

1. Actually install apps.
2. Add documentation (on how to use site)
3. Add a large & legible warning that this site is not operated, endorsed and whatnot by the GNOME team (yet, I hope).
4. Update the site's meta (favicon and title)
5. Add metadata for GNOME extension pages (og-title, twitter-description) for SEO
6. Add a footer (at the bottom of pages)

### Proxy

The aforementioned undocumented GNOME extensions API only accepts HTTPS requests from `https://extensions.gnome.org`. This means that in a browser, you can't make requests to the API endpoints because of security reasons (CORS). This means that all API calls have to be made through a simple proxy (located at `lib/api/proxy`) and all this does is spoof the request and change the `Origin` header to `https://extensions.gnome.org/` to allow for the API endpoint to give us results.

Annex can also use a dedicated proxy that serves the GNOME extensions website without the CORS limitations by setting the `ANNEX_PROXY_URL`.

There are no plans on how it will work in the future but the proxy is a very good solution (and I hope, legal).

### Usage


The project uses Deno (a Javascript runtime/environment, similar to Node & Bun but cooler 🦕) so it requires it to be installed. You can install Deno following instructions on the [deno.land website](https://deno.land).

You need to provide the `URL` environment variable, so that it can do requests to the API proxy.

Start the project:

```
deno task start
```

This will watch the project directory and restart as necessary.
