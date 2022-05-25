<template>
  <div id="pharmacy">
    <med-nav></med-nav>
    <pharmacy-search></pharmacy-search>
  </div>
</template>

<script>

import MedNav from "./../components/MedNav.vue";
import PharmacySearch from "@/components/PharmacySearch";

export default {
  name: "Pharmacy",
  components: {
    PharmacySearch,
    MedNav,
  },
};
</script>

<style></style>
