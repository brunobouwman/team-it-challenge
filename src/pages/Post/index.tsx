import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Card from "../../components/Card";
import { useBaseContext } from "../../contexts";
import { IComment, ILocation, IPost } from "../../types/common";
import { fetchComments } from "../../utils";
import { paths } from "../../utils/paths";
import { Container, NavigationContainer } from "./styles";

export enum Directions {
  LEFT = "left",
  RIGHT = "right",
}

const Post: React.FC = () => {
  const location = useLocation();
  const selectedPost = location.state as ILocation;
  const [featured, setFeatured] = useState<IPost>(selectedPost.post);
  const [comments, setComments] = useState<IComment[]>();
  const basePath = `@blog/${paths.filter((path) => path.includes("posts"))[0]}`;
  const { getPosts } = useBaseContext();

  useEffect(() => {
    const cachedPosts = localStorage.getItem(basePath);
    if (!cachedPosts) return;

    const parsedPosts: IPost[] = JSON.parse(cachedPosts);

    const featuredPost = parsedPosts.filter((post) => post.id === featured.id);

    if (featuredPost.length === 0 || featuredPost.length > 1) return;

    setComments(featuredPost[0].comments);
  }, [featured, basePath]);

  useEffect(() => {
    (async () => {
      const response = await fetchComments(featured.id);
      Array.isArray(response) && setComments(response);
    })();
  }, [featured]);

  const handleClick = async (direction: Directions) => {
    const postIndex = getPosts().findIndex((post) => post.id === featured.id);

    if (postIndex === -1) return;

    let newIndex: number;
    switch (direction) {
      case Directions.LEFT:
        newIndex = postIndex - 1;
        if (newIndex < 0) {
          setFeatured(getPosts()[getPosts().length - 1]);
        } else setFeatured(getPosts()[postIndex - 1]);
        break;

      case Directions.RIGHT:
        newIndex = postIndex + 1;
        if (newIndex >= getPosts().length - 1) {
          setFeatured(getPosts()[0]);
        } else setFeatured(getPosts()[newIndex]);
    }
  };

  return (
    <Container>
      <NavigationContainer position={Directions.LEFT}>
        <span onClick={handleClick.bind(null, Directions.LEFT)}>LEFT</span>
      </NavigationContainer>
      <Card
        content={featured}
        isFeatured={true}
        comments={comments}
        updateComment={setComments}
      />
      <NavigationContainer position={Directions.RIGHT}>
        <span onClick={handleClick.bind(null, Directions.RIGHT)}>RIGHT</span>
      </NavigationContainer>
    </Container>
  );
};

export default Post;
