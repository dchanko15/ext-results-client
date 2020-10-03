<template>
  <div>
    <div class="container" style="margin-top: 75px; text-align: left; color: #333 ">


      <section>
        <h3>მოთხოვნილი რესურსის დასათვალიერებლად საჭიროა შესაბამისი უფლებები</h3>
        <hr>

        <router-link :to="'/'" :class="'button '">სისტემაში შესვლა</router-link>
      </section>
    </div>
  </div>
</template>

<script>
  export default   {
    name: 'v-restricted',
    methods: {
      redirect2Login () {
        this.$router.replace('/')
      }
    }
  }

</script>

<style scoped>

</style>
