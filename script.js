let entry = JSON.parse(localStorage.getItem('entry')) || [];
let index = 0;

const deleteEntry = (dataEntry) => {
  for (let i = 0; i < entry.length; i++) {
    if (entry[i] === dataEntry) {
      entry.splice(i, 1);
      return localStorage.setItem('entry', JSON.stringify(entry));
    } 
  }
}

const closePopUp = () => {
  const editNotif = document.getElementById('edit-notif');
  editNotif.innerHTML = ' ';
  document.getElementById('edit-popup').style.zIndex = "1";
  document.getElementById('edit-popup').style.opacity = "0";
  document.getElementById('container').style.zIndex = "2";
  document.getElementById('container').style.filter = "blur(0px)";
  document.getElementById('container').style.pointerEvents = "auto";
  document.getElementById('container').style.userSelect = "auto";
}

const createData = (dataEntry, index) => {
  const tableElement = document.getElementById('table-body');
  const trElement = document.createElement('tr');
  const dateElement = document.createElement('td');
  const amountElement = document.createElement('td');
  const descriptionElement = document.createElement('td');
  const buttonsElement = document.createElement('td');
  const editButton = document.createElement('button');
  const deleteButton = document.createElement('button');
  amountElement.setAttribute('class', 'amount-cell');
  descriptionElement.setAttribute('class', 'description-cell');
  buttonsElement.setAttribute('class', 'btn-container');
  editButton.setAttribute('class', 'edit-btn');
  deleteButton.setAttribute('class', 'delete-btn');

  dateElement.innerHTML = dataEntry.date;
  amountElement.innerHTML = dataEntry.amount;
  descriptionElement.innerHTML = dataEntry.description;
  editButton.innerHTML = 'EDIT';

  editButton.addEventListener('click', 
    function openPopUp() {
      document.getElementById('edit-popup').style.zIndex = "2";
      document.getElementById('edit-popup').style.opacity = "1";
      document.getElementById('container').style.zIndex = "1";
      document.getElementById('container').style.filter = "blur(2px)";
      document.getElementById('container').style.pointerEvents = "none";
      document.getElementById('container').style.userSelect = "none";

      document.getElementById('edit-date').value = dataEntry.date;
      document.getElementById('edit-amount').value = dataEntry.amount;
      document.getElementById('edit-description').value = dataEntry.description;

      document.getElementById('confirm-btn').addEventListener('click', () => editEntry(index));
    });

  deleteButton.innerHTML = 'DELETE';
  deleteButton.addEventListener('click', 
    function removeEntry() {
      deleteEntry(dataEntry);
      trElement.remove();
    });

    trElement.appendChild(dateElement);
    trElement.appendChild(amountElement);
    trElement.appendChild(descriptionElement);
    trElement.appendChild(buttonsElement);
    tableElement.appendChild(trElement);
    buttonsElement.appendChild(editButton);
    buttonsElement.appendChild(deleteButton);
} 

const renderTable = () => {
  for (let i = 0; i < entry.length; i++) {
    createData(entry[i], i);
  }
}

renderTable();

const editEntry = (index) => {
  let newDataEntry = {};
  newDataEntry.date = document.getElementById('edit-date').value;
  newDataEntry.amount = document.getElementById('edit-amount').value;
  newDataEntry.description = document.getElementById('edit-description').value;
  const editNotif = document.getElementById('edit-notif');
  editNotif.innerHTML = (!newDataEntry.date || !newDataEntry.amount || !newDataEntry.description) ? 'ERROR' : ' ';
  
  if (newDataEntry.date && newDataEntry.amount && newDataEntry.description) {
    entry.splice(index, 1, newDataEntry);
    localStorage.setItem('entry', JSON.stringify(entry));
    document.getElementById('table-body').innerHTML = '';
    renderTable();
    closePopUp();
  }
}

const addToTable = () => {
  let dataEntry = {};
  dataEntry.date = document.getElementById('date').value;
  dataEntry.amount = document.getElementById('amount').value;
  dataEntry.description = document.getElementById('description').value;
  const error = document.getElementById('error');
  error.innerHTML = (!dataEntry.date || !dataEntry.amount || !dataEntry.description) ? 'ERROR' : ' ';
  
  if (dataEntry.date && dataEntry.amount && dataEntry.description) {
    entry.push(dataEntry);
    createData(dataEntry);
  }

  localStorage.setItem('entry', JSON.stringify(entry));
}