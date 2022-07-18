import { HandlerContext } from "$fresh/server.ts";

const API_URL = "https://extensions.gnome.org/";

export const handler = async (
  req: Request,
  _ctx: HandlerContext,
): Promise<Response> => {
  let href = new URL(req.url).searchParams.get("href");
  if (!href) {
    return new Response("No HREF provided", { status: 500 });
  }
  href = decodeURIComponent(href);
  try {
    const url = new URL(href, API_URL);
    const response = await fetch(url.href, {
      headers: {
        Origin: API_URL,
      },
    });
    if (!response.ok) {
      return new Response(response.statusText, { status: response.status });
    }
    return new Response(await response.text(), {
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    return new Response(error.message, { status: 500 });
  }
};
