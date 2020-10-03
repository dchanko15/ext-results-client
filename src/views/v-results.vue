<template>
    <div>
        <bg></bg>
        <nav-bar shrinked="" :menu="getMenu()"></nav-bar>

        <div class="container margin_top">
            <results></results>
        </div>
    </div>
</template>

<script>
    import bg from '../components/background'
    import results from '../components/results'
    import navBar from '../components/navbar'
    import errorsMixin from '../components/mixinMenu'



    export default {
        name: 'v-results',
        mixins: [errorsMixin],
        components: {
            'nav-bar': navBar,
            'results': results,
            bg
        },
        data: () => {
            return {
                allowedStages: [0],
            }
        },

    }
</script>

<style scoped>

</style>
