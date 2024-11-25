document.addEventListener('DOMContentLoaded', () => {
    const fromCurrency = document.getElementById('from-currency');
    const toCurrency = document.getElementById('to-currency');

    // Tasas de conversión simuladas (de ejemplo)
    const conversionRates = {
        "USD_EUR": 0.92,
        "USD_GBP": 0.82,
        "USD_CNY": 7.1,
        "USD_JPY": 140.5,
        "EUR_USD": 1.09,
        "EUR_GBP": 0.89,
        "EUR_CNY": 7.72,
        "EUR_JPY": 152.5,
        // Agrega más combinaciones si es necesario
    };

    // Sincroniza las opciones de las monedas
    fromCurrency.addEventListener('change', () => {
        sincronizarOpciones(fromCurrency, toCurrency);
    });

    toCurrency.addEventListener('change', () => {
        sincronizarOpciones(toCurrency, fromCurrency);
    });

    function sincronizarOpciones(select1, select2) {
        const selectedValue = select1.value;

        Array.from(select2.options).forEach(option => {
            option.disabled = option.value === selectedValue;
        });
    }

    sincronizarOpciones(fromCurrency, toCurrency);

    // Lógica de conversión al enviar el formulario
    document.getElementById('currency-form').addEventListener('submit', function (event) {
        event.preventDefault();

        const amount = document.getElementById('amount').value;

        if (!amount || amount <= 0) {
            alert('Por favor, ingrese una cantidad válida.');
            return;
        }

        const from = fromCurrency.value;
        const to = toCurrency.value;

        // Generar la clave para la tasa de conversión
        const rateKey = `${from}_${to}`;

        // Obtener la tasa de conversión ficticia
        const rate = conversionRates[rateKey];

        if (!rate) {
            document.getElementById('conversion-result').innerHTML = `
                <div class="alert alert-danger">Conversión no disponible para esta combinación de monedas.</div>
            `;
            return;
        }

        // Realizar la conversión
        const convertedAmount = (amount * rate).toFixed(2);

        document.getElementById('conversion-result').innerHTML = `
            <div class="alert alert-success">
                ${amount} ${from} = ${convertedAmount} ${to}
            </div>
        `;
    });
});
