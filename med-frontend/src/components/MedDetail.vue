<template>
  <div class="med-detail">
    <div class="form-floating mb-3">
      <input
        v-if="selectedDrug"
        :value="selectedDrug.manufacturer"
        type="text"
        class="form-control"
        id="floatingManufacturer"
        readonly
      />
      <label for="floatingManufacturer">Manufacturer</label>
    </div>
    <div class="form-floating mb-3">
      <input
        v-if="selectedDrug"
        :value="selectedDrug.packageNdc"
        type="text"
        class="form-control"
        id="floatingNDC"
        readonly
      />
      <label for="floatingNDC">National Drug Code</label>
    </div>
    <div class="form-floating mb-3">
      <input
        v-if="selectedDrug"
        :value="dateFormatter(selectedDrug.details.marketing_start_date)"
        type="text"
        class="form-control"
        id="floatingStartdate"
        readonly
      />
      <label for="floatingStartdate">Marketing Start Date</label>
    </div>
    <div class="form-floating mb-3">
      <input
        v-if="selectedDrug"
        :value="dateFormatter(selectedDrug.details.listing_expiration_date)"
        type="text"
        class="form-control"
        id="floatingStartdate"
        readonly
      />
      <label for="floatingStartdate">Listing Expiration Date</label>
    </div>
    <div class="form-floating">
      <input
        v-if="selectedDrug"
        :value="mapIngredients(selectedDrug.details.active_ingredients)"
        type="text"
        class="form-control"
        id="floatingIngredients"
        readonly
      />
      <label for="floatingIngredients">Active Ingredients</label>
    </div>
  </div>
</template>

<script>
export default {
  name: "MedDetail",
  props: {
    selected: Object,
  },
  mounted() {
    this.selectedDrug = this.selected;
  },
  data() {
    return {
      selectedDrug: undefined,
    };
  },
  methods: {
    dateFormatter(date) {
      if (date != undefined) {
        let year = date.substring(0, 4);
        let month = date.substring(4, 6);
        let day = date.substring(6, 8);
        return day + "." + month + "." + year;
      } else {
        return "-";
      }
    },
    mapIngredients(ingredients) {
      let ingNames = [];
      for (let ing of ingredients) {
        ingNames.push(ing.name);
      }
      return ingNames.join(" ");
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
.med-detail {
  width: 80%;
  margin: auto;
}
</style>
