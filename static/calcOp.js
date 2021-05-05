var input = [0, false, false, false, false];
var ops = ["+", "-", "=", "/", "*", "%", "^"];
var opfunc = {"+": add, "-": sub, "*": mult, "/": div, "^": exp, "%": mod}
function btnPress(key, output1) {
  //NUMBER ENTERED
  if (String(key).match(/[0-9.]/g)) {
    //NO 1ST NUMBER, ENTERING NOW
    if (!input[4] || input[3]) {
      input = [0, false, false, false, true];
      if (key == ".") {
        if (!String(input[0]).includes(".")){
          input[0] = String(input[0]) + key;
        }
      } else if  (String(input[0]).includes(".")){
        input[0] = String(input[0]) + key;
      } else {
        input[0] = String(key);
      }
      document.querySelector(".output").innerHTML = input[0];
    }
    //NO OPERATION, THEREFORE NO 2ND NUMBER, CONT. ENTERING 1ST NUMBER
    else if (!input[2]) {
      if (String(input[0]) === "0"){
        if (key != "."){
          input[0] = key;
        }
        else {
          input[0] = String(input[0]) + key;
        }
        document.querySelector(".output").innerHTML = input[0];
      }
      else if (!(key == "." && String(input[0]).includes("."))) {
        input[0] = String(input[0]) + String(key);
        document.querySelector(".output").innerHTML = input[0];
      }
    }
    //NO SECOND NUMBER, ENTERING NOW
    else if (!input[1]) {
      if (key == ".") {
        input[1] = String(0) + key;
      } else {
        input[1] = key;
      }
      document.querySelector(".output").innerHTML = input[1];
    }
    //CONTINUING TO ENTER SECOND NUMBER
    else if (!input[3]) {
      if (!(key == "." && String(input[1]).includes("."))) {
        input[1] = String(input[1]) + String(key);
        document.querySelector(".output").innerHTML = input[1];
      }
    }
    //EQUAL OPERATION IN USE, MUST OVERWRITE 2ND NUMBER
    else {
      if (key == ".") {
        input[1] = "0.";
      } else {
        input[1] = key;
      }
      input[3] = false;
      document.querySelector(".output").innerHTML = input[1];
    }
  }
  //CLEAR ALL
  else if (["AC", "C"].includes(String(key))) {
    input = [0, false, false, false, false];
    document.querySelector(".output").innerHTML = input[0];
  }
  //OPERATION ENTERED
  else if (ops.includes(String(key))) {
    //2ND OPERATION ENTERED, 2 NUMBERS
    if (input[2] && input[1] || input[1] === 0) {
      switch (key) {
        case "*":
          if (input[3]) {
            input[1] = false;
            input[2] = "*";
            input[3] = false;
          }
          else {
            document.querySelector(".output").innerHTML = opfunc[input[2]](input[0],input[1]);
            input[0] = opfunc[input[2]](input[0],input[1]);
            input[1] = false;
            input[2] = "*";
            input[3] = false;
          }
          break;
        case "/":
          if (input[3]) {
            input[1] = false;
            input[2] = "/";
            input[3] = false;
          }
          else {
            document.querySelector(".output").innerHTML = opfunc[input[2]](input[0],input[1]);
            input[0] = opfunc[input[2]](input[0],input[1]);
            input[1] = false;
            input[2] = "/";
            input[3] = false;
          }
          break;
        case "+":
          if (input[3]) {
            input[1] = false;
            input[2] = "+";
            input[3] = false;
          }
          else {
            document.querySelector(".output").innerHTML = opfunc[input[2]](input[0],input[1]);
            input[0] = opfunc[input[2]](input[0],input[1]);
            input[1] = false;
            input[2] = "+";
            input[3] = false;
          }
          break;
        case "-":
          if (input[3]) {
            input[1] = false;
            input[2] = "-";
            input[3] = false;
          }
          else {
            document.querySelector(".output").innerHTML = opfunc[input[2]](input[0],input[1]);
            input[0] = opfunc[input[2]](input[0],input[1]);
            input[1] = false;
            input[2] = "-";
            input[3] = false;
          }
          break;
        case "%":
          if (input[3]) {
            input[1] = false;
            input[2] = "%";
            input[3] = false;
          }
          else {
            document.querySelector(".output").innerHTML = opfunc[input[2]](input[0],input[1]);
            input[0] = opfunc[input[2]](input[0],input[1]);
            input[1] = false;
            input[2] = "%";
            input[3] = false;
          }
          break;
        case "^":
          if (input[3]) {
            input[1] = false;
            input[2] = "^";
            input[3] = false;
          }
          else {
            document.querySelector(".output").innerHTML = opfunc[input[2]](input[0],input[1]);
            input[0] = opfunc[input[2]](input[0],input[1]);
            input[1] = false;
            input[2] = "^";
            input[3] = false;
          }
          break;
        case "=":
          document.querySelector(".output").innerHTML = opfunc[input[2]](input[0],input[1]);
          input[0] = opfunc[input[2]](input[0],input[1]);
          input[3] = "=";
          break;
        default:
          break;
      }
    }
    //2ND OPERATION ENTERED, 1 NUMBER
    else if (input[2]) {
      switch (key) {
        case "*":
          document.querySelector(".output").innerHTML = input[0];
          input[2] = "*";
          break;
        case "/":
          document.querySelector(".output").innerHTML = input[0];
          input[2] = "/";
          break;
        case "+":
          document.querySelector(".output").innerHTML = input[0];
          input[2] = "+";
          break;
        case "-":
          document.querySelector(".output").innerHTML = input[0];
          input[2] = "-";
          break;
        case "%":
          document.querySelector(".output").innerHTML = input[0];
          input[2] = "%";
          break;
        case "^":
          document.querySelector(".output").innerHTML = input[0];
          input[2] = "^";
          break;
        case "=":
          document.querySelector(".output").innerHTML = input[0];
          break;
        default:
          break;
      }
    }
    //1ST OPERATION ENTERED
    else {
      switch (key) {
        case "*":
          document.querySelector(".output").innerHTML = String(input[0]);
          input[2] = "*";
          break;
        case "/":
          document.querySelector(".output").innerHTML = String(input[0]);
          input[2] = "/";
          break;
        case "+":
          document.querySelector(".output").innerHTML = String(input[0]);
          input[2] = "+";
          break;
        case "-":
          document.querySelector(".output").innerHTML = String(input[0]);
          input[2] = "-";
          break;
        case "%":
          document.querySelector(".output").innerHTML = String(input[0]);
          input[2] = "%";
          break;
        case "^":
          document.querySelector(".output").innerHTML = String(input[0]);
          input[2] = "^";
          break;
        case "=":
          document.querySelector(".output").innerHTML = input[0];
          break;
        default:
          break;
      }
    }
  }
}

//-----------------EVENT LISTENERS----------------------------------------------

for (var i = 0; i < document.querySelectorAll(".btn").length; i++) {
  document.querySelectorAll(".btn")[i].addEventListener("click", clickedOn);
}

function clickedOn() {
  var output1 = document.querySelector(".output").innerHTML;
  if (Number(output1)) {
    output1 = Number(output1);
  }
  btnPress(this.innerHTML, output1);
}
document.addEventListener("keypress", function(event) {
  var output1 = document.querySelector(".output").innerHTML;
  if (Number(output1)) {
    output1 = Number(output1);
  }
  btnPress(event.key, output1);
})

//-----------------ARITHMETIC FUNCTIONS-----------------------------------------

function round(num) {
  if (String(num).length > 12) {
    return parseFloat((num).toFixed(8));
  } else {
    return num;
  }
}
function add(num1, num2) {
  var result = Number(num1) + Number(num2);
  return round(result);
}
function mult(num1, num2) {
  var result = Number(num1) * Number(num2);
  return round(result);
}
function div(num1, num2) {
  var result = Number(num1) / Number(num2);
  return round(result);
}
function sub(num1, num2) {
  var result = Number(num1) - Number(num2);
  return round(result);
}
function exp(num1, num2) {
  num1 = Number(num1);
  num2 = Number(num2);
  val = num1;

  if (num2 == 0) {
    return 1;
  }
  for (x = 1; x < num2; x++){
    val *= num1;
  }
  return round(val);
}
function mod(num1, num2) {
  var result = Number(num1) % Number(num2);
  return round(result);
}
