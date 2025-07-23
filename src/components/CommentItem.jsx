import React, { useState } from "react";
import { User, Clock, ChevronDown, ChevronRight } from "lucide-react";
import { useComments } from "../hooks/useComments";

export const CommentItem = ({ comment, depth = 0 }) => {
  const [showReplies, setShowReplies] = useState(false);
  const { comments: replies, loading } = useComments(showReplies && comment.kids ? comment.kids.slice(0, 5) : []);

  const formatTime = (timestamp) => {
    const now = Date.now() / 1000;
    const diff = now - timestamp;
    const hours = Math.floor(diff / 3600);
    const days = Math.floor(hours / 24);

    if (days > 0) return `${days}d ago`;
    if (hours > 0) return `${hours}h ago`;
    return `${Math.floor(diff / 60)}m ago`;
  };

  const hasReplies = comment.kids && comment.kids.length > 0;
  const maxDepth = 3;

  return (
    <div className={`${depth > 0 ? "ml-6 pl-4 border-l-2 border-gray-200" : ""}`}>
      <div className="bg-white rounded-lg p-4 shadow-sm">
        <div className="flex items-center space-x-2 text-xs text-gray-500 mb-2">
          <User className="w-3 h-3" />
          <span className="font-medium">{comment.by}</span>
          <Clock className="w-3 h-3" />
          <span>{formatTime(comment.time)}</span>
        </div>

        <div className="text-sm text-gray-700 prose prose-sm max-w-none" dangerouslySetInnerHTML={{ __html: comment.text }} />

        {hasReplies && depth < maxDepth && (
          <button onClick={() => setShowReplies(!showReplies)} className="flex items-center space-x-1 mt-3 text-xs text-orange-600 hover:text-orange-700 transition-colors">
            {showReplies ? <ChevronDown className="w-3 h-3" /> : <ChevronRight className="w-3 h-3" />}
            <span>
              {showReplies ? "Hide" : "Show"} {comment.kids?.length} replies
            </span>
          </button>
        )}
      </div>

      {showReplies && hasReplies && depth < maxDepth && (
        <div className="mt-3 space-y-3">
          {loading ? (
            <div className="flex justify-center py-2">
              <div className="w-4 h-4 border-2 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : (
            replies.map((reply) => <CommentItem key={reply.id} comment={reply} depth={depth + 1} />)
          )}
        </div>
      )}
    </div>
  );
};
