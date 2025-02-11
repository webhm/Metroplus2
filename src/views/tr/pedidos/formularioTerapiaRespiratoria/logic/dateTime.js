// Función para formatear la fecha y hora
export function formatDateTime(value) {
  let formattedValue = "";

  if (value.length > 0) {
    formattedValue += value.substring(0, 2); // Día
    if (value.length >= 3) {
      formattedValue += "/" + value.substring(2, 4); // Mes
    }
    if (value.length >= 5) {
      formattedValue += "/" + value.substring(4, 8); // Año
    }
    if (value.length >= 9) {
      formattedValue += " " + value.substring(8, 10); // Hora
    }
    if (value.length >= 11) {
      formattedValue += ":" + value.substring(10, 12); // Minutos
    }
    if (value.length >= 13) {
      formattedValue += ":" + value.substring(12, 14); // Segundos
    }
  }

  return formattedValue;
}

// Función para validar que los segundos estén presentes
export function validateSeconds(seconds) {
  return seconds && seconds.length === 2;
}

// Función para validar si la fecha es válida
export function validateDate(day, month, year, enteredDate) {
  return (
    enteredDate.getDate() === parseInt(day) &&
    enteredDate.getMonth() === parseInt(month) &&
    enteredDate.getFullYear() === parseInt(year)
  );
}

// Función para manejar la validación de la fecha y hora
export function validateDateTime(
  enteredDate,
  pedidoDate,
  now,
  day,
  month,
  year
) {
  let errorMessage = "";

  // Validar si la fecha es menor a la fecha del pedido
  if (enteredDate < pedidoDate) {
    errorMessage =
      "La fecha y hora no pueden ser menores a la fecha del pedido";
  }
  // Validar si la fecha es mayor a la fecha actual
  else if (enteredDate > now) {
    errorMessage = "La fecha y hora no pueden ser mayores a la actual";
  }
  // Validar si la fecha es válida
  else if (!validateDate(day, month, year, enteredDate)) {
    errorMessage = "La fecha ingresada no es válida";
  }

  return errorMessage;
}
