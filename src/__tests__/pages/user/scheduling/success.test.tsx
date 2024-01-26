import { render, screen, act, fireEvent } from '@/__tests__/test-utils';

import App from '@/pages/user/scheduling/success';

vi.mock('react-router-dom', async () => {
  const mod = await vi.importActual('react-router-dom');
  return {
    ...mod,
    useLocation: () => ({
      state: {
        from: 'scheduling',
      },
    }),
  };
});

describe('Scheduling Page', () => {
  beforeEach(async () => {
    await act(async () => {
      render(<App />);
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
    vi.resetAllMocks();
  });

  describe('Renders the page', () => {
    it('should render the page when state location is exist', () => {
      expect(
        screen.getByText('Pendaftaran Anda Terverifikasi!')
      ).toBeInTheDocument();
    });
  });

  describe('Action', () => {
    it('should navigate to questionnaire form when click on the button', async () => {
      const button = screen.getByTestId('to-homepage');
      expect(button).toBeInTheDocument();

      await act(async () => {
        fireEvent.click(button);
      });
    });
  });
});
