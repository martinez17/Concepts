/* CST223 - LAB2
 * lab2.js
 *
 * Author:
 *
 * Date: Apr 9, 2019
 */

// Maintain and edit a list of users and their to-do list

// Use https://www.w3schools.com/js/ for reference


// var answer = confirm("Ready to write code?");

// // Press F12 and look at the console to see your answer
// console.log(answer);
// console.warn(answer);
// console.error(answer);


var user = {
/*id: 17, 
firstName: "Abe",
lastName: "Mar",
todoCount: 7*/
};  

var current_id = 0;
var users = [];

function doUpdateUser(user)
{
	
	//console.log(user);
	if(document.getElementById("new").innerText == "New User")
	{		
		user.id = users.length;
		users.push(user);
	}
	else
	{
		users[current_id] = {id: current_id, firstName: user.firstName, lastName: user.lastName, todoCount: user.todoCount};
	}
	
	showUsers(users);
	
	hideUpdateUser();
}
function OnCancelUser()
{
	hideUpdateUser();
	showUsers(users);
}
function OnAddUser()
{
	document.getElementById("new").innerText = "New User";
	
	showUpdateUser(user);
	//document.getElementById("uid").value = user.id;
    document.getElementById("fname").value = "";
    document.getElementById("lname").value = "";
    document.getElementById("count").value = "";
	
	
	hideUsers();
	//showUsers(users);
}
function OnDeleteUser(id)
{
	var x = 0;
	while(id != users[x].id)
	{
		++x;
	}
	users.splice(x, 1);
	showUsers(users);
		
}
function OnEditUser(id)
{
	document.getElementById("new").innerText = "Edit User";
	
	showUpdateUser(users);
	var per = users.find(x => x.id == id);
	document.getElementById("fname").value = per.firstName;
    document.getElementById("lname").value = per.lastName;
    document.getElementById("count").value = per.todoCount;
	
	current_id = id;
	
	
}
function OnSortById()
{
	users.sort((a,b) => (a.id > b.id) ? 1 : ((b.id > a.id) ? -1 : 0));
	showUsers(users);
}
function OnSortByFirst()
{
	users.sort((a,b) => (a.firstName > b.firstName) ? 1 : ((b.firstName > a.firstName) ? -1 : 0));
	showUsers(users);
}
function OnSortByLast()
{
	users.sort((a,b) => (a.lastName > b.lastName) ? 1 : ((b.lastName > a.lastName) ? -1 : 0));
	showUsers(users);
}
function OnSortByCount()
{
	users.sort((a,b) => (a.todoCount > b.todoCount) ? 1 : ((b.todoCount > a.todoCount) ? -1 : 0));
	showUsers(users);
}

frameworkInitialize({doUpdateUser: doUpdateUser,
onCancelUser: OnCancelUser,
onAddUser: OnAddUser,
onDeleteUser: OnDeleteUser,
onEditUser: OnEditUser,
onSortById: OnSortById,
onSortByFirst: OnSortByFirst,
onSortByLast: OnSortByLast,
onSortByCount: OnSortByCount
});

showUsers({});
