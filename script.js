// ========== 🌦️ CLIMA ==========
async function buscarClima() {
    const cidade = document.getElementById('cidade').value.trim();
    const resultado = document.getElementById('resultado-clima');
  
    if (!cidade) {
      resultado.innerHTML = 'Por favor, digite uma cidade.';
      return;
    }
  
    try {
      const geocode = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(cidade)}&count=1&language=pt&format=json`);
      const geoData = await geocode.json();
  
      if (!geoData.results || geoData.results.length === 0) {
        throw new Error("Cidade não encontrada");
      }
  
      const { latitude, longitude, name, country } = geoData.results[0];
  
      const clima = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,weathercode,apparent_temperature,relative_humidity_2m&timezone=auto`);
      const dados = await clima.json();
      const c = dados.current;
  
      resultado.innerHTML = `
        <strong>${name} - ${country}</strong><br>
        Temperatura: ${c.temperature_2m}°C<br>
        Sensação térmica: ${c.apparent_temperature}°C<br>
        Umidade: ${c.relative_humidity_2m}%
      `;
    } catch (erro) {
      resultado.innerHTML = `Erro: ${erro.message}`;
    }
  }
  
  // ========== 🐱 GATO ==========
  async function mostrarGato() {
    const resposta = await fetch('https://api.thecatapi.com/v1/images/search');
    const dados = await resposta.json();
    const urlImagem = dados[0].url;
  
    document.getElementById('resultado-gato').innerHTML = `<img src="${urlImagem}" alt="Gatinho fofo" />`;
  }
  
  // ========== 💱 COTAÇÃO ==========
  async function buscarCotacao() {
    const resposta = await fetch('https://economia.awesomeapi.com.br/json/last/USD-BRL');
    const dados = await resposta.json();
    const valor = parseFloat(dados.USDBRL.bid).toFixed(2);
  
    document.getElementById('resultado-cotacao').innerText = `💵 1 USD = R$ ${valor}`;
  }
  
  // ========== 📅 FERIADO ==========
  async function buscarFeriado() {
    const ano = new Date().getFullYear();
    const resposta = await fetch(`https://brasilapi.com.br/api/feriados/v1/${ano}`);
    const feriados = await resposta.json();
  
    const hoje = new Date();
    const proximo = feriados.find(f => new Date(f.date) >= hoje);
  
    document.getElementById('resultado-feriado').innerText =
      proximo ? `📅 ${proximo.date} - ${proximo.name}` : 'Nenhum feriado encontrado';
  }
  
  // ========== 🌙 LUA ==========
  function buscarFaseDaLua() {
    const fases = [
      "Lua Nova", "Crescente", "Quarto Crescente", "Gibosa Crescente",
      "Lua Cheia", "Gibosa Minguante", "Quarto Minguante", "Minguante"
    ];
  
    const hoje = new Date();
    const diasDesde2000 = (hoje - new Date("2000-01-06")) / (1000 * 60 * 60 * 24);
    const ciclo = 29.53058867;
    const fase = (diasDesde2000 % ciclo) / ciclo;
    const indice = Math.floor(fase * 8);
  
    document.getElementById('resultado-lua').innerText = `🌙 Hoje: ${fases[indice]}`;
  }
  
  // ========== 📰 NOTÍCIA ==========
  async function buscarNoticia() {
    const url = 'https://gnews.io/api/v4/top-headlines?lang=pt&country=br&max=1&apikey=2fa3691aa64ccbd82b768d4c2169ccce'; // Sua chave GNews
    const resposta = await fetch(url);
    const dados = await resposta.json();
  
    if (dados.articles && dados.articles.length > 0) {
      const noticia = dados.articles[0];
      document.getElementById('resultado-noticia').innerHTML = `
        📰 <strong>${noticia.title}</strong><br>
        <a href="${noticia.url}" target="_blank" style="color: #90caf9">Leia mais</a>
      `;
    } else {
      document.getElementById('resultado-noticia').innerText = 'Não foi possível carregar notícias.';
    }
  }
  
  // ========== 🧠 CURIOSIDADE ==========
  async function buscarCuriosidade() {
    const resposta = await fetch('https://uselessfacts.jsph.pl/api/v2/facts/random?language=pt');
    const dados = await resposta.json();
  
    document.getElementById('resultado-curiosidade').innerText = `💡 ${dados.text}`;
  }
  
  // ========== 🔁 CARROSSEL AUTOMÁTICO ==========
  let index = 0;
  function iniciarCarrossel() {
    const carrossel = document.querySelector('.carrossel');
    const total = document.querySelectorAll('.item-carrossel').length;
  
    setInterval(() => {
      index = (index + 1) % total;
      carrossel.style.transform = `translateX(-${index * 100}%)`;
    }, 5000);
  }
  
  // ========== ⏳ AO CARREGAR ==========
  window.onload = function () {
    buscarCotacao();
    buscarFeriado();
    buscarFaseDaLua();
    buscarNoticia();
    buscarCuriosidade();
    mostrarGato();
    iniciarCarrossel();
  };
  
  