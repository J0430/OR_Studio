import { render, screen } from "@testing-library/react";

test("renders a sample component", () => {
  render(<div>Hello, Jest!</div>);
  expect(screen.getByText("Hello, Jest!")).toBeInTheDocument();
});
