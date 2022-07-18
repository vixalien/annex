/** @jsx h */

import { h } from "preact";
import { Starred, Unstarred } from "./adwaita.tsx";

export const Rating = ({ rating }: { rating: number }) => {
  const filled = Array(rating).fill(0);
  const unfilled = Array(5 - rating).fill(0);
  return (
    <div className="rating">
      {filled.map((_, index) => {
        return (
          <div className="star" key={index}>
            <Starred />
          </div>
        );
      })}
      {unfilled.map((_, index) => {
        return (
          <div className="star unfilled" key={index}>
            <Unstarred />
          </div>
        );
      })}
    </div>
  );
};
