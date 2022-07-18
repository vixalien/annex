/** @jsx h */
// deno-lint-ignore-file no-explicit-any

import { h } from "preact";
import { format } from "timeago.js";

interface CardProps {
  icon?: any;
  title?: any;
  description: any;
  href?: string;
  footnote?: any;
  date?: string;
}

export const Card = (
  { icon, title, description, href, footnote, date }: CardProps,
) => {
  return (
    <div className="card">
      {href
        ? (
          <a href={href} className="link-puffyfill">
            <span></span>
          </a>
        )
        : null}
      <div className="icon">
        {icon}
      </div>
      <div className="content">
        {title ? <h4>{title}</h4> : null}
        <div className="description">{description}</div>
        {footnote ? <p className="footnote">{footnote}</p> : null}
        {date
          ? (
            <div className="date">
              {format(date)}
            </div>
          )
          : null}
      </div>
    </div>
  );
};
