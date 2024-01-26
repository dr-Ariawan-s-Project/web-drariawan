import { userEvent } from '@testing-library/user-event';
import { Mocked } from 'vitest';

import { render, screen, within, act, fireEvent } from '@/__tests__/test-utils';

import App from '@/pages/user/scheduling';
import { sampleSchedules } from '@/utils/apis/schedule/sample-data';
import axiosWithConfig from '@/utils/apis/axiosWithConfig';
import { useAuthStore } from '@/utils/states';
import { sampleProfile } from '@/utils/apis/user/sample-data';

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

describe('Scheduling Page', () => {
  beforeEach(async () => {
    await act(async () => {
      useAuthStore.setState({ role: 'pasien' }, true);
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe('Renders the page', () => {
    it('should display data when get is resolve', async () => {
      await act(async () => {
        mockedAxios.get.mockResolvedValueOnce({
          data: {
            data: sampleSchedules,
            messages: ['[success] read data'],
            meta: {
              code: '200-007-OK',
              status: 'success',
            },
          },
        });
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

        render(<App />);
      });

      const scheduleCount = {
        Minggu: 0,
        Senin: 2,
        Selasa: 3,
        Rabu: 2,
        Kamis: 1,
        Jumat: 1,
        Sabtu: 0,
      };
      const scheduleBoard = screen.getByTestId('schedule-board');
      expect(scheduleBoard).toBeInTheDocument();

      let day: keyof typeof scheduleCount;
      for (day in scheduleCount) {
        const columnDay = within(scheduleBoard).getByTestId(`column-${day}`);

        if (scheduleCount[day] === 0) {
          expect(
            within(columnDay).getByText(
              'Tidak ada jadwal dokter yang tersedia untuk hari ini.'
            )
          ).toBeInTheDocument();
        } else {
          expect(
            within(columnDay).getAllByTestId('schedule-data')
          ).toHaveLength(scheduleCount[day]);
        }
      }
    });

    it('should dispaly failed toast when get is reject', async () => {
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

      expect(
        screen.getByText('Oops! Sesuatu telah terjadi')
      ).toBeInTheDocument();
    });
  });

  describe('Actions', () => {
    beforeEach(async () => {
      await act(async () => {
        mockedAxios.get.mockResolvedValueOnce({
          data: {
            data: sampleSchedules,
            messages: ['[success] read data'],
            meta: {
              code: '200-007-OK',
              status: 'success',
            },
          },
        });
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

        render(<App />);
      });

      const scheduleBoard = screen.getByTestId('schedule-board');
      const columnDay = within(scheduleBoard).getByTestId('column-Senin');
      const scheduleData = within(columnDay).getAllByTestId('schedule-data')[0];

      await act(async () => {
        fireEvent.click(scheduleData);
      });
    });

    it('should show dialog when click on schedule card', async () => {
      expect(screen.getByRole('dialog')).toBeInTheDocument();
      expect(screen.getByTestId('btn-submit')).toBeDisabled();
    });

    it('should show failed toast when post is reject', async () => {
      await userEvent.click(screen.getByTestId('input-date'));

      const calendar = screen.getByTestId('calendar');
      expect(calendar).toBeInTheDocument();

      mockedAxios.post.mockRejectedValueOnce({
        data: {
          messages: ['[failed]'],
          meta: {
            code: '',
            status: 'failed',
          },
        },
      });

      const allDay = within(screen.getByRole('grid')).getAllByRole('gridcell');
      const filterAvailableDay = allDay.filter(
        (element) => !element.hasAttribute('disabled')
      );

      await userEvent.click(filterAvailableDay[0]);

      expect(screen.getByTestId('btn-submit')).toBeEnabled();
      await userEvent.click(screen.getByTestId('btn-submit'));

      expect(
        screen.getByText('Oops! Sesuatu telah terjadi')
      ).toBeInTheDocument();
    });

    it('should show successful toast when post is resolve', async () => {
      await userEvent.click(screen.getByTestId('input-date'));

      const calendar = screen.getByTestId('calendar');
      expect(calendar).toBeInTheDocument();

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

      const allDay = within(screen.getByRole('grid')).getAllByRole('gridcell');
      const filterAvailableDay = allDay.filter(
        (element) => !element.hasAttribute('disabled')
      );

      await userEvent.click(filterAvailableDay[0]);

      expect(screen.getByTestId('btn-submit')).toBeEnabled();
      await userEvent.click(screen.getByTestId('btn-submit'));

      expect(mockedUsedNavigate).toHaveBeenCalledTimes(1);
    });
  });
});
