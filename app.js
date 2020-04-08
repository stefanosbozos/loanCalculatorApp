//Submit form event listener
document.querySelector('#loan-form').addEventListener('submit', results);

//Show/Hide Results function
function results(event){

  console.log(event);
  // Hide results
  document.querySelector('#results').style.display = 'none';
  
  //Show loader
  document.querySelector('#loading').style.display = 'block';

  //Calculate
  setTimeout(calculateResults, 1000);

  event.preventDefault();
}


// Calculate Results
function calculateResults(){

  //UI Variables
  const amount = document.querySelector('#amount');
  const interest = document.querySelector('#interest');
  const years = document.querySelector('#years');
  const monthlyPayment = document.querySelector('#monthly-payment');
  const totalPayment = document.querySelector('#total-payment');
  const totalInterest = document.querySelector('#total-interest');

  //parse into decimal values
  const principal = parseFloat(amount.value);
  const calculatedInterst = parseFloat(interest.value) / 100 / 12;
  const calculatedPayments = parseFloat(years.value) * 12;

  // Compute monthly payment
  const x = Math.pow(1 + calculatedInterst, calculatedPayments);
  const monthly = (principal * x * calculatedInterst) / (x - 1);

  if(isFinite(monthly)){
    monthlyPayment.value = monthly.toFixed(2);
    totalPayment.value = (monthly * calculatedPayments).toFixed(2);
    totalInterest.value = ((monthly * calculatedPayments) - principal).toFixed(2);

  // Show results
  document.querySelector('#results').style.display = 'block';

  // Hide loader
  document.querySelector('#loading').style.display = 'none';
    
  }else{
    showError('Please check your numbers!');
  }

  event.preventDefault();
}


// Show error
function showError(error){

  // Hide results
  document.querySelector('#results').style.display = 'none';

  // Hide loader
  document.querySelector('#loading').style.display = 'none';

  //Create a div
  const errorDiv = document.createElement('div');

  //Get Elements
  const card = document.querySelector('.card');
  const heading = document.querySelector('.heading');

  //Add Class
  errorDiv.className = 'alert alert-danger';

  //Create text node and append to div
  errorDiv.appendChild(document.createTextNode(error));

  //Insert div above heading
  card.insertBefore(errorDiv, heading);

  //Clear error after 3s
  setTimeout(clearError, 2000);
}

//Clear error
function clearError(){
  document.querySelector('.alert').remove();
}