import '@testing-library/jest-dom';
import { Mocked } from 'vitest';

import { render, screen, within, fireEvent, act } from '@/__tests__/test-utils';

import App from '@/pages/auth/register';
import axiosWithConfig from '@/utils/apis/axiosWithConfig';

vi.mock('@/utils/apis/axiosWithConfig');

const mockedAxios = axiosWithConfig as Mocked<typeof axiosWithConfig>;
const formInput = {
  'input-email': 'test@mail.com',
  'input-password': 'testing123',
  'input-name': 'Test',
  'input-gender': 'Male',
  'input-status': 'Married',
  'input-nik': '1234561101971234',
  'input-phone-number': '6282222222222',
  'input-nationality': 'Indonesia',
  'input-option': 'myself',
};

describe('Register Page', () => {
  beforeEach(async () => {
    await act(async () => {
      render(<App />);
    });
  });

  describe('Renders the page', () => {
    it('should render the page', () => {
      const form = screen.getByTestId('form-register');
      expect(form).toBeTruthy();

      for (const input in formInput) {
        expect(within(form).getByTestId(input)).toBeTruthy();
      }
      expect(within(form).getByTestId('btn-submit')).toBeTruthy();
    });

    it('should displays value inside input', () => {
      const form = screen.getByTestId('form-register');

      let input: keyof typeof formInput;
      for (input in formInput) {
        const component = within(form).getByTestId(input);
        fireEvent.change(component, {
          target: { value: formInput[input] },
        });
        expect(component).toHaveValue(formInput[input]);
      }
    });
  });

  describe('Action for Register', () => {
    it('should show error message when some of input is missing a value (option myself)', async () => {
      await act(async () => {
        fireEvent.click(screen.getByTestId('btn-submit'));
      });

      const form = screen.getByTestId('form-register');

      expect(within(form).getByText('Nama lengkap wajib diisi')).toBeTruthy();
      expect(within(form).getByText('Email wajib diisi')).toBeTruthy();
      expect(within(form).getByText('Password wajib diisi')).toBeTruthy();
      expect(within(form).getByText('NIK wajib diisi')).toBeTruthy();
      expect(within(form).getByText('Tanggal lahir wajib diisi')).toBeTruthy();
      expect(within(form).getByText('Nomor telepon wajib diisi')).toBeTruthy();
    });

    it('should display failed toast when email is already exist', async () => {
      const form = screen.getByTestId('form-register');

      let input: keyof typeof formInput;
      for (input in formInput) {
        const component = within(form).getByTestId(input);
        fireEvent.change(component, {
          target: { value: formInput[input] },
        });
      }

      mockedAxios.post.mockRejectedValueOnce({
        data: {
          message: 'User already exist, please login.',
        },
      });

      await act(async () => {
        fireEvent.click(screen.getByTestId('btn-submit'));
      });

      setTimeout(() => {
        expect(
          screen.getByText('User already exist, please login.')
        ).toBeTruthy();
      }, 2000);
    });

    it('should display successful toast when using unique email', async () => {
      const form = screen.getByTestId('form-register');
      let dupeFormInput = { ...formInput, 'input-email': 'test3@mail.com' };

      let input: keyof typeof dupeFormInput;
      for (input in dupeFormInput) {
        const component = within(form).getByTestId(input);
        fireEvent.change(component, {
          target: { value: dupeFormInput[input] },
        });
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

      await act(async () => {
        fireEvent.click(screen.getByTestId('btn-submit'));
      });

      setTimeout(() => {
        expect(
          screen.getByText(
            'Berhasil registrasi, silahkan login terlebih dahulu'
          )
        ).toBeTruthy();
      }, 2000);
    });
  });
});
