const inputsText = document.querySelectorAll('.form__input[type="text"]');
const inputTextarea = document.querySelector('.form__flex textarea');
const inputEmail = document.querySelector('.form__flex input[type="email"]');
const inputRadio = document.querySelectorAll('.form__radio input[name="radio"]');
const inputCheckbox = document.querySelector('.form__checkbox input');
const form = document.querySelector('.form');
const success = document.querySelector('.success');
const spinner = document.querySelector('.loader');


inputsText.forEach(input => {
    input.addEventListener("blur",() => {
        validateText(input)
    });
});

inputTextarea.addEventListener('blur', () => {
    validateText(inputTextarea);
});

inputEmail.addEventListener('blur', () => {
    validateEmail(inputEmail);
});

inputRadio.forEach(input => {
    input.addEventListener('change', () => {
        validateInputRadio();
    });
});

inputCheckbox.addEventListener('change', () => {
    validateCheckbox();
});

form.addEventListener('submit', e => {
    e.preventDefault();
    let isValid = true;
    inputsText.forEach(input => {
        if(!validateText(input)) isValid = false;
    });
    if(!validateText(inputTextarea)) isValid = false;
    if(!validateEmail(inputEmail)) isValid = false;
    if(!validateInputRadio()) isValid = false;
    if(!validateCheckbox()) isValid = false;
    if(isValid){
        spinner.classList.add('loader-show');
        setTimeout(() => {
            spinner.classList.remove('loader-show');
            form.reset();
            const allInputs = document.querySelectorAll('input[type="text"], input[type="email"], textarea');
            allInputs.forEach(input => {
                input.style.borderColor = 'var(--grey-900)';
            })
            success.classList.add('success-show');
            setTimeout(() => {
                success.classList.remove('success-show');
            },3000) 
        }, 1500);
    }
});

function validateText(input){
    if(input.value === '') {
        input.nextElementSibling.style.display = 'block';
        input.style.borderColor = 'var(--red)';
        return false;  
    } else {
        input.nextElementSibling.style.display = 'none';
        input.style.borderColor = 'var(--green-600)';
        return true;
    }
}

function validateEmail(input){
    const error = document.querySelector('#emailError');
    const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(input.value !== '') {
        error.style.display = 'none';
        inputEmail.style.borderColor = 'var(--green-600)';
        if(regex.test(input.value)) {
            error.style.display = 'none';
            inputEmail.style.borderColor = 'var(--green-600)';
            return true;
        } else {
            error.style.display = 'block';
            error.textContent = 'Please enter a valid email address';
            inputEmail.style.borderColor = 'var(--red)';
            return false;  
        }
    }else {
        error.style.display = 'block';
        error.textContent = "This field is required";
        inputEmail.style.borderColor = 'var(--red)';
        return false;
    }
}

function validateInputRadio(){
    const isChecked = Array.from(inputRadio).some(radio => radio.checked);
    const error = document.querySelector('#radioError');
    if(!isChecked) {
        error.style.display = 'block';
        return false;
    } else {
        error.style.display = 'none';
        return true;
    }
}

function validateCheckbox(){
    const isChecked = inputCheckbox.checked;
    const error = document.querySelector('#consentError');
    if(!isChecked) {
        error.style.display = 'block';
        return false;
    } else {
        error.style.display = 'none';
        return true;
    }
}