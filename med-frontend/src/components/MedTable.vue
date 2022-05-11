<template>
  <div class="med-table">
    <table v-if="!mobileView && !selectedDrug" class="table">
      <thead>
        <tr>
          <th scope="col">Name</th>
          <th scope="col">Date</th>
          <th scope="col">Manufacturer</th>
          <th scope="col">Type</th>
        </tr>
      </thead>
      <tbody v-if="!error">
        <tr
          @click="selectDrug(drug)"
          :disabled="!drug.openfda"
          v-for="drug in drugs"
          :key="drug.id"
        >
          <th scope="row">{{ drug.brandName }}</th>
          <td>{{ drug.date }}</td>
          <td>{{ drug.manufacturer }}</td>
          <td>{{ drug.route }}</td>
        </tr>
      </tbody>
      <tbody v-if="error">
        <tr>
          <th scope="row" colspan="4">{{ error }}</th>
        </tr>
      </tbody>
    </table>
    <div v-if="mobileView && !error && !selectedDrug" class="med-cards">
      <div
        @click="selectDrug(drug)"
        v-for="drug in drugs"
        :key="drug.id"
        class="card text-dark bg-light mb-3"
        style="max-width: 18rem"
      >
        <div class="card-header">{{ drug.brandName }}</div>
        <div class="card-body">
          <h5 class="card-title">{{ drug.manufacturer }}</h5>
          <p class="card-text">
            Date: {{ drug.date }} <br />
            Type: {{ drug.route }}
          </p>
        </div>
      </div>
    </div>
    <div v-if="mobileView && error && !selectedDrug" class="error">
      {{ error }}
    </div>
    <med-detail v-if="selectedDrug" :selected="selectedDrug"></med-detail>
    <button
      v-if="selectedDrug"
      class="container btn btn-danger mt-3 mb-3 cancelButton"
      @click="reset"
    >
      Cancel
    </button>
  </div>
</template>

<script>
import MedDetail from "./MedDetail.vue";
export default {
  name: "MedTable",
  components: { MedDetail },
  props: {
    title: String,
    subtitle: String,
    result: Array,
    error: String,
  },
  mounted() {
    this.drugs = [];
    this.result.forEach((elem) => {
      if (Object.keys(elem.openfda).length > 0) {
        let drug = {};
        drug.id = elem.openfda.product_ndc[0];
        drug.brandName = elem.openfda.brand_name[0];
        drug.manufacturer = elem.openfda.manufacturer_name[0];
        drug.date = this.dateFormatter(elem.effective_time);
        drug.route = elem.openfda.route[0];
        drug.packageNdc = elem.openfda.package_ndc[0];
        drug.substance = elem.openfda.substance_name[0];
        this.drugs.push(drug);
      }
    });
  },
  data() {
    return {
      drugs: [],
      selectedDrug: undefined,
      selectedDrugDetail: undefined,
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
      this.selectedDrug = undefined;
      this.selectedDrugDetail = undefined;
    },
    selectDrug(drug) {
      console.log("dfs");
      this.$http
        .get("https://api.fda.gov/drug/ndc.json?search=product_ndc:" + drug.id)
        .then((response) => {
          this.selectedDrugDetail = response.body.results[0];
          drug.details = this.selectedDrugDetail;
          this.selectedDrug = drug;
        });
    },
    isDrug(drug) {
      return drug.openfda != undefined;
    },
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

tbody {
  color: #685f8e;
}

th[colspan="4"] {
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
