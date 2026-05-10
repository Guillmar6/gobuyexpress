const params = new URLSearchParams(window.location.search);
if(params.get('login_message') != null) document.getElementById('login_message').innerText = params.get('login_message');
if(params.get('signup_message') != null) document.getElementById('signup_message').innerText = params.get('signup_message');

const loginForm = document.getElementById('login_container');
const signupForm = document.getElementById('signup_container');
if(params.get('signup_message') != null) loginForm.hidden = true;
else signupForm.hidden = true;
function switchForm() {
    loginForm.hidden = !loginForm.hidden;
    signupForm.hidden = !signupForm.hidden;
}