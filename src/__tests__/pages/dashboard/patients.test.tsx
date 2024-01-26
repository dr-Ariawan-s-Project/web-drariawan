import { userEvent } from '@testing-library/user-event';
import { Mocked } from 'vitest';

import { render, screen, within, act, fireEvent } from '@/__tests__/test-utils';

import App from '@/pages/dashboard/patients';
import { samplePatients } from '@/utils/apis/patient/sample-data';
import axiosWithConfig from '@/utils/apis/axiosWithConfig';
import { useAuthStore } from '@/utils/states';

vi.mock('@/utils/apis/axiosWithConfig');

const mockedAxios = axiosWithConfig as Mocked<typeof axiosWithConfig>;
const formInput = {
  'input-email': { type: 'input', value: 'test@mail.com' },
  'input-password': { type: 'input', value: 'testing123' },
  'input-name': { type: 'input', value: 'Test' },
  'input-gender': { type: 'dropdown', value: 'Male' },
  'input-status': { type: 'dropdown', value: 'Married' },
  'input-nik': { type: 'input', value: '1234561101971234' },
  'input-dob': {
    type: 'datepicker',
    value: '1997-01-11',
  },
  'input-phone-number': { type: 'input', value: '6282222222222' },
  'input-nationality': { type: 'dropdown', value: 'Indonesia' },
};

describe('Patients Dashboard Page', () => {
  beforeEach(async () => {
    useAuthStore.setState({ role: 'superadmin' }, true);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe('Renders the page', () => {
    it('should render the table row when fetch is resolve', async () => {
      await act(async () => {
        mockedAxios.get.mockResolvedValueOnce({
          data: {
            data: samplePatients,
            messages: ['[success] read data'],
            meta: {
              code: '200-004-OK',
              status: 'success',
            },
            pagination: {
              limit: 10,
              page: 1,
              total_pages: 9,
              total_records: 86,
            },
          },
        });

        render(<App />);
      });

      const dataTable = screen.getByTestId('data-table');
      expect(dataTable).toBeInTheDocument();

      const tableBody = within(dataTable).getByTestId('data-table-body');
      expect(tableBody).toBeInTheDocument();
      expect(within(tableBody).getAllByTestId('data-table-row')).toHaveLength(
        samplePatients.length
      );
    });

    it('should render text "Tidak ada data tersedia" when fetch is reject', async () => {
      await act(async () => {
        mockedAxios.get.mockRejectedValueOnce({
          data: {
            messages: ['[failed] read data'],
            meta: {
              code: '',
              status: 'failed',
            },
          },
        });

        render(<App />);
      });

      const dataTable = screen.getByTestId('data-table');
      expect(dataTable).toBeInTheDocument();

      const tableBody = within(dataTable).getByTestId('data-table-body');
      expect(tableBody).toBeInTheDocument();
      expect(within(tableBody).getByText('Tidak ada data tersedia'));
    });
  });

  describe('Actions on page', () => {
    beforeEach(async () => {
      await act(async () => {
        mockedAxios.get.mockResolvedValueOnce({
          data: {
            data: samplePatients,
            messages: ['[success] read data'],
            meta: {
              code: '200-007-OK',
              status: 'success',
            },
            pagination: {
              limit: 10,
              page: 1,
              total_pages: 1,
              total_records: 5,
            },
          },
        });

        render(<App />);
      });
    });

    describe('Add', () => {
      beforeEach(async () => {
        await userEvent.click(screen.getByTestId('btn-add-data'));
      });

      it('should show modal for add new data', () => {
        expect(screen.getByRole('dialog')).toBeInTheDocument();
      });

      it('should display error message below input when all inputs have not been filled in', async () => {
        await act(async () => {
          fireEvent.click(screen.getByTestId('btn-submit'));
        });

        const form = screen.getByTestId('form-add-edit');

        expect(within(form).getByText('Nama lengkap wajib diisi')).toBeTruthy();
        expect(within(form).getByText('Email wajib diisi')).toBeTruthy();
        expect(within(form).getByText('Password wajib diisi')).toBeTruthy();
        expect(within(form).getByText('NIK wajib diisi')).toBeTruthy();
        expect(
          within(form).getByText('Tanggal lahir wajib diisi')
        ).toBeTruthy();
        expect(
          within(form).getByText('Nomor telepon wajib diisi')
        ).toBeTruthy();
      });

      it('should not add new data when post is reject', async () => {
        const form = screen.getByTestId('form-add-edit');

        let input: keyof typeof formInput;
        for (input in formInput) {
          const component = within(form).getByTestId(input);
          const inputValue = formInput[input].value;
          const inputType = formInput[input].type;

          if (inputType === 'dropdown') {
            await userEvent.click(component);
            await userEvent.click(
              within(screen.getByRole('presentation')).getByTestId(
                `option-${inputValue}`
              )
            );
          } else if (inputType === 'datepicker') {
            await userEvent.click(component);

            const calendar = screen.getByTestId('calendar');
            expect(calendar).toBeInTheDocument();

            const allDay = within(screen.getByRole('grid')).getAllByRole(
              'gridcell'
            );
            const filterAvailableDay = allDay.filter(
              (element) => !element.hasAttribute('disabled')
            );

            await userEvent.click(filterAvailableDay[0]);
          } else {
            await act(async () => {
              fireEvent.change(component, { target: { value: inputValue } });
            });
          }
        }

        mockedAxios.post.mockRejectedValueOnce({
          data: {
            messages: ['[failed]'],
            meta: {
              code: '',
              status: 'failed',
            },
          },
        });

        await userEvent.click(screen.getByTestId('btn-submit'));

        expect(
          screen.getByText('Oops! Sesuatu telah terjadi')
        ).toBeInTheDocument();
      });

      it('should add new data when post is resolve', async () => {
        const form = screen.getByTestId('form-add-edit');

        let input: keyof typeof formInput;
        for (input in formInput) {
          const component = within(form).getByTestId(input);
          const inputValue = formInput[input].value;
          const inputType = formInput[input].type;

          if (inputType === 'dropdown') {
            await userEvent.click(component);
            await userEvent.click(
              within(screen.getByRole('presentation')).getByTestId(
                `option-${inputValue}`
              )
            );
          } else if (inputType === 'datepicker') {
            await userEvent.click(component);

            const calendar = screen.getByTestId('calendar');
            expect(calendar).toBeInTheDocument();

            const allDay = within(screen.getByRole('grid')).getAllByRole(
              'gridcell'
            );
            const filterAvailableDay = allDay.filter(
              (element) => !element.hasAttribute('disabled')
            );

            await userEvent.click(filterAvailableDay[0]);
            expect(calendar).not.toBeInTheDocument();
          } else {
            await act(async () => {
              fireEvent.change(component, { target: { value: inputValue } });
            });
          }
        }

        mockedAxios.post.mockResolvedValueOnce({
          data: {
            messages: ['[success] create data'],
            meta: {
              code: '200-007-OK',
              status: 'success',
            },
          },
        });
        mockedAxios.get.mockResolvedValueOnce({
          data: {
            data: samplePatients,
            messages: ['[success] read data'],
            meta: {
              code: '200-007-OK',
              status: 'success',
            },
            pagination: {
              limit: 10,
              page: 1,
              total_pages: 1,
              total_records: 5,
            },
          },
        });

        await userEvent.click(screen.getByTestId('btn-submit'));

        expect(screen.getByText('[success] create data')).toBeInTheDocument();
      });
    });

    describe('Edit', () => {
      beforeEach(async () => {
        await userEvent.click(screen.getAllByTestId('table-action')[0]);
        await userEvent.click(
          within(screen.getByRole('menu')).getByTestId('action-edit')
        );
      });

      it('should show modal for edit data', () => {
        expect(screen.getByRole('dialog')).toBeInTheDocument();
      });

      it('should not edit data when edit is reject', async () => {
        const form = screen.getByTestId('form-add-edit');
        const dupeFormInput = {
          ...formInput,
          'input-phone-number': { type: 'input', value: '6282222222223' },
        };

        let input: keyof typeof dupeFormInput;
        for (input in dupeFormInput) {
          const component = within(form).getByTestId(input);
          const inputValue = dupeFormInput[input].value;
          const inputType = dupeFormInput[input].type;

          if (inputType === 'dropdown') {
            await userEvent.click(component);
            await userEvent.click(
              within(screen.getByRole('presentation')).getByTestId(
                `option-${inputValue}`
              )
            );
          } else if (inputType === 'datepicker') {
            await userEvent.click(component);

            const calendar = screen.getByTestId('calendar');
            expect(calendar).toBeInTheDocument();

            const allDay = within(screen.getByRole('grid')).getAllByRole(
              'gridcell'
            );
            const filterAvailableDay = allDay.filter(
              (element) => !element.hasAttribute('disabled')
            );

            await userEvent.click(filterAvailableDay[0]);
          } else {
            await act(async () => {
              fireEvent.change(component, { target: { value: inputValue } });
            });
          }
        }

        mockedAxios.put.mockRejectedValueOnce({
          data: {
            messages: ['[failed]'],
            meta: {
              code: '',
              status: 'failed',
            },
          },
        });

        await userEvent.click(screen.getByTestId('btn-submit'));

        expect(
          screen.getByText('Oops! Sesuatu telah terjadi')
        ).toBeInTheDocument();
      });

      it('should edit data when edit is resolve', async () => {
        const form = screen.getByTestId('form-add-edit');
        const dupeFormInput = {
          ...formInput,
          'input-phone-number': { type: 'input', value: '6282222222223' },
        };

        let input: keyof typeof dupeFormInput;
        for (input in dupeFormInput) {
          const component = within(form).getByTestId(input);
          const inputValue = dupeFormInput[input].value;
          const inputType = dupeFormInput[input].type;

          if (inputType === 'dropdown') {
            await userEvent.click(component);
            await userEvent.click(
              within(screen.getByRole('presentation')).getByTestId(
                `option-${inputValue}`
              )
            );
          } else if (inputType === 'datepicker') {
            await userEvent.click(component);

            const calendar = screen.getByTestId('calendar');
            expect(calendar).toBeInTheDocument();

            const allDay = within(screen.getByRole('grid')).getAllByRole(
              'gridcell'
            );
            const filterAvailableDay = allDay.filter(
              (element) => !element.hasAttribute('disabled')
            );

            await userEvent.click(filterAvailableDay[0]);
          } else {
            await act(async () => {
              fireEvent.change(component, { target: { value: inputValue } });
            });
          }
        }

        mockedAxios.put.mockResolvedValueOnce({
          data: {
            messages: ['[success]'],
            meta: {
              code: '200-007-OK',
              status: 'success',
            },
          },
        });
        mockedAxios.get.mockResolvedValueOnce({
          data: {
            data: samplePatients,
            messages: ['[success] read data'],
            meta: {
              code: '200-007-OK',
              status: 'success',
            },
            pagination: {
              limit: 10,
              page: 1,
              total_pages: 1,
              total_records: 5,
            },
          },
        });

        await userEvent.click(screen.getByTestId('btn-submit'));

        expect(screen.getByText('[success]')).toBeInTheDocument();
      });
    });

    describe('Delete', () => {
      beforeEach(async () => {
        await userEvent.click(screen.getAllByTestId('table-action')[0]);
        await userEvent.click(
          within(screen.getByRole('menu')).getByTestId('action-delete')
        );
      });

      it('should display alert dialog', () => {
        expect(screen.getByRole('alertdialog')).toBeInTheDocument();
      });

      it('should remove alert dialog', async () => {
        await userEvent.click(
          within(screen.getByRole('alertdialog')).getByTestId('alert-cancel')
        );

        expect(screen.queryByTestId('alertdialog')).not.toBeInTheDocument();
      });

      it('should not remove data when delete is reject', async () => {
        mockedAxios.delete.mockRejectedValueOnce({
          data: {
            messages: ['[failed]'],
            meta: {
              code: '',
              status: 'failed',
            },
          },
        });

        await userEvent.click(
          within(screen.getByRole('alertdialog')).getByTestId('alert-yes')
        );

        expect(
          screen.getByText('Oops! Sesuatu telah terjadi')
        ).toBeInTheDocument();
      });

      it('should remove data when delete is resolve', async () => {
        mockedAxios.delete.mockResolvedValueOnce({
          data: {
            data: null,
            messages: ['[success]'],
            meta: {
              code: '200-007-OK',
              status: 'success',
            },
          },
        });
        mockedAxios.get.mockResolvedValueOnce({
          data: {
            data: samplePatients,
            messages: ['[success] read data'],
            meta: {
              code: '200-007-OK',
              status: 'success',
            },
            pagination: {
              limit: 10,
              page: 1,
              total_pages: 1,
              total_records: 5,
            },
          },
        });

        await userEvent.click(
          within(screen.getByRole('alertdialog')).getByTestId('alert-yes')
        );

        expect(screen.getByText('[success]')).toBeInTheDocument();
      });
    });
  });
});
