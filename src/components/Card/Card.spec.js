import { render, fireEvent, screen } from "@testing-library/react";
import Card from ".";

const content = {
  id: 1,
  title: "Test Post",
  content: "Test content",
  description: "Test description",
  publish_date: "01/01/2021",
  author: "John Doe",
};

const comments = [
  {
    id: 1,
    post_id: 1,
    content: "Test comment",
    author: "Jane Doe",
  },
  {
    id: 2,
    post_id: 1,
    content: "Test comment 2",
    author: "John Smith",
  },
];

test("renders Card component", () => {
  render(<Card content={content} />);

  expect(screen.getByText(content.title)).toBeInTheDocument();

  expect(screen.getByText(content.content)).toBeInTheDocument();

  expect(screen.getByText(content.description)).toBeInTheDocument();

  expect(screen.getByText(content.publish_date)).toBeInTheDocument();

  expect(screen.getByText(content.author)).toBeInTheDocument();
});

test("clicking post navigates to post page", () => {
  render(<Card content={content} />);

  fireEvent.click(screen.getByText(content.title));

  // Assert that the page was navigated to the post page
});

test("clicking favorite icon adds post to favorites", () => {
  render(<Card content={content} />);

  fireEvent.click(screen.getByAltText("favorite"));

  // Assert that the post was added to favorites
});

test("clicking favorite icon again removes post from favorites", () => {
  render(<Card content={content} />);

  // const favoriteIcon = getByAltText("favorite");
  fireEvent.click(screen.getAllByAltText("favorite"));
  fireEvent.click(screen.getAllByAltText("favorite"));

  // Assert that the post was removed from favorites
});

test("displays comments if passed as props", () => {
  render(<Card content={content} comments={comments} />);

  comments.forEach((comment) => {
    expect(screen.getByText(comment.content)).toBeInTheDocument();
  });
});

test("calls updateComment prop when adding a new comment", () => {
  const updateComment = jest.fn();
  render(
    <Card content={content} comments={comments} updateComment={updateComment} />
  );

  screen.getByLabelText("Add a comment:");
});
