const url = 'http://localhost:8080';
const app = document.querySelector('#app');

async function kysiMatkad() {
  const response = await fetch(url);
  const data = await response.json();

  let matkadHTML = `<p>Matkade läbiviija: ${data.labiviija}</p>`;

  for (let i = 0; i < data.matkad.length; i++) {
    matkadHTML += `<div class="matk">
      <span>${data.matkad[i].pealkiri}</span>
      <span>Kestvus ${data.matkad[i].kestvus}</span>
    </div>`;
  }

  app.innerHTML = matkadHTML;
}

kysiMatkad();
