import * as creater from "./creater.js"
window.creater = creater;

export function handlerFocus(cell, color) {
    var rows_num = crossword['rows_num'];
    var columns_num = crossword['columns_num'];
    var table = document.getElementsByClassName("crossword")[0].tBodies[0]
    var cells = crossword['cells']['questions'];
    var row_index = cell.closest("tr").rowIndex;
    var column_index = cell.closest("td").cellIndex;

    console.log(cell);

    for (var i = 0; i < rows_num; ++i) {
        for (var j = 0; j < columns_num; ++j) {
            if (!cells[i] || !cells[i][j]) {
                continue;
            }
            for (var q of cells[i][j]) {
                if (cells[row_index][column_index].includes(q)) {
                    var cell_element = table.rows[i].cells[j].children[0];
                    cell_element.style.backgroundColor = color;
                }
            }
        }
    }

    var questions_table = document.getElementsByClassName("questions")[0];
    questions_table = questions_table.children[0];

    for (var child of questions_table.children) {
        child.children[0].style.backgroundColor = "white";
    }

    for (var child of questions_table.children) {
        console.log(child);
        var key = child.getAttribute("q_key");
        console.log(key);
        console.log(cells[row_index][column_index]);
        for (var q of cells[row_index][column_index]) {
            console.log(q);
            if (q == key) {
                child.children[0].style.backgroundColor = "yellow";
            }
        }
    }
}

function cteateTable(crossword) {
    var rows_num = crossword['rows_num'];
    var columns_num = crossword['columns_num'];

    var table = document.getElementsByClassName("crossword")[0].tBodies[0]
    console.log(table);
    console.log(crossword);
    table.innerHTML = "";
    for (var i = 0; i < rows_num; ++i) {
        var row = document.createElement("tr");
        for (var j = 0; j < columns_num; ++j) {
            var column = document.createElement("td");
            console.log(j);
            var input_tag = document.createElement("input");
            input_tag.setAttribute("type", "text");
            input_tag.setAttribute("id", i.toString() + "_" + j.toString());
            
            input_tag.addEventListener("focus", (e) => {
                handlerFocus(e.target, "coral");
            });

            input_tag.addEventListener("focusout", (e) => {
                handlerFocus(e.target, "white");
            });

            if (!crossword['cells']['letters'][i][j]) {
                input_tag.style.backgroundColor = "grey";
                input_tag.disabled = true;
            }
            column.appendChild(input_tag);
            row.appendChild(column);
        }
        table.appendChild(row);
    }
    creater.setMaxLenInTable();
}


export function findQuestionFirstCell(key) {
    var rows_num = crossword['rows_num'];
    var columns_num = crossword['columns_num'];

    var cells = crossword['cells']['questions'];

    console.log(cells);

    var min_i = 333;
    var min_j = 666;

    for (var i = 0; i < rows_num; ++i) {
        for (var j = 0; j < columns_num; ++j) {
            if (!cells[i] || !cells[i][j]) {
                continue;
            }
            for (var q of cells[i][j]) {
                if (q == key) {
                    min_i = Math.min(min_i, i);
                    min_j = Math.min(min_j, j);
                }
            }
        }
    }

    return min_i.toString() + "_" + min_j.toString();
}

export var crossword;

export function handleMouse(label, color) {
    var key = label.getAttribute("q_key");
    var rows_num = crossword['rows_num'];
    var columns_num = crossword['columns_num'];

    var table = document.getElementsByClassName("crossword")[0].tBodies[0]

    var cells = crossword['cells']['questions'];
    for (var i = 0; i < rows_num; ++i) {
        for (var j = 0; j < columns_num; ++j) {
            if (!cells[i] || !cells[i][j]) {
                continue;
            }
            for (var q of cells[i][j]) {
                if (q == key) {
                    var cell_element = table.rows[i].cells[j].children[0];
                    cell_element.style.backgroundColor = color;
                }
            }
        }
    }
    console.log(document.activeElement.tagName);
    if (color == "white" && document.activeElement.tagName == "INPUT" && document.activeElement.getAttribute("type") == "text") {
        console.log("tut");
        handlerFocus(document.activeElement, "coral");
    }
}

export function cteateQuestionsTable(questions_table, crossword) {
    var main_tag = document.getElementsByTagName("main")[0];
    questions_table.innerHTML = "";
    var questions = crossword['id_question'];
    var index = 1;
    for (var key in questions) {
        var label = document.createElement("label");
        var li = document.createElement("li");
        li.innerText = questions[key];
        var cell_id = findQuestionFirstCell(key);
        label.appendChild(li);
        label.setAttribute("for", cell_id);
        label.setAttribute("onmouseover", "solver.handleMouse(this, \"yellow\")");
        label.setAttribute("onmouseout", "solver.handleMouse(this, \"white\")");
        label.setAttribute("onclick", "solver.handleMouse(this, \"coral\")");
        label.setAttribute("q_key", key);
        questions_table.appendChild(label);
        
        // var cell = document.getElementById(cell_id);
        // console.log(cell.getBoundingClientRect().left);
        // var hint = document.createElement("span");
        // hint.style.position = "absolute";
        // hint.style.left = cell.getBoundingClientRect().left * 100 / main_tag.children[0 ].offsetWidth + "%";
        // hint.style.top = cell.getBoundingClientRect().top * 100 / main_tag.offsetHeight + "%";
        // hint.innerText = index;
        // main_tag.appendChild(hint);
        index += 1;
    }
}

export function loadCrossword(crossword) {
    console.log(crossword);
    
    cteateTable(crossword);

    var table = document.getElementsByClassName("crossword")[0];
    console.log(table.caption);
    table.caption.children[0].innerText = crossword['name'];

    var questions_table = document.getElementsByClassName("questions")[0];
    questions_table = questions_table.children[0];

    cteateQuestionsTable(questions_table, crossword);
}

export function renderWhongPage() {
    var main_tag = document.getElementsByTagName("main")[0];
    console.log(main_tag);
    main_tag.innerHTML = `
    <div class="user-operations">
        <h1>Whong solve((( looser(( sorry it is joke, ur not looser</h1>
    </div>
    `;
}

export function renderSuccessPage() {
    var main_tag = document.getElementsByTagName("main")[0];
    console.log(main_tag);
    main_tag.innerHTML = `
    <div class="user-operations">
        <h1>You win! You almost cool like Stas Bokun</h1>
    </div>
    `;
}

export function Submit() {
    console.log("submit");
    var rows_num = crossword['rows_num'];
    var columns_num = crossword['columns_num'];
    var table = document.getElementsByClassName("crossword")[0].tBodies[0]
    var cells = crossword['cells']['letters'];

    for (var i = 0; i < rows_num; ++i) {
        for (var j = 0; j < columns_num; ++j) {
            if (!cells[i] || !cells[i][j]) {
                continue;
            }

            var cell_element = table.rows[i].cells[j].children[0];
            if (cell_element.value.toLowerCase() != cells[i][j].toLowerCase()) {
                renderWhongPage();
                return;
            }
        }
    }
    renderSuccessPage();
}

export function renderSolver2(crossword_id) {
    if (!crossword_id) {
        crossword_id = document.getElementById("crossword-id").value;
    }

    firebase.database().ref('crosswords/' + crossword_id)
    .once('value').then(function(snapshot) {
        crossword = snapshot.val();
        loadCrossword(crossword);
    });

    var main_tag = document.getElementsByTagName("main")[0];

    main_tag.setAttribute("class", "solver");
    main_tag.innerHTML = `
    
        <div class="grid">
            <form action="">
                <table class="crossword">
                    <caption><h2>Some crossword</h2></caption>
                    <tbody>
                        <tr>
                            <td><input type="text"></td>
                            <td><input type="text"></td>
                            <td><input type="text"></td>
                            <td><input type="text"></td>
                        </tr>
                        <tr>
                            <td><input type="text"></td>
                            <td><input type="text"></td>
                            <td><input type="text"></td>
                            <td><input type="text"></td>
                        </tr>
                        <tr>
                            <td><input type="text"></td>
                            <td><input type="text"></td>
                            <td><input type="text"></td>
                            <td><input type="text"></td>
                        </tr>

                        <tr>
                            <td><input type="text"></td>
                            <td><input type="text"></td>
                            <td><input type="text"></td>
                            <td><input type="text"></td>
                        </tr>
                        <tr>
                            <td><input type="text"></td>
                            <td><input type="text"></td>
                            <td><input type="text"></td>
                            <td><input type="text"></td>
                        </tr>
                    </tbody>
                </table>
                <div>
                    <div class="field">
                        <div class="btns">
                            <input onclick="solver.Submit()" type="submit">
                        </div>
                    </div>
                </div>
            </form>
        </div>
        <div class="instruction">
            <h1>Questions</h1>
            <div class="questions">
                <ol>
                    <label for=""><li>Question</li></label>
                    <label for=""><li>Question</li></label>
                    <label for=""><li>Question</li></label>
                    <label for=""><li>Question</li></label>
                    <label for=""><li>Question</li></label>
                    <label for=""><li>Question</li></label>
                    <label for=""><li>Question</li></label>
                </ol>
            </div>
        </div>
    `;
    return false;
}

export function renderSolver() {
    var main_tag = document.getElementsByTagName("main")[0];
    console.log(main_tag);
    main_tag.setAttribute("class", "");
    main_tag.innerHTML = `
    <div class="user-operations sign-up">
        <h1>Enter id of crossword</h1>
        <form action="" onsubmit="return solver.renderSolver2()">
            <div class="field">
                <label for="crossword-id">Crossword id:</label>
                <input type="number" id="crossword-id">
            </div>
        </form>
    </div>
    `;
}