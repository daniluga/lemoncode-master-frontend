import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { SelectComponent } from './select.component';
import { Formik, Form } from 'formik';

const renderWithFormik = (component, initialValues) =>
  render(
    <Formik initialValues={initialValues} onSubmit={console.log}>
      {() => <Form>{component}</Form>}
    </Formik>
  );

describe('SelectComponent specs', () => {
  it('should render a select element when it feeds required props and three items', () => {
    // Arrange
    const props: React.ComponentProps<typeof SelectComponent> = {
      /**
       * los items en este test nos dan igual, y el label también
       * solo comprobamos que el select (combobox) se renderiza.
       */
      items: [
        { id: '1', name: 'Item 1' },
        { id: '2', name: 'Item 2' },
        { id: '3', name: 'Item 3' },
      ],
      label: 'Test label',
      value: '',
    };

    // Act
    render(<SelectComponent {...props} />);
    /**
     * después del render, buscamos el combobox.
     */
    const selectElement = screen.getByRole('combobox', { name: 'Test label' });

    // Assert
    expect(selectElement).toBeInTheDocument();
  });

  it('should render a menu with three item when it clicks on select element', async () => {
    // Arrange
    const props: React.ComponentProps<typeof SelectComponent> = {
      items: [
        { id: '1', name: 'Item 1' },
        { id: '2', name: 'Item 2' },
        { id: '3', name: 'Item 3' },
      ],
      label: 'Test label',
      value: '',
    };

    // Act
    render(<SelectComponent {...props} />);

    const selectElement = screen.getByRole('combobox', { name: 'Test label' });
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();

    await userEvent.click(selectElement);
    const menuElement = screen.getByRole('listbox');
    const itemElementList = screen.getAllByRole('option');

    // Assert
    expect(menuElement).toBeInTheDocument();
    expect(itemElementList).toHaveLength(3);
  });

  it('should calls onChange method with value equals 2 when it clicks on second item', async () => {
    // Arrange
    const props: React.ComponentProps<typeof SelectComponent> = {
      items: [
        { id: '1', name: 'Item 1' },
        { id: '2', name: 'Item 2' },
        { id: '3', name: 'Item 3' },
      ],
      label: 'Test label',
      value: '',
      /**
       * onchange sirve aquí para:
       * Cuando el usuario hace clic en el segundo item (Item 2),
       * El componente llama a props.onChange(...)
       * Y le pasa un evento que contiene el valor '2' (porque el item con
       * nombre "Item 2" tiene id: '2').
       */
      onChange: vi.fn(),
    };
    // Act
    render(<SelectComponent {...props} />);
    const selectElement = screen.getByRole('combobox', { name: 'Test label' });
    await userEvent.click(selectElement);
    const itemElementList = screen.getAllByRole('option');
    await userEvent.click(itemElementList[1]);
    // Assert
    expect(props.onChange).toHaveBeenCalledWith(
      /**
       * el primer argumento es el evento de cambio, que contiene el valor,
       * un objeto
       */
      expect.objectContaining({ target: { value: '2' } }),
      /**
       * el segundo argumento es el evento de cambio, que no nos interesa
       * por eso lo ignoramos con expect.anything()
       */
      expect.anything()
    );
  });

  it('should update selected item when it clicks on third item using Formik', async () => {
    // Arrange
    const props: React.ComponentProps<typeof SelectComponent> = {
      items: [
        { id: '1', name: 'Item 1' },
        { id: '2', name: 'Item 2' },
        { id: '3', name: 'Item 3' },
      ],
      label: 'Test label',
      name: 'selectedItem',
    };
    // Act
    renderWithFormik(<SelectComponent {...props} />, { selectedItem: '1' });

    const selectElement = screen.getByRole('combobox', { name: 'Test label' });
    expect(selectElement.textContent).toEqual('Item 1');
    await userEvent.click(selectElement);
    const itemElementList = screen.getAllByRole('option');
    await userEvent.click(itemElementList[2]);
    // Assert
    expect(selectElement.textContent).toEqual('Item 3');
  });

  it('should update selected item when it clicks on third item using Formik', async () => {
    // Arrange
    const props: React.ComponentProps<typeof SelectComponent> = {
      items: [
        { id: '1', name: 'Item 1' },
        { id: '2', name: 'Item 2' },
        { id: '3', name: 'Item 3' },
      ],
      label: 'Test label',
      name: 'selectedItem',
    };
    // Act
    renderWithFormik(<SelectComponent {...props} />, { selectedItem: '1' });
    const selectElement = screen.getByRole('combobox', { name: 'Test label' });
    expect(selectElement.textContent).toEqual('Item 1');
    await userEvent.click(selectElement);
    const itemElementList = screen.getAllByRole('option');
    await userEvent.click(itemElementList[2]);
    // Assert
    expect(selectElement.textContent).toEqual('Item 3');
  });
});
