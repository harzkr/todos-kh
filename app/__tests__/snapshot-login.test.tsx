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
  it("renders homepage unchanged", () => {
    const { container } = render(
      <Provider store={mockStore()}>
        <Login />
      </Provider>
    );
    expect(container).toMatchSnapshot();
  });
});
