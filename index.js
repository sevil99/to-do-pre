const listElement = document.querySelector('.to-do__list');
const formElement = document.querySelector('.to-do__form');
const inputElement = document.querySelector('.to-do__input');

let items = [
  'Сделать зарядку',
  'Приготовить завтрак',
  'Прочитать 20 страниц книги',
  'Выучить 10 новых слов на английском',
  'Сходить в магазин',
  'Написать код для проекта To-do'
];


function loadTasks() {
  const savedTasks = localStorage.getItem('tasks');
  
  if (savedTasks) {
    return JSON.parse(savedTasks);
  }
  
  return items;
}

function saveTasks(tasks) {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function getTasksFromDOM() {
  const itemsNamesElements = listElement.querySelectorAll('.to-do__item-text');
  const tasks = [];
  
  itemsNamesElements.forEach((element) => {
    tasks.push(element.textContent.trim());
  });
  
  return tasks;
}

function createItem(text) {
  const template = document.querySelector('#to-do__item-template');
  const clone = template.content.cloneNode(true);
  
  const textElement = clone.querySelector('.to-do__item-text');
  const editButton = clone.querySelector('.to-do__item-button_type_edit');
  const duplicateButton = clone.querySelector('.to-do__item-button_type_duplicate');
  const deleteButton = clone.querySelector('.to-do__item-button_type_delete');
  
  textElement.textContent = text;


  deleteButton.addEventListener('click', () => {
    clone.remove();
    const currentTasks = getTasksFromDOM();
    saveTasks(currentTasks);
  });


  duplicateButton.addEventListener('click', () => {
    const itemName = textElement.textContent;
    const newItem = createItem(itemName);
    
    listElement.prepend(newItem);
    
    const currentTasks = getTasksFromDOM();
    saveTasks(currentTasks);
  });


  editButton.addEventListener('click', () => {
    textElement.setAttribute('contenteditable', 'true');
    textElement.focus();
  });

  textElement.addEventListener('blur', () => {
    textElement.setAttribute('contenteditable', 'false');
    
    const currentTasks = getTasksFromDOM();
    saveTasks(currentTasks);
  });

  return clone;
}

items = loadTasks();


items.forEach((taskText) => {
  const itemElement = createItem(taskText);
  listElement.append(itemElement);
});


formElement.addEventListener('submit', (evt) => {
  evt.preventDefault(); 
  
  const taskText = inputElement.value.trim();
  
  if (taskText === '') {
    return;
  }
  

  const newItem = createItem(taskText);
  listElement.prepend(newItem);
  

  items = getTasksFromDOM();
  saveTasks(items);
  

  inputElement.value = '';
});
