<template>
  <div>
    <section>


    </section>

  </div>
</template>

<script>
  import mixin1 from './mixinMenu'

  import moment from 'moment'

  export default {
    name: 'home',
    mixins: [mixin1],
    data: () => {
      return {
        cStage: null,
        tomorrow: ""
      }
    },
    created () {
      this.cStage = this.$globalState.currentStage().scheduleStage;
      let months= ['იანვრის','თებერვლის','მარტის','აპრილის','მაისის','ივნისის','ივლისის','აგვისტოს', 'სექტემბერის','ოქტომბერის','ნოემბერის','დეკემბერის'];
      let month = moment().add(1, 'day').month();
      this.tomorrow = moment().add(1, 'day').date().toString()+" "+months[month]+" 15:00 საათიდან";
    }

  }
</script>


<style scoped>

  p {
    line-height: 1.5;
  }

  .attention {
    position: relative;
    display: inline-block;
    font-family: bpg_Arial, 'Roboto', sans-serif;
    font-size: 1.1em;
    padding: 1em 1em 1em 2em;
    font-weight: 600;


  }

  .attention::before {
    content: '!';
    left: 0.1em;
    position: absolute;
    display: block;
    font-family: bpg_Arial, sans-serif;
    font-size: 2.5em;

    color: darkred;

  }

  .actionButton {
    display: inline-flex;
    flex-direction: column;
    padding: 1em 1.5em;
    align-items: center;

    border-radius: 2em;
    cursor: pointer;
    transition: 0.4s;
    background: rgb(0, 111, 185);
    fill: white;
    color: white;
  }

  .actionButton svg {
    transition: 0.4s
  }

  .actionButton:hover {
    background: rgb(0, 144, 219);

  }


  .actionButton:hover svg {
    transform: scale(1.2);
  }

  .divider {
    opacity: 1;
  }


</style>
