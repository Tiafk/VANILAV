//кондитерские

function createCard({ city, address, phone, hours }) {
  const card = document.createElement('div');
  card.className = 'location-card'; // Новый класс

  card.innerHTML = `
    <p class="text"><strong class="bold">Город:</strong> ${city}</p>
    <p class="text"><strong class="bold">Адрес:</strong> ${address}</p>
    <p class="text"><strong class="bold">Телефон:</strong> ${phone}</p>
    <p class="text"><strong class="bold">Режим работы:</strong> ${hours}</p>
  `;

  return card;
}

function renderCards(dataArray) {
  const container = document.getElementById('card-container');
  container.innerHTML = '';
  dataArray.forEach(data => {
    const card = createCard(data);
    container.appendChild(card);
  });
}

fetch('./location.json')
  .then(response => response.json())
  .then(data => {
    renderCards(data);
  })
  .catch(error => {
    console.error('Ошибка при загрузке JSON:', error);
  });