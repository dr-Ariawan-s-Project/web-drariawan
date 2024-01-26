import { Mocked } from 'vitest';

import { render, screen, act, fireEvent, within } from '@/__tests__/test-utils';

import App from '@/pages/user/questionnaire/form';
import axiosWithConfig from '@/utils/apis/axiosWithConfig';
import { userEvent } from '@testing-library/user-event';

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
  'input-phone-number': { type: 'input', value: '6282222222222' },
  'input-option': { type: 'dropdown', value: 'myself' },
};

describe('Scheduling Page', () => {
  beforeEach(async () => {
    await act(async () => {
      render(<App />);
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe('Renders the page', () => {
    it('should render the page', () => {
      const form = screen.getByTestId('form-questionnaire');

      for (const key in formInput) {
        expect(within(form).getByTestId(key)).toBeInTheDocument();
      }

      expect(within(form).getByTestId('btn-submit')).toBeInTheDocument();
    });
  });

  describe('Actions on page', () => {
    describe('Partner option is myself', () => {
      it('should show error message when some of input is missing a value (option myself)', async () => {
        await act(async () => {
          fireEvent.click(screen.getByTestId('btn-submit'));
        });

        const form = screen.getByTestId('form-questionnaire');

        expect(within(form).getByText('Email wajib diisi')).toBeInTheDocument();
        expect(
          within(form).getByText('Nomor telepon wajib diisi')
        ).toBeInTheDocument();
      });

      it('should display failed toast when post is reject (option myself)', async () => {
        const form = screen.getByTestId('form-questionnaire');

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

      it('should navigate to questionnaire sent when post is resolve (option myself)', async () => {
        const form = screen.getByTestId('form-questionnaire');

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
          within(screen.getByTestId('form-questionnaire')).getByTestId(
            'input-option'
          )
        );
        await userEvent.click(
          within(screen.getByRole('presentation')).getByTestId('option-partner')
        );
      });

      it('should show error message when some of input is missing a value (option partner)', async () => {
        await act(async () => {
          fireEvent.click(screen.getByTestId('btn-submit'));
        });

        const form = screen.getByTestId('form-questionnaire');

        expect(within(form).getByText('Email wajib diisi')).toBeInTheDocument();
        expect(
          within(form).getByText('Nomor telepon wajib diisi')
        ).toBeInTheDocument();
        expect(
          within(form).getByText('Email partner wajib diisi')
        ).toBeInTheDocument();
      });

      it('should display failed toast when post is reject (option partner)', async () => {
        const form = screen.getByTestId('form-questionnaire');
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

      it('should navigate to questionnaire sent when post is resolve (option partner)', async () => {
        const form = screen.getByTestId('form-questionnaire');
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
