const form = document.querySelector('form')
const amount = document.getElementById('amount')
const expense = document.getElementById('expense')
const category = document.getElementById('category')

const expenseList = document.querySelector('ul')
const expensesTotal = document.querySelector('aside header h2')
const expenseQuantity = document.querySelector('aside header p span')

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
    updateTotals()
    formClear()
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
    try {
        const icon = document.createElement('img')
        icon.setAttribute('src', `img/${newExpense.category_id}.svg`)
        icon.setAttribute('alt', newExpense.category_name)

        return icon
    } catch (error) {
        throw error
    }
}

function createInfo() {
    try {
        const info = document.createElement('div')
        info.classList.add('expense-info')

        return info
    } catch (error) {
        throw error
    }
}

function createName(newExpense) {
    try {
        const name = document.createElement('strong')
        name.textContent = newExpense.expense

        return name
    } catch (error) {
        throw error
    }
}

function createCategory(newExpense) {
    try {
        const category = document.createElement('span')
        category.textContent = newExpense.category_name

        return category
    } catch (error) {
        throw error
    }
}

function createAmount(newExpense) {
    try {
        const amount = document.createElement('span')
        amount.classList.add('expense-amount')
        amount.innerHTML = `<small>R$</small>${newExpense.amount
            .toUpperCase()
            .replace('R$', '')}`

        return amount
    } catch (error) {
        throw error
    }
}

function createRemoveIcon() {
    try {
        const icon = document.createElement('img')
        icon.classList.add('remove-icon')
        icon.setAttribute('src', './img/remove.svg')
        icon.setAttribute('alt', 'remover')

        return icon
    } catch (error) {
        throw error
    }
}

function updateTotals() {
    try {
        const items = expenseList.children

        expenseQuantity.textContent = `${items.length} ${
            items.length > 1 ? 'despesas' : 'despesa'
        }`

        const expenseAmount = calculateExpenseAmount(items)

        const symbolBRL = document.createElement('small')
        symbolBRL.textContent = 'R$'

        expensesTotal.innerHTML = ''
        expensesTotal.append(symbolBRL, expenseAmount)
    } catch (error) {
        console.log(error)
        alert('Não foi possível alterar os totais.')
    }
}

function calculateExpenseAmount(items) {
    try {
        let total = 0

        for (let item = 0; item < items.length; item++) {
            const itemAmount = items[item].querySelector('.expense-amount')

            let value = itemAmount.textContent
                .replace(/[^\d,]/g, '')
                .replace(',', '.')

            value = parseFloat(value)

            if (isNaN(value)) {
                return alert(
                    'Não foi possível calcular o total. O valor não parece ser um número'
                )
            }

            total += Number(value)
        }

        return formatCurrencyBRL(total).toUpperCase().replace('R$', '')
    } catch (error) {
        throw error
    }
}

expenseList.addEventListener('click', function (event) {
    if (event.target.classList.contains('remove-icon')) {
        const item = event.target.closest('.expense')
        item.remove()
    }

    updateTotals()
})

function formClear() {
    expense.value = ''
    category.value = ''
    amount.value = ''

    expense.focus()
}
