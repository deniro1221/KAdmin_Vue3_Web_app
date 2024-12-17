<template>
  <q-layout view="lHh Lpr lFf">
    <!-- HEADER -->
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />
        <q-toolbar-title>KozmetikaAdmin</q-toolbar-title>
        <div>version {{ version }}</div>
      </q-toolbar>
    </q-header>

    <!-- DRAWER -->
    <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
      <q-list>
        <q-item-label header>Glavni Izbornik</q-item-label>
        <q-item
          v-for="route in routersList"
          :key="route.title"
          clickable
          @click="handleRouteClick(route)"
        >
          <q-item-section avatar>
            <q-icon :name="route.icon" />
          </q-item-section>
          <q-item-section>
            <q-item-label>{{ route.title }}</q-item-label>
            <q-item-label caption>{{ route.caption }}</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <!-- MAIN CONTENT -->
    <q-page-container>
      <div v-if="showButtons" class="q-pa-md">
        <q-btn
          v-for="button in getButtonsForOption(selectedOption)"
          :key="button.label"
          :label="button.label"
          :color="button.color"
          class="q-mb-sm"
          @click="button.handler"
        />
        <q-btn
          label="Povratak"
          color="warning"
          class="q-mt-md"
          @click="resetSelection"
        />
      </div>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref, computed } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const version = "1.0";
const selectedOption = ref(null); // Držimo trenutno izabranu opciju
const leftDrawerOpen = ref(false);

// Definiranje linkova za meni
const routersList = [
  {
    title: "Unos",
    caption: "Unos novih podataka",
    icon: "input",
    action: () => {
      selectedOption.value = "unos";
    },
  },
  {
    title: "Ažuriraj",
    caption: "Ažurirajte podatke",
    icon: "update",
    action: () => {
      selectedOption.value = "ažuriraj";
    },
  },
  {
    title: "Pregled",
    caption: "Pregled podataka",
    icon: "description",
    action: () => {
      selectedOption.value = "pregled";
    },
  },
  {
    title: "Storno ulaza",
    caption: "Brisanje podatka",
    icon: "cancel",
    action: () => {
      selectedOption.value = "storno";
    },
  },
  {
    title: "Dnevna evidencija",
    caption: "Pratite nas na Facebooku",
    icon: "public",
    link: "https://facebook.quasar.dev",
  },
  {
    title: "Odjava",
    caption: "Community Quasar projects",
    icon: "logout",
    link: "https://awesome.quasar.dev",
  },
];

// Funkcija za otvaranje/zatvaranje menija
function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value;
}

// Funkcija za upravljanje klikom na stavke u meniju
function handleRouteClick(route) {
  if (route.action) {
    route.action(); // Ažuriramo selectedOption za prikaz gumba
  } else if (route.link) {
    window.open(route.link, "_blank"); // Otvorimo vanjski link u novom prozoru
  } else {
    router.push({ name: route.title.toLowerCase() }); // Navigacija na internu stranicu
  }
}

// Prikazuje dugmadi samo za određene opcije
const showButtons = computed(() =>
  ["unos", "ažuriraj", "pregled", "storno"].includes(selectedOption.value)
);

function getButtonsForOption(option) {
  const optionsMap = {
    unos: [
      {
        label: "Dodaj korisnika",
        color: "primary",
        handler: () => {
          console.log("Dodaj korisnika");
          router.push("/add/customer"); // Navigacija na rutu
        },
      },
      {
        label: "Unos narudžbe",
        color: "primary",
        handler: () => {
          console.log("Unos narudžbe"); // Provjera da li se ovaj dio ispravno poziva
          router.push("/add/order"); // Navigacija na rutu
        },
      },

      ,
      {
        label: "Unos proizvoda",
        color: "primary",
        handler: () => console.log("Unos proizvoda"),
      },
      {
        label: "Unos prodavača",
        color: "primary",
        handler: () => console.log("Unos prodavača"),
      },
    ],
    ažuriraj: [
      {
        label: "Ažuriraj korisnika",
        color: "primary",
        handler: () => console.log("Ažuriranje korisnika"),
      },
      {
        label: "Ažuriraj narudžbu",
        color: "primary",
        handler: () => console.log("Ažuriranje narudžbe"),
      },
      {
        label: "Ažuriraj proizvod",
        color: "primary",
        handler: () => console.log("Ažuriranje proizvoda"),
      },
      {
        label: "Ažuriraj prodavača",
        color: "primary",
        handler: () => console.log("Ažuriranje prodavača"),
      },
    ],
    pregled: [
      {
        label: "Prikaži kupca",
        color: "secondary",
        handler: () => console.log("Prikaz liste korisnika"),
      },
      {
        label: "Prikaži narudžbu",
        color: "secondary",
        handler: () => console.log("Prikaz liste narudžbi"),
      },
      {
        label: "Prikaži proizvod",
        color: "secondary",
        handler: () => console.log("Prikaz liste proizvoda"),
      },
      {
        label: "Prikaži prodavača",
        color: "secondary",
        handler: () => console.log("Prikaz liste prodavača"),
      },
    ],
    storno: [
      {
        label: "Izbriši kupca",
        color: "negative",
        handler: () => console.log("Storniranje transakcije"),
      },
      {
        label: "Izbriši narudžbu",
        color: "negative",
        handler: () => console.log("Brisanje narudžbe"),
      },
      {
        label: "Izbriši proizvod",
        color: "negative",
        handler: () => console.log("Brisanje proizvoda"),
      },
    ],
  };
  return optionsMap[option] || [];
}
function resetSelection() {
  selectedOption.value = null; // Resetira odabranu opciju
  router.push("/"); // Vraća na početnu rutu (ili bilo koju defaultnu)
}
</script>
