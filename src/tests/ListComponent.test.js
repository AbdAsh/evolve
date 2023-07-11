import React from 'react';
import { render } from '@testing-library/react';
import List from '../components/ListComponent';

describe('List component', () => {
  const items = [
    {
      id: 1,
      first_name: 'John',
      last_name: 'Doe',
      subtitle: 'Software Engineer',
      avatar: 'https://example.com/avatar1.png',
    },
    {
      id: 2,
      first_name: 'Jane',
      last_name: 'Doe',
      subtitle: 'Product Manager',
      avatar: 'https://example.com/avatar2.png',
    },
  ];

  it('renders a list of items', () => {
    const { getByText, getByAltText } = render(<List items={items} />);
    expect(getByText('John Doe')).toBeInTheDocument();
    expect(getByText('Jane Doe')).toBeInTheDocument();
  });

  it('renders a default subtitle if item has no subtitle', () => {
    const itemsWithoutSubtitle = [
      {
        id: 1,
        first_name: 'John',
        last_name: 'Doe',
        avatar: 'https://example.com/avatar1.png',
      },
    ];
    const { getByText } = render(<List items={itemsWithoutSubtitle} />);
    expect(getByText('No offical title')).toBeInTheDocument();
  });

});