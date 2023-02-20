console.log('tere tere')

let perenimi = 'väli';

function funktsioon() {
  let nimi = 'mihkel';

  console.log(perenimi);
  return nimi;
}

let inimene1 = {
  eesnimi: 'mihkel',
  perenimi: 'väli',
  kool: 'ttü'
}

let inimene2 = {
  eesnimi: 'doris',
  perenimi: 'teerull',
  kool: undefined
}

let inimesed = [inimene1, inimene2];
for (let i = 0; i < inimesed.length; i++) {
  console.log(inimesed[i].eesnimi);
}

console.log(inimesed);
