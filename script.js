const balanseEL = document.getElementById("balanse");
const incomeamountEl = document.getElementById("income-amount");
const expensesEl = document.getElementById("expense-amount");
const transactionListEl = document.getElementById("transaction-list");
const transactionFormEl = document.getElementById("transaction-form");
const descriptionEl = document.getElementById("description");
const amountEl = document.getElementById("amount");

let transactions = JSON.parse(localStorage.getItem("transactions")) || [];

transactionFormEl.addEventListener("submit", addTransaction);

function addTransaction(e) {
  e.preventDefault();

  const description = descriptionEl.value.trim();
  const amount = parseFloat(amountEl.value);

  transactions.push({
    id: Date.now(),
    description,
    amount,
  });

  localStorage.setItem("transactions", JSON.stringify(transactions));

  updateTransactionList();
  updateSummary();
  transactionFormEl.reset();
}

function updateTransactionList() {
  transactionListEl.innerHTML = "";
  const sortTransaction = [...transactions].reverse();

  sortTransaction.forEach((transaction) => {
    const transactionEl = getTransaction(transaction);
    transactionListEl.append(transactionEl);
  });
}

function getTransaction(transaction) {
  const li = document.createElement("li");
  li.classList.add("transaction");
  li.classList.add(transaction.amount > 0 ? "income" : "expense");
  li.innerHTML = `
  <span>${transaction.description}</span>
  <span>${transaction.amount}
  <button class="delete-btn" onclick="deleteButton(${transaction.id})">x</button>
  </span>
  
  `;
  return li;
}

updateTransactionList();
