import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, ExternalLink, User, Clock, TrendingUp, MessageCircle } from "lucide-react";
import { useStory } from "../hooks/useStory";
import { useComments } from "../hooks/useComments";
import { LoadingSpinner } from "../components/LoadingSpinner";
import { ErrorMessage } from "../components/ErrorMessage";
import { CommentItem } from "../components/CommentItem";

export const StoryPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const storyId = parseInt(id || "0");

  // Fetch only the specific story we need
  const { story, loading: storyLoading, error: storyError } = useStory(storyId);

  const { comments, loading: commentsLoading, error: commentsError } = useComments(story?.kids || []);

  const formatTime = (timestamp) => {
    const now = Date.now() / 1000;
    const diff = now - timestamp;
    const hours = Math.floor(diff / 3600);
    const days = Math.floor(hours / 24);

    if (days > 0) return `${days}d ago`;
    if (hours > 0) return `${hours}h ago`;
    return `${Math.floor(diff / 60)}m ago`;
  };

  const formatUrl = (url) => {
    try {
      const domain = new URL(url).hostname.replace("www.", "");
      return domain;
    } catch {
      return url;
    }
  };

  // Show loading state while fetching story
  if (storyLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <LoadingSpinner />
          <p className="mt-4 text-gray-600">Loading story...</p>
        </div>
      </div>
    );
  }

  // Show error state if story fetch failed
  if (storyError) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Failed to load story</h2>
          <p className="text-gray-600 mb-4">{storyError}</p>
          <button onClick={() => navigate("/")} className="inline-flex items-center space-x-2 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Home</span>
          </button>
        </div>
      </div>
    );
  }

  if (!story) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Story not found</h2>
          <p className="text-gray-600 mb-4">The story you're looking for doesn't exist.</p>
          <button onClick={() => navigate("/")} className="inline-flex items-center space-x-2 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Home</span>
          </button>
        </div>
      </div>
    );
  }

  const isAskOrShowHN = story.title.toLowerCase().startsWith("ask hn:") || story.title.toLowerCase().startsWith("show hn:");

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <button onClick={() => navigate("/")} className="inline-flex items-center space-x-2 text-gray-600 hover:text-orange-600 transition-colors mb-4">
            <ArrowLeft className="w-4 h-4" />
            <span className="font-medium">Back to Stories</span>
          </button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Story Details */}
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm mb-8">
          <div className="p-8">
            {/* Title */}
            <h1 className="text-2xl font-bold text-gray-900 leading-tight mb-4">
              {isAskOrShowHN ? (
                story.title
              ) : (
                <a href={story.url} target="_blank" className="hover:text-orange-600 transition-colors inline-flex items-center gap-2 group">
                  {story.title}
                  <ExternalLink className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              )}
            </h1>

            {/* URL */}
            {story.url && !isAskOrShowHN && (
              <p className="text-sm text-gray-500 mb-4">
                <a href={story.url} target="_blank" className="hover:text-orange-600 transition-colors">
                  {formatUrl(story.url)}
                </a>
              </p>
            )}

            {/* Story Text */}
            {story.text && <div className="prose prose-sm max-w-none mb-6 text-gray-700 leading-relaxed" />}

            {/* Meta Information */}
            <div className="flex flex-wrap items-center gap-6 text-sm text-gray-500 pt-4 border-t border-gray-100">
              <div className="flex items-center space-x-2">
                <TrendingUp className="w-4 h-4 text-orange-500" />
                <span className="font-medium text-gray-900">{story.score}</span>
                <span>points</span>
              </div>

              <div className="flex items-center space-x-2">
                <User className="w-4 h-4" />
                <span className="font-medium">{story.by}</span>
              </div>

              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4" />
                <span>{formatTime(story.time)}</span>
              </div>

              <div className="flex items-center space-x-2">
                <MessageCircle className="w-4 h-4" />
                <span className="font-medium">{story.descendants || 0}</span>
                <span>comments</span>
              </div>

              <a href={`https://news.ycombinator.com/item?id=${story.id}`} target="_blank" className="text-orange-600 hover:text-orange-700 font-medium">
                View on Hacker News →
              </a>
            </div>
          </div>
        </div>

        {/* Comments Section */}
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-xl font-semibold text-gray-900 flex items-center space-x-2">
              <MessageCircle className="w-5 h-5 text-orange-500" />
              <span>Comments ({story.descendants || 0})</span>
            </h2>
          </div>

          <div className="p-6">
            {commentsLoading ? (
              <div className="flex justify-center py-8">
                <LoadingSpinner />
              </div>
            ) : commentsError ? (
              <ErrorMessage message="Failed to load comments" />
            ) : comments.length === 0 ? (
              <div className="text-center py-12">
                <MessageCircle className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No comments yet</h3>
                <p className="text-gray-500">Be the first to start the discussion!</p>
              </div>
            ) : (
              <div className="space-y-6">
                {comments.map((comment) => (
                  <CommentItem key={comment.id} comment={comment} />
                ))}

                {story.kids && story.kids.length > comments.length && (
                  <div className="pt-6 border-t border-gray-100 text-center">
                    <a href={`https://news.ycombinator.com/item?id=${story.id}`} target="_blank" className="inline-flex items-center space-x-2 text-orange-600 hover:text-orange-700 font-medium">
                      <span>View all {story.descendants} comments on Hacker News</span>
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
