var form = document.getElementById('form');

form.addEventListener('submit', getInput);

getInput = function (e) {
  var input = document.getElementById('dbm').value;
  console.log(input);
  document.getElementById('result').innerHTML = input;
  e.preventDefault();
};
