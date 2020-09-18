export async function signUp() {
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    console.log(firebase);

    var is_ok = false;
    await firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(() => {
        is_ok = true;
    })
    .catch(function(error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        alert(errorMessage);
    });
    
    return is_ok;
}

export function renderSignup() {
    var main_tag = document.getElementsByTagName("main")[0];
    console.log(main_tag);
    main_tag.innerHTML = `
    <div class="user-operations sign-up">
        <h1>Sing up please</h1>
        <form action="#" onsubmit="return signup.signUp()">
            <div class="field">
                <label for="email">email:</label>
                <input type="email" id="email">
            </div>

            <div class="field">
                <label for="password">password:</label>
                <input type="password" id="password">
            </div>

            <div class="submit-container">
                <input type="submit" value="sign up">
            </div>
        </form>
    </div>`;
}