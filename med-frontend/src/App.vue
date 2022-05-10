<template>
  <div id="app">
    <med-nav></med-nav>
    <med-search title="Search for any Drug" subtitle="All content is official, up-to-date and approved for use"></med-search>
  </div>
</template>

<script>
import MedNav from "./components/MedNav.vue";
import MedSearch from "./components/MedSearch.vue";

export default {
  name: "App",
  components: {
    MedSearch,
    MedNav,
  },
};
</script>

<style></style>
