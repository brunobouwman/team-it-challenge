import React from "react";
import { IPost } from "../../types/common";
import Card from "../Card";
import { Container, NoFavorites } from "./styles";

interface IFeed {
  content: IPost[];
  layout: string;
}

const Feed: React.FC<IFeed> = ({ content, layout }) => {
  return (
    <Container layout={layout}>
      {content.length !== 0 ? (
        content.map((post) => (
          <Card content={post} key={post.id} isFeatured={false} />
        ))
      ) : (
        <NoFavorites>
          <h2>Favorited Posts will appear here...</h2>
        </NoFavorites>
      )}
    </Container>
  );
};

export default Feed;
