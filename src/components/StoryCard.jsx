import React from "react";
import { useNavigate } from "react-router-dom";
import { ExternalLink, MessageCircle, User, Clock, TrendingUp } from "lucide-react";

export const StoryCard = ({ story, index }) => {
  const navigate = useNavigate();

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

  const isAskOrShowHN = story.title.toLowerCase().startsWith("ask hn:") || story.title.toLowerCase().startsWith("show hn:");

  const hasComments = story.descendants && story.descendants > 0;

  const handleCommentsClick = () => {
    if (hasComments) {
      navigate(`/story/${story.id}`);
    }
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 hover:border-orange-200 hover:shadow-md transition-all duration-200 overflow-hidden">
      <div className="p-6">
        <div className="flex items-start space-x-4">
          <div className="flex-shrink-0">
            <div className="w-8 h-8 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg flex items-center justify-center font-bold text-sm text-gray-600">{index + 1}</div>
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between">
              <h3 className="text-lg font-semibold text-gray-900 group-hover:text-orange-600 transition-colors duration-200 leading-tight">
                {isAskOrShowHN ? (
                  <span className="cursor-pointer">{story.title}</span>
                ) : (
                  <a href={story.url} target="_blank" className="hover:underline flex items-center gap-2 group">
                    {story.title}
                    <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                )}
              </h3>
            </div>

            {story.url && !isAskOrShowHN && <p className="text-sm text-gray-500 mt-1">{formatUrl(story.url)}</p>}

            {story.text && <div className="mt-3 text-sm text-gray-700 prose prose-sm max-w-none" />}

            <div className="flex items-center space-x-4 mt-3 text-sm text-gray-500">
              <div className="flex items-center space-x-1">
                <TrendingUp className="w-4 h-4" />
                <span className="font-medium">{story.score}</span>
                <span>points</span>
              </div>

              <div className="flex items-center space-x-1">
                <User className="w-4 h-4" />
                <span>{story.by}</span>
              </div>

              <div className="flex items-center space-x-1">
                <Clock className="w-4 h-4" />
                <span>{formatTime(story.time)}</span>
              </div>

              {hasComments && (
                <button onClick={handleCommentsClick} className="flex items-center space-x-1 hover:text-orange-600 transition-colors cursor-pointer hover:bg-orange-50 px-2 py-1 rounded-md">
                  <MessageCircle className="w-4 h-4" />
                  <span className="font-medium">{story.descendants} comments</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
