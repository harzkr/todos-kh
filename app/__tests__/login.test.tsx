import "whatwg-fetch";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Login from "../login/page";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";

jest.mock("next/navigation", () => ({
  useRouter() {
    return {
      prefetch: () => null,
    };
  },
}));

const mockStore = configureStore();

describe("Login", () => {
  it("renders the login page", () => {
    render(
      <Provider store={mockStore()}>
        <Login />
      </Provider>
    );

    expect(screen.getByTestId("username")).toBeInTheDocument();
    expect(screen.getByTestId("password")).toBeInTheDocument();
    expect(screen.getByTestId("login-button")).toBeInTheDocument();
  });
});
