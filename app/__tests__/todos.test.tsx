import "@testing-library/jest-dom";
import { screen } from "@testing-library/react";
import Page from "../page";
import { server } from "./__mocks__/server";
import { waitFor } from "@testing-library/react";
import { renderWithProviders } from "@/lib/utils/test-utils";
import { act } from "react-dom/test-utils";

jest.mock("next/navigation", () => ({
  useRouter() {
    return {
      prefetch: () => null,
    };
  },
}));

describe("Todos", () => {
  beforeAll(async () => {
    server.listen();
  });

  afterEach(() => {
    server.resetHandlers();
  });

  afterAll(() => {
    server.close();
  });

  it("should display todos", async () => {
    await act(async () => {
      renderWithProviders(<Page />);
    });

    waitFor(async () => {
      expect(await screen.getByTestId("loader")).toBeInTheDocument();
    });

    waitFor(async () => {
      expect(await screen.getByTestId("add-button")).toBeInTheDocument();
    });

    waitFor(async () => {
      await expect(
        screen.getByText("sed ut vero sit molestiae")
      ).toBeInTheDocument();
    });
  });
});
