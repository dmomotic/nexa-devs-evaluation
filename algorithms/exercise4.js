/*
Ejercicio 4. Piramide de numeros
Realizar un algoritmo que genere un array aleatorio de 10 números de 1 a 100. Se sumarán todos los pares de números adyacentes para crear 
un nuevo array de 9 números. El proceso se repetirá creando arrays más pequeños hasta que solo quede un array de un número. 
Mostrar la pirámide generada

Ejemplo con un array inicial de 4 números
Array Inicial : [3, 5, 2, 1]
Resultado:
3  5  2  1
  8  7  3
   15 10
     25
*/

//Fucntion to get a random int bewteen 1 - 100
const getRandomInt = () => Math.floor(Math.random() * 101);

//Initial array
const initalArray = [];
while (initalArray.length != 10) {
  initalArray.push(getRandomInt());
}

//Function to get a new array with pairs added
const getNewArray = (array) => {
  const length = array.length;
  const newArray = [];
  for (let i = 0; i < length - 1; i++) {
    newArray.push(array[i] + array[i + 1]);
  }
  return newArray;
};

//Printing pyramid
let auxArray = initalArray;
const defaultSpaces = 6;

while (auxArray.length > 0) {
  const iterationNumber = initalArray.length - auxArray.length;
  const initialSpaces =
    (initalArray.length - auxArray.length) * (defaultSpaces - 2);
  let stringNumbers = "";
  for (const number of auxArray) {
    const spacesToRemove =
      (toString(number).length == 4 ? 3 : (toString(number).length == 3 ? 2 : 1));
    const spacesBetweenNumbers =
      iterationNumber > 0 
        ? defaultSpaces - spacesToRemove
        : defaultSpaces;
    stringNumbers += `${number}` + " ".repeat(spacesBetweenNumbers);
  }
  console.log(" ".repeat(initialSpaces) + stringNumbers);
  console.log("");
  auxArray = getNewArray(auxArray);
}