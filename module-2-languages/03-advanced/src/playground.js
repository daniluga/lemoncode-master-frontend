console.log("********** Advanced playground **********");

//Guía de Javi: https://lemoncode.net/lemoncode-blog/2018/1/29/javascript-asincrono

// *** CALLBACKS ---------------------------------------------------------------
/**
 * La operación está en una cola de eventos. Cuando el hilo de ejecución se queda
 * libre, se comienzan a ejecutar/despachar las operaciones de la cola de eventos.
 */
console.log("********** Callbacks **********");
console.log("*******************************");

// const callback = () => console.log(`Timeout of X seconds.`);

const randomNumber = () => Math.ceil(Math.random() * 100);
const randomDelay = () => Math.random() * 2000 + 1000;

/**
 * Simula petición a un servidor.
 * Como mínimo, se ejecutará en "randomDelay" segundos (o tiempo). Depende de
 * la cola de eventos del hilo de ejecución.
 *
 * callback sería el equivalente a: (data) => console.log(`Data: ${data}`)
 */
const getDataAsync = (callback) => {
  // throw new Error("Promise rejected at getDataAsync()");
  setTimeout(() => callback(randomNumber()), randomDelay());
};

getDataAsync((data) => console.log(`getDataAsync: ${data}`));

// *** PROMISES ----------------------------------------------------------------
/**
 * Azúcar sintáctico para trabajar con callbacks.
 * Bonita forma en cómo se leen.
 *
 * Ejemplo: Cacharro que se ilumina y pita cuando tienes la comida lista en
 * un restaurante. Esto (el cacharro) es una promesa/garantía. Alguien te
 * promete que tu comida llegará cuando pite el cacharro.
 *
 * Se gestionan con 2 callbacks. Uno para el éxito y otro para el error.
 *
 * Promesa a la espera: Pending.
 * Promesa terminada: Settled.
 *  - Con éxito: Fulfilled o Resolved.
 *  - Con error: Rejected.
 */
console.log("********** Promises **********");
console.log("******************************");

/**
 * Consumir una promesa.
 * El .then() me devuelve otra promesa para poder encadenar más .then().
 * El .catch() es opcional y se ejecuta cuando hay un error, devolviendo una
 * promesa para poder encadenar más promesas.
 * El .finally() es opcional y se ejecuta siempre.
 */

// Devuelve una promesa (hover).
fetch("https://api.github.com/users/lemoncode")
  .then((response) => response.json())
  .then((body) => console.log("body: ", body))
  .catch((error) => console.log("error: ", error))
  .finally(() => console.log("Request finished."));

/**
 * getDataWithPromise().then(resolve).catch(reject);
 */
const getDataWithPromise = () =>
  new Promise((resolve, reject) => {
    try {
      getDataAsync(resolve);
      console.log("getDataAsync(resolve)", getDataAsync(resolve));
    } catch (error) {
      reject(new Error(`Promise rejected at getDataWithPromise(): ${error}`));
    }
  });

const getDataWithPromiseAndLog = () =>
  getDataWithPromise().then((data) => {
    console.log(`getDataWithPromiseAndLog(): ${data}`);
    return data; // Devolvemos la promesa.
  });

getDataWithPromise()
  .then((data) => {
    console.log(`getDataWithPromise - resolve: ${data}`);
    return data;
  })
  .catch((error) =>
    console.log(`Promise rejected at getDataWithPromise().catch(): ${error}`)
  );

/**
 * Múltiples promesas.
 * Race (aka carrera): Hacemos un array con todos los valores cuando lleguen
 * y cuando la primera se resuelva, se ejecuta el .then() con el valor de la
 * promesa.
 */
Promise.race([
  getDataWithPromiseAndLog(),
  getDataWithPromiseAndLog(),
  getDataWithPromiseAndLog(),
  getDataWithPromiseAndLog(),
]).then((raceWinner) => console.log(`And the winner is... ${raceWinner}`));

/**
 * Múltiples promesas.
 * All: Devuelve un array con todos los valores de las promesas resueltas, espera
 * a que todas terminen.
 *
 * AllSettled: Devuelve un array con todas las promesas resueltas, haya error o no.
 */
Promise.all([
  getDataWithPromiseAndLog(),
  getDataWithPromiseAndLog(),
  getDataWithPromiseAndLog(),
  getDataWithPromiseAndLog(),
]).then((allData) => console.log(`All data:`, allData));

// *** ASYNC-AWAIT -------------------------------------------------------------
/**
 * Azúcar sintáctico alrededor de las promesas.
 *
 * Las promesas pueden ser tediosas al encadenar muchas de ellas.
 * Async-Await es una forma de trabajar con promesas de forma más sencilla.
 * Permiten leer código asíncrono de forma síncrona.
 *
 */
console.log("******** Async-Await **********");
console.log("*******************************");

const getDataDouble = async () => {
  const data = await getDataWithPromise();
  return data * 2;
};

getDataDouble().then((num) => console.log(`getDataDouble(): ${num}`));

/**
 * Está esperando a que se resuelvan todas las promesas. Cada una tardará
 * como mínimo 3 segundos, hay que recordarlo. Esto puede ser peligroso si hay
 * muchas operaciones seguidas.
 */
const getManyData = async () => {
  const data1 = await getDataWithPromise();
  const data2 = await getDataWithPromise();
  const data3 = await getDataWithPromise();

  return [data1, data2, data3];
};

getManyData().then((data) => console.log(`getManyData(): ${data}`));

/**
 * En esta ocasión, se lanzan todas las promesas al mismo tiempo. Va mucho más
 * rápido que el anterior.
 */
const getManyData2 = async () => {
  const promise1 = getDataWithPromise();
  const promise2 = getDataWithPromise();
  const promise3 = getDataWithPromise();

  const data1 = await promise1;
  const data2 = await promise2;
  const data3 = await promise3;

  return [data1, data2, data3];
};

getManyData2().then((data) => console.log(`getManyData2(): ${data}`));

// *** MAP-WEAKMAP -------------------------------------------------------------
/**
 * En la práctica, los mapas tienen mejor rendimiento que los objetos.
 * Los mapas tienen más métodos que los objetos. Una de ellas es iterar sobre
 * ellos. En caso de los objetos, iteramos con bucles for...in.
 *
 * En los mapas, las claves pueden ser de cualquier tipo.
 *
 * Weakmap es una variante que es capaz de eliminar automáticametne las claves
 * en caso de que no haya referencias a ellas. Tampoco se pueden tener primitivos
 * como claves. Solo podemos hacer, set, get, has y delete.
 * - Casos de uso de weakmap: Tipo caché, para evitar memory leaks, etc.
 */

console.log("******* Map y Weakmap ********");
console.log("******************************");

const obj = {};
const map = new Map();

obj.value = "value";
map.set("value", "value");

console.log(obj.value);
console.log(map.get("value"));

console.log(Object.keys(obj).length);
console.log(map.size);

console.log("value in obj", "value" in obj);
console.log("value in map", map.has("value"));

delete obj.value;
delete map.delete("value");

console.log(obj);
console.log(map);

console.log(Object.keys(obj).length);
console.log(map.size);

console.log("value in obj", "value" in obj);
console.log("value in map", map.has("value"));

obj.value = "value";
map.set("value", "value");

for (const prop in obj) {
  console.log("forin obj: ", prop, obj[prop]);
}

map.forEach((value, key) => {
  console.log("foreach map: ", key, value);
});

for (const [key, value] of map) {
  console.log("forof map: ", key, value);
}

let id = (x) => x;
const user = { name: "Javi", age: 30 };

map.set(id, "funcion id"); // La clave es una función.
map.set(user, { settings: { theme: "dark" } }); // La clave es un objeto.

console.log("map.get(id)", map.get(id));
console.log("map.get(user)", map.get(user));

const weakmap = new WeakMap();
weakmap.set(id, 31);

console.log("weakmap.get(id)", weakmap.get(id));
console.log("weakmap.has(id)", weakmap.has(id));

id =
  "modificamos id para ver como weakmap lo elimina automáticamente al cambiar con el garbage collector";

setTimeout(() => {
  console.log("setTimeout - weakmap.get(id)", weakmap.get(id));
  console.log("setTimeout - weakmap.has(id)", weakmap.has(id));
}, 3000);

const objeto = { name: "Javi", age: 30 };

const mapaAPartirDeObjeto = new Map(Object.entries(objeto));
console.log("mapaAPartirDeObjeto", mapaAPartirDeObjeto);

const objetoAPartirDeMapa = Object.fromEntries(mapaAPartirDeObjeto);
console.log("objetoAPartirDeMapa", objetoAPartirDeMapa);

// *** PROTOTYPE -------------------------------------------------------------

console.log("********* Prototype **********");
console.log("******************************");

/**
 * This es un objeto que invoca a la función.
 */
function Person(name) {
  this.name = name;
  // this.greet = function () {
  //   console.log("Hello, I'm " + this.name);
  // };
}

Person.prototype.greet = function () {
  console.log("Hello, I'm " + this.name);
};
/**
  El operador "new" hace por debajo 3 cosas:
  1. Crear un objeto nuevo, vacío.
  2. Hacer que ese objeto vacío invoque a la función constructora, por tanto 'this' representará al
    objeto recién creado.
  3.  El prototipo será por tanto ese almacén común que las distintas instancias de un
  mismo tipo compartirán para evitar habrá miles de funciones (objetos) "greet" creadas.
  New crea un objeto que tiene un prototipo que apunta a la función constructora.
*/

const dan = new Person("Dan");
const james = new Person("James");
console.log(dan); // Person {name: "Dan"}
console.log(james); // Person {name: "James"}
dan.greet(); // "Hello, I'm Dan"
james.greet(); // "Hello, I'm James"

console.log("Person.prototype", Person.prototype); // Es el mismo objeto
console.log("Object.getPrototypeOf(dan)", Object.getPrototypeOf(dan)); // Es el mismo objeto. Es la forma más elegante.
console.log("dan.__proto__", dan.__proto__); // OPCIONAL: Equivalente a Object.getPrototypeOf(dan)
console.log(
  "Person.prototype === Object.getPrototypeOf(dan)",
  Person.prototype === Object.getPrototypeOf(dan)
); // true
console.log("dan instanceof Person", dan instanceof Person); // true

// *** HERENCIA-PROTOTYPE -------------------------------------------------------------
/**
  Al mecanismo de herencia en JS, gracias a los prototipos, se le conoce como herencia prototípica.
  Cada objeto tiene una propiedad "prototype", que es un puntero o ref que apunta hacia el prototipo
  de la instancia. Pero es que el prototipo vuelve a ser un objeto, que tendrá otro "prototype" que
  a su vez apuntará a su prototipo, y así sucesivamente. Se forma una cadena de prototipos que
  termina finalmente apuntando a "null".
*/

console.log("*** Herencia de prototype ****");
console.log("******************************");

function Automobile(wheels) {
  this.wheels = wheels;
  this.kms = 0;
}

Automobile.prototype.drive = function (kms) {
  this.kms += kms;
  console.log("Driving " + kms + "kms...");
};

Automobile.prototype.showKms = function () {
  console.log("Total Kms: " + this.kms);
};

/**
 * Vamos a hacer que Taxi "herede"
 * de Automobile. Para eso, queremos que el objeto que llama al constructor Taxi() invoque también
 * al constructor Automobile().
 */

function Taxi() {
  Automobile.call(this, 4); // Es la forma directa de hacer super();
  this.isOccupied = false; // Para las instancias de Taxi, no para Automobile.
}

const fakeTaxi = new Taxi();
// fakeTaxi.drive(100); //fakeTaxi.drive is not a function
// fakeTaxi.showKms(); //fakeTaxi.showKms is not a function

// Hay que vincular a mano el prototipo de Taxi al de Automobile, si no, no nos saldrá
Object.setPrototypeOf(Taxi.prototype, Automobile.prototype);
fakeTaxi.drive(100);
fakeTaxi.showKms();
console.log("FakeTaxi", fakeTaxi);

// Añadimos también algún método a Taxi.
Taxi.prototype.service = function () {
  this.isOccupied = true;
};

// Este método se sirve de otro que está más arriba en la cadena de prototipos.
Taxi.prototype.drive = function (kms) {
  Automobile.prototype.drive.call(this, kms); // super.drive()
  const serviceStatus = this.isOccupied ? "in service" : "free";
  console.log("And I am " + serviceStatus);
};

// @override: Al estar antes en la cadena de prototipos, no se llegará nunca a invocar a
// Automobile.prototype.showKms
Taxi.prototype.showKms = function () {
  console.log("Taxi Total Kms: " + this.kms);
};

fakeTaxi.drive(100);
fakeTaxi.showKms();
console.log("FakeTaxi", fakeTaxi);

/**
  Herencia simulada via cadena de prototipos
  Taxi -----> Automobile -----> Object -----> null

  Cadena Prototípica
  Taxi.prototype
  Taxi.prototype.__proto__ ---> Automobile.prototype
                                Automobile.prototype.__proto__ ---> Object.prototype
                                                                    Object.prototype.__proto__: ---> null
*/

///-- CREACIÓN DE OBJETOS Y SU CADENA DE PROTOTIPOS **********************************************
console.log("**** Crear objetos + cadena de prototipos ****");
console.log("**********************************************");

// Hay 3 formas de crear objetos, que difieren en la cadena de prototipos que generan:

// 1. De forma literal:
const me = { name: "Javi" };
/*
  me -----> Object.prototype -----> null
  "name" sería una propiedad del objeto o instancia me.
*/

// 2. A través de un constructor y new:
function Person(name) {
  this.name = name;
}

Person.prototype.sayName = function () {
  console.log(this.name);
};

const me1 = new Person("Javi");
/*
  me1 -----> Person.prototype -----> Object.prototype -----> null
  "name" sería una propiedad del objeto construido.
  "sayName" sin embargo, se obtiene heredado del prototipo (se accede, no se copia).
*/

// 3. Object.create() Esto hace que el objeto creado tenga como prototipo el objeto que le pasamos.
const a = { name: "a" }; // a -----> Object.prototype -----> null.
const b = Object.create(a); // b -----> a -----> Object.prototype -----> null.
const c = Object.create(b); // c -----> b -----> a -----> Object.prototype -----> null.
console.log("a", a);
console.log("b", b);
console.log("c", c);

///-- CONSTRUCTORES POR DEFECTO ******************************************************************

/*
Ahora que conocemos el prototipo y la herencia que se deriva de este modelo, podemos responder a
la pregunta de...¿que son todos esos métodos que aparecen cuando declaramos una variable primitiva?
Por ejemplo:
  const num = 4;
  num.toString();
El lenguaje incorpora funciones constructoras para los tipos primitivos, y se aplican de forma
transparente cada vez que inicializamos un primitivo, haciendo que dicho primitivo incorpore toda
la funcionalidad de su prototipo correspondiente.
*/

/**
 * OJO! No es lo mimso hacer new String("foo") que hacer "foo". El primero
 * crea un objeto, el segundo un primitivo.
 */

// String
const str = new String("foo");
console.log(str); // "foo"
console.log(str == "foo"); // true
console.log(str === "foo"); // false

// Number
const num = new Number(32);
console.log(num); // 32
console.log(num == 32); // true
console.log(num === 32); // false

// Boolean
const bool = new Boolean(32);
console.log(bool); // true
console.log(bool == true); // true
console.log(bool === true); // false

// Object
const obj1 = new Object();
console.log(obj1); //{}
console.log(obj1 == {}); // false
console.log(obj1 === {}); // false

// Type conversion
console.log((32).toString()); // "32"
console.log(Number("32")); // 32
console.log(Boolean("32")); // true
console.log(!!"32"); // true

///-- THIS **************************************************************************************
console.log("****************** THIS **********************");
console.log("**********************************************");
/**
  Ahora que hemos profundizado acerca del prototipo en javascript y que conocemos la diferencia
  entre las funciones clásica y las funciones flecha, podremos explicar con más detalle cual es
  la problemática del "this" en las funciones clásicas y porqué llegaron las arrow functions al
  rescate. Pero en primer lugar, refresquemos conceptos.
*/

// Recordemos, la keyword "this" es especial en javascript y apunta a quien haya invocado a la
// función clásica:
function sayAge() {
  console.log("I'm " + this.age + " years old");
}
sayAge(); // I'm undefined years old.

// ¿Porque undefined? Porque age no existe en this. ¿Y quien es this? La entidad que invoca a la
// función sayAge, que en este caso es el contexto global, es decir, el objeto "window".

// Por tanto si hago esto, la cosa cambia:
age = 25; // equivalente a window.age = 25.
function sayAge() {
  console.log("I'm " + this.age + " years old");
}
sayAge(); // I'm 25 years old.

// Hemos creado una propiedad age al objeto global window. window es el que llama a sayAge(), y
// como this apunta al que invoca la función clásica, ahora si funciona.

// De forma equivalente:
const me2 = {
  name: "Javi",
  age: "36",
};
sayAge.call(me2); // I'm 36 years old.

// INCISO: Alias object literal => En estos casos "this" apunta a la instancia que se emplea
// para invocar sus métodos, es decir, 'me'.
const me3 = {
  name: "Javi",
  age: 36,
  sayAge: function () {
    console.log("I'm " + this.age + " years old");
  },
};
me3.sayAge(); // "I'm 36 years old"

// PROBLEMA CON EL THIS EN LAS FUNCIONES CLÁSICAS

function Person(age) {
  this.age = age;
}

Person.prototype.sayAge = function () {
  console.log(this.age);
};

Person.prototype.sayDelayedAge = function () {
  console.log("sayDelayedAge this", this); // me4
  //Para evitar undefined abajo, guardamos this.
  const self = this;
  setTimeout(function () {
    console.log("sayDelayedAge deep this", this); // Window
    console.log("sayDelayedAge deep self", self); // me4
    console.log(this.age); // Undefined (aunque salga 25, es que 25 está en window). Al ser una función clásica, this apunta al contexto global.
    console.log(self.age); // 38
  }, 1000);
};

const me4 = new Person(38);

me4.sayAge(); // 38
me4.sayDelayedAge(); // undefined (aunque salga 25, es que 25 está en window)

// Hay varias soluciones, la implementada arriba es Self.           :
// *** FIX 1: 'Self' ***
Person.prototype.sayDelayedAge = function () {
  const self = this;
  setTimeout(function () {
    console.log(self.age);
  }, 1000);
};

// *** FIX 2: Bind ***
Person.prototype.sayDelayedAge = function () {
  const sayAge = function () {
    console.log(this.age);
  };
  setTimeout(sayAge.bind(this), 1000);
};

// *** FIX 3: Arrow function! (la mejor solución) ***
Person.prototype.sayDelayedAge = function () {
  setTimeout(() => console.log(this.age), 1000);
};

///-- GETTERS & SETTERS **************************************************************************
console.log("**************** GET/SET *********************");
console.log("**********************************************");

//Se tiene más control sobre la propiedad, que queda como privada.
// Es como una suscripción a un evento. Get y Set escuchan a la propiedad.

const book = {
  get author() {
    return "I'm " + this._author; // Bucle infinto si llamamos a "this.author"
  },
  set author(newAuthor) {
    console.log('setting new author "' + newAuthor + '"');
    if (newAuthor !== "Alan") {
      // Bloqueo a Alan.
      this._author = newAuthor; // Same here.
    }
  },
};
/**
 * Antes de que se ejecute el setter, se ejecuta el getter.
 * Si no existe el getter, se devuelve undefined.
 * Si no existe el setter, no se puede asignar.
 *
 * Hacemos primero el setter de Edward, y el getter devuelve "I'm Edward".
 * Alan está bloqueado, por lo que no se puede asignar. Y será Edward.
 *
 * Edward se guarda en _author, pero author sigue siendo "I'm Edward".
 */
book.author = "Edward";
console.log(book.author); // "I'm Edward"
book.author = "Alan";
console.log(book.author); // "I'm Edward"
console.log(book._author); // "Edward"
book.author = "Peter Parker";
console.log(book.author); // "I'm Peter Parker"
console.log(book._author); // "Peter Parker"

///-- SET & WEAKSET **************************************************************************
console.log("**************** SET & WEAKSET *********************");
console.log("****************************************************");

// Ambos nos permiten crear colecciones de elementos, del mismo modo que hacemos con los Arrays

//Similitudes (funciones de añadir, borrar, comprobar si existe, etc.)
const list = [];
const set = new Set();

list.push("hello");
set.add("hello");

console.log(list); // ["hello"]
console.log(set); // Set(1) { "hello" }

// Diferencias
/** Hay una diferencia importante entre Array y Set y es que los elementos de
 * un Set son únicos, es decir, por muchas veces que intentemos insertar el
 * mismo elemento sólo será insertado una sola vez:
 */

const set2 = new Set();
set2.add("Android");
set2.add("iOS");
const otherOS = { name: "Debian" };
set2.add(otherOS);

console.log(set2); // Set(3) { "Android", "iOS", {name: "Debian"} }

set2.add("Android");
set2.add("iOS");
set2.add("Windows Phone");
set2.add(otherOS);
console.log(set2); // Set(4) { "Android", "iOS", {name: "Debian"} "Windows Phone" }

// Pero ojo, mismo elemento = misma ref. Si cambiamos su ref...voilá:
set2.add({ name: "ChromeOS" });
set2.add({ name: "ChromeOS" }); // Distinta referencia (pq es un objeto, REMEMBER!)
console.log(set2); // Set(6) { "Android", "iOS", {name: "Debian"}, "Windows Phone", {name: "ChromeOS"}, {name: "ChromeOS"} }

// Al igual que los arrays los elementos Set son iterables
const set3 = new Set(["lorem", "ipsum", "dolor", "sit", "amet"]);

set3.forEach((element) => {
  console.log(element);
});

for (let element of set3) console.log(element);

/**
 * WeakSet es similar a Set pero tiene ciertas diferencias:
 * 1. Sólo puede contener objetos. No están permitidos tipos primitivos.
 * 2. Elimina automáticamente aquellos elementos que son candidatos a ser borrados por el recolector
   de basura.
   3. No son iterables, por lo que tampoco tenemos acceso a "keys()" ni "size".

   Ideal para almacenar referencias débiles, como por ejemplo, referencias a 
   elementos del DOM o bien que son candidatos a ser eliminados por el recolector.
 */

const weakSet = new WeakSet();
const obj5 = { name: "Javi" };
const obj6 = "Javi";
weakSet.add(obj5);
// weakSet.add(obj6); // TypeError: Invalid value used in weak set
console.log(weakSet.has(obj5)); // true
// console.log(weakSet.has(obj6)); // false

///-- SYMBOL **************************************************************************
console.log("******************** SYMBOL ************************");
console.log("****************************************************");

/**
 * Symbol es un tipo de dato primitivo que se utiliza para crear identificadores únicos.
 *
 * El uso de Symbol es muy común en librerías y frameworks para crear propiedades privadas
 */

const mySymbol = Symbol("etiqueta");
const mySymbol2 = Symbol("etiqueta");
const mySymbol3 = Symbol("etiqueta");
const mySymbol4 = Symbol("etiqueta");

console.log("mySymbol", mySymbol); // Symbol(etiqueta)
console.log("typeof mySymbol", typeof mySymbol); // symbol

console.log("mySymbol === mySymbol2", mySymbol === mySymbol2); // false porque son únicos

/**
 * Es posible machacar datos, pero con Symbol nos permiten crear propiedades
 * menos accesibles, ya que tienes que estar en posesión de ese símbolo para
 * poder acceder a esa propiedad.
 */

const userX = {
  name: "Evan",
  id: 33,
  [mySymbol]: 144,
  [mySymbol2]: 143,
  [mySymbol3]: 1434,
  [mySymbol4]: 14324,
};

console.log(userX[id]); // 144;
console.log(userX); // {name: "Evan", id: 33, Symbol(etiqueta): 144, Symbol(etiqueta): 143}
console.log(Object.keys(userX)); // ["name", "id"]

/**
 * Nadie puede sobreescribir la propiedad, porque no se puede acceder a ella. A
 * no ser que se tenga el símbolo, que a fin de cuentas es como una llave/token.
 */

///-- HOISTING **************************************************************************
console.log("******************* HOISTING ***********************");
console.log("****************************************************");
/**
 * Hoisting es un comportamiento de JavaScript por el cual las declaraciones de
 * variables y funciones son movidas al comienzo de su ámbito antes de que se
 * ejecute el código.
 *
 * El siguiente código es válido en JavaScript por el hosting, aunque no lo parezca.
 * Al no ser compilado, se analiza el código y se mueven las declaraciones al principio
 * de forma mágica, sin que el programador lo sepa.
 *
 * ⚠️ Solamente tienen hoisting "function" y "var". ⚠️
 */

shout("aaaaaaaa");

function shout(value) {
  console.log(value.toUpperCase());
}

/**
 * En el caso de VAR, se eleva la declaración de la variable, pero no su asignación.
 * En el caso de LET y CONST, no se eleva la declaración, por lo que no se puede acceder
 */

console.log(a); // undefined
var a = 5;
console.log(a); // 5

// Para el código de arriba, sería algo así interpretado por el motor de JS:
var a;
console.log(a); // undefined
a = 5;
console.log(a); // 5

///-- VAR vs LET vs CONST: RESUMEN *********************************************

/*
- var
    + Ámbito: función
    + Hoisting: SI
    + Redeclarable: SI
    + Reasignable: SI
- let
    + Ámbito: bloque
    + Hoisting: NO
    + Redeclarable: NO 
    + Reasignable: SI
- const
    + Ámbito: bloque
    + Hoisting: NO
    + Redeclarable: NO
    + Reasignable: NO

NOTA:
- Ámbito de función: sólo las funciones representan un ámbito privado para ellas.
- Ámbito de bloque: cualquier bloque, incluidas funciones, representan ámbito 
privado para ellas.
*/

//
//
//

/**
 * IIFE: Inmediately Invoked Function Expression
 * Closure: Función que retorna otra función.
 * Singleton con lo que ofrece JS, createCounter con un closure y un IIFE
 * Envuelta en () y al final con otros (), estos del final es tal como se crea, se ejecuta.
 * Así nada tiene acceso a createCounter.
 */
const counter = (function createCounter() {
  let count = 0;
  return {
    function() {
      console.log(count++);
    },
  };
})();

counter();
counter();
counter();
counter();
