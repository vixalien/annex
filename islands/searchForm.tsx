/** @jsx h */

import { h } from "preact";
import { useState } from "preact/hooks";

import { Search, Updating } from "~/components/adwaita.tsx"
import { SearchBar } from "../components/searchBar.tsx";

import { SearchResult, searchExtensions, normalizeSearchResult } from "~/lib/api.ts";
import { debounce } from "~/lib/debounce.ts";

interface SearchFormProps {
  onResult: (result: SearchResult) => void;
  initialSearchResult?: SearchResult
}

const SearchForm = ({ onResult }: SearchFormProps) => {
  const [searching, setSearching] = useState(false);

  const handleChange = (search: string) => {
    setSearching(true);
    searchExtensions(search, {
      page: 1,
      shell_version: "all",
      search: search,
      sort: "downloads",
    })
      .then(normalizeSearchResult)
      .then(result => {
        onResult(result);
      }).finally(() => {
        setSearching(false);
      })
  }

  const deboundedHandleChange = debounce(handleChange, 300, {
    leading: true,
  })

  return <div>
    <SearchBar
      search_icon={searching ? <Updating /> : <Search />}
      placeholder="Search extensions"
      onInput={(e) => deboundedHandleChange(e.currentTarget.value)}
    />
  </div>
}

export default SearchForm;
