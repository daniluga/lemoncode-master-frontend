console.log("This is your playground, experiment with TS code and check the console");
console.log('!!{}', !!{});                   // !!{} true
console.log('!![]', !![]);                   // !![] true
console.log('!!1', !!1);                     // !!1 true
console.log('!!-1', !!-1);                   // !!-1 true
console.log('!!"Hello"', !!"Hello");         // !!"Hello" true
console.log('!!"0"', !!"0");      

console.log('*** VALORES FALSY ***')
console.log('!!false', !!false);             // !!false false
console.log('!!0', !!0);                     // !!0 false
console.log('!!""', !!"");                   // !!"" false
console.log('!!null', !!null);               // !!null false
console.log('!!undefined', !!undefined);     // !!undefined false
console.log('!!NaN', !!NaN);                 // !!NaN false
/**
 ***** NEVER
 * El tipo never representa el tipo de valores que nunca ocurren.
 * Por ejemplo, never es el tipo de retorno de una función que lanza una 
 * excepción o una función que nunca retorna.
 */

//  const doSomething = () => {
//   while (true) {
//     console.log("Doing something");
//   }
// }

// const a = doSomething(); // Si hacemos hover, vemos que "a" es de tipo never.
// const b: never = doSomething(); // Como estamos en TS, ponemos el tipo -> :<tipo>.


/**
 * ***** ANY
 * El tipo any es un tipo que captura cualquier valor.
 * Es peligroso usarlo, ya que se pierde la seguridad de tipos.
 */

const c: any = 10;

/**
 * ***** UNKNOWN
 * El tipo unknown es un tipo que captura cualquier valor.
 * A diferencia de any, con unknown se mantiene la seguridad de tipos.
 * Para poder asignar un valor de tipo unknown a otro tipo, es necesario hacer una comprobación.
 */

let d: unknown = 10;

if (typeof d === "string") {
  console.log(d.toUpperCase());
} else if (typeof d === "number") {
  console.log(d + d);
}

/**
 * ***** ENUM
 * Los enums permiten definir un conjunto de constantes con nombre.
 * Se puede acceder a los valores de un enum mediante su nombre o su valor.
 * Por defecto, los valores de un enum son números enteros.
 * Si no se asigna un valor a un miembro del enum, se le asigna el valor del miembro anterior + 1.
 */

enum e {
  lunes, // 0
  martes, // 1
  miercoles, // 2
  jueves, // 3
  viernes,  // 4
  sabado, // 5
  domingo // 6
}

console.log(e.lunes); // 0
console.log(e[e.lunes]); // "lunes"

const f: e = e.martes; // 1
const g: string = e[e.martes]; // "martes" // Se tiene que poner string.

enum h {
  lunes = 1, // 1
  martes, // 2
  miercoles, // 3
  jueves, // 4
  viernes, // 5
  sabado, // 6
  domingo // 7
}

console.log(h.lunes); // 1
console.log(h[h.lunes]); // "lunes"

const i: h = h.martes; // 2
const j: string = h[h.martes]; // "martes"
const k = h[1]; // "lunes"
const l = h[7]; // "domingo"


/**
 * ***** VOID
 * Es justo lo contrario de "any", la ausencia de cualquier tipo. Mientras
 * que "any" puede ser cualquier cosa, "void" no puede ser nada. Su uso más
 * habitual es como valor de retorno en funciones que no devuelven nada.
 * Void es equivalente a undefined
 */

function noReturn(): void {
  console.log("I am not going to return anything");
}

const notAssigned: void = undefined;

/**
 * ***** TYPE ASSERTIONS
 * Interpreta la variable como un tipo concreto.
 */

const getData = () => {
  return "Hello World";
} 

let data: any = getData();

console.log(data.toUpperCase()); // Esto no da error, pero no es seguro.

// Dos formas. "as" y "<tipo>"
console.log((data as string).toUpperCase()); // Esto es seguro.
console.log((<string>data).toUpperCase()); // Esto también es seguro.

/**
 * ***** INTERFACES
 * Las interfaces son una forma poderosa de definir contratos/estructuras en TypeScript.
 */

interface Address {
  street: string;
  city: string;
}

interface Coord {
  lat: number;
  lon: number;
  name?: string; // Opcional
  readonly id: number;  // Solo lectura, no se puede alterar.
  address?: Address; // Interfaz dentro de interfaz
}

const position: Coord = {lat: 10, lon: 20, id: 1};
const position2: Coord = {lat: 10, lon: 20, id: 1, name: "Madrid"};

// Modificadores (readonly)
position.lat = 31; // Se puede modificar.
// position.id = 0; // Error, no se puede modificar.

// Modificadores (opcional)
position2.name = "BCN"; // Se puede modificar.

// Extender interfaces (incorpora las propiedades de la interfaz extendida)
interface Person {
  name: string;
  age: number;
}

interface Habits {
  smoking: boolean;
  drinking: boolean;
}

// Extensión de interfaces múltiples
interface ClinicalData extends Person, Habits { 
  weight: number;
  height: number;
  bloodType: string;
}

const patient: ClinicalData = {
  name: "John",
  age: 30,
  smoking: false,
  drinking: true,
  weight: 80,
  height: 180,
  bloodType: "A+"
}

/**
 * Duck Typing (si caminas como un pato, nadas como un pato y haces cuac, eres un pato)
 * Dos interfaces son compatibles si tienen las mismas propiedades y tipos.
 * Si hubiera una interfaz Dog con lo mismo que User, serían compatibles.
 */ 
interface User {
  id: number;
  name: string;
}

interface Dog {
  id: number;
  name: string;
  color: string;
}

const pepe: User = {id: 1, name: "Pepe"};
const labrador: Dog = {id: 1, name: "Labrador", color: "black"};

function printUser(user: User): void {
  console.log(user.name);
}

printUser(pepe);
printUser(labrador);

/**
 * ***** FUNCIONES
 * Las funciones en TypeScript pueden tener tipos de retorno y de parámetros.
 * Se pueden definir funciones con parámetros opcionales y con valores por defecto.
 * Se pueden definir funciones con un número variable de parámetros.
 * Se pueden definir funciones con parámetros de solo lectura.
 * Se pueden definir funciones con parámetros de solo escritura.
 * 
 * "upperCase?"" y "upperCase: boolean = true" son lo mismo entre comillas, uno es opcional y el otro por defecto.
 */

function mayShout(message: string, upperCase?: boolean): string {
  return (upperCase ? message.toUpperCase() + '!!!' : message) ;
}

function shout(message: string, upperCase: boolean = true): string {
  return (upperCase ? message.toUpperCase() : message) + '!!!';
}

console.log(mayShout("mayShout"))
console.log(mayShout("mayShout", true))
console.log(shout("shout"))

// Alias de fuinciones para reutilizar tipos de funciones. (Javi lo llama "firma de funciones")
type shoutFunction = (message: string, upperCase: boolean) => string;

const aliasShout: shoutFunction = (message, uppercase) => {
  return (uppercase ? message.toUpperCase() : message) + '!!!';
}

console.log(aliasShout("aliasShout - elPepe", true))

// Callback: funciones que se pasan como argumento a otra función.
function whatsApp(message: string, callback: shoutFunction): void {
  console.log(callback(message, true));
}

whatsApp("whatsApp", aliasShout);

/**
 * Sobre carga de funciones
 * Se pueden definir varias funciones con el mismo nombre pero con diferentes tipos de parámetros.
 * En tiempo de ejecución, TypeScript seleccionará la función que coincida con los argumentos.
 * Solo sirve con las funciones, no con las arrow functions.
 */

function switchType(arg: string): number;
function switchType(arg: number): string;
function switchType(arg: string | number): string | number {
  if(typeof arg === "string"){
    return Number(arg);
  } else {
    return arg.toString();
  }
}

const result = switchType("10");
console.log(result, typeof result);

const result2 = switchType(10);
console.log(result2, typeof result2);

// Tipado de funciones (con la firma)
type myRepeatFunction = (text: string, n: number) => string;

const repeatString: myRepeatFunction = (text, n) => Array(n).fill(text).join(" ");
console.log(repeatString("Hello", 5)); // Hello Hello Hello Hello Hello

// Tipado de funciones (con la interfaz)
// La utilidad de las interfaces es pode añadir propiedades a las funciones.
interface RepeatFunction {
  (text: string, n: number): string; // Firma ejecutable
  description: string; // Propiedad
}

const repeatString2: RepeatFunction = (text, n) => Array(n).fill(text).join(" ");
repeatString2.description = "Repeats a string n times";
console.log(repeatString2("Hello", 5)); // Hello Hello Hello Hello Hello

// Tuplas (arrays de longitud fija, en este caso de 2 elementos, uno string y otro number, se fija en la firma).
const tupla: [nombre: string, valor: number] = ['a', 1];
console.log(tupla[0].toUpperCase());
console.log(tupla[1]);
// console.log(tupla[2]); // Error, no existe.

// Genéricos. Tipo cuya definición se establece en tiempo de ejecución (TS "infiere").
// Puede ser cualquier tipo, pero una vez definido, se mantiene.
// Está guapísimo esto!!
function returnFirstItemFromList<T>(list: T[]): T {
  return list[0];
}

console.log(returnFirstItemFromList([1, 2, 3])); // 1 // Tipo number (haz hover)
console.log(returnFirstItemFromList(['a', 'b', 'c'])); // a // Tipo string (haz hover)
console.log(returnFirstItemFromList([true, false, true])); // true // Tipo boolean (haz hover)

// Genéricos con 2 tipos
console.log('Genéricos con 2 tipos');
function returnFirstItemFromList2<T, U>(a: T, b: U): boolean {
  return typeof a === typeof b;
}
console.log(returnFirstItemFromList2(1, 'a')); // false
console.log(returnFirstItemFromList2(1, 2)); // true

// Genéricos con 2 tipos y restricciones
console.log('Genéricos con 2 tipos y restricciones');
const compararTipos = <A = boolean, B = string>(a: A, b: B): boolean => {
  return typeof a === typeof b;
}
console.log(compararTipos(false, 123)); // por inferencia (lo descubre TS)
console.log(compararTipos<boolean>(false, 'a')); // El primero será boolean, por defecto el otro tiene que ser string

// Genéricos en interfaces (en este caso number es por defecto, por si no hay otro tipo)
interface State<V = number> {
  value: V;
}

const stringState: State<string> = {value: 'Hello'};
const booleanState: State<boolean> = {value: true};
const defaultState: State = {value: 10}; // Tipo number (haz hover)

// Genéricos en funciones se pone <T> en la firma de la función y se usa en los parámetros.
// Porque si no, no sabe qué tipo es el 'stringState' y no puede inferirlo.
const isStateEmpty = <T>(state: State<T>): boolean => !!state.value;
console.log('isStateEmpty(stringState)',isStateEmpty(stringState)); // true, porque 'Hello' no es un string vacío.

// Genéricos en clases
class OperatorPlus<T> {
  operand1: T;
  operand2: T;
  operation: (o1: T, o2: T) => T;
}

// Al ser <number>, operand1 y operand2 tienen que ser number. Si se pone <string>, operand1 y operand2 tienen que ser string.
const plus = new OperatorPlus<number>();
plus.operand1 = 10;
plus.operand2 = 20;
plus.operation = (o1, o2) => o1 + o2;
console.log(plus.operation(plus.operand1, plus.operand2)); // 30

/**
 * TIPOS AVANZADOS (algunos ya vistos)
 */

// Alias de tipos. Centraliza los tipos en un solo lugar.
type Message = string | number | {text: string, code: number};
type FunctionVoid = () => void;


// Intersección de tipos. Combina varios tipos en uno solo.
// En este caso, Merged es un objeto que tiene las propiedades de los dos objetos.
type Merged = {a: string} & {b: number};

// Caso real de intersección de tipos. Pero cat y bird son 'any'. Tenemos que ponerle el tipo. Lo haremos genérico.
const compose = <T, X>(a: T, b: X): T & X => ({...a, ...b});
const cat = compose({type: 'feline'}, {legs: 4});
const bird = compose({type: 'pajarraco'}, {wings: 2});
console.log(cat); 
console.log(bird); 

// Union de tipos. Permite definir un tipo que puede ser uno de varios tipos.
// Lo que pasa que no sabe qué tipo es, por eso hay que hacer una comprobación (desambiguación). 
type A = string;
type B = number;
type AB = A | B;

const ab: AB = 'Hello';

// String y numeric literals. Se pueden definir tipos que solo pueden ser un valor concreto.
// Se construyen a partir de valores literales.
type WorkingDays = 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday';
const day: WorkingDays = 'Monday';

type Dice = 1 | 2 | 3 | 4 | 5 | 6;
/*
  TS no sabe que el random es un número dentro de Dice. Por eso hay que poner 
  'as Dice' una type assertion, hacer que el compilador confíe en que será comprendido en Dice.
 */
const throwDice = (): Dice => Math.floor(Math.random() * 6 + 1) as Dice;
console.log(throwDice);


// Template literals
type DayMood = 'happy' | 'sad' | 'angry' | 'tired' | 'hungry';
type MyDay = `${DayMood} ${WorkingDays} - Level ${number} - Diablo ${1 | 2 | 3}`; // Interpolación de tipos (haz hover, está tó guapo).

const today: MyDay = "happy Monday - Level 10 - Diablo 2";

// Keyof. Abstraer las propiedades de una intefaz como una unión de literales.
interface Person {
  name: string;
  age: number;
  adult: boolean;
}

type PersonKeys = keyof Person; // 'name' | 'age' | 'adult'
const dani: Person = {name: 'Dani', age: 27, adult: true};

// Estamos acotando a que obj sea 'cualquier objeto' y que ...keys sean 'cualquier número de keys de ese objeto'.
// Esta función vale para cualquier objeto y cualquier número de keys de ese objeto. Está perfectamente tipada.
const showProps = <O extends object>(obj: O, ...keys: (keyof O)[]) => {
  keys.forEach(key => console.log(key, obj[key]));
}

console.log(showProps(dani, 'name', 'age', 'adult'));
console.log(showProps(dani, 'name', 'age', 'dni')); // Error, dni no existe en Person.
console.log(showProps({propRandom: 'random'}, 'propRandom')); // Como vemos, funciona con cualquier objeto.

// GUARDAS
// Permiten hacer comprobaciones más complejas en tiempo de ejecución. Sirven para desambiguar tipos.
const randomBoolean = Math.random() > 0.5;
const value: string | number = randomBoolean ? 'Hello' : 10;

// console.log(value.toFixed(2)); // Error, no sabe si es string o number.
// console.log(value.toUpperCase(2)); // Error, no sabe si es string o number.

// Guarda para desambiguar
if (typeof value === 'string') {
  console.log(value.toUpperCase());
} else {
  console.log(value.toFixed(2));
}

const giveMeSomeInstance = (): Number | String => randomBoolean ? new Number(10) : new String('Hello');
const someInstance = giveMeSomeInstance();

if (someInstance instanceof Number) {
  console.log('Es un número', someInstance);
} else {
  console.log('Es un string', someInstance);
}

// Tipos condicionales
type DarkColors = 'black' | 'darkblue' | 'darkred';
type LightColors = 'white' | 'lightblue' | 'lightred';
type Status = 'sad' | 'happy';

type Palette<S extends Status>  = S extends 'sad' ? DarkColors : LightColors;
const paleta1: Palette<'happy'> = 'lightblue'; // 'white' | 'lightblue' | 'lightred'
const paleta2: Palette<'sad'> = 'darkblue'; // 'black' | 'darkblue' | 'darkred'
console.log(paleta1);
console.log(paleta2);

// Tipos mapeados (mapped types): Permiten crear nuevos tipos a partir de otros.
interface Product {
  name: string;
  price: number;
}

type Evolver <Obj extends object> ={
  // Todas las propiedades de Product, pero con el tipo de la propiedad transformada.
  [Key in keyof Obj]: (arg: Obj[Key]) => Obj[Key];
}

type EvolverProduct = Evolver<Product>;

const evolve = <Obj extends object>(obj: Obj, transformers: Evolver<Obj>): Obj => {
  return Object.entries(obj).reduce<Obj>((result, [key, value]) => {
    result[key] = transformers[key](value);
    return result;
  }, {} as Obj);
}

const product: Product = {
  name: 'laptop',
  price: 1000,
}

const formatString = (value: string): string => {
  value = value.trim();
  return value.charAt(0).toUpperCase() + value.slice(1);
}

const applyIVA = (value: number): number => value * 1.21;

const transformations = {
  name: formatString,
  price: applyIVA
}

const updatedProduct = evolve(product, transformations)
console.log('updatedProduct', updatedProduct);

interface Resource {
  id: string;
  name: string;
  format: string;
}

const resource: Resource = {
  id: '1',
  name: 'dani.mp3',
  format: 'mp3'
}

const rewResource = evolve(resource, {
  id: (id) => id,
  name: (name) => name.toUpperCase(),
  format: (format) => format.toUpperCase()
});

console.log('rewResource', rewResource);

/**
 * Laboratorio
 * ------------------------------
 * Son ejs de JS generalmente, aunque hay alguno que se pide hacer en TS. Aunque no se pide, dicen que mejor todos en TS.
 * 
 * Ejs: https://github.com/Lemoncode/master-frontend-lemoncode/blob/master/02-languages/03-ejercicios/02-ENTREGABLES/entregables.md
 * 
 * Inmutable es que no se puede modificar. En TS se puede hacer con readonly.
 * - Hacer un array y no puede ser modificado.
 * - Si me piden sacar el último elemento, es solo mostrar el último, no tengo que eliminar el resto de items del array..
 */