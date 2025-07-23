import React from "react";
import { useComments } from "../hooks/useComments";
import { LoadingSpinner } from "./LoadingSpinner";
import { CommentItem } from "./CommentItem";

export const CommentsSection = ({ commentIds, storyId }) => {
  const { comments, loading, error } = useComments(commentIds.slice(0, 10));

  if (loading) {
    return (
      <div className="border-t border-gray-200 bg-gray-50 p-6">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="border-t border-gray-200 bg-gray-50 p-6">
        <p className="text-red-600 text-sm">Failed to load comments</p>
      </div>
    );
  }

  if (comments.length === 0) {
    return (
      <div className="border-t border-gray-200 bg-gray-50 p-6">
        <p className="text-gray-500 text-sm">No comments available</p>
      </div>
    );
  }

  return (
    <div className="border-t border-gray-200 bg-gray-50">
      <div className="p-6">
        <h4 className="font-semibold text-gray-900 mb-4">Comments ({commentIds.length})</h4>
        <div className="space-y-4">
          {comments.map((comment) => (
            <CommentItem key={comment.id} comment={comment} />
          ))}
          {commentIds.length > 10 && (
            <div className="pt-4 border-t border-gray-200">
              <a href={`https://news.ycombinator.com/item?id=${storyId}`} target="_blank" className="text-orange-600 hover:text-orange-700 text-sm font-medium">
                View all {commentIds.length} comments on Hacker News →
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
