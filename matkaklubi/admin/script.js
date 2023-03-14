const API_URL = 'https://expressjs-postgres-production-f05d.up.railway.app';
const sisu = document.querySelector('.matkad');
const detail = document.querySelector('.detail');

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
      <div>${JSON.stringify(trek)}</div>
  `;
}

getTreks();
