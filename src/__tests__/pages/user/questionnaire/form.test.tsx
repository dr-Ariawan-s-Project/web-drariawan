import { Mocked } from 'vitest';

import { render, screen, act, fireEvent, within } from '@/__tests__/test-utils';

import App from '@/pages/user/questionnaire/form';
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
  'input-email': 'test@mail.com',
  'input-phone-number': '6282222222222',
  'input-option': 'myself',
};

describe('Scheduling Page', () => {
  beforeEach(async () => {
    await act(async () => {
      render(<App />);
    });
  });

  describe('Renders the page', () => {
    it('should render the page', () => {
      const form = screen.getByTestId('form-questionnaire');

      for (const key in formInput) {
        expect(within(form).getByTestId(key)).toBeInTheDocument();
      }

      expect(within(form).getByTestId('btn-submit')).toBeInTheDocument();
    });

    it('should displays value inside input', () => {
      const form = screen.getByTestId('form-questionnaire');

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

  describe('Action', () => {
    it('should show error message when some of input is missing a value', async () => {
      await act(async () => {
        fireEvent.click(screen.getByTestId('btn-submit'));
      });

      const form = screen.getByTestId('form-questionnaire');

      expect(within(form).getByText('Email wajib diisi')).toBeInTheDocument();
      expect(
        within(form).getByText('Nomor telepon wajib diisi')
      ).toBeInTheDocument();
    });

    it('should display failed toast when post is reject', async () => {
      const form = screen.getByTestId('form-questionnaire');

      let input: keyof typeof formInput;
      for (input in formInput) {
        const component = within(form).getByTestId(input);
        fireEvent.change(component, {
          target: { value: formInput[input] },
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

    it('should navigate to questionnaire sent when post is resolve', async () => {
      const form = screen.getByTestId('form-questionnaire');

      let input: keyof typeof formInput;
      for (input in formInput) {
        const component = within(form).getByTestId(input);
        fireEvent.change(component, {
          target: { value: formInput[input] },
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
