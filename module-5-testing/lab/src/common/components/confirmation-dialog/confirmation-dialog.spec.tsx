import React from 'react';
import { render } from '@testing-library/react';
import { ConfirmationDialogComponent } from './confirmation-dialog.component';

const props = {
  isOpen: true,
  onAccept: vi.fn(),
  onClose: vi.fn(),
  title: 'title',
  labels: {
    closeButton: 'Close',
    acceptButton: 'Accept',
  },
  children: 'Content of the dialog',
};

describe('Verify confirmation dialog behaviour', () => {
  it('should be rendered as expected passing required properties', () => {
    // Arrange
    // Act
    const { getByText } = render(<ConfirmationDialogComponent {...props} />);

    // Assert
    expect(getByText('title')).toBeInTheDocument();
    expect(getByText('Close')).toBeInTheDocument();
    expect(getByText('Accept')).toBeInTheDocument();
    expect(getByText('Content of the dialog')).toBeInTheDocument();
    expect(props.onAccept).not.toHaveBeenCalled();
    expect(props.onClose).not.toHaveBeenCalled();
  });

  it('should call onClose when close button is clicked', () => {
    // Arrange
    const { getByText } = render(<ConfirmationDialogComponent {...props} />);

    // Act
    getByText('Close').click();

    // Assert
    expect(props.onAccept).not.toHaveBeenCalled();
    expect(props.onClose).toHaveBeenCalled();
  });

  it('should call onAccept and onClose when accept button is clicked', () => {
    // Arrange
    const { getByText } = render(<ConfirmationDialogComponent {...props} />);

    // Act
    getByText('Accept').click();

    // Assert
    expect(props.onAccept).toHaveBeenCalled();
    expect(props.onClose).toHaveBeenCalled();
  });
});
