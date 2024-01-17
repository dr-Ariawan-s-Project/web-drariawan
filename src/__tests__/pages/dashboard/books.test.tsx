import { Mocked } from 'vitest';

import { render, screen, within, act, fireEvent } from '@/__tests__/test-utils';

import App from '@/pages/dashboard/books';
import { sampleBooks } from '@/utils/apis/books/sample-data';
import axiosWithConfig from '@/utils/apis/axiosWithConfig';
import { useAuthStore } from '@/utils/states';
import { samplePatients } from '@/utils/apis/patient/sample-data';
import { sampleSchedules } from '@/utils/apis/schedule/sample-data';

vi.mock('@/utils/apis/axiosWithConfig');

const mockedAxios = axiosWithConfig as Mocked<typeof axiosWithConfig>;
const formInput = {
  'input-name': 'Test',
  'input-email': 'test@mail.com',
  'input-phone-number': '6282222222222',
  'input-role': 'admin',
  'input-password': 'admin123',
  'input-specialization': 'Testing',
};

describe('Books Dashboard Page', () => {
  beforeEach(async () => {
    useAuthStore.setState({ role: 'suster' }, true);
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

  describe.skip('Action', () => {
    beforeEach(async () => {
      await act(async () => {
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

      fireEvent.click(screen.getByTestId('btn-add-data'));
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
      expect(within(form).getByText('Nomor telepon wajib diisi')).toBeTruthy();
      expect(within(form).getByText('Role wajib diisi')).toBeTruthy();
      expect(within(form).getByText('Password wajib diisi')).toBeTruthy();
      expect(within(form).getByText('Spesialisasi wajib diisi')).toBeTruthy();
    });

    it('should add new data when fetch is resolve', async () => {
      const form = screen.getByTestId('form-add-edit');

      let input: keyof typeof formInput;
      for (input in formInput) {
        const component = within(form).getByTestId(input);
        fireEvent.change(component, {
          target: { value: formInput[input] },
        });
      }

      mockedAxios.get.mockResolvedValueOnce({
        data: {
          messages: ['[success]'],
          meta: {
            code: '200-007-OK',
            status: 'success',
          },
        },
      });

      await act(async () => {
        fireEvent.click(screen.getByTestId('btn-submit'));
      });
    });

    it('should not add new data when fetch is reject', async () => {
      const form = screen.getByTestId('form-add-edit');

      let input: keyof typeof formInput;
      for (input in formInput) {
        const component = within(form).getByTestId(input);
        fireEvent.change(component, {
          target: { value: formInput[input] },
        });
      }

      mockedAxios.get.mockRejectedValueOnce({
        data: {
          messages: ['[failed]'],
          meta: {
            code: '',
            status: 'failed',
          },
        },
      });

      await act(async () => {
        fireEvent.click(screen.getByTestId('btn-submit'));
      });
    });
  });
});
