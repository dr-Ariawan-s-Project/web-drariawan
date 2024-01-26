import '@testing-library/jest-dom';

import { render, screen, act, fireEvent } from '@/__tests__/test-utils';

import App from '@/pages/404';

describe('404 Page', () => {
  beforeEach(async () => {
    await act(async () => {
      render(<App />);
    });
  });

  describe('Renders the page', () => {
    it('should render the page', () => {
      expect(
        screen.getByText('Maaf, Anda belum punya hak akses ke halaman ini')
      ).toBeInTheDocument();
      expect(
        screen.getByText(
          'Anda belum melakukan pengisian daftar diri sebelumnya, silahkan klik tombol di bawah'
        )
      ).toBeInTheDocument();
    });
  });

  describe('Action', () => {
    it('should navigate to questionnaire form when click on the button', async () => {
      const button = screen.getByTestId('btn-go-back');
      expect(button).toBeInTheDocument();

      await act(async () => {
        fireEvent.click(button);
      });
    });
  });
});
