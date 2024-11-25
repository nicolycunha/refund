const form = document.querySelector('form')
const amount = document.getElementById('amount')
const expense = document.getElementById('expense')
const category = document.getElementById('category')

const expenseList = document.querySelector('ul')

amount.oninput = () => {
    let value = amount.value.replace(/\D/g, '')

    //transform value into cents
    value = Number(value) / 100
    amount.value = formatCurrencyBRL(value)
}

function formatCurrencyBRL(value) {
    value = value.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    })

    return value
}

form.onsubmit = event => {
    event.preventDefault()

    const newExpense = {
        id: new Date().getTime(),
        expense: expense.value,
        category_id: category.value,
        category_name: category.options[category.selectedIndex].text,
        amount: amount.value,
        created_at: new Date()
    }

    expanseAdd(newExpense)
}

function expanseAdd(newExpense) {
    try {
        const expenseItem = document.createElement('li')
        expenseItem.classList.add('expense')

        const expenseIcon = createIcon(newExpense)
        const expenseInfo = createInfo()
        const expenseName = createName(newExpense)
        const expenseCategory = createCategory(newExpense)
        const expenseAmount = createAmount(newExpense)
        const removeIcon = createRemoveIcon()

        expenseInfo.append(expenseName, expenseCategory)
        expenseItem.append(expenseIcon, expenseInfo, expenseAmount, removeIcon)
        expenseList.append(expenseItem)
    } catch (error) {
        alert('Não foi possível atualizar a lista de despesas.')
        console.log(error)
    }
}

function createIcon(newExpense) {
    const icon = document.createElement('img')
    icon.setAttribute('src', `img/${newExpense.category_id}.svg`)
    icon.setAttribute('alt', newExpense.category_name)

    return icon
}

function createInfo() {
    const info = document.createElement('div')
    info.classList.add('expense-info')

    return info
}

function createName(newExpense) {
    const name = document.createElement('strong')
    name.textContent = newExpense.expense

    return name
}

function createCategory(newExpense) {
    const category = document.createElement('span')
    category.textContent = newExpense.category_name

    return category
}

function createAmount(newExpense) {
    const amount = document.createElement('span')
    amount.classList.add('expense-amount')
    amount.innerHTML = `<small>R$</small>${newExpense.amount
        .toUpperCase()
        .replace('R$', '')}`

    return amount
}

function createRemoveIcon() {
    const icon = document.createElement('img')
    icon.classList.add('remove-icon')
    icon.setAttribute('src', './img/remove.svg')
    icon.setAttribute('alt', 'remover')

    return icon
}
