const input = $('.keyboard__input');
const button = $('.keyboard__button');
const message = $('.keyboard__message');
const money = $('.balance__money__number');
const totalMoney = $('.total')

const number = [2, 4, 3, 2, 1, 10]
const cash = [500000, 200000, 100000, 50000, 20000, 10000]

const sum = (number, cash) => {
    let total = 0;
    for (let i = 0; i < number.length; i++) {
        total = total + cash[i] * number[i];
    }
    return total;
}

const formatNumber = (n) => n
    .replace(/\D/g, '')
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",");

const renderTotal = total => totalMoney.text(formatNumber(total.toString()))

let total = sum(number, cash);
renderTotal(total)

input.keyup(() => {
    let value = input.val();
    if (input.val() === '') {

    };
    let formatValue = formatNumber(value)
    input.val(formatValue)
})

button.click(() => {
    let money = Number.parseInt(input.val().replace(/,/g, ''))
    message.hide()
    handleWithDraw(money)
    input.val('')
})

const handleMessage = (msg) => {
    message.show().html(msg)
}

const withDraw = (money) => {
    let message = ''
    let sum = total
    sum -= money
    for (let i = 0; i < cash.length; i++) {

        let min = Math.floor(Math.min(money / cash[i], number[i]))
            money = money - min * cash[i]
            number[i] -= min
            if (min !== 0) message += `<p>Rút thành công ${min} tờ ${formatNumber(cash[i].toString())}VND</p>`
            if (money === 0) break;
    }
    if (money !== 0) {
        handleMessage("Vui lòng nhập số tiền khác!")
    } else {
        total = sum;
        renderTotal(total)
        console.log('------------')
        for (let i = 0; i < number.length; i++) {
            console.log(`${cash[i]}VND: ${number[i]}`)
        }
        handleMessage(message)
    }
}

const handleWithDraw = (money) => {
    if (money >= 10000 && money <= total) {
        withDraw(money)       
    } else if (money < 10000) {
        handleMessage('Số tiền giao dịch phải lớn hơn 10,000VND!')
    } else {
        if (!money) {
            handleMessage('Vui lòng nhập số tiền cần rút!')
        } else {
            console.log(money)
            handleMessage('ATM không đủ tiền mặt!')
        }
    }
}