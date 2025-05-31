import { renderHook, waitFor } from '@testing-library/react';
import { Credential, User } from './model';
import { useLogin } from './login.hooks';
import { act } from 'react';
import * as api from './api';

describe('useLogin specs', () => {
  it('should return an object: credential with default values and setCredential a function when it calls it', () => {
    // Arrange

    // Act
    /**
     * render es para renderizar un componente de React
     * ------------------------------------------------------
     * renderHook es para renderizar un hook de React
     */
    const { result } = renderHook(() => useLogin());

    // Assert
    const defaultCredential: Credential = { name: '', password: '' };

    /**
     * result.current es el valor devuelto por el hook
     * result.current.credential es el valor de credential devuelto por el hook
     * result.current.setCredential es la función setCredential devuelta por el hook
     * expect.any(Function) es una función que espera que el valor sea una función
     */
    console.log('result.current.credential ->', result.current.credential);
    console.log('defaultCredential ->', defaultCredential);
    expect(result.current.credential).toEqual(defaultCredential);
    expect(result.current.setCredential).toEqual(expect.any(Function));
  });

  it('should update credential when it calls setCredential', () => {
    // Arrange
    const newCredential: Credential = { name: 'admin', password: 'test' };

    // Act
    const { result } = renderHook(() => useLogin());

    /**
     * no hay nada
     */
    console.log('result.current.credential ->', result.current.credential);
    /**
     * sin act no se actualiza el estado de credential
     * Para toda actualización provocada de estados tenemos que usar act
     */
    act(() => {
      result.current.setCredential(newCredential);
    });
    /**
     * se insertaron los valores de newCredential en credential
     */
    console.log('NEW result.current.credential ->', newCredential);

    // Assert
    expect(result.current.credential).toEqual(newCredential);
  });

  it('should return user equals null and onLogin function', () => {
    // Arrange
    // Act
    const { result } = renderHook(() => useLogin());
    // Assert
    expect(result.current.user).toBeNull();
    expect(result.current.onLogin).toEqual(expect.any(Function));
  });

  it('should update user when it send valid credentials using onLogin', async () => {
    // Arrange
    const adminUser: User = { email: 'admin@email.com', role: 'admin' };
    vi.spyOn(api, 'login').mockResolvedValue(adminUser);

    // Act
    const { result } = renderHook(() => useLogin());
    act(() => {
      result.current.onLogin();
    });

    // Assert
    expect(api.login).toHaveBeenCalled();
    await waitFor(() => {
      expect(result.current.user).toEqual(adminUser);
    });
  });
});
