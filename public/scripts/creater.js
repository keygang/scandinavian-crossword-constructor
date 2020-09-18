export function crossword_name_change() {
    var name_input = document.getElementById("name");
    var crossword_title = document.getElementsByClassName("crossword")[0]
    crossword_title.caption.innerHTML = "<h2>" + name_input.value + "</h2>";
    console.log("change");
}

export function rows_change(value) {
    var table = document.getElementsByClassName("crossword")[0].tBodies[0]
    var columns_num = document.getElementById("columns").value;
    
    table.innerHTML = "";
    
    for (var i = 0; i < value; ++i) {
        var row = document.createElement("tr");
        
        for (var j = 0; j < columns_num; ++j) {
            var column = document.createElement("td");
            var input_tag = document.createElement("input");
            
            input_tag.setAttribute("type", "text");
            column.appendChild(input_tag);
            row.appendChild(column);
        }
        
        table.appendChild(row);
    }
    setMaxLenInTable();
}

export function generateId() {
    var id = "1"
    for (var i = 0; i < 9; ++i) {
        id += Math.floor(Math.random() * 10); 
    }
    return id;
}

export function columns_change(value) {
    var table = document.getElementsByClassName("crossword")[0].tBodies[0]
    var rows_num = document.getElementById("rows").value;
    table.innerHTML = "";
    for (var i = 0; i < rows_num; ++i) {
        var row = document.createElement("tr");
        for (var j = 0; j < value; ++j) {
            var column = document.createElement("td");
            var input_tag = document.createElement("input");
            input_tag.setAttribute("type", "text");
            column.appendChild(input_tag);
            row.appendChild(column);
        }
        table.appendChild(row);
    }
    setMaxLenInTable();
}

export function setBackgroundColor(table, cells, color) {
    for (var cell of cells) {
        var cell_element = table.rows[cell[0]].cells[cell[1]].children[0];
        if (!cell_element.disabled) {
            cell_element.style.backgroundColor = color;
        } else if (color == "white") {
            cell_element.style.backgroundColor = "yellow";   
        }
    }
}

export var selected_cells = new Set();

export function clearCells(cells) {
    for (var cell of cells) {
        var cell_element = table.rows[cell[0]].cells[cell[1]].children[0];
        if (!cell_element.disabled) {
            cell_element.value = "";
        }
    }
}

export function deleteWord(question_id) {
    var table = document.getElementsByClassName("crossword")[0].tBodies[0]
    var rows_num = document.getElementById("rows").value;
    var columns_num = document.getElementById("columns").value;
    
    for (var i = 0; i < rows_num; ++i) {        
        for (var j = 0; j < columns_num; ++j) {
            var cell_element = table.rows[i].cells[j];
            var to_delete = [];
            for (var k = 1; k < cell_element.children.length; ++k) {
                var question_input = cell_element.children[k];
                console.log(question_input);
                if (question_input.value == question_id) {
                    to_delete.push(question_input);
                }
            }
            console.log(i);
            for (var x of to_delete) {
                x.remove();
            }
            if (cell_element.children.length == 1) {
                cell_element.children[0].style.backgroundColor = "white";
                cell_element.children[0].value = "";
                cell_element.children[0].disabled = false;
            }
        }
    }
}

export function handleCellClick(e) {
    var row_index = e.target.closest("tr").rowIndex;
    var column_index = e.target.closest("td").cellIndex;

    var cell_element = table.rows[row_index].cells[column_index];
    if (cell_element.children.length > 1) {
        var flag = confirm("Delete word");
        if (flag) {
            for (var i = 1; i < cell_element.children.length; ++i) {
                flag = confirm("Delete \"" + id_question[cell_element.children[i].value] + "\" question?");
                if (flag) {
                    deleteWord(cell_element.children[i].value)
                    return;
                }
            }
        } else {
            flag = confirm("Cross word?");
            if (flag) {
                
            } else {
                return;
            }
        }
    }

    var is_ok_row = true;
    for (var cell of selected_cells) {
        if (cell[0] != row_index) {
            is_ok_row = false;
        }
    }

    var is_ok_column = true;
    for (var cell of selected_cells) {
        if (cell[1] != column_index) {
            is_ok_column = false;
        }
    }

    var is_ok_neib = false;
    for (var cell of selected_cells) {
        if (Math.abs(cell[0] - row_index) + 
            Math.abs(cell[1] - column_index) == 1) {
            is_ok_neib = true;
        }
    }

    if ((!is_ok_row && !is_ok_column) || !is_ok_neib) {
        setBackgroundColor(e.target.closest("tbody"),   
                           selected_cells, "white");

        clearCells(selected_cells);

        selected_cells = new Set();
    }

    var is_exists = false;
    for (var cell of selected_cells) {
        if (cell.toString() == [row_index, column_index].toString()) {
            is_exists = true;
            break;
        }
    }
    if (!is_exists) {
        selected_cells.add([row_index, column_index]);
    }

    var answer = document.getElementById("answer");
    answer.setAttribute("maxlength", selected_cells.size);

    var cell_element = table.rows[row_index].cells[column_index];
    console.log(cell_element);
    cell_element.children[0].style.backgroundColor = "red";

    handleCellsChange(e);
}

export function handleCellsChange(e) {
    var answer = document.getElementById("answer");
    answer.value = "";
    console.log(selected_cells);
    var sorted_cells = Array.from(selected_cells).sort();
    console.log(sorted_cells);
    for (var cell of sorted_cells) {
        var cell_element = table.rows[cell[0]].cells[cell[1]].children[0];
        answer.value = answer.value + cell_element.value;
    }
}

export function handleAnswerChange(obj) {
    if (!obj) {
        obj = document.getElementById("answer");
    }
    var sorted_cells = Array.from(selected_cells).sort();
    for (var index in sorted_cells) {
        var cell = sorted_cells[index];
        var cell_element = table.rows[cell[0]].cells[cell[1]].children[0];
        if (index >= obj.value.length) {
            if (!cell_element.disabled) {
                cell_element.value = "";
            }
            break;
        }
        if (!cell_element.disabled) {
            cell_element.value = obj.value[index];
        } else {
            if (obj.value[index] != cell_element.value) {
                alert("We can't rewrite letter from other question");
                obj.value = obj.value.slice(0, index);
            }
        }
    }
}

export var questions_id = 1;
export var id_question = {};

export function createQuestion() {
    var answer = document.getElementById("answer");
    if (answer.value.length != selected_cells.size) {
        alert("Answer length must be as number of selected cells");
        return false;
    }
    var question = document.getElementById("question");
    if (question.value.length == 0) {
        alert("Question length must be nit zero");
        return false;
    }

    id_question[questions_id] = question.value;
    questions_id += 1;
    
    for (var cell of selected_cells) {
        var selected_cell = table.rows[cell[0]].cells[cell[1]];
        var hidden_question = document.createElement("input");
        hidden_question.type = "hidden";
        selected_cell.children[0].disabled = true;
        selected_cell.children[0].style.backgroundColor = "yellow"

        selected_cell.children[0].after(hidden_question);
        
        hidden_question.value = questions_id - 1;
    }

    selected_cells = new Set();
}

export function setMaxLenInTable() {
    var cells = document.querySelectorAll(".crossword tbody input");
    console.log(cells);
    for (var cell of cells) {
        cell.setAttribute("maxlength", 1);
    }
}

export function saveCrossword() {
    var name = document.getElementById("name").value;
    var rows_num = document.getElementById("rows").value;
    var columns_num = document.getElementById("columns").value;

    var table = document.getElementsByClassName("crossword")[0].tBodies[0];
    
    var table_json = {
        'letters': [],
        'questions': []
    };

    for (var i = 0; i < rows_num; ++i) {       
        table_json['letters'].push([]);
        table_json['questions'].push([]);
        for (var j = 0; j < columns_num; ++j) {
            var cell_element = table.rows[i].cells[j];
            var row_q = table_json['questions'][table_json['questions'].length - 1];
            row_q.push([]);
            if (cell_element.children[0].disabled == true) {
                table_json['letters'][table_json['letters'].length - 1].push(cell_element.children[0].value);
                for (var k = 1; k < cell_element.children.length; ++k) {
                    var question_input = cell_element.children[k];
                    row_q[row_q.length - 1].push(question_input.value);
                }
            } else {
                table_json['letters'][table_json['letters'].length - 1].push("");
            }
        }
    }

    var crossword_id = generateId();

    firebase.database().ref('crosswords/' + crossword_id).set({
        'name': name,
        'rows_num': rows_num,
        'columns_num': columns_num,
        'cells': table_json,
        'id_question': id_question
      });

    var main_tag = document.getElementsByTagName("main")[0];

    main_tag.innerHTML = `
    
        <h1 class="saved">
                <p>Crossword id is ${crossword_id}</p>
                <p>You can copy url to send it to friend</p>
                <a href="${document.URL}${crossword_id}">${document.URL}${crossword_id}</a>
        </h1>
    
    `;
}

export function renderCreater() {
    var main_tag = document.getElementsByTagName("main")[0];
    console.log(main_tag);
    main_tag.setAttribute("class", "creater");
    main_tag.innerHTML = `
        <div>
        <div class="instruction">
            <h1>Instruction</h1>
            <p>
                First of all you should come up with name of your crossword.
                Then choose row and column numbers.
                Select consecutive cells and then enter the answer and question.
                Push the "Create question button".
                When you are ready to upload crossword, click to "Create crossword button".
            </p>
        </div>
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
                    </tbody>
                </table>
            </form>
        </div>
        <div class="settings">
            <h1>Settings</h1>
            <div class="field">
                <div class="label">
                    <label for="name">Name of crossword</label>
                </div>
                <input type="text" minlength="1" value="Some crossword" id="name" onkeyup="creater.crossword_name_change()">
            </div>

            <div class="field">
                <div class="label">
                    <label for="rows">Rows number</label>
                </div>
                <input type="number" value=4 max="10" min="4" id="rows" onchange="creater.rows_change(value)">
            </div>

            <div class="field">
                <div class="label">
                    <label for="columns">Columns number</label>
                </div>
                <input type="number" value=4 max="15" min="4" id="columns" onchange="creater.columns_change(value)">
            </div>

            <div class="field">
                <div class="label">
                    <label for="answer">Enter answer</label>
                </div>
                <input type="text" id="answer" maxlength="0" onkeyup="creater.handleAnswerChange(this)">
            </div>

            <div class="field question">
                <div class="label">
                    <label for="question">Enter question</label>
                </div>
                <textarea minlength="1" name="question" id="question" cols="30" rows="10"></textarea>
            </div>
            
            <div class="btns">
                <button type="button" onclick="creater.createQuestion()">Create question</button>

                <input type="submit" onclick="creater.saveCrossword()" id="create-crossword" value="Create crossword"/>
            </div>
        </div>
        </div>`;

    table = document.getElementsByClassName("crossword")[0].tBodies[0];
    table.addEventListener("click", handleCellClick);
    table.addEventListener("keyup", handleCellsChange);
    
    setMaxLenInTable();
}

export var table;