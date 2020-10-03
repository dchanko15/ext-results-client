<template>
    <div>
        <nav-bar shrinked="true" :menu="getMenu()"></nav-bar>
        <div class="container" style="padding-top: 75px; text-align: left; ">
            <home></home>
        </div>
    </div>
</template>

<script>

    import home from '../components/home'
    import navBar from '../components/navbar'
    import navMenu from '../components/mixinMenu'


    export default {
        name: 'v-home',
        components: {
            'home': home,
            'nav-bar': navBar,
        },
        mixins: [navMenu],
        data: function () {
            return {
                allowedStages: [0],
            }
        },
    }
</script>

<style scoped>

</style>
