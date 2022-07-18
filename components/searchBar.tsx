/** @jsx h */

import { h } from "preact";
import cn from "classnames";

type SearchBarProps = Pick<h.JSX.HTMLAttributes<HTMLInputElement>, "placeholder" | "onInput"> & {
  search_icon?: any;
}

export const SearchBar = ({ placeholder, search_icon, onInput }: SearchBarProps) => {
  return <div className={cn("search-bar", { "has-icon": !!search_icon })}>
    { search_icon ? <span className="icon">{search_icon}</span> : null }
    <input type="text" placeholder={placeholder} onInput={onInput} />
  </div>
}
