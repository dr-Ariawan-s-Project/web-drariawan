import '@testing-library/jest-dom';

import { render, screen, act, fireEvent } from '@/__tests__/test-utils';

import App from '@/pages/';

describe('Index Page', () => {
  beforeEach(async () => {
    vi.useFakeTimers();

    await act(async () => {
      render(<App />);
    });
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  describe('Renders the page', () => {
    it('should render the page after splash', () => {
      act(() => vi.advanceTimersByTime(5000));

      expect(screen.getByTestId('to-questionnaire')).toBeInTheDocument();
      expect(screen.getByTestId('to-scheduling')).toBeInTheDocument();
    });
  });

  describe('Action', () => {
    it('should navigate to questionnaire when click on the button', async () => {
      act(() => vi.advanceTimersByTime(5000));

      const button = screen.getByTestId('to-questionnaire');
      expect(button).toBeInTheDocument();

      await act(async () => {
        fireEvent.click(button);
      });
    });

    it('should navigate to scheduling when click on the button', async () => {
      act(() => vi.advanceTimersByTime(5000));

      const button = screen.getByTestId('to-scheduling');
      expect(button).toBeInTheDocument();

      await act(async () => {
        fireEvent.click(button);
      });
    });
  });
});
