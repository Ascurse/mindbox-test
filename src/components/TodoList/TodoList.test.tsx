import { cleanup, getByTestId, render, screen } from "@testing-library/react";
import TodoList from "./TodoList";
import userEvent from "@testing-library/user-event";

describe("Test the TodoList Component", () => {
  afterAll(cleanup);

  test("all filter is in document", () => {
    render(<TodoList />);
    const linkElement = screen.getByText(/All/i);
    expect(linkElement).toBeInTheDocument();
  });

  test("Completed filter is in document", () => {
    render(<TodoList />);
    const linkElement = screen.getByText(/Completed/);
    expect(linkElement).toBeInTheDocument();
  });

  test("Active filter is in document", () => {
    render(<TodoList />);
    const linkElement = screen.getByText(/Active/i);
    expect(linkElement).toBeInTheDocument();
  });

  test("Clear completed button is in document", () => {
    render(<TodoList />);
    const linkElement = screen.getByText(/Clear completed/i);
    expect(linkElement).toBeInTheDocument();
  });

  test("Component without tasks should have 5 buttons", async () => {
    render(<TodoList />);
    const buttonList = await screen.findAllByRole("button");
    expect(buttonList).toHaveLength(5);
  });

  test("Task input works properly", () => {
    render(<TodoList />);
    const todoInput = screen.getByLabelText(
      "Let's add a new task..."
    ) as HTMLInputElement;
    userEvent.type(todoInput, "New todo");
    expect(todoInput.value).toMatch("New todo");
  });

  test("User can create a new task", () => {
    const { getByTestId } = render(<TodoList />);
    const addBtn = getByTestId("add");
    const todoInput = screen.getByLabelText(
      "Let's add a new task..."
    ) as HTMLInputElement;
    userEvent.type(todoInput, "New todo");
    userEvent.click(addBtn);

    const todoElement = screen.getByText(/New todo/i);
    expect(todoElement).toBeInTheDocument();
  });

  test("Empty input shows error message", () => {
    const { getByTestId } = render(<TodoList />);
    const addBtn = getByTestId("add");
    const todoInput = screen.getByLabelText(
      "Let's add a new task..."
    ) as HTMLInputElement;
    userEvent.type(todoInput, "");
    userEvent.click(addBtn);

    const errorMessage = screen.getByText("Todo text can not be empty!");
    expect(errorMessage).toBeInTheDocument();
  });
});
