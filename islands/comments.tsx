/** @jsx h */

import { h } from "preact";
import { useState, useEffect } from "preact/hooks";

import { Updating, Load } from "../components/adwaita.tsx";
import { Card } from "../components/card.tsx";
import { Button, Link } from "../components/button.tsx";
import { Rating } from "../components/rating.tsx";

import { Comment, getComments } from "../lib/api.ts";

interface CommentsProps {
  pk: number;
  initialComments?: Comment[];
}

const Comments = ({ pk, initialComments }: CommentsProps) => {
  if (!pk) return null;

  const [loading_more, setLoadingMore] = useState(false);
  const [loaded_more, setLoadedMore] = useState(false);
  const [loading, setLoading] = useState(initialComments ? false : true);
  const [comments, setComments] = useState(initialComments || [] as Comment[]);

  useEffect(() => {
    if (initialComments) return;
    getComments(pk).then(comments => {
      setComments(comments);
      setLoading(false);
    });
  }, []);

  const loadMore = () => {
    setLoadingMore(true);
    getComments(pk, true).then(comments => {
      setComments(comments);
      setLoadingMore(false);
      setLoadedMore(true);
    });
  }

  if (loading) {
    return <div className="comments">
      <h3>User Reviews</h3>
      <div className="loading">
        <Updating /> <span>Loading comments...</span>
      </div>
    </div>;
  }

  // TODO: sanitize html
  return <div className="comments">
    <h3>User Reviews</h3>
    <div className="grid">
      {comments.map((comment, index) => {
        return <div className="comment" key={index}>
          <Card
            icon={
              <img
                className="avatar"
                src={comment.gravatar}
              />
            }
            title={comment.rating ? <Rating rating={comment.rating} /> : null}
            description={
              <p dangerouslySetInnerHTML={{ __html: comment.comment }} />
            }
            footnote={<span>
              by <Link href={comment.author.url}>@{comment.author.username}</Link>
            </span>}
            date={comment.date.timestamp}
          />
        </div>
      })}
    </div>
    {!loaded_more ? <div className="load-more">
      <Button
        icon={
          loading_more ? <Updating /> : <Load />
        }
        onClick={loadMore}
      >{
          loading_more ? "Loading More..." : "Load More"
        }</Button>
    </div> : null}
  </div>
}

export default Comments;
