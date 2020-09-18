// import "creater.js"
import * as signup from "./signup.js"
import * as login from "./login.js"
import * as creater from "./creater.js"
import * as solver from "./solver.js"

window.signup = signup;
window.login = login;
window.creater = creater;
window.solver = solver;

function logOut() {
    firebase.auth().signOut().then(function() {
        renderIndex();
      }).catch(function(error) {
        alert(error.message);
      });
}

window.logOut = logOut;

function renderIndex() {
    var main_tag = document.getElementsByTagName("main")[0];
    console.log(main_tag);
    main_tag.setAttribute("class", "");
    main_tag.innerHTML = `
    <div class="main-text">
    <p>
        Welcome to scandinavian crossword website!
    </p>
    <p>Here you can create your own crossword and solve some crosswords that were created by your friends!
        </p>
    <p>Login or sign up to try it.</p>
    </div>`;


    if (firebase.auth().currentUser == null) {
        var buttons = document.getElementsByClassName("managment-buttons")[0];
        buttons.innerHTML = `
        <a href="#" onclick="login.renderLogin()">Log in</a>
        <a href="#" onclick="signup.renderSignup()">Sign up</a>`;
    } else {
        var buttons = document.getElementsByClassName("managment-buttons")[0];
        buttons.innerHTML = `
        <a href="#" onclick="creater.renderCreater()">Create crossword</a>
        <a href="#" onclick="solver.renderSolver()">Solve crossword</a>
        <a href="#" onclick="logOut()">Log out</a>`;
    }

    var footer = document.createElement('footer');
    footer.className = "footer-class";
    footer.innerHTML = `
    <p>Stas Bokun - the genius of design and layout</p>`;

    main_tag.after(footer);
}

function isSolver(event) {
    var id = document.URL.substring(document.URL.indexOf("#") + 1);
    if (id) {
        if (firebase.auth().currentUser != null) {
            solver.renderSolver2(id);
        } else {
            alert("You should be login before solve crosswords");
        }
    }
}

firebase.auth().onAuthStateChanged(function(user) {
    renderIndex();
    isSolver();
});

window.addEventListener('popstate', isSolver);