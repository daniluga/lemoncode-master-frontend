import React from 'react';
import { HashRouter, Routes, Route } from 'react-router';
import { render, screen, waitFor } from '@testing-library/react';
import { NameCollection } from './name-collection';
import * as api from './name-api';
import { UserEdit } from './user-edit';
import userEvent from '@testing-library/user-event';

const renderWithRouter = (component) =>
  render(
    <HashRouter>
      <Routes>
        <Route path="/" element={component} />
        <Route path="users/:name" element={<UserEdit />} />
      </Routes>
    </HashRouter>
  );

describe('NameCollection component specs', () => {
  it('should display a list with one item when it mounts the component and it resolves the async call', async () => {
    // Arrange
    vi.spyOn(api, 'getNameCollection').mockResolvedValue(['John Doe']);

    // Act
    renderWithRouter(<NameCollection />);
    const itemsBeforeWait = screen.queryAllByRole('listitem');
    expect(itemsBeforeWait).toHaveLength(0);

    const items = await screen.findAllByRole('listitem');

    // Assert
    expect(items).toHaveLength(1);
    expect(api.getNameCollection).toHaveBeenCalled();
  });

  it('should remove no data description when it mounts the component and it resolves the async call', async () => {
    // Arrange
    vi.spyOn(api, 'getNameCollection').mockResolvedValue(['John Doe']);

    // Act
    renderWithRouter(<NameCollection />);

    expect(screen.getByText('No data to display')).toBeInTheDocument();

    // Assert
    await waitFor(() => {
      expect(screen.queryByText('No data to display')).not.toBeInTheDocument();
    });
  });

  it('should navigate to second user edit page when click in second user name', async () => {
    // Arrange
    vi.spyOn(api, 'getNameCollection').mockResolvedValue([
      'John Doe',
      'Jane Doe',
    ]);

    // Act
    renderWithRouter(<NameCollection />);

    const links = await screen.findAllByRole('link');

    const secondUser = links[1];

    /**
     * screen.debug()
     * -------------------
     * Hace un console log de la estructura del DOM en ese momento.
     */
    screen.debug();
    await userEvent.click(secondUser);
    screen.debug();

    const userEditElement = screen.getByRole('heading', {
      level: 1,
      name: 'User name: Jane Doe',
    });

    // Assert
    expect(userEditElement).toBeInTheDocument();
  });
});
