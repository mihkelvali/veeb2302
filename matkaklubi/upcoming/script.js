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

async function signUp(trekId) {
  const trek = await fetch(`${API_URL}/treks/${trekId}`).then(response => response.json());
  sisu.innerHTML = `
    <div class="registration">
      <h3>Registreerumine matkale "${trek.title}"</h3>
      <div class="lahter">
        <label for="nimi">Osaleja nimi</label>
        <input id="nimi" />
      </div>
      <div class="lahter">
        <label for="vanus">Osaleja vanus</label>
        <input id="vanus" />
      </div>
      <div class="lahter">
        <label for="markus">Märkused/küsimused</label>
        <textarea id="markus"></textarea>
      </div>
      <div class="vastutus">
        <input id="noustub" type="checkbox" />
        <label for="noustub">Nõustun liituma matkaga omal vastutusel</label>
      </div>

      <div class="veateade">Matka liitusemisega omal vastutusel peab nõustuma!</div>
      <div class="onnestus">Olete matkale registreeritud!</div>

      <div class="buttons-container">
        <button onclick="saveRegistration(${trekId})">Registreeri</button>
        <button class="inverted" onclick="getTreks()">Tagasi</button>
      </div>
    </div>
  `;
}

async function saveRegistration(trekId) {
  const nimi = document.querySelector('#nimi').value;
  const vanus = document.querySelector('#vanus').value;
  const markus = document.querySelector('#markus').value;
  const noustub = document.querySelector('#noustub').checked;
  const veateade = document.querySelector('.veateade');
  const onnestus = document.querySelector('.onnestus');
  
  if (!noustub) {
    onnestus.style.display = 'none';
    veateade.style.display = 'block';
    return;
  }

  await fetch(`${API_URL}/treks/${trekId}/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: nimi,
      age: vanus,
      note: markus
    })
  }).then(res => res.json());

  veateade.style.display = 'none';
  onnestus.style.display = 'block';
}

getTreks();
