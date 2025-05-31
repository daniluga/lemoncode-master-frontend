import { renderHook, act } from '@testing-library/react';
import { ThemeProvider } from './theme.context';
import { useTheme } from './theme.hooks';

/**
 * el fichero estaba en .ts y fallaba al importar el ThemeProvider
 * porque no se encontraba el archivo .ts, por lo que se ha cambiado a .tsx
 */
describe('useTheme specs', () => {
  it('should return a theme equals { primaryColor: "black" } when it renders the hook and calls to onChangeDarkTheme', () => {
    // Arrange
    // Act
    const { result } = renderHook(() => useTheme(), { wrapper: ThemeProvider });
    act(() => {
      result.current.onChangeDarkTheme();
    });
    // Assert
    expect(result.current.theme).toEqual({ primaryColor: 'black' });
  });
});
