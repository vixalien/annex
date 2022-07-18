// deno-lint-ignore-file no-explicit-any
/** @jsx h */
/** @jsxFrag Fragment */

import { Fragment, h } from "preact";

import { GNOMEExtensions } from "./icons.tsx";
import { Link } from "./button.tsx";

interface LinkMap {
  [key: string]: string;
}

interface HeaderProps {
  links: LinkMap;
  image: any;
  title: string;
  subtitle?: string;
}

export const Header = ({ title, image, links, subtitle }: HeaderProps) => {
  return (
    <>
      <header>
        <div className="bar">
          <Link href="/" className="logo">
            <GNOMEExtensions />
          </Link>
          <nav>
            <ul>
              {Object.entries(links).map(([key, href]) => {
                return (
                  <li>
                    <Link href={href}>{key}</Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>
        <div className="banderole">
          <div className="icon">
            {image}
          </div>
          <div className="header-text">
            <h1 className="title">
              {title}
            </h1>
            {subtitle ? <p>{subtitle}</p> : null}
          </div>
        </div>
      </header>
    </>
  );
};
