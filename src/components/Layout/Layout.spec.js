import { render, screen } from "@testing-library/react";
import Layout from "./Layout";

test("renders Layout component", () => {
  render(
    <Layout>
      <div>Test</div>
    </Layout>
  );

  expect(screen.getAllByText("Blog")).toBeInTheDocument();

  expect(screen.getByText("Test")).toBeInTheDocument();
});

test("renders children prop", () => {
  render(
    <Layout>
      <div>Test</div>
    </Layout>
  );

  expect(screen.getByText("Test")).toBeInTheDocument();
});
