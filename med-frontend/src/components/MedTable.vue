<template>
  <div class="med-table">
    <table class="table">
      <thead>
        <tr>
          <th scope="col">Name</th>
          <th scope="col">Date</th>
          <th scope="col">Manufacturer</th>
          <th scope="col">Type</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th scope="row">BAFIERTAM</th>
          <td>2020 (26.08.2020)</td>
          <td>Pfizer</td>
          <td>Tablet</td>
        </tr>
        <tr>
          <th scope="row">KERENDIA</th>
          <td>2021 (10.07.2021)</td>
          <td>Pfizer</td>
          <td>Capsules, Oral Solution</td>
        </tr>
        <tr>
          <th scope="row">TRAZIMERA</th>
          <td>2019 (11.03.2019)</td>
          <td>Pfizer</td>
          <td>Infusion</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: "MedTable",
  props: {
    title: String,
    subtitle: String,
  },
  data() {
    return {};
  },
  computed: {},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.med-table {
  margin-top: 30px;
}

thead {
  background-color: #b486b1;
  color: white;
  border-style: hidden;
}

th {
  font-weight: 400;
}

tbody {
  color: #685f8e;
}
</style>
