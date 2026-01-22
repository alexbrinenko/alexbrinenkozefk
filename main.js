function countLetter(str, letter) {
  let count = 0;
  for (let i = 0; i < str.length; i++) {
    if (str.charAt(i).toLowerCase() === letter.toLowerCase()) {
      count++;
    }
  }
  return count;
}

function getRow(firstRow, secondRow, letter) {
  const countFirst = countLetter(firstRow, letter);
  const countSecond = countLetter(secondRow, letter);

  if (countFirst > countSecond) {
    return firstRow;
  } else {
    return secondRow;
  }
}

function runTask1() {
  let firstRow = prompt("Введіть перший рядок:");
  let secondRow = prompt("Введіть другий рядок:");
  let userLetter = prompt("Введіть літеру для пошуку:");

  if (firstRow && secondRow && userLetter) {
    let result = getRow(firstRow, secondRow, userLetter);
    alert("Рядок з більшою кількістю літер '" + userLetter + "':\n" + result);
  }
}

function formattedPhone(phone) {
  phone = phone.replace(/\D/g, "");

  if (phone.length === 12 && phone.startsWith("380")) {
    phone = "+" + phone;
  } else if (phone.length === 11 && phone.startsWith("80")) {
    phone = "+3" + phone;
  } else if (phone.length === 10 && phone.startsWith("0")) {
    phone = "+38" + phone;
  } else if (phone.length === 13 && phone.startsWith("380")) {
    phone = "+" + phone; 
  } else {
    return "Невірний формат!";
  }

  let country = phone.slice(0, 3);   
  let operator = phone.slice(3, 6);  
  let part1 = phone.slice(6, 9);    
  let part2 = phone.slice(9, 11);    
  let part3 = phone.slice(11);       

  return `${country} (${operator}) ${part1}-${part2}-${part3}`;
}

function runTask2() {
  let userPhone = prompt("Введіть номер телефону:");
  if (userPhone) {
    let result = formattedPhone(userPhone);
    alert(result);
  }
}
