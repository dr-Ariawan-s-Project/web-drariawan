import { capitalize } from "lodash";
import { Mocked } from "vitest";

import { render, screen, within, act } from "@/__tests__/test-utils";

import App from "@/pages/user/profile";
import { patientProfile } from "@/utils/apis/user/sample-data";
import axiosWithConfig from "@/utils/apis/axiosWithConfig";
import { useAuthStore } from "@/utils/states";

vi.mock("@/utils/apis/axiosWithConfig");

const mockedAxios = axiosWithConfig as Mocked<typeof axiosWithConfig>;
const formInput = {
  "input-name": { type: "input", value: "dr. John Doe, Sp.OG" },
  "input-email": { type: "input", value: "johndoe@mail.com" },
  "input-gender": { type: "dropdown", value: "male" },
  "input-status": { type: "dropdown", value: "married" },
  "input-phone-number": { type: "input", value: "085646434719" },
  "input-nationality": { type: "dropdown", value: "Indonesia" },
};

describe("Setting Dashboard Page", () => {
  beforeEach(async () => {
    await act(async () => {
      useAuthStore.setState({ role: "patient" }, true);
    });
  });

  describe("Renders the page", () => {
    it("should render the page when get is resolve", async () => {
      await act(async () => {
        mockedAxios.get.mockResolvedValueOnce({
          data: {
            data: patientProfile,
            messages: ["[success] read data"],
            meta: {
              code: "200-001-OK",
              status: "success",
            },
          },
        });

        render(<App />);
      });

      const form = screen.getByTestId("form-profile");
      expect(form).toBeInTheDocument();

      for (const key in formInput) {
        expect(within(form).getByTestId(key)).toBeInTheDocument();
      }

      expect(within(form).getByTestId("input-name")).toHaveValue(
        patientProfile.name
      );
      expect(within(form).getByTestId("input-email")).toHaveValue(
        patientProfile.email
      );
      expect(within(form).getByTestId("input-gender")).toHaveTextContent(
        capitalize(patientProfile.gender)
      );
      expect(within(form).getByTestId("input-phone-number")).toHaveValue(
        patientProfile.phone
      );
      expect(within(form).getByTestId("input-nationality")).toHaveTextContent(
        capitalize(patientProfile.nationality)
      );
    });

    it("should display failed toast when get is reject", async () => {
      await act(async () => {
        mockedAxios.get.mockRejectedValueOnce({
          data: {
            messages: ["[failed]"],
            meta: {
              code: "",
              status: "failed",
            },
          },
        });

        render(<App />);
      });

      expect(
        screen.getByText("Oops! Sesuatu telah terjadi")
      ).toBeInTheDocument();
    });
  });
});
