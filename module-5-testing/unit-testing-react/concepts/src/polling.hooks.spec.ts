import { renderHook, waitFor } from '@testing-library/react';
import { usePolling } from './polling.hooks';

describe('usePolling specs', () => {
  beforeEach(() => {
    /**
     * si encuentra tiempos de espera, simulará el tiempo de espera
     * y no esperará el tiempo real. Por lo tanto, no se espera el tiempo real.
     */
    vi.useFakeTimers();
  });
  it('should return count equals 0 when initialize the hook', () => {
    // Arrange
    const pollingTime = 500; // 500ms
    // Act
    const { result } = renderHook(() => usePolling(pollingTime));
    // Assert
    expect(result.current.count).toEqual(0); // el hook tarda 500ms en inicializarse
  });

  it('should return count equals 1 when it waits for next update', async () => {
    // Arrange
    const pollingTime = 500;
    // Act
    const { result } = renderHook(() => usePolling(pollingTime));
    // Assert
    await waitFor(() => {
      expect(result.current.count).toEqual(1); // el hook se pudo ejecutar 1 vez
    });
  });

  it('should return count equals 3 when it waits 3 times for next update', async () => {
    // Arrange
    const pollingTime = 500;
    // Act
    const { result } = renderHook(() => usePolling(pollingTime));
    // Assert
    await waitFor(
      () => {
        // The default timeout is 1000ms. y por eso peta.
        expect(result.current.count).toEqual(3);
      },
      { timeout: 2000 }
    ); // el hook se pudo ejecutar 3 veces
  });

  it('should call clearInterval when it unmounts the component', () => {
    // Arrange
    const pollingTime = 500;
    /**
     * window para todo lo relacionado con el navegador.
     */
    vi.spyOn(window, 'clearInterval');

    // Act
    const { unmount } = renderHook(() => usePolling(pollingTime));

    // Assert
    /**
     * clearinterval es una función que se ejecuta cuando el componente se desmonta.
     */
    expect(window.clearInterval).not.toHaveBeenCalled();
    unmount();
    expect(window.clearInterval).toHaveBeenCalled();
  });
});
