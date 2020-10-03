<template>
    <div>
        <bg></bg>
        <nav-bar shrinked="" :menu="getMenu()"></nav-bar>
        <div class="container" style="margin-top: 70px; text-align: left ">
            <request-info></request-info>
        </div>
    </div>
</template>

<script>
    import navBar from '../components/navbar'
    import bg from '../components/background'
    import mixinMenu from '../components/mixinMenu'
    import requestInfo from '../components/requestInfo'

    export default {
        name: "v-requestInfo",
        components: {
            'nav-bar': navBar,
            'bg': bg,
            'request-info': requestInfo,
        },
        mixins: [mixinMenu]
    }
</script>

<style scoped>

</style>

