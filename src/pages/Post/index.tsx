import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Card from "../../components/Card";
import { useBaseContext } from "../../contexts";
import api, { Endpoints } from "../../services/api";
import { IComment, ILocation, IPost } from "../../types/common";
import { Container } from "./styles";

enum Directions {
  LEFT = "left",
  RIGHT = "right",
}

const Post: React.FC = () => {
  const location = useLocation();
  const selectedPost = location.state as ILocation;
  const [featured, setFeatured] = useState<IPost>(selectedPost.post);
  const [comments, setComments] = useState<IComment[]>();
  const { getPosts } = useBaseContext();

  useEffect(() => {
    selectedPost.post && setFeatured(selectedPost.post);

    (async () => {
      const fetchedComments = await api.get({
        endpoint: Endpoints.LOCAL,
        comments: true,
        id: selectedPost.post.id,
      });

      if (Array.isArray(fetchedComments)) {
        setComments(fetchedComments);
      }
    })();
  }, []);

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
      <span onClick={handleClick.bind(null, Directions.LEFT)}>LEFT</span>
      <Card content={featured} isFeatured={true} comments={comments} />
      <span onClick={handleClick.bind(null, Directions.RIGHT)}>RIGHT</span>
    </Container>
  );
};

export default Post;
