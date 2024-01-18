import { Mocked } from 'vitest';

import { render, screen, act, fireEvent, within } from '@/__tests__/test-utils';

import App from '@/pages/user/questionnaire/start';
import { sampleQuestionnaires } from '@/utils/apis/questionnaire/sample-data';
import axiosWithConfig from '@/utils/apis/axiosWithConfig';

const mockedUsedNavigate = vi.fn();

vi.mock('@/utils/apis/axiosWithConfig');
vi.mock('react-router-dom', async () => {
  const mod = await vi.importActual('react-router-dom');
  return {
    ...mod,
    useNavigate: () => mockedUsedNavigate,
    useSearchParams: () => [
      new URLSearchParams({
        code: 'b6LzjKjgx3qNFpb0FbE6ausXc1yqnOInPzgohvNNwgcPHR5go5FEkfm9IsMZXtVQ021DJFnIcdIh0DlHE1KGmg==',
      }),
    ],
  };
});

const mockedAxios = axiosWithConfig as Mocked<typeof axiosWithConfig>;

describe('Questionnaire Start Page', () => {
  beforeEach(async () => {
    await act(async () => {
      mockedAxios.get.mockResolvedValueOnce({
        data: {
          data: sampleQuestionnaires,
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
    it('should render the page (landing)', () => {
      expect(screen.getByTestId('btn-start')).toBeInTheDocument();
    });

    it('should render the page (start) when click on button', async () => {
      await act(async () => {
        fireEvent.click(screen.getByTestId('btn-start'));
      });

      expect(screen.getByTestId('question-number')).toBeInTheDocument();
    });
  });

  describe('Actions', () => {
    beforeEach(async () => {
      await act(async () => {
        fireEvent.click(screen.getByTestId('btn-start'));
      });
    });

    it('should disable button when user not selecting an answer', () => {
      expect(screen.getByTestId('btn-next')).toBeDisabled();
    });

    it('should enable button when user selecting an answer', async () => {
      await act(async () => {
        const radioGroup = screen.getByRole('radiogroup');

        fireEvent.click(within(radioGroup).getAllByRole('radio')[0]);
      });

      expect(screen.getByTestId('btn-next')).toBeEnabled();
    });

    it('should display failed toast when post is reject', async () => {
      // Question #1
      await act(async () => {
        const radioGroup = screen.getByRole('radiogroup');

        fireEvent.click(within(radioGroup).getAllByRole('radio')[0]);
      });

      fireEvent.click(screen.getByTestId('btn-next'));

      // Question #2
      await act(async () => {
        const radioGroup = screen.getByRole('radiogroup');

        fireEvent.click(within(radioGroup).getAllByRole('radio')[0]);
      });

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
        fireEvent.click(screen.getByTestId('btn-next'));
      });

      expect(mockedUsedNavigate).toHaveBeenCalledTimes(0);
    });

    it.skip('should be navigate to questionnaire finish when post is resolve', async () => {
      // Question #1
      await act(async () => {
        const radioGroup = screen.getByRole('radiogroup');

        fireEvent.click(within(radioGroup).getAllByRole('radio')[0]);
      });

      fireEvent.click(screen.getByTestId('btn-next'));

      // Question #2
      await act(async () => {
        const radioGroup = screen.getByRole('radiogroup');

        fireEvent.click(within(radioGroup).getAllByRole('radio')[0]);
      });

      mockedAxios.post.mockResolvedValueOnce({
        data: {
          data: 'success',
          messages: ['[success]'],
          meta: {
            code: '200-007-OK',
            status: 'success',
          },
        },
      });

      await act(async () => {
        fireEvent.click(screen.getByTestId('btn-next'));
      });

      expect(mockedUsedNavigate).toHaveBeenCalledTimes(1);
    });
  });
});
