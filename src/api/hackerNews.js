const BASE_URL = "https://hacker-news.firebaseio.com/v0";

export const hackerNewsApi = {
  async getStoryIds(type) {
    const response = await fetch(`${BASE_URL}/${type}stories.json`);
    return response.json();
  },

  async getStory(id) {
    const response = await fetch(`${BASE_URL}/item/${id}.json`);
    return response.json();
  },

  async getComment(id) {
    const response = await fetch(`${BASE_URL}/item/${id}.json`);
    return response.json();
  },

  async getComments(commentIds) {
    const promises = commentIds.map((id) => this.getComment(id));
    const comments = await Promise.all(promises);
    return comments.filter((comment) => comment && !comment.deleted && !comment.dead);
  },

  async getStoriesBatch(ids) {
    const promises = ids.map((id) => this.getStory(id));
    const stories = await Promise.all(promises);
    return stories.filter((story) => story && story.title);
  },

  async searchStories(query, stories) {
    const lowercaseQuery = query.toLowerCase();
    return stories.filter((story) => story.title.toLowerCase().includes(lowercaseQuery) || story.by.toLowerCase().includes(lowercaseQuery));
  },
};
