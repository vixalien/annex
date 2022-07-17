/** @jsx h */
/** @jsxFrag Fragment */

import { Head } from "$fresh/runtime.ts"
import { h, Fragment } from "preact";

import { GNOMEExtensions } from "./icons.tsx";
import { Link } from "./button.tsx";

import { Extension } from "~/lib/api.ts";

interface NeedsExtension {
  extension: Extension;
}

export const Header = ({ extension }: NeedsExtension) => {
  return <>
    <Head>
      <link href="/extension.css" rel="stylesheet"></link>
    </Head>
    <header>
      <div className="bar">
        <Link href="/" className="logo">
          <GNOMEExtensions />
        </Link>
        <nav>
          <ul>
            <li>
              <Link href="/local">Installed Extensions</Link>
            </li>
            <li>
              <Link href="/about">About</Link>
            </li>
          </ul>
        </nav>
      </div>
      <div className="banderole">
        <div className="icon">
          <img
            src={extension.icon}
          />
        </div>
        <h1 className="title">
          {extension.name}
        </h1>
      </div>
    </header>
  </>
}
