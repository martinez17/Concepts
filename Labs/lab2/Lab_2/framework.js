/* framework.js
 * version 1.2.3
 */

var _framework = undefined;

/* Initialize the framework
 * INPUT:
 *   methods: Object with application methods to call.
 *     onAddUser - Called when "Add User" button pressed
 */
function frameworkInitialize(methods) {
    _framework = {
        userList: document.getElementById('userList'),
        userTable: document.getElementById('userTable'),
        newUser: document.getElementById('newUser')
    };

    var methodList = [
        "doUpdateUser",
        "onCancelUser",
        "onAddUser",
        "onDeleteUser",
        "onEditUser",
        "onSortById",
        "onSortByFirst",
        "onSortByLast",
        "onSortByCount"
    ];

    for(var m in methodList) {
        var method = methodList[m];
        if(methods[method]) {
            _framework[method] = methods[method];
        }else{
            console.error(method + "() was not defined");
            _framework[method] = _undefined(method);
        }
    }

    //console.log("frameworkInitialized to ", _framework);
}

/* Show the user table
 *
 * INPUT:
 *   users - Array of user objects.  Each object must have the following fields:
 *           id - Unique id number to identify the user
 *           firstName
 *           lastName
 *           todoCount
 */
function showUsers(users) {
    var tbl = [];
    for(var i=0; i<users.length; i++) {
        tbl.push("<tr><td>");
        tbl.push(users[i].id);
        tbl.push("</td><td>")
        tbl.push(users[i].firstName);
        tbl.push("</td><td>")
        tbl.push(users[i].lastName);
        tbl.push("</td><td>")
        tbl.push(users[i].todoCount);
        tbl.push("</td><td><i class='ico icoEdit' onclick='_frameworkEditUser(\"" + users[i].id + "\")'>✎</i> ");
        tbl.push("<i class='ico icoDelete' onclick='_frameworkDeleteUser(\"" + users[i].id + "\")'>ⓧ</i></td></tr>");
    }
    _framework.userTable.innerHTML = tbl.join('');
    _framework.userList.classList.remove("hide");
}

function hideUsers() {
    _framework.userList.classList.add("hide");
}

function hideUpdateUser() {
    _framework.newUser.classList.add("hide");
}

function showUpdateUser(user) {
    document.getElementById("uid").value = user.id;
    document.getElementById("fname").value = user.firstName;
    document.getElementById("lname").value = user.lastName;
    document.getElementById("count").value = user.todoCount;
    _framework.newUser.classList.remove("hide");
}

/*****************************
/*****************************
 * Private functions
 */

function _undefined(methodName) {
    return function() {
        alert(methodName + "() undefined in frameworkInitialize");
    }
}

function _frameworkAddUser() {
    _framework.onAddUser();
}

function _frameworkCancelUser() {
    _framework.onCancelUser();
}

function _frameworkDeleteUser(id) {
    _framework.onDeleteUser(id);
}

function _frameworkEditUser(id) {
    _framework.onEditUser(id);
}

function _frameworkUpdateUser() {
    user = {
        id: document.getElementById("uid").value,
        firstName: document.getElementById("fname").value,
        lastName: document.getElementById("lname").value,
        todoCount: document.getElementById("count").value,
    };
    _framework.doUpdateUser(user);
}

function _frameworkSortById() {
    _framework.onSortById();
}

function _frameworkSortByFirst() {
    _framework.onSortByFirst();
}

function _frameworkSortByLast() {
    _framework.onSortByLast();
}

function _frameworkSortByCount() {
    _framework.onSortByCount();
}
