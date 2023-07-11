import { render, screen } from '@testing-library/react';
import IndexPage from '../pages/index';

describe('IndexPage', () => {
  test('renders page title', () => {
    render(<IndexPage />);
    const pageTitle = screen.getByText(/New Sessions/i);
    expect(pageTitle).toBeInTheDocument();
  });

  test('renders Form component with session prop', () => {
    const sessionId = '123';
    render(<IndexPage />, { route: `/?sessionId=${sessionId}` });
    const formComponent = screen.getByTestId('form-component');
    expect(formComponent).toHaveAttribute('session', sessionId);
  });
});