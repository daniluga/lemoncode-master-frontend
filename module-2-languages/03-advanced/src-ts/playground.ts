// RECURSIVIDAD ----------------------------------------------------------------
console.log("********** Recursividad **********");
console.log("**********************************");

// Recursividad en interfaces -> En children se puede poner un array de TreeNode<T> o null
interface TreeNode<T> {
  value: T; // Valor del nodo
  children?: TreeNode<T>[]; // Hijos del nodo. Pueden haber hojas del árbol o no.
}

const root: TreeNode<number> = {
  value: 1,
  children: [
    {
      value: 2,
      children: [
        {
          value: 3,
        },
      ],
    },
    {
      value: 4,
    },
  ],
};

// Recursividad en alias con interfaces
// Next es un puntero al siguiente elemento de la lista si no hay más elementos es null
type IterableList<T> = T & { next?: IterableList<T> | null };

interface Student {
  name: string;
}

let classList: IterableList<Student> = {
  name: "Pepe",
  next: { name: "Juan", next: { name: "Luis", next: null } },
};

// Recursividad en alias
type RecursiveArray<T> = (T | RecursiveArray<T>)[]; // Array de T o de RecursiveArray<T>

const myRecursiveArray: RecursiveArray<number> = [1, [2, [3, 4], 5], 6, [7, 8]];

/**
 * Inferencia explícita de tipos en recursividad
 *
 * Es habitual utilizar los tipos condicionales para intentar adivinar si un tipo tiene una
 * "constraint" concreta o no, es decir, si tiene la forma que esperamos o no. Para ayudarnos
 * en esta búsqueda, los tipos condicionales proporcionan un mecanismo de inferencia que
 * introduce nuevos tipos genéricos ineridos sobre la marcha: la keyword "infer".
 *
 * inferencia (infer): TS lo adivinará.
 * infer Type: Se utiliza para inferir el "tipo", en este caso de un Array.
 *
 * Se pone "never" porque nunca debería llegar a ese punto a no ser que se hagan trampillas.
 */

type IsStringArray<T extends any[]> = T extends (infer Type)[]
  ? Type extends string
    ? true
    : false
  : never;

type Result1 = IsStringArray<[1, 2]>; // false (haz hover)
type Result2 = IsStringArray<["hello", "world"]>; // true (haz hover)
type Result3 = IsStringArray<"hello">; // never, pq no es un array (haz hover)

/**
 * EJEMPLO CON RECURSIVIDAD
 *
 * infer Head: Primer elemento del array y coge su tipo
 * ...infer Tail: Resto (operador rest) de elementos del array y coge sus tipos
 *
 * T extends [infer Head, ...infer Tail] -> Si T es un array con un Head y un
 * Tail, es decir, más de 1 elemento
 */
type RemoveZeroes<T extends any[]> = T extends [infer Head, ...infer Tail] // Desestructurar el array en Head (primer elemento) y Tail (resto del array)
  ? Head extends 0 // ¿El primer elemento es 0?
    ? RemoveZeroes<Tail> // Si es 0, omítelo y procesa el resto del array (Tail)
    : [Head, ...RemoveZeroes<Tail>] // Si no es 0, ⚠️consérvalo⚠️ y sigue procesando Tail
  : T; // Si el array está vacío, devuélvelo tal cual (caso base de la recursión)

// [0, 1, true, 0, 2, 0, "hello", 0, {}] -> RemoveZeroes<[1, true, 0, 2, 0, "hello", 0, {}]>
// [1, true, 0, 2, 0, "hello", 0, {}] -> [1, ...RemoveZeroes<[true, 0, 2, 0, "hello", 0, {}]>]
// [true, 0, 2, 0, "hello", 0, {}] -> [true, ...RemoveZeroes<[0, 2, 0, "hello", 0, {}]>]
// [0, 2, 0, "hello", 0, {}] -> RemoveZeroes<[2, 0, "hello", 0, {}]>
// [2, 0, "hello", 0, {}] -> [2, ...RemoveZeroes<["hello", 0, {}]>]
// ["hello", 0, {}] -> ["hello", ...RemoveZeroes<[0, {}]>]
// [0, {}] -> RemoveZeroes<[{}]>
// [{}] -> [{}]
// Finalmente, Result4 será [1, true, 2, "hello", {}].

type Result4 = RemoveZeroes<[0, 1, true, 0, 2, 0, "hello", 0, {}]>;

/**
 * Tipos genéricos de utilidades
 *
 * Readonly: Convierte todas las propiedades de un interfaz en solo lectura:
 */

interface State {
  name: string;
  capital: string;
}

type ReadOnlyState = Readonly<State>;
type ReadOnlyArray<T> = Readonly<Array<T>>;

/**
 * Partial: Convierte todas las propiedades de un interfaz en opcionales.
 */

interface Person {
  name: string;
  age: number;
}

type PartialPerson = Partial<Person>; // Todas las propiedades de Person son opcionales

const dani: PartialPerson = { name: "Dani" }; // Está guaaaapo!
const pepe: Person = { name: "Pepe" }; // Se queja porque le falta la edad.

const createState = <T extends object>(initialState: T) => {
  let state: T = initialState;

  return {
    setState: (partialState: Partial<T>): T =>
      (state = { ...state, ...partialState }), //combina el estado actual con las nuevas propiedades proporcionadas.
  };
};

const { setState } = createState({
  username: "b4dc4t",
  avatar: "cat.png",
  posts: 18,
  premium: false,
});

console.log(setState({ posts: 19, premium: true })); // Actualiza el estado

/**
 * Required: Convierte todas las propiedades de un interfaz en obligatorias.
 */

interface User {
  name?: string;
  age?: number;
}

type RequiredUser = Required<User>; // Todas las propiedades de User son obligatorias

const userDani: User = { name: "Dani" }; // No se queja porque la edad es opcional.
const userPepe: RequiredUser = { name: "Pepe" }; // Se queja porque le falta la edad.

/**
 * Exclude: Excluye de un tipo los elementos que coincidan con otro tipo.
 */

type WeekDay = "Mon" | "Tue" | "Wed" | "Thu" | "Fri";
type WeekendDay = "Sat" | "Sun";

type AllDays = WeekDay | WeekendDay;

type WeekDays = Exclude<AllDays, WeekendDay>; // Excluye WeekendDay de AllDays

/**
 * Extract: Extrae de un tipo los elementos que coincidan con otro tipo.
 */

type WeekEndDays = Extract<AllDays, WeekendDay>; // Extrae WeekendDay de AllDays

/**
 * Por cada propiedad de A que no esté en B, crea una propiedad en el nuevo tipo.
 */
type Diff<A extends object, B extends object> = {
  [P in Exclude<keyof A, keyof B>]: A[P]; // Es del tipo A[P] porque queremos las propiedades de A que no están en B
};

/**
 *  Por cada propiedad que esté en A y en B, crea una propiedad en el nuevo tipo.
 */
type Common<A extends object, B extends object> = {
  [P in Extract<keyof A, keyof B>]: A[P] | B[P]; // toma el tipo de la propiedad en A o B
};

// Y ponerlo a prueba con:
interface UserDetails {
  name: string;
  id: string;
  age: number;
  phone: number;
  married: boolean;
}

interface UserID {
  name: string;
  id: number;
}
type UserDiff = Diff<UserDetails, UserID>; // Check intellisense!
type UserCommon = Common<UserDetails, UserID>; // Check intellisense!

// *** PICK & OMIT ***************

// PICK nos permite generar un sub-interfaz, a partir de un interfaz ya existente, escogiendo las
// propiedades que queremos del original y tipándolas de igual forma. En definitiva, extrae un
// subconjunto de propiedades (y sus tipos) de una interfaz para generar otra distinta.

// OMIT es el opuesto de PICK, nos permite generar un interfaz a partir de otro pero en este caso
// eliminando las propiedades que no deseamos. Es decir, genera una nueva interfaz excluyendo
// propiedades de la original.

// -- Caso Base --
interface EmployeeSummary {
  name: string;
  id: string;
  age: number;
  phone: number;
  married?: boolean; // Now we can safely use optionals.
}
type EmployeeID = Pick<EmployeeSummary, "id" | "name">; // Check intellisense!
type EmployeeDetails = Omit<EmployeeSummary, keyof EmployeeID>; // Check intellisense!

// También podríamos haber redefinido los Diff y Common anteriores como:
type ObjectDiff<A extends object, B extends object> = Omit<
  A,
  Extract<keyof A, keyof B>
>;
type ObjectCommon<A extends object, B extends object> = Pick<
  A,
  Extract<keyof A, keyof B>
>;

type EmployeeCredentials = ObjectCommon<EmployeeSummary, EmployeeID>;
type EmployeeInfo = ObjectDiff<EmployeeSummary, EmployeeID>;
