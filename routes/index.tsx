/** @jsx h */
/** @jsxFrag Fragment */
import { h, Fragment } from "preact";
import { Head } from "$fresh/runtime.ts"
import cn from "classnames";

import { Banner } from "~/components/banner.tsx"
import { Card } from "~/components/card.tsx"
import { Header } from "~/components/header.tsx"
import { Link } from "~/components/button.tsx"

import { extensions } from "~/lib/api.ts";

type SearchBarProps = h.JSX.HTMLAttributes & {
  icon?: any;
}

const SearchBar = ({ placeholder, icon, onChange }: SearchBarProps) => {
  return <div className={cn("search-bar", { "has-icon": !!icon })}>
    { icon ? <span className="icon">{icon}</span> : null }
    <input type="text" placeholder={placeholder} onChange={onChange} />
  </div>
}

const getExcerpt = (description: string) => {
  return description.split("\n")[0];
}

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
      <main>
        <h2 className="hero">Find Extensions</h2>
        <form>
          <SearchBar placeholder="Search Extensions"/>
        </form>
        <div className="cards">
          {extensions.extensions.map(extension => {
            return <Card
              title={extension.name}
              description={getExcerpt(extension.description)}
              icon={<img src={extension.icon} />}
              href={`/extension/${extension.uuid}`}
              footnote={<span>
                by <Link href={extension.creator_url}>@{extension.creator}</Link>
              </span>}
            />
          })}
        </div>
      </main>
    </>
  );
}
