import { userEvent } from '@testing-library/user-event';
import { Mocked } from 'vitest';

import { render, screen, within, act, fireEvent } from '@/__tests__/test-utils';

import App from '@/pages/dashboard/books';
import { sampleSchedules } from '@/utils/apis/schedule/sample-data';
import { samplePatients } from '@/utils/apis/patient/sample-data';
import { sampleBooks } from '@/utils/apis/books/sample-data';
import axiosWithConfig from '@/utils/apis/axiosWithConfig';
import { useAuthStore } from '@/utils/states';

vi.mock('@/utils/apis/axiosWithConfig');

const mockedAxios = axiosWithConfig as Mocked<typeof axiosWithConfig>;
const formInput = {
  'input-patient': {
    type: 'dropdown',
    value: '237071bb-908a-4f5c-8c7a-922bf7d68715',
  },
  'input-schedule': { type: 'dropdown', value: 25 },
  'input-dob': {
    type: 'datepicker',
    value: '2024-01-31',
  },
};

describe('Books Dashboard Page', () => {
  beforeEach(async () => {
    useAuthStore.setState({ role: 'suster' }, true);
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
        mockedAxios.get.mockResolvedValueOnce({
          data: {
            data: sampleBooks,
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
        sampleBooks.length
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
            data: samplePatients,
            messages: ['[success] read data'],
            meta: {
              code: '200-004-OK',
              status: 'success',
            },
            pagination: {
              page: 1,
              limit: 0,
              total_pages: 1,
              total_records: 10,
            },
          },
        });
        mockedAxios.get.mockResolvedValueOnce({
          data: {
            data: sampleSchedules,
            messages: ['[success] read data'],
            meta: {
              code: '200-005-OK',
              status: 'success',
            },
            pagination: {
              limit: 0,
              page: 1,
              total_pages: 1,
              total_records: 9,
            },
          },
        });
        mockedAxios.get.mockResolvedValueOnce({
          data: {
            data: sampleBooks,
            messages: ['[success] read data'],
            meta: {
              code: '200-006-OK',
              status: 'success',
            },
            pagination: {
              limit: 10,
              page: 1,
              total_pages: 1,
              total_records: 10,
            },
          },
        });

        render(<App />);
      });

      fireEvent.click(screen.getByTestId('btn-add-data'));
    });

    describe('Add', () => {
      beforeEach(async () => {
        await userEvent.click(screen.getByTestId('btn-add-data'), {
          pointerEventsCheck: 0,
        });
      });

      it('should show modal for add new data', () => {
        expect(screen.getByRole('dialog')).toBeInTheDocument();
      });

      it('should display error message below input when all inputs have not been filled in', async () => {
        await act(async () => {
          fireEvent.click(screen.getByTestId('btn-submit'));
        });

        const form = screen.getByTestId('form-add-edit');

        expect(within(form).getByText('Data pasien wajib diisi')).toBeTruthy();
        expect(within(form).getByText('Jadwal wajib diisi')).toBeTruthy();
        expect(
          within(form).getByText('Tanggal booking wajib diisi')
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
          } else {
            await act(async () => {
              fireEvent.change(component, { target: { value: inputValue } });
            });
          }
        }

        mockedAxios.post.mockResolvedValueOnce({
          data: {
            data: null,
            messages: ['[success] create data'],
            meta: {
              code: '201-006-OK',
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
        await userEvent.click(screen.getAllByTestId('table-action')[0], {
          pointerEventsCheck: 0,
        });
        await userEvent.click(
          within(screen.getByRole('menu')).getByTestId('action-edit'),
          { pointerEventsCheck: 0 }
        );
      });

      it('should show modal for edit data', () => {
        expect(screen.getByRole('dialog')).toBeInTheDocument();
      });

      it('should not edit data when edit is reject', async () => {
        const form = screen.getByTestId('form-add-edit');
        const dupeFormInput = {
          ...formInput,
          'input-dob': {
            type: 'datepicker',
            value: '2024-01-30',
          },
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
          'input-dob': {
            type: 'datepicker',
            value: '2024-01-30',
          },
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
            data: null,
            messages: ['[success] update data'],
            meta: {
              code: '200-006-OK',
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

        expect(screen.getByText('[success] update data')).toBeInTheDocument();
      });
    });

    describe('Delete', () => {
      beforeEach(async () => {
        await userEvent.click(screen.getAllByTestId('table-action')[0], {
          pointerEventsCheck: 0,
        });
        await userEvent.click(
          within(screen.getByRole('menu')).getByTestId('action-delete'),
          { pointerEventsCheck: 0 }
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
            data: sampleBooks,
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
