import {
  render,
  fireEvent,
  waitFor,
  screen,
  act,
} from "@testing-library/react";
import CommentSection from "./CommentSection";

jest.mock("../../contexts", () => ({
  useBaseContext: () => ({
    getCommentIndex: jest.fn(),
    setCommentIndex: jest.fn(),
  }),
}));

jest.mock("../../services/api", () => ({
  get: jest.fn(() => Promise.resolve({ data: [] })),
  put: jest.fn(() => Promise.resolve({})),
}));

const comments = [
  {
    content: "Comment 1",
    date: "2022-01-01",
    id: 1,
    parent_id: null,
    postId: 1,
    user: "User 1",
  },
  {
    content: "Comment 2",
    date: "2022-01-02",
    id: 2,
    parent_id: 1,
    postId: 1,
    user: "User 2",
  },
  {
    content: "Comment 3",
    date: "2022-01-03",
    id: 3,
    parent_id: 2,
    postId: 1,
    user: "User 3",
  },
];

const content = {
  author: "Author",
  content: "Content",
  description: "Description",
  id: 1,
  publish_date: "2022-01-01",
  slug: "slug",
  title: "Title",
};

function renderCommentSection(props) {
  return render(<CommentSection {...props} />);
}

describe("CommentSection", () => {
  it("renders the correct number of comments", async () => {
    renderCommentSection({ comments, content });
    expect(screen.getAllByTestId("comment")).toHaveLength(3);
  });

  it("expands and collapses the comments", async () => {
    renderCommentSection({ comments, content });
    fireEvent.click(screen.getByTestId("expand-button"));
    await waitFor(() => {
      expect(screen.getByTestId("expanded-section")).toBeInTheDocument();
    });
  });

  it("handles editing and submitting a comment", async () => {
    // Arrange
    const updateComment = jest.fn();

    // Act
    render(<CommentSection content={content} updateComment={updateComment} />);
    fireEvent.click(screen.getByText("Edit"));
    fireEvent.change(screen.getByPlaceholderText("Write a comment..."), {
      target: { value: "Comment 1 - Edited" },
    });
    fireEvent.click(screen.getByText("Send"));

    // Assert
    await act(async () => {
      expect(updateComment).toHaveBeenCalledWith([
        {
          id: 1,
          content: "Comment 1 - Edited",
          date: "2022-01-01",
          parent_id: null,
          postId: 1,
          user: "User 1",
        },
      ]);
    });
  });

  it("handles replying to a comment", async () => {
    // Arrange
    const updateComment = jest.fn();

    // Act
    render(<CommentSection content={content} updateComment={updateComment} />);
    fireEvent.click(screen.getByText("Reply"));
    fireEvent.change(screen.getByPlaceholderText("Write a comment..."), {
      target: { value: "Comment 2" },
    });
    fireEvent.click(screen.getByText("Send"));

    // Assert
    await act(async () => {
      expect(updateComment).toHaveBeenCalledWith([
        {
          id: 1,
          content: "Comment 1",
          date: "2022-01-01",
          parent_id: null,
          postId: 1,
          user: "User 1",
          conversation: [
            {
              id: 2,
              content: "Comment 2",
              date: expect.any(String),
              parent_id: null,
              postId: 1,
              user: "User 2",
            },
          ],
        },
      ]);
    });
  });
});
