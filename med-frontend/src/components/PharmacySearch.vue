<template>
  <div class="pharmacy-search container">
    <div class="logo-wrapper">
      <img class="logo" src="../assets/medbank.png" alt="logo" />
    </div>

    <div class="search-card card rounded">
      <ul class="list-group list-group-flush">
        <li class="list-group-item">
          <font-awesome-icon
              size="lg"
              :style="inputStyleZipcode"
              class="p-2"
              border
              icon="fa-solid fa-map-marker-alt"
          />
          <input
              placeholder="District of pharmacy"
              v-model="zipcodeInput"
              @keyup.enter="search"
              class="search-input"
              type="number"
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
    <pharmacy-table :error="error" :result="pharmacyResult" v-if="showTable"></pharmacy-table>
  </div>
</template>

<script>
import PharmacyTable from "./PharmacyTable.vue";
export default {
  components: {PharmacyTable},
  name: "PharmacySearch",
  props: {
    title: String,
    subtitle: String,
  },
  data() {
    return {
      zipcodeInput: undefined,
      showTable: false,
      error: undefined,
      loading: false,
      pharmacies: [],
      pharmacyResult: []
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
            let pharma = ph.properties;
            pharma.lat = ph.geometry.coordinates[0];
            pharma.lng = ph.geometry.coordinates[1];
            self.pharmacies.push(pharma);
          })
        });
  },
  computed: {
    inputStyleZipcode() {
      if (this.zipcodeInput && this.zipcodeInput.length > 0) {
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
    search() {
      console.log("start");
      this.error = undefined;
      this.showTable = false;
      this.loading = true;

      if (this.zipcodeInput && this.zipcodeInput.length > 0) {
        let self = this;
        setTimeout(() => {
          this.pharmacyResult = self.pharmacies.filter(p => p.BEZIRK.toString() == self.zipcodeInput);
          if (self.pharmacyResult.length > 0) {
            self.showTable = true;
            self.loading = false;
          } else {
            self.error = "No result found";
            self.showTable = true;
            self.loading = false;
          }
        }, 1500);
      } else {
        this.showTable = false;
        this.loading = false;
      }
    },
  }
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

/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type=number] {
  -moz-appearance: textfield;
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
