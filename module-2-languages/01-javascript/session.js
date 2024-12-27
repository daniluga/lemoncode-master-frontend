// Utilizaremos `let` cuando queramos declarar una variable a la que, posteriormente, podamos ser
// capaces de reasignar su valor
let a = 10;
let b = "test";
let c = true,
  d = 5;

console.log("-------- LET --------");

console.log("a:", a);
console.log("b:", b);
console.log("c:", c);
console.log("d:", d);

/*
Utilizaremos `const` cuando queramos declarar una variable que nunca queramos volver a reasignar.
Es importante entender que una vez que declaremos la variable no podemos volver a reasignar su valor.
Es por esto que una variable declarada con `const` debe incluir la asignación. Generalmente 
utilizaremos `const` para dar a entender de forma semántica que esa variable no seá reasignada.

⚠ Importante: Una variable declarada con `const` puede no ser "constante", es decir, de sólo
lectura. El concepto "constante" dependerá del tipo de dato que almacenemos.
*/

const e = 10;
const f = "test";
const g = true,
  h = 5;

console.log("-------- CONST --------");

console.log("e:", e);
console.log("f:", f);
console.log("g:", g);
console.log("h:", h);

/*
Distinguimos 2 grandes grupos de tipos de datos en Javascript:
- Tipos PRIMITIVOS (representan un único dato simple).
- Tipos estructurales (representan estructuras de datos) u OBJETOS.

7 PRIMITIVOS (2 de nueva incorporación) + OBJETOS
*/

console.log("-------- PRIMITIVOS --------");

/*

DEFINICIÓN:
Un tipo primitivo es aquel
que no es un objeto y por tanto no tiene métodos. Representan datos simples, sencillos.

CARACTERÍSTICAS:
- Todos los primitivos son inmutables. Una vez creado un valor primitivo no puede ser
alterado ni modificado (no confundir con reasignar una variable con otro valor).
- Operador 'typeof'
*/

// string
console.log("hello world"); // dobles comillas
console.log("hello world"); // comillas simples
console.log(`hello world`); // backticks.
console.log(`This is a
multiline string`); //Los strings creados con backticks tb se conocen como "template literals"

// Interpolación de expresiones (sólo en template literals)
// ⚠ Llamaremos "expresión" a cualquier tipo de valor que pueda ser almacenado en una variable.
// Una expresión puede ser un valor primitivo, objeto, valor devuelto por una función, resultado de
// una operación, etc.
const person = "Edward";
const message = `How are you, ${person}?`;
console.log(message); // "How are you, Edward?"

// number
console.log("entero positivo", 101);
console.log("entero negativo", -200);
console.log("flotante", 1220.31);
console.log("notación exponencial", 1e6);
console.log("infinito", Infinity);
console.log("NotANumber", NaN); // NotANumber** (de hecho es de tipo número)

// ⚠ Podemos separar los dígitos con un underscore [_] en cualquier posición para mejorar la
// legibilidad.

/*
 Indeterminados (0 * Infinity), indefinidos (1 / 0), fuera del conjunto de los
 reales (sqrt(-1)), o errores al parsear (parseInt("abc"))
*/

// boolean
console.log("boolean", "true");
console.log("boolean", "false");

// null
/* ⚠ Primitivo especial de tipo "object". Raiz de la cadena de prototipos */
console.log("null", null);

// undefined
console.log("undefined", undefined);

/*
 ¿null o undefined?

 En general, se recomienda utilizar `null` para indicar la ausencia intencional de un valor, y 
 undefined para indicar que algo simplemente no está definido o no tiene un valor.
*/

// symbol
/* ⚠ Lo veremos más adelante ya que su uso está muy ligado a los objetos */

// bigint
/* ⚠ Nuevo tipo numérico para representar enteros de cualquier tamaño, con cualquier precisión. */
console.log("bigint", 2n);
console.log("BigInt(2)", BigInt(2));

// operador typeof para primitivos
console.log('typeof "" -', typeof ""); // string
console.log("typeof 0 -", typeof 0); // number
console.log("typeof 10n -", typeof 10n); // bigint
console.log("typeof false -", typeof false); // boolean
console.log("typeof undefined -", typeof undefined); // undefined
console.log("typeof null -", typeof null); // object** Se entenderá mejor con el modelo prototípico

console.log("-------- OPERADORES --------");

// 1. Operadores ARITMÉTICOS
console.log("52 + 21 -", 52 + 21); // 73
console.log('"hello " + "world" -', "hello " + "world"); // "hello world"
console.log("10 - 5 -", 10 - 5); // 5
console.log("10 * 10 -", 10 * 10); // 100;
console.log("9 / 3 -", 9 / 3); // 3
console.log("15 / 2 -", 15 / 2); // 7.5;
console.log("15 % 3 -", 15 % 3); // 0 (Módulo o resto)
console.log("2 ** 3 -", 2 ** 3); // 8 (Exponenciación)

// Asignaciones con operadores aritméticos
// ⚠ Importante: No podemos usar operadores de asignación con variables `const`
let num = 3;
console.log(num++); // 3 (increases after console.log)
console.log(num--); // 4 (decreases after console.log)
console.log(++num); // 4 (increases before console.log)
console.log(--num); // 3 (decreases before console.log)
num += 5; // Equivalent to num = num + 5
console.log(num); // 8
num -= 5; // Equivalent to num = num - 5
console.log(num); // 3
num *= 10; // Equivalent to num = num * 10
console.log(num); // 30
num /= 6; // Equivalent to num = num / 6
console.log(num); // 5
num %= 3; // Equivalent to num = num % 3
console.log(num); // 2
num **= 10; // Equivalent to ten times num * num or Math.pow(2, 10)
console.log(num); // 1024

// 2. Operadores de COMPARACIÓN
// Mayor que, menor que, igualdad, desigualdad
console.log("3 > 0 -", 3 > 0); // true
console.log("3 < 0 -", 3 < 0); // false
console.log("3 > 3 -", 3 > 3); // false
console.log("3 < 3 -", 3 < 3); // false
console.log("3 >= 3 -", 3 >= 3); // true
console.log("3 <= 3 -", 3 <= 3); // true
console.log("5 == 5 -", 5 == 5); // true

// "TYPE COERCION"
/*
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Equality_comparisons_and_sameness#Loose_equality_using
Puesto que JS no es un lenguaje tipado, se puede comparar miembros de distinta naturaleza 
(distinto tipo). En tal caso, la estrategia que sigue JS es convertir implicitamente uno de los 
miembros o los dos a un tipo común para poder realizar la comparativa. A esto se le llama
"type coercion" o "conversión implícita/automática".
*/
console.log('5 == "5" - ', 5 == "5"); // true // ⚠ Loose equality. Igualdad débil. (Por type coertion, "5" string se convierte a 5 numero)
console.log('5 === "5" - ', 5 === "5"); // false // ⚠ Strict equality. Igualdad fuerte.
console.log("5 != 5   - ", 5 != 5); // false
console.log('5 != "5" - ', 5 != "5"); // false. (Por type coercion, "5" string se convierte a 5 numero)
console.log("5 !== 5   - ", 5 !== 5); // false
console.log('5 !== "5" - ', 5 !== "5"); // true
console.log("0 == false - ", 0 == false); // true. (Por type coercion, false se castea a 0)
console.log("0 === false - ", 0 === false); // false. (number != boolean)
