/** @jsx h */
/** @jsxFrag Fragment */
import { h, Fragment } from "preact";
import { Head } from "$fresh/runtime.ts"

import { Header } from "~/components/header.tsx"
import { Banner } from "~/components/banner.tsx"

export default function Home() {
  return (
    <>
      <Head>
        <link href="/css/common.css" rel="stylesheet"></link>
        <link href="/css/components/header.css" rel="stylesheet"></link>
        <link href="/css/components/card.css" rel="stylesheet"></link>
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
    </>
  );
}
