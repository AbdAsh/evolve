import { render } from '@testing-library/react';
import DefaultLayout from '../layouts/default';

describe('DefaultLayout', () => {
  it('renders the header', () => {
    const { getByRole } = render(<DefaultLayout />);
    const header = getByRole('banner');
    expect(header).toBeInTheDocument();
  });

  it('renders the main body', () => {
    const { getByRole } = render(<DefaultLayout body={<div>Test Body</div>} />);
    const mainBody = getByRole('main');
    expect(mainBody).toBeInTheDocument();
    expect(mainBody).toHaveTextContent('Test Body');
  });

  it('renders the sidebar', () => {
    const { getByTestId } = render(<DefaultLayout />);
    const sidebar = getByTestId('sidebar');
    expect(sidebar).toBeInTheDocument();
  });
});