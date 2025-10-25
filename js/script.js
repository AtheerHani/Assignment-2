//The javascript code to display a greeting message based on the time of day
document.addEventListener('DOMContentLoaded', function () {
  const greetingElement = document.getElementById('greeting');
  if (!greetingElement) return;

  //we get the current hour to set the greeting message accordingly
  const hour = new Date().getHours();
  let message = "Hello!";

  //if statements to set the greeting message based on the time of day
  if (hour < 12) {
    message = "Good morning!";
  } else if (hour < 18) {
    message = "Good afternoon!";
  } else {
    message = "Good evening!";
  }

  greetingElement.textContent = message;
});