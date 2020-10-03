<template>
    <div>
        <bg></bg>
        <nav-bar shrinked="" :menu="getMenu()"></nav-bar>
        <div class="container" style="margin-top: 70px; text-align: left ">
            <info-requests ></info-requests>
        </div>
    </div>
</template>

<script>
    import navBar from '../components/navbar'
    import bg from '../components/background'
    import mixinMenu from '../components/mixinMenu'
    import infoRequests from '../components/infoRequests'


    export default {
        name: "v-infoRequests",
        components: {
            'nav-bar': navBar,
            'bg': bg,
            'info-requests':infoRequests,
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