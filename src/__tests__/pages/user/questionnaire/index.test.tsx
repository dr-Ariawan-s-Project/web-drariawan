import { render, screen, act, fireEvent } from '@/__tests__/test-utils';

import App from '@/pages/user/questionnaire';

const mockedUsedNavigate = vi.fn();

vi.mock('react-router-dom', async () => {
  const mod = await vi.importActual('react-router-dom');
  return {
    ...mod,
    useNavigate: () => mockedUsedNavigate,
  };
});

describe('Scheduling Page', () => {
  beforeEach(async () => {
    await act(async () => {
      render(<App />);
    });
  });

  describe('Renders the page', () => {
    it('should render the page', () => {
      expect(
        screen.getByText('Kuisioner Faktor Risiko Kesuburan Pria')
      ).toBeInTheDocument();
      expect(screen.getByTestId('to-questionnaire-form')).toBeInTheDocument();
    });

    it('should disable button when user not agree', () => {
      expect(screen.getByTestId('to-questionnaire-form')).toBeDisabled();
    });

    it('should enable button when user agree', async () => {
      await act(async () => {
        fireEvent.click(screen.getByTestId('checkbox-agreement'));
      });

      expect(screen.getByTestId('to-questionnaire-form')).toBeEnabled();
    });
  });

  describe('Action', () => {
    it('should navigate to questionnaire form when click on the button', async () => {
      await act(async () => {
        fireEvent.click(screen.getByTestId('checkbox-agreement'));
      });

      await act(async () => {
        fireEvent.click(screen.getByTestId('to-questionnaire-form'));
      });

      expect(mockedUsedNavigate).toHaveBeenCalledTimes(1);
    });
  });
});
