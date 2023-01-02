import React, { useEffect } from "react";
import { ThemeProvider } from "styled-components";
import theme from "./styles/theme";
import Layout from "./components/Layout";
import GlobalStyle from "./styles/global";
import Routes from "./routes";
import { useBaseContext } from "./contexts";
import { paths } from "./utils/paths";
import { IComment, IPost } from "./types/common";
import { cacheSetUp } from "./utils";

const App: React.FC = () => {
  const { setFavorites, setPosts, setCommentIndex } = useBaseContext();
  const postsPath = `@blog/${
    paths.filter((path) => path.includes("posts"))[0]
  }`;
  const favoritesPath = `@blog/${
    paths.filter((path) => path.includes("favorites"))[0]
  }`;

  useEffect(() => {
    const cachedPosts = localStorage.getItem(postsPath);
    let comments: IComment[] = [];

    if (!cachedPosts) return;

    const parsedPosts: IPost[] = JSON.parse(cachedPosts);
    for (const post of parsedPosts) {
      if (post.comments && post.comments.length > 0) {
        post.comments.forEach((comment) => comments.push(comment));
      }
    }
    const highestIndex = Math.max(...comments.map((comment) => comment.id));
    setCommentIndex(highestIndex > 0 ? highestIndex + 1 : 1);
    setPosts(parsedPosts);
  }, []);

  useEffect(() => {
    (async () => {
      const posts = await cacheSetUp(postsPath);
      if (!Array.isArray(posts)) return;

      setPosts(posts);
      const cachedFavorites = localStorage.getItem(favoritesPath);
      if (!cachedFavorites) return;

      const parsedFavorites: number[] = JSON.parse(cachedFavorites);
      let favoriteBuffer: IPost[] = [];

      parsedFavorites.forEach((fav) => {
        const filteredFav = posts.filter((post) => post.id === fav);
        filteredFav && favoriteBuffer.push(filteredFav[0]);
      });

      setFavorites(favoriteBuffer);
    })();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      {/* <Context> */}
      <Layout>
        <Routes />
      </Layout>
      {/* </Context> */}
    </ThemeProvider>
  );
};

export default App;
