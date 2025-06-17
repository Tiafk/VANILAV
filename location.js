//кондитерские

function createCard({ city, address, phone, hours, hours2, link, title }) {
  const card = document.createElement('div');
  card.className = 'location-card';

  // Формируем блок title только если он задан
  const titleHTML = title ? `<p class="title">${title}</p>` : '';
  let hoursHTML = '';
  if (hours && hours2) {
    // Два времени — в колонку
    hoursHTML = `
      <p class="text">
        <strong class="bold">Режим работы:</strong><br>${hours}<br>${hours2}
      </p>
    `;
  } else if (hours) {
    // Только одно время — в строку
    hoursHTML = `
      <p class="text">
        <strong class="bold">Режим работы:</strong> ${hours}
      </p>
    `;
  }
  card.innerHTML = `
    <a class="location-card-link" href="${link}">
      ${titleHTML}
      <p class="text"><strong class="bold">Город:</strong> ${city}</p>
      <p class="text"><strong class="bold">Адрес:</strong> ${address}</p>
      <p class="text"><strong class="bold">Телефон:</strong> ${phone}</p>
      ${hoursHTML}
    </a>
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

