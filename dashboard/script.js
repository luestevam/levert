// Dados das receitas e despesas (valores convertidos do PDF)
const dadosFinanceiros = {
  receitas: {
    "Taxa Ordinária": 130774.27,
    "Taxa Extraordinária": 22897.52,
    "Receitas de Espaços (salão, gourmet, kids)": 5525.00,
    "Multas/Juros": 316.95,
    "Receitas Financeiras": 520.93,
    "Outros Créditos": 4743.68
  },
  despesas: {
    "Funcionários": 35446.12,
    "Encargos Sociais": 13378.19,
    "Administração e Gerais": 8414.06,
    "Consumo (energia, gás etc.)": 13562.96,
    "Sociais (festas etc.)": 6000.18,
    "Manutenção e Conservação": 41617.23,
    "Despesas Extraordinárias": 4148.15,
    "Financeiras (banco, IRRF)": 12642.47,
    "Outras Despesas": 400.00
  }
};

// Gráfico de Pizza - Despesas por categoria
const ctxDespesas = document.getElementById('graficoDespesas').getContext('2d');
new Chart(ctxDespesas, {
  type: 'pie',
  data: {
    labels: Object.keys(dadosFinanceiros.despesas),
    datasets: [{
      label: 'Despesas',
      data: Object.values(dadosFinanceiros.despesas),
      backgroundColor: [
        '#007bff', '#28a745', '#ffc107', '#dc3545',
        '#6f42c1', '#17a2b8', '#fd7e14', '#343a40', '#adb5bd'
      ]
    }]
  },
  options: {
    responsive: true,
    plugins: {
      legend: { position: 'bottom' }
    }
  }
});

// Gráfico de Barras - Receitas por tipo
const ctxReceitas = document.getElementById('graficoReceitas').getContext('2d');
new Chart(ctxReceitas, {
  type: 'bar',
  data: {
    labels: Object.keys(dadosFinanceiros.receitas),
    datasets: [{
      label: 'Receitas (R$)',
      data: Object.values(dadosFinanceiros.receitas),
      backgroundColor: '#198754'
    }]
  },
  options: {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
        ticks: { callback: value => `R$ ${value.toLocaleString('pt-BR')}` }
      }
    }
  }
});

// Preenchimento automático da Tabela Resumo
const tbody = document.getElementById('tabelaResumo');

Object.entries(dadosFinanceiros.despesas).forEach(([categoria, valor]) => {
  const linha = document.createElement('tr');
  linha.innerHTML = `
    <td>${categoria}</td>
    <td>R$ ${valor.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
  `;
  tbody.appendChild(linha);
});
