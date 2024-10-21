// Función para cargar los resultados
function loadResults() {
    fetch('get_results.php')
        .then(response => response.json())
        .then(data => {
            const labels = [];
            const votes = [];
            const colors = [ '#FF0000','#109DFA', '#0000CF']; // Colores para las opciones

            for (let option in data) {
                labels.push(option);
                votes.push(data[option]);
            }

            // Crear o actualizar el gráfico
            updateChart(labels, votes, colors);
        });
}

// Crear gráfico circular con Chart.js
let resultsChart;
function updateChart(labels, votes, colors) {
    const ctx = document.getElementById('resultsChart').getContext('2d');

    if (resultsChart) {
        resultsChart.destroy(); // Destruir el gráfico anterior si ya existe
    }

    resultsChart = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: labels,
            datasets: [{
                data: votes,
                backgroundColor: colors,
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                }
            }
        }
    });
}

// Cargar los resultados al iniciar
loadResults();

// Manejar el evento de votar
document.getElementById('voteButton').addEventListener('click', () => {
    const selectedOption = document.querySelector('input[name="option"]:checked');
    if (selectedOption) {
        const formData = new FormData();
        formData.append('option', selectedOption.value);

        fetch('vote.php', {
            method: 'POST',
            body: formData
        })
        .then(response => response.text())
        .then(data => {
            alert(data);
            loadResults(); // Actualizar resultados
        });
    } else {
        alert('Por favor, selecciona una opción antes de votar.');
    }
});

// Actualizar resultados cada 5 segundos
setInterval(loadResults, 5000);
