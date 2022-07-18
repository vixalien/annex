/** @jsx h */

import { h } from "preact";
import { useState } from "preact/hooks";

import { Search, Updating } from "~/components/adwaita.tsx";
import { SearchBar } from "../components/searchBar.tsx";

import {
  normalizeSearchResult,
  searchExtensions,
  SearchResult,
} from "~/lib/api.ts";
import { debounce } from "~/lib/debounce.ts";

interface SearchFormProps {
  onResult: (result: SearchResult) => void;
  initialSearchResult?: SearchResult;
}

const SearchForm = ({ onResult }: SearchFormProps) => {
  const [searching, setSearching] = useState(false);
  const [previous, setPrevious] = useState("");

  const handleChange = (search: string) => {
    if (search.trim() === previous) return;
    setSearching(true);
    searchExtensions(search)
      .then((extensions) => {
        if (!extensions) alert("Couldn't search for extensions");
        return extensions as SearchResult;
      })
      .then(normalizeSearchResult)
      .then((result) => {
        setPrevious(search.trim());
        onResult(result);
      }).finally(() => {
        setSearching(false);
      });
  };

  const deboundedHandleChange = debounce(handleChange, 300, {
    leading: true,
  });

  return (
    <div>
      <SearchBar
        search_icon={searching ? <Updating /> : <Search />}
        placeholder="Search extensions"
        onInput={(e) => deboundedHandleChange(e.currentTarget.value)}
      />
    </div>
  );
};

export default SearchForm;
