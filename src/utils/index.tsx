import api, { Endpoints } from "../services/api";
import { IPost } from "../types/common";

const cacheSetUp = async (path: string) => {
  let cacheBuffer: IPost[] = [];

  const fetchedPosts = await api.get({
    endpoint: Endpoints.LOCAL,
  });

  //TODO: Handle fetch error better
  if (Array.isArray(fetchedPosts)) {
    //TODO: Sort Array into newest first

    for (const post of fetchedPosts) {
      const fetchedComments = await fetchComments(post.id);
      const valueToStore = {
        ...post,
        comments: fetchedComments,
      };
      cacheBuffer.push(valueToStore);
    }
    console.log("buf", cacheBuffer);
    localStorage.setItem(path, JSON.stringify(cacheBuffer));
    return fetchedPosts;
  }
};

const fetchComments = async (id: number) => {
  const fetchedComments = await api.get({
    endpoint: Endpoints.LOCAL,
    comments: true,
    id: id,
  });

  if (Array.isArray(fetchedComments)) {
    // setComments(fetchedComments);
    return fetchedComments;
  } else return undefined;
};

export { fetchComments, cacheSetUp };
