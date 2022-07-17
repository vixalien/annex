/** @jsx h */
/** @jsxFrag Fragment */

import { h, Fragment } from "preact";
import { HandlerContext, PageProps } from "$fresh/server.ts";

import { Remove, Settings, } from "~/components/adwaita.tsx";
import { Button } from "~/components/button.tsx";
import { Checkbox } from "~/components/checkbox.tsx";
import { Header } from "~/components/header.tsx";

import Comments from "~/islands/comments.tsx";

import { Extension, Comment, getExtension, getComments, normalizeExtension } from "~/lib/api.ts";

interface NeedsExtension {
  extension: Extension;
}

export const Details = ({ extension }: NeedsExtension) => {
  return <>
    <h2>Description</h2>
    <p>
      {extension.description}
    </p>
  </>
}

const Actions = ({ extension }: NeedsExtension) => {
  const installed = true;

  if (installed) {
    return <div className="actions">
      <Checkbox defaultChecked={true} />
      <Button icon={<Settings />}>Configure</Button>
      <Button error icon={<Remove />}>
        Uninstall
      </Button>
    </div>
  } else {
    return <div className="actions">
      <Button>Install</Button>
    </div>
  }
}

const Screenshot = ({ screenshot }: { screenshot?: string }) => {
  if (!screenshot) return null;
  return <div className="screenshot">
    <h3>Screenshot</h3>
    <img src={screenshot} />
  </div>
}

const Page = ({ data: { extension, comments } }: PageProps<ReturnedPageProps>) => {
  return <>
    <Header extension={extension} />
    <main>
      <Actions extension={extension} />
      <Details extension={extension} />
      <Screenshot screenshot={extension.screenshot} />
      <Comments pk={extension.pk} initialComments={comments} />
    </main>
  </>
}

export default Page;

interface ReturnedPageProps {
  extension: Extension;
  comments: Comment[];
}

export const handler = async (req: Request, ctx: HandlerContext): Promise<Response> => {
  const uuid = ctx.params.uuid;
  const extension = await getExtension(uuid);
  if (!extension) return new Response("Extension not found", {
    status: 404
  });
  const comments = await getComments(extension.pk);
  return ctx.render({
    extension: normalizeExtension(extension),
    comments
  })
};
