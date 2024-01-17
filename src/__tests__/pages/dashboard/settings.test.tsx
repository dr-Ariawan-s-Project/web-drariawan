import { Mocked } from 'vitest';
import { capitalize } from 'lodash';

import { render, screen, within, act } from '@/__tests__/test-utils';

import App from '@/pages/dashboard/settings';
import { sampleProfile } from '@/utils/apis/user/sample-data';
import axiosWithConfig from '@/utils/apis/axiosWithConfig';
import { useAuthStore } from '@/utils/states';

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

describe('Setting Dashboard Page', () => {
  beforeEach(async () => {
    await act(async () => {
      useAuthStore.setState({ role: 'dokter' }, true);

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
  });

  describe('Renders the page', () => {
    it('should render the page', () => {
      const form = screen.getByTestId('form-setting');
      expect(form).toBeInTheDocument();

      for (const key in formInput) {
        expect(within(form).getByTestId(key)).toBeInTheDocument();
      }

      expect(within(form).getByTestId('input-name')).toHaveValue(
        sampleProfile.name
      );
      expect(within(form).getByTestId('input-email')).toHaveValue(
        sampleProfile.email
      );
      expect(within(form).getByTestId('input-phone-number')).toHaveValue(
        sampleProfile.phone
      );
      expect(within(form).getByTestId('input-role')).toHaveTextContent(
        capitalize(sampleProfile.role)
      );
      expect(within(form).getByTestId('input-specialization')).toHaveValue(
        sampleProfile.specialization
      );

      expect(within(form).getByTestId('btn-submit')).toBeInTheDocument();
    });
  });
});
