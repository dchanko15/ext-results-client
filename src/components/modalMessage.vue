<template>
  <div>
    <ui-modal ref="error-win" title="შეტყობინება" :dismissible="true"  :prevent-shift="true">
      <div style="display: flex;">
        <div>
          <ui-icon  style="color: darkred; font-size: 36px">error</ui-icon>
        </div>
        <div>
          <h4 style="text-align: left;  margin: 0.5em "> {{info}}</h4>
          <ul>
            <li v-for="err in errorMessages" :key="err.fieldNo">
              {{err.message}}
            </li>
          </ul>
        </div>
      </div>
    </ui-modal>
  </div>
</template>

<script>
  export default {
    name: 'modalMessage',
    props: ['errorMessages', 'info'],
    methods: {
      open () {
        this.$refs['error-win'].open()
      }
    }
  }
</script>

<style>
  .ui-modal__body {
    padding: 0;
    margin-bottom: 0
  }
</style>
