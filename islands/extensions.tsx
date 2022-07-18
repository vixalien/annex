/** @jsx h */

import { h } from "preact";
import { useState } from "preact/hooks";

import { Card } from "~/components/card.tsx";
import { Link } from "~/components/button.tsx";

import SearchForm from "./searchForm.tsx";

import { SearchResult } from "~/lib/api.ts";

interface ExtensionsProps {
  initialSearchResult?: SearchResult;
}

const getExcerpt = (description: string) => {
  return description.split("\n")[0];
};

const Extensions = ({ initialSearchResult }: ExtensionsProps) => {
  const [extensions, setExtensions] = useState(
    initialSearchResult?.extensions || [],
  );

  return (
    <div>
      <h2 className="hero">Find Extensions</h2>
      <SearchForm
        onResult={(result) => setExtensions(result.extensions)}
        initialSearchResult={initialSearchResult}
      />
      <div className="cards">
        {extensions.map((extension) => {
          return (
            <Card
              title={extension.name}
              description={getExcerpt(extension.description)}
              icon={<img src={extension.icon} />}
              href={`/extension/${extension.uuid}`}
              footnote={
                <span>
                  by{" "}
                  <Link href={extension.creator_url}>@{extension.creator}</Link>
                </span>
              }
            />
          );
        })}
      </div>
    </div>
  );
};

export default Extensions;
