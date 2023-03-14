const API_URL = 'https://expressjs-postgres-production-f05d.up.railway.app';
const sisu = document.querySelector('.sisu');

async function getTreks() {
  const treks = await fetch(`${API_URL}/treks?status=REGISTRATION_OPEN`).then((response) => response.json());
  console.log(treks);
  sisu.innerHTML = '';

  for (const trek of treks) {
    sisu.innerHTML += `
      <div class="trek">
        <div class="image">
          <img src="${trek.image_url}" height="100" alt="Pilt" />
        </div>
        <div class="content">
          <h3>${trek.title}</h3>
          <p>${trek.description}</p>
          <button onclick="signUp(${trek.id})">Registreeri</button>
        </div>
      </div>
    `;
  }

};

getTreks();
