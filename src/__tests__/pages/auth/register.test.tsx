import '@testing-library/jest-dom';
import { userEvent } from '@testing-library/user-event';
import { Mocked } from 'vitest';

import { render, screen, within, fireEvent, act } from '@/__tests__/test-utils';

import App from '@/pages/auth/register';
import axiosWithConfig from '@/utils/apis/axiosWithConfig';

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
const formInput = {
  'input-email': { type: 'input', value: 'test@mail.com' },
  'input-password': { type: 'input', value: 'testing123' },
  'input-name': { type: 'input', value: 'Test' },
  'input-gender': { type: 'dropdown', value: 'Male' },
  'input-status': { type: 'dropdown', value: 'Married' },
  'input-nik': { type: 'input', value: '1234561101971234' },
  'input-dob': {
    type: 'datepicker',
    value: '1997-01-11',
  },
  'input-phone-number': { type: 'input', value: '6282222222222' },
  'input-nationality': { type: 'dropdown', value: 'Indonesia' },
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
          target: { value: formInput[input].value },
        });
        expect(component).toHaveValue(formInput[input].value);
      }
    });
  });

  describe('Actions on page', () => {
    afterEach(() => {
      vi.clearAllMocks();
    });

    describe('Partner option is myself', () => {
      it('should show error message when some of input is missing a value (option myself)', async () => {
        await act(async () => {
          fireEvent.click(screen.getByTestId('btn-submit'));
        });

        const form = screen.getByTestId('form-register');

        expect(within(form).getByText('Nama lengkap wajib diisi')).toBeTruthy();
        expect(within(form).getByText('Email wajib diisi')).toBeTruthy();
        expect(within(form).getByText('Password wajib diisi')).toBeTruthy();
        expect(within(form).getByText('NIK wajib diisi')).toBeTruthy();
        expect(
          within(form).getByText('Tanggal lahir wajib diisi')
        ).toBeTruthy();
        expect(
          within(form).getByText('Nomor telepon wajib diisi')
        ).toBeTruthy();
      });

      it('should display failed toast when post is reject (option myself)', async () => {
        const form = screen.getByTestId('form-register');

        let input: keyof typeof formInput;
        for (input in formInput) {
          const component = within(form).getByTestId(input);
          const inputValue = formInput[input].value;

          await act(async () => {
            fireEvent.change(component, { target: { value: inputValue } });
          });
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

        await act(async () => {
          fireEvent.click(screen.getByTestId('btn-submit'));
        });

        expect(mockedUsedNavigate).toHaveBeenCalledTimes(0);
      });

      it('should display successful toast when post is resolve (option myself)', async () => {
        const form = screen.getByTestId('form-register');

        let input: keyof typeof formInput;
        for (input in formInput) {
          const component = within(form).getByTestId(input);
          const inputValue = formInput[input].value;

          await act(async () => {
            fireEvent.change(component, { target: { value: inputValue } });
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

        expect(mockedUsedNavigate).toHaveBeenCalledTimes(1);
      });
    });

    describe('Partner option is partner', () => {
      beforeEach(async () => {
        await userEvent.click(
          within(screen.getByTestId('form-register')).getByTestId(
            'input-option'
          )
        );
        await userEvent.click(
          within(screen.getByRole('presentation')).getByTestId('option-partner')
        );
      });

      it('should show error message when some of input is missing a value (option partner)', async () => {
        const form = screen.getByTestId('form-register');

        await userEvent.click(screen.getByTestId('btn-submit'));

        expect(within(form).getByText('Nama lengkap wajib diisi')).toBeTruthy();
        expect(within(form).getByText('Email wajib diisi')).toBeTruthy();
        expect(within(form).getByText('Password wajib diisi')).toBeTruthy();
        expect(within(form).getByText('NIK wajib diisi')).toBeTruthy();
        expect(
          within(form).getByText('Tanggal lahir wajib diisi')
        ).toBeTruthy();
        expect(
          within(form).getByText('Nomor telepon wajib diisi')
        ).toBeTruthy();
        expect(
          within(form).getByText('Email partner wajib diisi')
        ).toBeTruthy();
      });

      it('should display failed toast when post is reject (option partner)', async () => {
        const form = screen.getByTestId('form-register');
        const dupeFormInput = {
          ...formInput,
          'input-partner-email': { type: 'input', value: 'testing@mail.com' },
        };

        let input: keyof typeof dupeFormInput;
        for (input in dupeFormInput) {
          const component = within(form).getByTestId(input);
          const inputValue = dupeFormInput[input].value;

          await act(async () => {
            fireEvent.change(component, { target: { value: inputValue } });
          });
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

        await act(async () => {
          fireEvent.click(screen.getByTestId('btn-submit'));
        });

        expect(mockedUsedNavigate).toHaveBeenCalledTimes(0);
      });

      it('should display successful toast when post is resolve (option partner)', async () => {
        const form = screen.getByTestId('form-register');
        const dupeFormInput = {
          ...formInput,
          'input-partner-email': { type: 'input', value: 'testing@mail.com' },
        };

        let input: keyof typeof dupeFormInput;
        for (input in dupeFormInput) {
          const component = within(form).getByTestId(input);
          const inputValue = dupeFormInput[input].value;

          await act(async () => {
            fireEvent.change(component, { target: { value: inputValue } });
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

        expect(mockedUsedNavigate).toHaveBeenCalledTimes(1);
      });
    });
  });
});
