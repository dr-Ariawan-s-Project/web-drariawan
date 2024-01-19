import { Mocked } from 'vitest';

import { render, screen, within, act } from '@/__tests__/test-utils';

import App from '@/pages/user/scheduling/patient-schedule';
import { sampleProfile } from '@/utils/apis/user/sample-data';
import axiosWithConfig from '@/utils/apis/axiosWithConfig';
import { useAuthStore } from '@/utils/states';
import { sampleBooks } from '@/utils/apis/books/sample-data';

vi.mock('@/utils/apis/axiosWithConfig');

const mockedAxios = axiosWithConfig as Mocked<typeof axiosWithConfig>;

describe('Patient Schedule Page', () => {
  beforeEach(async () => {
    await act(async () => {
      useAuthStore.setState({ role: 'patient' }, true);
    });
  });

  describe('Renders the page', () => {
    it('should render the table row when fetch is resolve', async () => {
      await act(async () => {
        mockedAxios.get.mockResolvedValueOnce({
          data: {
            data: sampleProfile,
            messages: ['[success] read data'],
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

    it('should render text "Belum ada jadwal booking untuk bulan ini" when fetch is reject', async () => {
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
      expect(
        within(tableBody).getByText('Belum ada jadwal booking untuk bulan ini')
      );
      expect(
        screen.getByText('Oops! Sesuatu telah terjadi')
      ).toBeInTheDocument();
    });
  });
});
