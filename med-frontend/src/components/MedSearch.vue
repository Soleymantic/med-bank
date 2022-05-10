<template>
  <div class="med-search container">
    <h1 class="page-title">{{ title }}</h1>
    <p class="page-sub-title">{{ subtitle }}</p>

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
            placeholder="Name"
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
            placeholder="Company"
            v-model="companyInput"
            @keyup.enter="search"
            class="search-input"
            type="text"
          />
        </li>
        <li class="list-group-item">
          <font-awesome-icon
            size="lg"
            :style="inputStyleDate"
            class="p-2"
            border
            icon="fa-solid fa-calendar"
          />
          <input
            placeholder="Date"
            v-model="dateInput"
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
    <med-table v-if="showTable"></med-table>
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
      dateInput: undefined,
      showTable: false,
    };
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
    inputStyleDate() {
      if (this.dateInput && this.dateInput.length > 0) {
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
      if (this.companyInput && this.companyInput.length > 0)
        this.showTable = true;
      else this.showTable = false;
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
</style>
