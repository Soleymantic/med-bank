<template>
  <nav class="navbar navbar-expand-lg navbar-light med-green">
    <div class="container-fluid">
      <a class="navbar-brand" href="#"
        ><font-awesome-icon
          size="lg"
          :style="{ color: 'red' }"
          beat
          icon="fa-solid fa-heartbeat"
      /></a>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNavAltMarkup"
        aria-controls="navbarNavAltMarkup"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div class="navbar-nav">
          <a class="nav-link active" aria-current="page" href="#">MedBank</a>
          <a class="nav-link" href="#">Apotheken</a>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: "MedNav",
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.navbar-brand img {
  width: 50px;
}

.med-green {
  background-color: #0dcaae;
}

.navbar-light .navbar-nav .nav-link {
  color: white;
}

.navbar-light .navbar-toggler {
  color: white;
  outline: none;
}
</style>
