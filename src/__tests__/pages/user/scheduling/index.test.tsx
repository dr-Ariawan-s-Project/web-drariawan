import { Mocked } from 'vitest';

import { render, screen, within, act, fireEvent } from '@/__tests__/test-utils';

import App from '@/pages/user/scheduling';
import { sampleSchedules } from '@/utils/apis/schedule/sample-data';
import axiosWithConfig from '@/utils/apis/axiosWithConfig';
import { useAuthStore } from '@/utils/states';

vi.mock('@/utils/apis/axiosWithConfig');

const mockedAxios = axiosWithConfig as Mocked<typeof axiosWithConfig>;

describe('Scheduling Page', () => {
  beforeEach(async () => {
    await act(async () => {
      useAuthStore.setState({ role: 'pasien' }, true);

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

      render(<App />);
    });
  });

  describe('Renders the page', () => {
    it('should render the page', () => {
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
  });

  describe('Actions', () => {
    beforeEach(async () => {
      const scheduleBoard = screen.getByTestId('schedule-board');
      const columnDay = within(scheduleBoard).getByTestId('column-Senin');
      const scheduleData = within(columnDay).getAllByTestId('schedule-data')[0];

      await act(async () => {
        fireEvent.click(scheduleData);
      });
    });

    it('should show dialog when click on schedule card', async () => {
      expect(screen.getByRole('dialog')).toBeInTheDocument();
    });

    test.skip('should show successful toast when post is resolve', async () => {});

    test.skip('should show failed toast when post is reject', async () => {});
  });
});
