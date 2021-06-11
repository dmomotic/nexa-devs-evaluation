/*
Realizar un algoritmo que lea una cadena y determine si es un número válido.
● Ejemplos válidos: 34, 43.45, -42
● Ejemplos inválidos: 3a4, 43.4.5, 4-2-
*/

const array = ["34", "43.45", "-42", "3a4", "43.4.5", "4-2-"];

const isValidStringNumber = (str) => !isNaN(str);

for (const item of array) {
  const msg = isValidStringNumber(item) ? 'is a valid number' : 'is not a valid number';
  console.log(`${item} ${msg}\n`);
}