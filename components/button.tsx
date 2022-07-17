// deno-lint-ignore-file no-explicit-any
/** @jsx h */

import { h } from "preact";
import cn from "classnames";

export interface LinkProps {
  href?: string;
  children?: any;
  className?: string;
}

export const Link = ({ href, children, className }: LinkProps) => {
  return (
    <a href={href} className={className}>
      {children}
    </a>
  );
}

export interface ButtonProps {
  href?: string;
  children?: any;
  className?: string;
  error?: boolean;
  icon?: any;
  onClick?: h.JSX.HTMLAttributes["onClick"];
}

export const Button = ({ children, className, error, icon, onClick }: ButtonProps) => {
  return (
    <button className={cn(className, { error })} onClick={onClick}>
      {icon ? <div className="icon">{icon}</div> : null}
      <span>{children}</span>
    </button>
  );
}
