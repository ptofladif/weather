console.log('Javascript do front carregou');

const form = document.querySelector('form');
const cityInput = document.querySelector('input');
const errorMessage = document.querySelector('.error');
const successMessage = document.querySelector('.success');

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const city = cityInput.value;
    console.log(city);

    errorMessage.textContent = "A carregar...";

    fetch('http://localhost:5000/weather?city=' + city).then( (response) => {
        response.json().then( (data) => {
            console.log(data);
            if(data.error){
                errorMessage.textContent = data.error;
            }else{
                errorMessage.textContent = '';
                successMessage.innerHTML = data.location+'<br><br>'+data.forecast;
            }
        });
    });
});