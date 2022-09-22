import { writable, readable } from 'svelte/store';

export const entries = writable([], (set) => {
  async function get() {
    const res = await fetch('/entries.json');
    const data = await res.json();
    set(data);
  }

  get();
});

// export const entries = writable([
//   {
//     name: 'Rebecca Gabby Pareja',
//     ticket: 1,
//     branch: 'dvo',
//   },
//   {
//     name: 'Ray Matthew De La Cruz',
//     ticket: 1,
//     branch: 'ilo',
//   },
//   {
//     name: 'James Daniel Esmatao',
//     ticket: 0,
//     branch: 'ilo',
//   },
//   {
//     name: 'Victor Colocar',
//     ticket: 1,
//     branch: 'ilo',
//   },
//   {
//     name: 'Reginald Orlasan',
//     ticket: 1,
//     branch: 'iao',
//   },
//   {
//     name: 'Matthew Aaron Gotico',
//     ticket: 1,
//     branch: 'iao',
//   },
//   {
//     name: 'Mareshah Calibayan',
//     ticket: 1,
//     branch: 'dvo',
//   },
//   {
//     name: 'Jobelle Ann N. Sauyan',
//     ticket: 1,
//     branch: 'dvo',
//   },
//   {
//     name: 'Dorothy Bereber',
//     ticket: 1,
//     branch: 'ilo',
//   },
//   {
//     name: 'Kristhy Dela Cruz',
//     ticket: 1,
//     branch: 'ilo',
//   },
//   {
//     name: 'Irah Caryl M. Sitoy',
//     ticket: 1,
//     branch: 'dvo',
//   },
//   {
//     name: 'Rizamae G. Alvar',
//     ticket: 1,
//     branch: 'dvo',
//   },
//   {
//     name: 'Ma. Fomy M. Malfetria',
//     ticket: 1,
//     branch: 'ilo',
//   },
//   {
//     name: 'Jessie Rey Delmo',
//     ticket: 1,
//     branch: 'ilo',
//   },
//   {
//     name: 'Jessie Sazon',
//     ticket: 1,
//     branch: 'ilo',
//   },
//   {
//     name: 'Lloyd Jamaico Congreso',
//     ticket: 1,
//     branch: 'iao',
//   },
//   {
//     name: 'Apple Grace Bantiquete',
//     ticket: 1,
//     branch: 'ilo',
//   },
//   {
//     name: 'Julie Ann Morales',
//     ticket: 1,
//     branch: 'col',
//   },
//   {
//     name: 'Elgene Belle Villaluz',
//     ticket: 1,
//     branch: 'dvo',
//   },
//   {
//     name: 'Mikka Babao',
//     ticket: 1,
//     branch: 'ilo',
//   },
//   {
//     name: 'Arly Lopez',
//     ticket: 1,
//     branch: 'ilo',
//   },
//   {
//     name: 'Alicia Dato-on',
//     ticket: 1,
//     branch: 'ilo',
//   },
//   {
//     name: 'Angelo M. Deliso',
//     ticket: 1,
//     branch: 'iao',
//   },
//   {
//     name: 'John Gerald P. Gonzaga',
//     ticket: 1,
//     branch: 'ilo',
//   },
//   {
//     name: 'Lorenz Baldoza',
//     ticket: 1,
//     branch: 'ilo',
//   },
//   {
//     name: 'Trishia Annicole Julita',
//     ticket: 1,
//     branch: 'ilo',
//   },
//   {
//     name: 'Sheehan Joy Diapues',
//     ticket: 1,
//     branch: 'dvo',
//   },
//   {
//     name: 'Rio Baingka Irinaya',
//     ticket: 1,
//     branch: 'ilo',
//   },
//   {
//     name: 'Zarlet Jenn Galvez',
//     ticket: 1,
//     branch: 'ilo',
//   },
//   {
//     name: 'Rio V. Tayoba',
//     ticket: 1,
//     branch: 'ilo',
//   },
//   {
//     name: 'Cyren Laurente',
//     ticket: 1,
//     branch: 'ilo',
//   },
//   {
//     name: 'Reniel Dela Cruz',
//     ticket: 1,
//     branch: 'ilo',
//   },
//   {
//     name: 'Mike Franco Pacit',
//     ticket: 1,
//     branch: 'ilo',
//   },
//   {
//     name: 'Jester Lawrence Casabuena',
//     ticket: 1,
//     branch: 'ilo',
//   },
//   {
//     name: 'Reynand A. Elemino',
//     ticket: 1,
//     branch: 'dvo',
//   },
//   {
//     name: 'John Martin Juanito',
//     ticket: 1,
//     branch: 'ilo',
//   },
//   {
//     name: 'Vanissa Lasutan',
//     ticket: 1,
//     branch: 'ilo',
//   },
//   {
//     name: 'Kristia Marie Maldeguia',
//     ticket: 1,
//     branch: 'ilo',
//   },
//   {
//     name: 'Bailey Oring',
//     ticket: 1,
//     branch: 'ilo',
//   },
//   {
//     name: 'Care Dianne Buenaflor',
//     ticket: 1,
//     branch: 'ilo',
//   },
//   {
//     name: 'Ma. Christina Duran',
//     ticket: 1,
//     branch: 'ilo',
//   },
//   {
//     name: 'Charles Casalan',
//     ticket: 1,
//     branch: 'ilo',
//   },
//   {
//     name: 'Aira Mae G. Valleras',
//     ticket: 1,
//     branch: 'ilo',
//   },
//   {
//     name: 'Tenniel L. Tuason',
//     ticket: 1,
//     branch: 'ilo',
//   },
//   {
//     name: 'Joshua Paguntalan',
//     ticket: 1,
//     branch: 'ilo',
//   },
//   {
//     name: 'Camille Reyes',
//     ticket: 1,
//     branch: 'dvo',
//   },
// ]);

function createEntries() {
  let localEntries = window.localStorage.getItem('entries');

  if (localEntries == null) {
    localEntries = [];
  } else {
    localEntries = JSON.parse(localEntries);
  }

  const { subscribe, set, update } = writable(localEntries);

  return {
    subscribe,
    set: (val) => {
      set(val);

      window.localStorage.setItem('entries', JSON.stringify(val));
    },
    update: (cb) => {
      update((val) => {
        val = cb.call(val);
        window.localStorage.setItem('entries', JSON.stringify(val));
        return val;
      });
    },
  };
}

// export const entries = createEntries();
