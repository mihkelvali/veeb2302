const url = 'http://localhost:8080';
const app = document.querySelector('#app');

async function kysiMatkad() {
  const response = await fetch(url);
  const data = await response.json();

  let matkadHTML = `<p>Matkade läbiviija: ${data.labiviija}</p>`;

  matkadHTML += `<div class="matkad">`
  for (let i = 0; i < data.matkad.length; i++) {
    matkadHTML += `
      <div class="matk">
        <div>${data.matkad[i].pealkiri}</div>
        <div>Kestvus ${data.matkad[i].kestvus}</div>
        <img class="pilt" src="${data.matkad[i].pildiUrl}" />
      </div>
    `;
  }
  matkadHTML += `</div>`

  app.innerHTML = matkadHTML;
}

kysiMatkad();
