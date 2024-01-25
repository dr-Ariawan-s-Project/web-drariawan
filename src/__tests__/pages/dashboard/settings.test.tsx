import { userEvent } from "@testing-library/user-event";
import { capitalize } from "lodash";
import { Mocked } from "vitest";

import { render, screen, within, act, fireEvent } from "@/__tests__/test-utils";

import App from "@/pages/dashboard/settings";
import { sampleProfile } from "@/utils/apis/user/sample-data";
import axiosWithConfig from "@/utils/apis/axiosWithConfig";
import { useAuthStore } from "@/utils/states";

vi.mock("@/utils/apis/axiosWithConfig");

const mockedAxios = axiosWithConfig as Mocked<typeof axiosWithConfig>;
const formInput = {
  "input-name": { type: "input", value: "dr. John Doe, Sp.OG" },
  "input-email": { type: "input", value: "johndoe@mail.com" },
  "input-phone-number": { type: "input", value: "085646434719" },
  "input-password": { type: "input", value: "admin123" },
  "input-specialization": {
    type: "input",
    value: "Dokter spesialis Obstetri dan Ginekologi",
  },
};

describe("Setting Dashboard Page", () => {
  beforeEach(async () => {
    await act(async () => {
      useAuthStore.setState({ role: "dokter" }, true);
    });
  });

  describe("Renders the page", () => {
    it("should render the page when get is resolve", async () => {
      await act(async () => {
        mockedAxios.get.mockResolvedValueOnce({
          data: {
            data: sampleProfile,
            messages: ["[success] read data"],
            meta: {
              code: "200-001-OK",
              status: "success",
            },
          },
        });

        render(<App />);
      });

      const form = screen.getByTestId("form-setting");
      expect(form).toBeInTheDocument();

      for (const key in formInput) {
        expect(within(form).getByTestId(key)).toBeInTheDocument();
      }

      expect(within(form).getByTestId("input-name")).toHaveValue(
        sampleProfile.name
      );
      expect(within(form).getByTestId("input-email")).toHaveValue(
        sampleProfile.email
      );
      expect(within(form).getByTestId("input-phone-number")).toHaveValue(
        sampleProfile.phone
      );
      expect(within(form).getByTestId("input-role")).toHaveTextContent(
        capitalize(sampleProfile.role)
      );
      expect(within(form).getByTestId("input-specialization")).toHaveValue(
        sampleProfile.specialization
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

  describe("Actions on page", () => {
    beforeEach(async () => {
      await act(async () => {
        mockedAxios.get.mockResolvedValueOnce({
          data: {
            data: sampleProfile,
            messages: ["[success] read data"],
            meta: {
              code: "200-001-OK",
              status: "success",
            },
          },
        });

        render(<App />);
      });
    });

    it("should not edit data when edit is reject", async () => {
      const form = screen.getByTestId("form-setting");
      const dupeFormInput = {
        ...formInput,
        "input-phone-number": { type: "input", value: "085646434718" },
      };

      let input: keyof typeof dupeFormInput;
      for (input in dupeFormInput) {
        const component = within(form).getByTestId(input);
        const inputValue = dupeFormInput[input].value;
        const inputType = dupeFormInput[input].type;

        if (inputType === "dropdown") {
          await userEvent.click(component);
          await userEvent.click(
            within(screen.getByRole("presentation")).getByTestId(
              `option-${inputValue}`
            )
          );
        } else {
          await act(async () => {
            fireEvent.change(component, { target: { value: inputValue } });
          });
        }
      }

      mockedAxios.put.mockRejectedValueOnce({
        data: {
          messages: ["[failed]"],
          meta: {
            code: "",
            status: "failed",
          },
        },
      });

      await userEvent.click(screen.getByTestId("btn-submit"));

      expect(
        screen.getByText("Oops! Sesuatu telah terjadi")
      ).toBeInTheDocument();
    });

    it("should edit data when edit is resolve", async () => {
      const form = screen.getByTestId("form-setting");
      const dupeFormInput = {
        ...formInput,
        "input-phone-number": { type: "input", value: "085646434718" },
      };

      let input: keyof typeof dupeFormInput;
      for (input in dupeFormInput) {
        const component = within(form).getByTestId(input);
        const inputValue = dupeFormInput[input].value;
        const inputType = dupeFormInput[input].type;

        if (inputType === "dropdown") {
          await userEvent.click(component);
          await userEvent.click(
            within(screen.getByRole("presentation")).getByTestId(
              `option-${inputValue}`
            )
          );
        } else {
          await act(async () => {
            fireEvent.change(component, { target: { value: inputValue } });
          });
        }
      }

      mockedAxios.put.mockResolvedValueOnce({
        data: {
          data: null,
          messages: ["[success] update data"],
          meta: {
            code: "200-006-OK",
            status: "success",
          },
        },
      });

      await userEvent.click(screen.getByTestId("btn-submit"));

      expect(screen.getByText("[success] update data")).toBeInTheDocument();
    });
  });
});
