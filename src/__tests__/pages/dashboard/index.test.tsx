import { Mocked } from 'vitest';

import { render, screen, within, act } from '@/__tests__/test-utils';

import App from '@/pages/dashboard';
import axiosWithConfig from '@/utils/apis/axiosWithConfig';
import {
  sampleChartData,
  sampleDashboardData,
} from '@/utils/apis/dashboard/sample-data';
import { useAuthStore } from '@/utils/states';

vi.mock('@/utils/apis/axiosWithConfig');

const mockedAxios = axiosWithConfig as Mocked<typeof axiosWithConfig>;

describe('Dashboard Page', () => {
  beforeEach(async () => {
    await act(async () => {
      useAuthStore.setState({ role: 'superadmin' }, true);

      mockedAxios.get.mockResolvedValueOnce({
        data: {
          data: sampleDashboardData,
          messages: ['[success] read data'],
          meta: {
            code: '200-007-OK',
            status: 'success',
          },
        },
      });
      mockedAxios.get.mockResolvedValueOnce({
        data: {
          data: sampleChartData,
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
      const cardGroup = screen.getByTestId('card-group');
      expect(cardGroup).toBeInTheDocument();

      for (const key in sampleDashboardData) {
        expect(
          within(cardGroup).getByTestId(`card-${key}`)
        ).toBeInTheDocument();
      }

      const cardChart = screen.getByTestId('card-chart');
      expect(cardChart).toBeInTheDocument();
      expect(
        within(cardChart).getByText('Kuesioner per Bulan')
      ).toBeInTheDocument();
    });
  });
});
