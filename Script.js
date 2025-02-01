const expName = document.getElementById('ExpName');
const amountInput = document.getElementById('AmountInput');
const addBtn = document.querySelector('.AddBtn');
const expenseList = document.querySelector('.expense-list');
const displayAmount = document.getElementById('Amount');

// Load expenses from localStorage or initialize an empty array
let expensesList = JSON.parse(localStorage.getItem('expensesList')) || [];
let totalAmount = 0;

document.addEventListener("DOMContentLoaded", renderExpense);

addBtn.addEventListener('click', (event) => {
    event.preventDefault();
    if (amountInput.value && expName.value) {
        let expense = {
            expenseName: expName.value,
            expenseAmount: Number(amountInput.value) // Store as a number
        };
        expensesList.push(expense);
        localStorage.setItem('expensesList', JSON.stringify(expensesList));

        amountInput.value="";
        expName.value="";

        renderExpense(); // Re-render after adding
    }
});

function renderExpense() {
    // Clear list before rendering to avoid duplicates
    expenseList.innerHTML = "";
    totalAmount = 0;

    expensesList = JSON.parse(localStorage.getItem('expensesList')) || [];

    expensesList.forEach((expense, index) => {
        let li = document.createElement('li');
        li.classList.add('expense');

        li.innerHTML = `
            <p>${expense.expenseName.toUpperCase()}: ${expense.expenseAmount}</p>
            <button class='delbtn' onclick="deleteExpense(${index})">Delete</button>
        `;

        expenseList.appendChild(li);
        totalAmount += expense.expenseAmount;
    });

    displayAmount.innerText = totalAmount;
}

function deleteExpense(index) {
    expensesList.splice(index, 1);
    localStorage.setItem('expensesList', JSON.stringify(expensesList));
    renderExpense();
}
