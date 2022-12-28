import React, { useEffect } from "react";
import { useBaseContext } from "../../contexts";
import api, { Endpoints } from "../../services/api";
import { IPost } from "../../types/common";
import { paths } from "../../utils/paths";
import NavBar from "../NavBar";
import { Container, Content } from "./styles";

interface ILayout {
  children: React.ReactNode;
}

const Layout: React.FC<ILayout> = ({ children }) => {
  const { setFavorites, getPosts, setPosts } = useBaseContext();
  const favoritesPath = `@blog/${
    paths.filter((path) => path.includes("favorites"))[0]
  }`;
  const postsPath = `@blog/${
    paths.filter((path) => path.includes("posts"))[0]
  }`;

  useEffect(() => {
    const cachedPosts = localStorage.getItem(postsPath);

    if (!cachedPosts) return;

    const parsedPosts: IPost[] = JSON.parse(cachedPosts);
    setPosts(parsedPosts);
  }, []);

  useEffect(() => {
    (async () => {
      const fetchedPosts = await api.get({
        endpoint: Endpoints.LOCAL,
      });

      if (Array.isArray(fetchedPosts)) {
        //TODO: Sort Array into newest first
        // console.log(
        //   fetchedPosts
        //     .sort(
        //       (a, b) =>
        //         Number(a.publish_date.substring(5, 7)) +
        //         Number(b.publish_date.substring(5, 7))
        //     )
        //     .sort((a, b) =>
        //       Number(
        //         a.publish_date.substring(8, 10) +
        //           Number(b.publish_date.substring(8, 10))
        //       )
        //     )
        // );
        setPosts(fetchedPosts);
        localStorage.setItem(postsPath, JSON.stringify(fetchedPosts));
      }
    })();
  }, []);

  useEffect(() => {
    if (getPosts.length === 0) return;

    const cachedFavorites = localStorage.getItem(favoritesPath);

    if (!cachedFavorites) return;

    const parsedFavorites: number[] = JSON.parse(cachedFavorites);
    let favoriteBuffer: IPost[] = [];

    parsedFavorites.forEach((fav) => {
      const filteredFav = getPosts().filter((post) => post.id === fav);
      filteredFav && favoriteBuffer.push(filteredFav[0]);
    });

    setFavorites(favoriteBuffer);
  }, [getPosts()]);

  return (
    <Container>
      <NavBar />
      <Content>{children}</Content>
    </Container>
  );
};

export default Layout;
