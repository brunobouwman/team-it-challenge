import { render, screen } from "@testing-library/react";
import Feed from "./Feed";

const content = [
  {
    id: 1,
    title: "Test Post 1",
    content: "Test content",
    description: "Test description",
    publish_date: "01/01/2021",
    author: "John Doe",
  },
  {
    id: 2,
    title: "Test Post 2",
    content: "Test content 2",
    description: "Test description 2",
    publish_date: "01/02/2021",
    author: "Jane Doe",
  },
];

test("renders Feed component", () => {
  render(<Feed content={content} />);

  content.forEach((post) => {
    expect(screen.getByText(post.title)).toBeInTheDocument();

    expect(screen.getByText(post.content)).toBeInTheDocument();

    expect(screen.getByText(post.description)).toBeInTheDocument();

    expect(screen.getByText(post.publish_date)).toBeInTheDocument();

    expect(screen.getByText(post.author)).toBeInTheDocument();
  });
});

test("displays correct layout based on layout prop", () => {
  const { container } = render(<Feed content={content} layout="grid" />);
  // eslint-disable-next-line testing-library/no-node-access
  expect(container.firstChild).toHaveClass("grid");

  const { container: container2 } = render(
    <Feed content={content} layout="list" />
  );
  // eslint-disable-next-line testing-library/no-node-access
  expect(container2.firstChild).toHaveClass("list");
});

test('displays "No posts to display" message if no content prop is passed', () => {
  render(<Feed content={[]} />);

  expect(screen.getByText("No posts to display")).toBeInTheDocument();
});
