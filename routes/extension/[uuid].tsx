/** @jsx h */
/** @jsxFrag Fragment */

import { Fragment, h } from "preact";
import { Head } from "$fresh/runtime.ts";
import { HandlerContext, PageProps } from "$fresh/server.ts";

import { Remove, Settings } from "~/components/adwaita.tsx";
import { Button } from "~/components/button.tsx";
import { Checkbox } from "~/components/checkbox.tsx";
import { Header } from "~/components/header.tsx";

import Comments from "~/islands/comments.tsx";

import {
  Comment,
  Extension,
  getComments,
  getExtension,
  normalizeExtension,
} from "~/lib/api.ts";

interface NeedsExtension {
  extension: Extension;
}

export const Details = ({ extension }: NeedsExtension) => {
  return (
    <>
      <h2>Description</h2>
      <p>
        {extension.description}
      </p>
    </>
  );
};

const Actions = ({ extension }: NeedsExtension) => {
  const installed = true;

  if (installed) {
    return (
      <div className="actions">
        <Checkbox defaultChecked={true} />
        <Button icon={<Settings />}>Configure</Button>
        <Button error icon={<Remove />}>
          Uninstall
        </Button>
      </div>
    );
  } else {
    return (
      <div className="actions">
        <Button>Install</Button>
      </div>
    );
  }
};

const Screenshot = ({ screenshot }: { screenshot?: string | null }) => {
  if (!screenshot) return null;
  return (
    <div className="screenshot">
      <h3>Screenshot</h3>
      <img src={screenshot} />
    </div>
  );
};

const Page = (
  { data: { extension, comments } }: PageProps<ReturnedPageProps>,
) => {
  return (
    <>
      <Head>
        <link href="/css/common.css" rel="stylesheet"></link>
        <link href="/css/components/header.css" rel="stylesheet"></link>
        <link href="/css/components/button.css" rel="stylesheet"></link>
        <link href="/css/components/card.css" rel="stylesheet"></link>
        <link href="/css/components/checkbox.css" rel="stylesheet"></link>
        <link href="/css/extension.css" rel="stylesheet"></link>
      </Head>
      <Header
        image={<img src={extension.icon} />}
        title={extension.name}
        links={{
          "Installed Extensions": "/local",
          "About": "/about",
        }}
      />
      <main>
        <Actions extension={extension} />
        <Details extension={extension} />
        <Screenshot screenshot={extension.screenshot} />
        <Comments pk={extension.pk} initialComments={comments} />
      </main>
    </>
  );
};

export default Page;

interface ReturnedPageProps {
  extension: Extension;
  comments: Comment[];
}

export const handler = async (
  req: Request,
  ctx: HandlerContext,
): Promise<Response> => {
  const uuid = ctx.params.uuid;
  const extension = await getExtension(uuid);
  if (!extension) {
    return new Response("Extension not found", {
      status: 404,
    });
  }
  const comments = await getComments(extension.pk);
  return ctx.render({
    extension: normalizeExtension(extension),
    comments,
  });
};
