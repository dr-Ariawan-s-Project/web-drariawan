import { userEvent } from '@testing-library/user-event';
import { Mocked } from 'vitest';

import { render, screen, within, act } from '@/__tests__/test-utils';

import App from '@/pages/dashboard/detail-attempt';
import { sampleAnswer } from '@/utils/apis/questionnaire/sample-data';
import axiosWithConfig from '@/utils/apis/axiosWithConfig';
import { useAuthStore } from '@/utils/states';

const mockedUsedNavigate = vi.fn();

vi.mock('@/utils/apis/axiosWithConfig');
vi.mock('react-router-dom', async () => {
  const mod = await vi.importActual('react-router-dom');
  return {
    ...mod,
    useNavigate: () => mockedUsedNavigate,
  };
});

const mockedAxios = axiosWithConfig as Mocked<typeof axiosWithConfig>;

describe('Detail Attempt Dashboard Page', () => {
  beforeEach(async () => {
    useAuthStore.setState({ role: 'dokter' }, true);
  });

  describe('Renders the page', () => {
    it('should render the table row when fetch is resolve', async () => {
      await act(async () => {
        mockedAxios.get.mockResolvedValueOnce({
          data: {
            data: sampleAnswer,
            messages: ['[success] read data'],
            meta: {
              code: '200-003-OK',
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
        sampleAnswer.length
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

  describe.skip('Action', () => {
    beforeEach(async () => {
      await act(async () => {
        mockedAxios.get.mockResolvedValueOnce({
          data: {
            data: sampleAnswer,
            messages: ['[success] read data'],
            meta: {
              code: '200-003-OK',
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

    it('should disable detail menu when attempt is not complete', async () => {
      await userEvent.click(screen.getAllByTestId('table-action')[1]);

      expect(
        within(screen.getByRole('menu')).getByTestId('action-detail')
      ).toHaveAttribute('aria-disabled');
    });

    it('should enable detail menu when attempt is completed', async () => {
      await userEvent.click(screen.getAllByTestId('table-action')[0]);

      expect(
        within(screen.getByRole('menu')).getByTestId('action-detail')
      ).toBeEnabled();
    });

    it('should navigate to detail attempt when click on detail menu', async () => {
      await userEvent.click(screen.getAllByTestId('table-action')[0]);
      await userEvent.click(
        within(screen.getByRole('menu')).getByTestId('action-detail')
      );

      expect(mockedUsedNavigate).toHaveBeenCalledTimes(1);
    });
  });
});
