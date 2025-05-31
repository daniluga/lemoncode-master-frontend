import React from 'react';
import { render, screen } from '@testing-library/react';
import { SayHello } from './say-hello';

describe('SayHello component specs', () => {
  it('should display the person name', () => {
    // Arrange
    const person = 'John';

    // Act
    /**
     * render permite montar el componente en un contenedor DOM virtual
     * y obtener una referencia a él. En este caso, se está montando el componente
     * SayHello con la propiedad person establecida en 'John'.
     *
     * * Destructuración de la función render para obtener la función getByText.
     */
    render(<SayHello person={person} />);

    // Assert
    /**
     * Se utiliza getByText para buscar un elemento que contenga el texto 'Hello John'.
     * Si se encuentra, se devuelve una referencia a ese elemento.
     * getByText es una función de prueba que busca un elemento en el DOM
     * que contenga el texto especificado. Si no se encuentra, lanzará un error.
     */
    const element = screen.getByRole('heading', {
      level: 1,
      name: 'Hello John',
    });
    expect(element).not.toBeNull();
    expect(element.tagName).toEqual('H1');
  });

  it('should display the person name using snapshot testing', () => {
    // Arrange
    const person = 'John';

    // Act
    /**
     * asFragment devuelve el HTML del componente montado como un fragmento de documento.
     */
    const { asFragment } = render(<SayHello person={person} />);

    // Assert
    /**
     * Compara ese HTML actual con una foto guardada (snapshot) de cómo debería verse.
     * Si cambia el HTML, el test falla (te avisa que alguien cambió algo del componente).
     *
     * toMatchSnapshot() busca la foto guardada por nombre de fichero + nombre del test
     */
    expect(asFragment()).toMatchSnapshot();
  });

  it('should display the person name using inline snapshot testing', () => {
    // Arrange
    const person = 'John';

    // Act
    const { asFragment } = render(<SayHello person={person} />);

    // Assert
    /**
     * Te planta "la foto" en el test, y si cambia el HTML, el test falla
     * (te avisa que alguien cambió algo del componente).
     */
    expect(asFragment()).toMatchInlineSnapshot(`
      <DocumentFragment>
        <h1>
          Hello 
          <strong>
            John
          </strong>
        </h1>
      </DocumentFragment>
    `);
  });

  it('should display the person name using jest-dom', () => {
    /**
     * react testing library recomienda usar "screen" alegando que
     * The benefit of using screen is you no longer need to keep the render
     * call destructure up-to-date as you add/remove the queries you need.
     */
    // Arrange
    const person = 'John';

    // Act
    render(<SayHello person={person} />);

    const element = screen.getByRole('heading', {
      level: 1,
      name: /hello john/i,
    });

    // Assert
    expect(element).toBeInTheDocument();
  });
});
