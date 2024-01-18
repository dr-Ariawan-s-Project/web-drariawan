import { userEvent } from '@testing-library/user-event';
import { Mocked } from 'vitest';

import { render, screen, within, act, fireEvent } from '@/__tests__/test-utils';

import App from '@/pages/dashboard/schedules';
import { sampleSchedules } from '@/utils/apis/schedule/sample-data';
import { sampleDoctors } from '@/utils/apis/user/sample-data';
import axiosWithConfig from '@/utils/apis/axiosWithConfig';
import { useAuthStore } from '@/utils/states';

vi.mock('@/utils/apis/axiosWithConfig');

const mockedAxios = axiosWithConfig as Mocked<typeof axiosWithConfig>;
const formInput = {
  'input-doctor': { type: 'dropdown', value: 12 },
  'input-day': { type: 'dropdown', value: 'Minggu' },
  'input-address': { type: 'input', value: 'Test' },
  'input-start': { type: 'input', value: '16:30' },
  'input-end': { type: 'input', value: '17:30' },
};

describe('Schedules Dashboard Page', () => {
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
            data: sampleSchedules,
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
        mockedAxios.get.mockResolvedValueOnce({
          data: {
            data: sampleSchedules,
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

      const dataTable = screen.getByTestId('data-table');
      expect(dataTable).toBeInTheDocument();

      const tableBody = within(dataTable).getByTestId('data-table-body');
      expect(tableBody).toBeInTheDocument();
      expect(within(tableBody).getAllByTestId('data-table-row')).toHaveLength(
        sampleSchedules.length
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
            data: sampleDoctors,
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
        mockedAxios.get.mockResolvedValueOnce({
          data: {
            data: sampleSchedules,
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

        expect(within(form).getByText('Dokter wajib diisi')).toBeTruthy();
        expect(within(form).getByText('Hari wajib diisi')).toBeTruthy();
        expect(
          within(form).getByText('Alamat praktek wajib diisi')
        ).toBeTruthy();
        expect(within(form).getByText('Jam mulai wajib diisi')).toBeTruthy();
        expect(within(form).getByText('Jam selesai wajib diisi')).toBeTruthy();
      });

      it('should not add new data when post is reject', async () => {
        const form = screen.getByTestId('form-add-edit');

        let input: keyof typeof formInput;
        for (input in formInput) {
          const component = within(form).getByTestId(input);
          const inputValue = formInput[input].value;
          const inputType = formInput[input].type;

          if (inputType === 'input') {
            await act(async () => {
              fireEvent.change(component, { target: { value: inputValue } });
            });
          } else {
            await userEvent.click(component);
            await userEvent.click(
              within(screen.getByRole('presentation')).getByTestId(
                `option-${inputValue}`
              )
            );
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

          if (inputType === 'input') {
            await act(async () => {
              fireEvent.change(component, { target: { value: inputValue } });
            });
          } else {
            await userEvent.click(component);
            await userEvent.click(
              within(screen.getByRole('presentation')).getByTestId(
                `option-${inputValue}`
              )
            );
          }
        }

        mockedAxios.post.mockResolvedValueOnce({
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
            data: sampleSchedules,
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
          'input-end': { type: 'input', value: '18:30' },
        };

        let input: keyof typeof dupeFormInput;
        for (input in dupeFormInput) {
          const component = within(form).getByTestId(input);
          const inputValue = dupeFormInput[input].value;
          const inputType = dupeFormInput[input].type;

          if (inputType === 'input') {
            await act(async () => {
              fireEvent.change(component, { target: { value: inputValue } });
            });
          } else {
            await userEvent.click(component);
            await userEvent.click(
              within(screen.getByRole('presentation')).getByTestId(
                `option-${inputValue}`
              )
            );
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
          'input-end': { type: 'input', value: '18:30' },
        };

        let input: keyof typeof dupeFormInput;
        for (input in dupeFormInput) {
          const component = within(form).getByTestId(input);
          const inputValue = dupeFormInput[input].value;
          const inputType = dupeFormInput[input].type;

          if (inputType === 'input') {
            await act(async () => {
              fireEvent.change(component, { target: { value: inputValue } });
            });
          } else {
            await userEvent.click(component);
            await userEvent.click(
              within(screen.getByRole('presentation')).getByTestId(
                `option-${inputValue}`
              )
            );
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
            data: sampleSchedules,
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
            data: sampleSchedules,
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
