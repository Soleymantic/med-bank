<template>
  <div class="med-table">
    <table v-if="!mobileView" class="table">
      <thead>
      <tr>
        <th scope="col">Name</th>
        <th scope="col">Street</th>
        <th scope="col">Telephone</th>
        <th scope="col">Email</th>
        <th scope="col">Fax</th>
        <th scope="col">Weblink</th>
      </tr>
      </thead>
      <tbody v-if="!error">
      <tr
          @click="selectPharmacy(pharmacy)"
          v-for="pharmacy in pharmacyResult"
          :key="pharmacy.OBJECTID"
      >
        <th scope="row">{{ pharmacy.BEZEICHNUNG }}</th>
        <td>{{ pharmacy.ADRESSE }}</td>
        <td>{{ pharmacy.TELEFON }}</td>
        <td>{{ pharmacy.EMAIL }}</td>
        <td>{{ pharmacy.FAX }}</td>
        <td>{{ pharmacy.WEBLINK1 }}</td>
      </tr>
      </tbody>
      <tbody v-if="error">
      <tr>
        <th scope="row" colspan="6">{{ error }}</th>
      </tr>
      </tbody>
    </table>
    <div v-if="mobileView && !error" class="med-cards">
      <div
          @click="selectPharmacy(pharmacy)"
          v-for="pharmacy in pharmacyResult"
          :key="pharmacy.OBJECTID"
          class="card text-dark bg-light mb-3"
          style="max-width: 18rem"
      >
        <div class="card-header">{{ pharmacy.BEZEICHNUNG }}</div>
        <div class="card-body">
          <h5 class="card-title">{{ pharmacy.ADRESSE }}</h5>
          <p class="card-text">
            District: {{ pharmacy.BEZIRK }} <br />
            Telephone: {{ pharmacy.TELEFON }} <br />
            Email: {{ pharmacy.EMAIL }} <br />
            Fax: {{ pharmacy.FAX }} <br />
            Weblink: {{ pharmacy.WEBLINK1 }} <br />
          </p>
        </div>
      </div>
    </div>
    <div v-if="mobileView && error" class="error">
      {{ error }}
    </div>
  </div>
</template>

<script>
export default {
  name: "PharmacyTable",
  components: {  },
  props: {
    title: String,
    subtitle: String,
    result: Array,
    error: String,
  },
  mounted() {
    this.pharmacyResult = this.result;
  },
  data() {
    return {
      pharmacyResult: [],
      selectedPharmacy: undefined,
    };
  },
  methods: {
    dateFormatter(date) {
      let year = date.substring(0, 4);
      let month = date.substring(4, 6);
      let day = date.substring(6, 8);
      return day + "." + month + "." + year;
    },
    reset() {
      this.selectedPharmacy = undefined;
    }
  },
  computed: {
    mobileView() {
      const toMatch = [
        /Android/i,
        /webOS/i,
        /iPhone/i,
        /iPad/i,
        /iPod/i,
        /BlackBerry/i,
        /Windows Phone/i,
      ];

      return toMatch.some((toMatchItem) => {
        return navigator.userAgent.match(toMatchItem);
      });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
tr {
  cursor: pointer;
}
.med-cards {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.med-table {
  margin-top: 30px;
}

thead {
  background-color: #b486b1;
  color: white;
  border-style: hidden;
}

.card {
  width: 100%;
}

th {
  font-weight: 400;
}

.med-detail {
  width: 80%;
  margin: auto;
}

tbody {
  color: #685f8e;
}

th[colspan="6"] {
  text-align: center;
}

.cancelButton {
  width: 80%;
  justify-content: center;
  display: flex;
  height: 50px;
  align-items: center;
}

.card-header {
  color: white;
  background-color: #b486b1;
}

.card-body {
  color: black;
  background-color: rgb(232, 218, 231);
}

.error {
  text-align: center;
}
</style>
