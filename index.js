const initialItems = [
  "Сделать проектную работу",
  "Полить цветы",
  "Пройти туториал по Реакту",
  "Сделать фронт для своего проекта",
  "Прогуляться по улице в солнечный день",
  "Помыть посуду",
];

const storageKey = "tasks";
const listElement = document.querySelector(".to-do__list");
const formElement = document.querySelector(".to-do__form");
const inputElement = document.querySelector(".to-do__input");
const itemTemplate = document.querySelector("#to-do__item-template");

function loadTasks() {
  const savedTasks = localStorage.getItem(storageKey);

  if (savedTasks === null) {
    return initialItems;
  }

  return JSON.parse(savedTasks);
}

function getTasksFromDOM() {
  const itemTextElements = listElement.querySelectorAll(".to-do__item-text");
  const tasks = [];

  itemTextElements.forEach((itemTextElement) => {
    tasks.push(itemTextElement.textContent);
  });

  return tasks;
}

function saveTasks(tasks) {
  localStorage.setItem(storageKey, JSON.stringify(tasks));
}

function saveCurrentTasks() {
  const tasks = getTasksFromDOM();
  saveTasks(tasks);
}

function createItem(item) {
  const itemElement = itemTemplate.content
    .querySelector(".to-do__item")
    .cloneNode(true);
  const textElement = itemElement.querySelector(".to-do__item-text");
  const deleteButton = itemElement.querySelector(
    ".to-do__item-button_type_delete"
  );
  const duplicateButton = itemElement.querySelector(
    ".to-do__item-button_type_duplicate"
  );
  const editButton = itemElement.querySelector(
    ".to-do__item-button_type_edit"
  );

  textElement.textContent = item;

  deleteButton.addEventListener("click", () => {
    itemElement.remove();
    saveCurrentTasks();
  });

  duplicateButton.addEventListener("click", () => {
    const duplicatedItem = createItem(textElement.textContent);
    listElement.prepend(duplicatedItem);
    saveCurrentTasks();
  });

  editButton.addEventListener("click", () => {
    textElement.setAttribute("contenteditable", "true");
    textElement.focus();
  });

  textElement.addEventListener("blur", () => {
    textElement.setAttribute("contenteditable", "false");
    saveCurrentTasks();
  });

  return itemElement;
}

function handleFormSubmit(event) {
  event.preventDefault();

  const item = inputElement.value;
  const itemElement = createItem(item);

  listElement.prepend(itemElement);
  saveCurrentTasks();
  inputElement.value = "";
}

const items = loadTasks();

items.forEach((item) => {
  const itemElement = createItem(item);
  listElement.append(itemElement);
});

formElement.addEventListener("submit", handleFormSubmit);
