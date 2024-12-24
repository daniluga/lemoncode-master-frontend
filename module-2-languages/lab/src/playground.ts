/**
 * Initial arrays.
 */
const numbers: number[] = [1, 2, 3, 4, 5];
console.log('numbers: ', numbers);

const strings: string[] = ['a', 'b', 'c', 'd', 'e'];
console.log('strings: ', strings);

const booleans: boolean[] = [true, false, true, false, true];
console.log('booleans: ', booleans);

console.log('----------------------------------------');
console.log('Exercise 1');
console.log('----------------------------------------');

type genericFunction = <D>(data: D[]) => D | D[];

/**
 * 1.1. Implementa una función head (inmutable), tal que, dado un array como 
 * entrada extraiga y devuelva su primer elemento. Utiliza destructuring.
 */

const head: genericFunction = (data) => {
  const [first] = data;
  return first;
};

console.log('head(numbers): ', head(numbers));
console.log('head(strings): ', head(strings));
console.log('head(booleans): ', head(booleans));

/**
 * 1.2. Implementa una función tail (inmutable), tal que, dado un array como 
 * entrada devuelta todos menos el primer elemento. Utiliza rest operator.
 */

const tail: genericFunction = (data) => {
  const [, ...rest] = data;
  return rest;
};

console.log('tail(numbers): ', tail(numbers));
console.log('tail(strings): ', tail(strings));
console.log('head(booleans): ', head(booleans));

/**
 * 1.3. Implementa una función init (inmutable), tal que, dado un array como 
 * entrada devuelva todos los elementos menos el último. Utiliza los métodos 
 * que ofrece Array.prototype.
 */

const init: genericFunction = (data) => {
  return data.slice(0, data.length - 1);
};

console.log('init(numbers): ', init(numbers));
console.log('init(strings): ', init(strings));
console.log('head(booleans): ', head(booleans));

/**
 * 1.4. Implementa una función last (inmutable), tal que, dado un array como 
 * entrada devuelva el último elemento.
 */

const last: genericFunction = (data) => {
  const [last] = data.reverse();
  return last;
};

console.log('last(numbers): ', last(numbers));
console.log('last(strings): ', last(strings));
console.log('head(booleans): ', head(booleans));

/**
 * 2. Implementa una función concat (inmutable) tal que, dados 2 arrays como 
 * entrada, devuelva la concatenación de ambos. Utiliza rest / spread operators.
 * 
 * Opcional: Implementa una nueva versión de concat donde se acepten múltiples 
 * arrays de entrada (más de 2). No utilices el método Array.prototype.concat.
 */

console.log('----------------------------------------');
console.log('Exercise 2');
console.log('----------------------------------------');

const concat = <T>(...args: T[][]): T[] => [...args.flat()];

console.log('concat(numbers, strings, booleans): ', concat<number | string | boolean>(numbers, strings, booleans));

/**
 * 3.1 Implementa una función clone que, a partir de un objeto de entrada 
 * source devuelva un nuevo objeto con las propiedades de source:
 */

console.log('----------------------------------------');
console.log('Exercise 3');
console.log('----------------------------------------');

const sourceObject = { name: 'Dani', age: 27 };

const clone = <O extends object>(O: O = {} as O): O => ({ ...O });

const resultObject = clone(sourceObject);

console.log('resultObject: ', resultObject);
console.log('resultObject === sourceObject', resultObject === sourceObject); // false

/**
 * 3.2 Implementa una función merge que, dados dos objetos de entrada source y 
 * target, devuelva un nuevo objeto con todas las propiedades de target y de 
 * source, y en caso de propiedades con el mismo nombre, source sobreescribe a target.
 * 
 * Por ejemplo, dados estos 2 objetos:
 * const a = { name: "Maria", surname: "Ibañez", country: "SPA" };
 * const b = { name: "Luisa", age: 31, married: true };
 * 
 * el resultado de mezclar a sobre b sería:
 * merge(a, b); // {name: "Maria", age: 31, married: true, surname: "Ibañez", country: "SPA"}
 * 
 * TIP: Puedes usar la función "clone" del apartado A.
 */

const a = { name: "Maria", surname: "Ibañez", country: "SPA" };
const b = { name: "Luisa", age: 31, married: true };

type Merge =  <S extends object, T extends object>(source: S, target: T) => S & T;

const merge: Merge = (source, target) => ({ ...target, ...source });

console.log('merge(a, b): ', merge(a, b));

/**
 * 4. Crea una función isBookRead que reciba una lista de libros y un título y 
 * devuelva si se ha leído o no dicho libro. Un libro es un objeto con title 
 * como string y isRead como booleano. En caso de no existir el libro devolver 
 * false 
 * 
 * TIP: Existe un método de Array.prototype que te ayudará a buscar según 
 * un patrón.
 * 
 * Ejemplo:
  const books = [
    { title: "Harry Potter y la piedra filosofal", isRead: true },
    { title: "Canción de hielo y fuego", isRead: false },
    { title: "Devastación", isRead: true },
  ];

  console.log(isBookRead(books, "Devastación")); // true
  console.log(isBookRead(books, "Canción de hielo y fuego")); // false
  console.log(isBookRead(books, "Los Pilares de la Tierra")); // false

  Opcional: Utiliza Typescript para añadir los tipos adecuados.
 */

console.log('----------------------------------------');
console.log('Exercise 4');
console.log('----------------------------------------');

interface Book {
  title: string;
  isRead: boolean;
}

const books = [
  { title: "Harry Potter y la piedra filosofal", isRead: true },
  { title: "Canción de hielo y fuego", isRead: false },
  { title: "Devastación", isRead: true },
];

function isBookRead(books: Book[], titleToSearch: string): boolean {
  const found = books.find(book => book.title === titleToSearch);
  return found ? found.isRead : false;
}

console.log(isBookRead(books, "Devastación")); // true
console.log(isBookRead(books, "Canción de hielo y fuego")); // false
console.log(isBookRead(books, "Los Pilares de la Tierra")); // false

/**
 * 5. El objetivo de este ejercicio es crear una máquina tragaperras utilizando 
 * clases donde cada vez que juguemos insertemos una moneda. Cada máquina 
 * tragaperras (instancia) tendrá un contador de monedas que automáticamente 
 * se irá incrementando conforme vayamos jugando.
 * 
 * Cuando se llame al método play el número de monedas se debe incrementar de
 * forma automática y debe generar tres booleanos aleatorios que representarán el
 * estado de las 3 ruletas. El usuario habrá ganado en caso de que los tres
 * booleanos sean true, y por tanto deberá mostrarse por consola el mensaje:
 * 
 * "Congratulations!!!. You won <número de monedas> coins!!";
 * 
 * y reiniciar las monedas almacenadas, ya que las hemos conseguido y han 
 * salido de la máquina. En caso contrario deberá mostrar otro mensaje:
 * 
 * "Good luck next time!!".
 * 
 * Ejemplo de uso: 
 * class SlotMachine {
    ....
  } 
  const machine1 = new SlotMachine();
  machine1.play(); // "Good luck next time!!"
  machine1.play(); // "Good luck next time!!"
  machine1.play(); // "Congratulations!!!. You won 3 coins!!"
  machine1.play(); // "Good luck next time!!"
  machine1.play(); // "Congratulations!!!. You won 2 coins!!"
 */
console.log('----------------------------------------');
console.log('Exercise 5');
console.log('----------------------------------------');

class SlotMachine {
  coins: number;
  rouletteStatus: boolean[];
  constructor() {
    this.coins = 0;
    this.rouletteStatus = [false, false, false];
  }

  play() {
    this.coins = this.coins + 1;
    this.rouletteStatus = this.rouletteStatus.map(() => Math.random() >= 0.5);

    if(this.rouletteStatus.every(status => status)) {
      console.log(`Congratulations!!!. You won ${this.coins} coins!!`);
      this.coins = 0;
    } else{
      console.log('Good luck next time!!');
    }
  };
}

const slotMachine = new SlotMachine();
let availablePlays = 20;

while(availablePlays > 0) {
  console.log('machine: ', slotMachine.play());
  availablePlays--;
}
