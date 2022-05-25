<template>
  <div class="med-search container">
    <div class="logo-wrapper">
      <img class="logo" src="../assets/medbank.png" alt="logo" />
    </div>

    <div class="search-card card rounded">
      <ul class="list-group list-group-flush">
        <li class="list-group-item">
          <font-awesome-icon
            size="lg"
            :style="inputStyleName"
            class="p-2"
            border
            icon="fa-solid fa-pills"
          />
          <input
            placeholder="Name of drug"
            @keyup.enter="search"
            v-model="nameInput"
            class="search-input"
            type="text"
          />
        </li>
        <li class="list-group-item">
          <font-awesome-icon
            size="lg"
            :style="inputStyleCompany"
            class="p-2"
            border
            icon="fa-solid fa-suitcase"
          />
          <input
            placeholder="Manufacturer of drug"
            v-model="companyInput"
            @keyup.enter="search"
            class="search-input"
            type="text"
          />
        </li>
        <li class="list-group-item search-btn">
          <button @click="search" class="btn med-btn btn-success">
            Search
          </button>
        </li>
      </ul>
    </div>
    <div v-if="loading" class="heart-rate">
      <svg
        version="1.0"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        x="0px"
        y="0px"
        width="150px"
        height="73px"
        viewBox="0 0 150 73"
        enable-background="new 0 0 150 73"
        xml:space="preserve"
      >
        <polyline
          fill="none"
          stroke="green"
          stroke-width="3"
          stroke-miterlimit="10"
          points="0,45.486 38.514,45.486 44.595,33.324 50.676,45.486 57.771,45.486 62.838,55.622 71.959,9 80.067,63.729 84.122,45.486 97.297,45.486 103.379,40.419 110.473,45.486 150,45.486"
        />
      </svg>
      <div class="fade-in"></div>
      <div class="fade-out"></div>
    </div>
    <med-table :error="error" :result="drugs" v-if="showTable"></med-table>
  </div>
</template>

<script>
import MedTable from "./MedTable.vue";
export default {
  components: { MedTable },
  name: "MedSearch",
  props: {
    title: String,
    subtitle: String,
  },
  data() {
    return {
      nameInput: undefined,
      companyInput: undefined,
      showTable: false,
      drugs: [],
      error: undefined,
      loading: false,
      pharmacies: []
    };
  },
  created() {
    let self = this;
    fetch("https://data.wien.gv.at/daten/geo?service=WFS&request=GetFeature&version=1.1.0&typeName=ogdwien:APOTHEKEOGD&srsName=EPSG:4326&outputFormat=json")
        .then(response => response.json())
        .then(data => {
          console.log('fetching...');
          let features = data.features;
          features.forEach(ph => {
            self.pharmacies.push(ph.properties);
          })
        });
  },
  computed: {
    inputStyleName() {
      if (this.nameInput && this.nameInput.length > 0) {
        return {
          backgroundColor: "rgb(232, 218, 231)",
          color: "#7500a7",
        };
      }
      return {
        backgroundColor: "rgb(238, 237, 236)",
        color: "#b5aeae",
      };
    },
    inputStyleCompany() {
      if (this.companyInput && this.companyInput.length > 0) {
        return {
          backgroundColor: "rgb(232, 218, 231)",
          color: "#7500a7",
        };
      }
      return {
        backgroundColor: "rgb(238, 237, 236)",
        color: "#b5aeae",
      };
    },
  },
  methods: {
    apiUrl(name, company) {
      let baseUrl = "https://api.fda.gov/drug/label.json?limit=100&search=";
      let queries = [];

      if (name && name.length > 0) {
        queries.push(
          'openfda.brand_name:"' +
            name.toUpperCase() +
            '"+openfda.substance_name:"' +
            name.toUpperCase() +
            '"'
        );
      }

      if (company && company.length > 0) {
        queries.push(
          'openfda.manufacturer_name:"' + company.toUpperCase() + '"'
        );
      }

      baseUrl = baseUrl.concat(queries.join("+AND+"));
      return baseUrl;
    },
    search() {
      console.log("start");
      this.error = undefined;
      this.showTable = false;
      this.loading = true;

      if (
        (this.nameInput && this.nameInput.length > 0) ||
        (this.companyInput && this.companyInput.length > 0)
      ) {
        let url = this.apiUrl(this.nameInput, this.companyInput);
        this.$http.get(url).then(
          (response) => {
            this.drugs = response.body.results;
            this.showTable = true;
            this.loading = false;
          },
          (response) => {
            this.error = response.body.error.message;
            this.showTable = true;
            this.loading = false;
          }
        );
      } else {
        this.showTable = false;
        this.loading = false;
      }
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.page-title {
  text-align: center;
  padding-top: 30px;
  color: #685f8e;
}

.page-sub-title {
  text-align: center;
  color: #685f8e;
}

.search-input {
  margin-left: 20px;
  border: none;
  border-bottom: 1px solid lightgray;
  width: 90%;
  height: 50px;
  outline: none;
}

.logo-wrapper {
  display: flex;
  justify-content: center;
}

.list-group-flush > .list-group-item {
  border-width: 0 0 1px;
  border-bottom: none;
}

.list-group-item {
  display: flex;
  align-items: center;
}

.search-btn {
  padding: 0px;
  padding-top: 10px;
}

img.logo {
  height: 200px;
}

.med-btn {
  width: 100%;
  background-color: #0dcaae;
  border: none;
  border-top-right-radius: 0px;
  border-top-left-radius: 0px;
  height: 50px;
}

.search-card {
  width: 80%;
  margin: auto;
}

input.search-input:focus {
  border-bottom: 1px solid #0dcaae;
}

.heart-rate {
  max-width: 180px;
  height: 143px;
  position: relative;
  margin: 0px auto;
  top: 30px;
  overflow: hidden;
}

.fade-in {
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: white;
  top: 0;
  right: 0;
  animation: heartRateIn 4.5s linear infinite;

  /* Gia na katalavw ti ginetai des auto
    border:1px solid red;
    */
}

.fade-out {
  position: absolute;
  width: 120%;
  height: 100%;
  top: 0;
  left: -120%;
  animation: heartRateOut 4.5s linear infinite;
  background: rgba(255, 255, 255, 1);
  background: -moz-linear-gradient(
    left,
    rgba(255, 255, 255, 1) 0%,
    rgba(255, 255, 255, 1) 50%,
    rgba(255, 255, 255, 0) 100%
  );
  background: -webkit-linear-gradient(
    left,
    rgba(255, 255, 255, 1) 0%,
    rgba(255, 255, 255, 1) 50%,
    rgba(255, 255, 255, 0) 100%
  );
  background: -o-linear-gradient(
    left,
    rgba(255, 255, 255, 1) 0%,
    rgba(255, 255, 255, 1) 50%,
    rgba(255, 255, 255, 0) 100%
  );
  background: -ms-linear-gradient(
    left,
    rgba(255, 255, 255, 1) 0%,
    rgba(255, 255, 255, 1) 50%,
    rgba(255, 255, 255, 0) 100%
  );
  background: linear-gradient(
    to right,
    rgba(255, 255, 255, 1) 0%,
    rgba(255, 255, 255, 1) 80%,
    rgba(255, 255, 255, 0) 100%
  );
}

@keyframes heartRateIn {
  0% {
    width: 100%;
  }
  50% {
    width: 0%;
  }
  100% {
    width: 0;
  }
}

@keyframes heartRateOut {
  0% {
    left: -120%;
  }
  30% {
    left: -120%;
  }
  100% {
    left: 0;
  }
}
</style>
