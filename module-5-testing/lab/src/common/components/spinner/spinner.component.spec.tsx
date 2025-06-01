import React from 'react';
import { render } from '@testing-library/react';
import { SpinnerComponent } from './spinner.component';
import * as reactPromiseTracker from 'react-promise-tracker';

vi.mock('react-promise-tracker');

describe('Verify spinner component behavior', () => {
  it('should be rendered as expected', () => {
    // Arrange
    vi.spyOn(reactPromiseTracker, 'usePromiseTracker').mockReturnValue({
      promiseInProgress: true,
    });

    const component = <SpinnerComponent />;

    // Act
    const { getByTestId } = render(component);

    // Assert
    expect(getByTestId('spinner')).toBeInTheDocument();
  });

  it('should not be rendered', () => {
    // Arrange
    vi.spyOn(reactPromiseTracker, 'usePromiseTracker').mockReturnValue({
      promiseInProgress: false,
    });

    const component = <SpinnerComponent />;

    // Act
    const { queryByTestId } = render(component);

    // Assert
    expect(queryByTestId('spinner')).not.toBeInTheDocument();
  });
});
