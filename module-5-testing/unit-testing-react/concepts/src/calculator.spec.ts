import * as calculator from './calculator';
import * as business from './business';
import { after } from 'node:test';

describe.skip('Calculator tests', () => {
  // afterEach(() => {
  //   // Restaurar todos los mocks después de cada test
  //   vi.restoreAllMocks();
  // });
  describe('add', () => {
    it('should return 4 when passing A equals 2 and B equals 2', () => {
      // Arrange
      const a = 2;
      const b = 2;
      // Act
      const result = calculator.add(a, b);
      // Assert
      expect(result).toEqual(4);
    });

    it.skip('should call to isLowerThanFive when passing A equals 2 and B equals 2', () => {
      // Arrange
      const a = 2;
      const b = 2;
      const isLowerThanFive = vi.fn(); // Espía cuando la función está dentro de calculator.ts

      // Act
      calculator.add(a, b, isLowerThanFive);

      // Assert
      expect(isLowerThanFive).toHaveBeenCalled();
      expect(isLowerThanFive).toHaveBeenCalledWith(4);
    });

    it('should call to isLowerThan when passing A equals 2 and B equals 2', () => {
      // Arrange
      const a = 2;
      const b = 2;
      /**
       * Esto ya no sería un test unitario, sería un test de integración, ya
       * que estamos espiando una función que está dentro de business.ts
       *
       * Si le añadimos el método .mockImplementation, podemos cambiar la
       * implementación de la función y hacer que devuelva un valor diferente
       * al que tiene en el archivo business.ts
       *
       * Si no restauramos el mock, el siguiente test seguirá usando el spy.
       * Tenemos que poner el restoreAllMocks en el beforeEach o bien en el test/config.ts
       * para que se ejecute antes de cada test y así restaurar el mock a su estado original.
       */
      vi.spyOn(business, 'isLowerThan').mockImplementation((result) => {
        console.log(
          `Mocked implementation of "isLowerThan" | Result -> ${result}`
        );
      });
      vi.spyOn(business, 'max', 'get').mockReturnValue(7);

      // Act
      calculator.add(a, b);

      // Assert
      expect(business.isLowerThan).toHaveBeenCalled();
      expect(business.isLowerThan).toHaveBeenCalledWith(4, 7);
    });

    it('should call to original implementation isLowerThanFive', () => {
      // Arrange
      const a = 1;
      const b = 2;
      // Act
      const result = calculator.add(a, b);
      // Assert
      expect(result).toEqual(3);
    });
  });
});
