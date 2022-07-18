/** @jsx h */
/** @jsxFrag Fragment */

import { h, Fragment } from "preact";
import { Head } from "$fresh/runtime.ts"
import { HandlerContext, PageProps } from "$fresh/server.ts";

import { Banner } from "~/components/banner.tsx"
import { Header } from "~/components/header.tsx"

import ExtensionsSection from "~/islands/extensions.tsx"

import { searchExtensions, SearchResult, normalizeSearchResult } from "~/lib/api.ts";

export default function Home(props: PageProps<ReturnedPageProps>) {

  return (
    <>
      <Head>
        <link href="/css/common.css" rel="stylesheet"></link>
        <link href="/css/components/header.css" rel="stylesheet"></link>
        <link href="/css/components/card.css" rel="stylesheet"></link>
        <link href="/css/components/search-bar.css" rel="stylesheet"></link>
        <link href="/css/home.css" rel="stylesheet"></link>
      </Head>
      <Header
        links={{
          "Installed Extensions": "/local",
          "About": "/about",
        }}
        title="GNOME Extensions"
        image={<Banner />}
        subtitle="Discover the best extensions in the GNOME ecosystem and learn how to get involved."
      />
      <main>
        <ExtensionsSection initialSearchResult={props.data.initialSearchResult}/>
      </main>
    </>
  );
}

interface ReturnedPageProps {
  initialSearchResult: SearchResult;
}

export const handler = async (_req: Request, ctx: HandlerContext): Promise<Response> => {
  const searchResult = await searchExtensions();
  if (!searchResult) return new Response("Couldn't get extensions", {
    status: 404
  })
  return ctx.render({
    initialSearchResult: normalizeSearchResult(searchResult)
  })
};
