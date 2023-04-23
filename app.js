//console.log(fetch('https://v6.exchangerate-api.com/v6/ddce66988e541c74e0ed0bac/latest/USD'))

const baseCurrency = document.querySelector('[data-base-currency]')
const quoteCurrency = document.querySelector('[data-quote-currency]')
const swap = document.querySelector('[data-swap]')
const updateRate = document.querySelector('[data-update-rate]')
const enterAmount = document.querySelector('[data-enter-amount]')
const displayResult = document.querySelector('[data-display-result]')
const calculate = document.querySelector('[data-calculate-rate]')

function compute(a){
    const base = baseCurrency.value
    const quote = quoteCurrency.value

    fetch(`https://v6.exchangerate-api.com/v6/ddce66988e541c74e0ed0bac/latest/${base}`)
     .then(res =>{
         if (!res.ok){
            throw new Error(`HTTP Error: ${res.status}`)
         }else{
            return res.json()
         } 
     })
     .then(data =>{
        const rate = data.conversion_rates[quote]
        updateRate.textContent = `1 ${base} = ${rate} ${quote}`
        a.textContent = (enterAmount.value * rate).toFixed(2)
     })
     .catch(Error => { console.error(`Could not fetch rate: ${Error}`)})

    
}

baseCurrency.addEventListener('change', () =>{
    displayResult.textContent = "0.00"
    enterAmount.value = ""
    compute()
})
quoteCurrency.addEventListener('change', () =>{
    displayResult.textContent = "0.00"
    enterAmount.value = ""
    compute()
})
swap.addEventListener('click', () =>{
    const first = baseCurrency.value
    baseCurrency.value = quoteCurrency.value
    quoteCurrency.value = first
})
calculate.addEventListener('click', () =>{
    compute(displayResult)
})

