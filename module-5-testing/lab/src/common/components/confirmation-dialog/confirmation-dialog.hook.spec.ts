import { renderHook } from '@testing-library/react';
import { useConfirmationDialog } from './confirmation-dialog.hook';
import { act } from 'react';

const item = { id: '', name: '' };

describe('Verify useConfirmationDialog hook behaviour', () => {
  it('should return an object with default values', () => {
    // Arrange
    const { result } = renderHook(() => useConfirmationDialog());

    // Act

    // Assert
    expect(result.current.isOpen).toEqual(false);
    expect(result.current.itemToDelete).toEqual(item);
    expect(result.current.onAccept).toEqual(expect.any(Function));
    expect(result.current.onClose).toEqual(expect.any(Function));
    expect(result.current.onOpenDialog).toEqual(expect.any(Function));
  });

  it('should update isOpen when it calls setIsOpen', () => {
    // Arrange
    const { result } = renderHook(() => useConfirmationDialog());

    // Act
    act(() => {
      result.current.onOpenDialog(item);
    });

    // Assert
    expect(result.current.isOpen).toEqual(true);
  });

  it('should update itemToDelete when it calls setItemToDelete', () => {
    // Arrange
    const { result } = renderHook(() => useConfirmationDialog());

    // Act
    act(() => {
      result.current.onOpenDialog(item);
    });

    // Assert
    expect(result.current.itemToDelete).toEqual(item);
  });
});
