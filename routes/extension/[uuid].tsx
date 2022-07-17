/** @jsx h */
/** @jsxFrag Fragment */

import { Head } from "$fresh/runtime.ts"
import { h, Fragment } from "preact";
import { HandlerContext, PageProps } from "$fresh/server.ts";

import { GNOMEExtensions } from "~/components/icons.tsx";
import { Link, Button } from "~/components/button.tsx";

import Comments from "~/islands/comments.tsx";

import { Remove, Settings, } from "~/components/adwaita.tsx";
import { Extension, Comment, getExtension, getComments, normalizeExtension } from "~/lib/api.ts";

interface NeedsExtension {
  extension: Extension;
}

const Header = ({ extension }: NeedsExtension) => {
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

export const Details = ({ extension }: NeedsExtension) => {
  return <>
    <h2>Description</h2>
    <p>
      {extension.description}
    </p>
  </>
}

type CheckboxProps = h.JSX.HTMLAttributes;

const Checkbox = ({ defaultChecked, onChange, children }: CheckboxProps) => {
  return <span className="checkbox-box">
    <input type="checkbox" checked={defaultChecked} onChange={onChange} className="checkbox" />
  </span>
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
