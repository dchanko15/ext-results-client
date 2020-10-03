<template>
    <div>
        <bg></bg>
        <nav-bar shrinked="" :menu="getMenu()"></nav-bar>
        <div class="container margin_top" >
            <login></login>
        </div>
    </div>
</template>

<script>
    import navBar from '../components/navbar'
    import bg from '../components/background'
    import mixinMenu from '../components/mixinMenu'
    import login from '../components/login'

    export default {
        name: "v-index",
        components: {
            'nav-bar': navBar,
            'bg': bg,
            'login' : login,
        },
        mixins: [mixinMenu],

        data: function () {
            return {
                allowedStages: [0],
            }
        },
    }
</script>

<style scoped>

</style>
