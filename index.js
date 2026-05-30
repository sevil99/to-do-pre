let items = [
	"Сделать проектную работу",
	"Полить цветы",
	"Пройти туториал по Реакту",
	"Сделать фронт для своего проекта",
	"Прогуляться по улице в солнечный день",
	"Помыть посуду",
];

const listElement = document.querySelector(".to-do__list");
const formElement = document.querySelector(".to-do__form");
const inputElement = document.querySelector(".to-do__input");

function loadTasks() {
	const savedTasks = localStorage.getItem("tasks");
	if (savedTasks) {
		return JSON.parse(savedTasks);
	}
	return items;
}

function createItem(item) {
	const template = document.getElementById("to-do__item-template");
	const clone = template.content.querySelector(".to-do__item").cloneNode(true);
	const textElement = clone.querySelector(".to-do__item-text");
	const deleteButton = clone.querySelector(".to-do__item-button_type_delete");
	const duplicateButton = clone.querySelector(".to-do__item-button_type_duplicate");
	const editButton = clone.querySelector(".to-do__item-button_type_edit");
	
	textElement.textContent = item;
	
	deleteButton.addEventListener("click", () => {
		clone.remove();
		const tasks = getTasksFromDOM();
		saveTasks(tasks);
	});
	
	duplicateButton.addEventListener("click", () => {
		const itemName = textElement.textContent;
		const newItem = createItem(itemName);
		listElement.prepend(newItem);
		const tasks = getTasksFromDOM();
		saveTasks(tasks);
	});
	
	editButton.addEventListener("click", () => {
		textElement.contentEditable = "true";
		textElement.focus();
	});
	
	textElement.addEventListener("blur", () => {
		textElement.contentEditable = "false";
		const tasks = getTasksFromDOM();
		saveTasks(tasks);
	});
	
	return clone;
}

function getTasksFromDOM() {
	const itemsNamesElements = document.querySelectorAll(".to-do__item-text");
	const tasks = [];
	
	itemsNamesElements.forEach(element => {
		tasks.push(element.textContent);
	});
	
	return tasks;
}

function saveTasks(tasks) {
	localStorage.setItem("tasks", JSON.stringify(tasks));
}

items = loadTasks();

items.forEach(item => {
	listElement.append(createItem(item));
});

formElement.addEventListener("submit", (event) => {
	event.preventDefault();
	
	const newTaskText = inputElement.value;
	
	if (newTaskText.trim() === "") {
		return;
	}
	
	const newTask = createItem(newTaskText);
	listElement.prepend(newTask);
	
	items = getTasksFromDOM();
	saveTasks(items);
	
	inputElement.value = "";
});

