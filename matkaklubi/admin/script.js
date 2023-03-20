const API_URL = 'https://expressjs-postgres-production-f05d.up.railway.app';
const sisu = document.querySelector('.matkad');
const detail = document.querySelector('.detail');
const uusMatk = document.querySelector('.uus-matk');

async function getTreks() {
  const treks = await fetch(`${API_URL}/treks?columns=id,title`).then((response) => response.json());
  console.log(treks);
  sisu.innerHTML = '';

  for (const trek of treks) {
    sisu.innerHTML += `
      <a href="javascript:;" onclick="getTrekDetails(${trek.id})">${trek.title}</a>
    `;
  }
};

async function getTrekDetails(id) {
  const trek = await fetch(`${API_URL}/treks/${id}`).then((response) => response.json());
  console.log(trek);
  detail.innerHTML = `
    <div>Matka id: <span id="matkaId">${trek.id}</span></div>
    <div class="lahter">
      <label for="pealkiri">Pealkiri</label>
      <input id="pealkiri" value="${trek.title}" />
    </div>
    <div class="lahter">
      <label for="kirjeldus">Kirjeldus</label>
      <input id="kirjeldus" value="${trek.description}" />
    </div>
    <div class="lahter">
      <label for="pildiUrl">Pildi URL</label>
      <input id="pildiUrl" value="${trek.image_url}" />
    </div>
    <div class="lahter">
      <label for="kestvus">Kestvus</label>
      <input id="kestvus" value="${trek.duration}" />
    </div>
    <div class="lahter">
      <label for="staatus">Staatus</label>
      <select id="staatus">
        <option value="COMPLETED">COMPLETED</option>
        <option value="REGISTRATION_OPEN">REGISTRATION_OPEN</option>
        <option value="IN_PROGRESS">IN_PROGRESS</option>
        <option value="DRAFT">DRAFT</option>
      </select>
    </div>
    <button onclick="saveTrekDetails()">Salvesta</button>
    <button onclick="deleteTrek()">Kustuta</button>
  `;

  const staatus =  document.querySelector('#staatus');
  staatus.value = trek.status;
}

function startCreatingNewTrek() {
  detail.innerHTML = `
    <div class="lahter">
      <label for="pealkiri">Pealkiri</label>
      <input id="pealkiri" />
    </div>
    <div class="lahter">
      <label for="kirjeldus">Kirjeldus</label>
      <input id="kirjeldus" />
    </div>
    <div class="lahter">
      <label for="pildiUrl">Pildi URL</label>
      <input id="pildiUrl" />
    </div>
    <div class="lahter">
      <label for="kestvus">Kestvus</label>
      <input id="kestvus" />
    </div>
    <div class="lahter">
      <label for="staatus">Staatus</label>
      <select id="staatus">
        <option value="DRAFT">DRAFT</option>
        <option value="REGISTRATION_OPEN">REGISTRATION_OPEN</option>
        <option value="IN_PROGRESS">IN_PROGRESS</option>
        <option value="COMPLETED">COMPLETED</option>
      </select>
    </div>
    <button onclick="addNewTrek()">Loo uus matk</button>
  `;
}

async function addNewTrek() {
  const pealkiri = document.querySelector('#pealkiri').value;
  const kirjeldus = document.querySelector('#kirjeldus').value;
  const pildiUrl = document.querySelector('#pildiUrl').value;
  const kestvus = document.querySelector('#kestvus').value;
  const staatus =  document.querySelector('#staatus').value;

  const response = await fetch(`${API_URL}/treks`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      title: pealkiri,
      description: kirjeldus,
      image_url: pildiUrl,
      duration: kestvus,
      status: staatus
    })
  }).then((response) => response.json());

  console.log(response);
  getTreks();
}

async function saveTrekDetails() {
  const matkaId = document.querySelector('#matkaId').innerHTML;
  const pealkiri = document.querySelector('#pealkiri').value;
  const kirjeldus = document.querySelector('#kirjeldus').value;
  const pildiUrl = document.querySelector('#pildiUrl').value;
  const kestvus = document.querySelector('#kestvus').value;
  const staatus =  document.querySelector('#staatus').value;

  const response = await fetch(`${API_URL}/treks/${matkaId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      title: pealkiri,
      description: kirjeldus,
      image_url: pildiUrl,
      duration: kestvus,
      status: staatus
    })
  }).then((response) => response.json());

  console.log(response);
  getTreks();
}

async function deleteTrek() {
  if (!confirm('Oled kindel, et soovid matka kustutada?')) {
    return;
  }

  const matkaId = document.querySelector('#matkaId').innerHTML;
  const response = await fetch(`${API_URL}/treks/${matkaId}`, {
    method: 'DELETE'
  }).then((response) => response.json());

  console.log(response);
  detail.innerHTML = '';
  getTreks();
}

getTreks();
