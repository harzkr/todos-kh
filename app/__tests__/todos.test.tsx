import "whatwg-fetch";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Page from "../page";
import { StoreProvider } from "../../app/StoreProvider";
import configureStore from "redux-mock-store";
import { server } from "./mocks/server";
import { loginApiSlice } from "@/lib/features/login/loginApiSlice";
import { waitFor } from "@testing-library/react";
import { ApiProvider } from "@reduxjs/toolkit/query/react";

jest.mock("next/navigation", () => ({
  useRouter() {
    return {
      prefetch: () => null,
    };
  },
}));

const mockStore = configureStore();

describe("Todos", () => {
  beforeAll(() => {
    server.listen();
  });

  afterEach(() => {
    server.resetHandlers();
  });

  afterAll(() => {
    server.close();
  });

  it("should display todos", async () => {
    render(
      <StoreProvider>
        <Page />
      </StoreProvider>
    );

    await waitFor(() => {
      expect(screen.getByText("sed ut vero sit molestiae")).toBeInTheDocument();
    });
  });
});
