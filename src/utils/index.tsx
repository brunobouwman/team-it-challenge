import api, { Endpoints } from "../services/api";
import { IComment, IPost } from "../types/common";

const cacheSetUp = async (path: string) => {
  let cacheBuffer: IPost[] = [];

  const fetchedPosts = await api.get({
    endpoint: Endpoints.LOCAL,
  });

  //TODO: Handle fetch error better
  if (!Array.isArray(fetchedPosts)) return;

  for (const post of fetchedPosts) {
    const fetchedComments = await fetchComments(post.id);
    const valueToStore = {
      ...post,
      comments: fetchedComments,
    };
    cacheBuffer.push(valueToStore);
  }
  const sortedPost = sortPosts(cacheBuffer);
  localStorage.setItem(path, JSON.stringify(sortedPost));
  return fetchedPosts;
};

const handleCache = (newCache: IComment[] | IComment, content: IPost) => {
  const cachedPosts = localStorage.getItem("@blog/posts");

  if (!cachedPosts) return;

  const parsedPosts: IPost[] = JSON.parse(cachedPosts);
  const filteredPosts = parsedPosts.filter((post) => post.id !== content.id);
  if (Array.isArray(newCache)) {
    const newValue = {
      ...content,
      comments: newCache,
    };
    filteredPosts.push(newValue);
    localStorage.setItem("@blog/posts", JSON.stringify(filteredPosts));
    return newCache;
  } else {
    const selectedComment = parsedPosts.find(
      (post) => post.id === content.id
    )?.comments;
    const commentIndex = selectedComment?.findIndex(
      (comment) => comment.id === newCache.id
    );

    if (commentIndex === -1 || typeof commentIndex === "undefined") return;

    const newValue = {
      ...content,
      comments: selectedComment?.splice(commentIndex, 1, newCache),
    };
    filteredPosts.push(newValue);
    localStorage.setItem("@blog/posts", JSON.stringify(filteredPosts));
    return selectedComment;
  }
};

const sortPosts = (posts: IPost[]) => {
  return posts
    .sort(
      (a, b) =>
        Number(a.publish_date.substring(0, 4)) -
        Number(b.publish_date.substring(0, 4))
    )
    .sort(
      (a, b) =>
        Number(a.publish_date.substring(5, 7)) -
        Number(b.publish_date.substring(5, 7))
    )
    .sort(
      (a, b) =>
        Number(a.publish_date.substring(8, 10)) -
        Number(b.publish_date.substring(8, 10))
    );
};

const fetchComments = async (id: number) => {
  const fetchedComments = await api.get({
    endpoint: Endpoints.LOCAL,
    comments: true,
    id: id,
  });

  return Array.isArray(fetchedComments) && fetchedComments;
};

export { fetchComments, cacheSetUp, handleCache };
