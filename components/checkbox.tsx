/** @jsx h */

import { h } from "preact";

type CheckboxProps = h.JSX.HTMLAttributes;

export const Checkbox = ({ defaultChecked, onChange, children }: CheckboxProps) => {
  return <span className="checkbox-box">
    <input type="checkbox" checked={defaultChecked} onChange={onChange} className="checkbox" />
  </span>
}
