<template>
    <div>
        <bg></bg>
        <nav-bar shrinked="" :menu="getMenu()"></nav-bar>
        <div class="container" style="margin-top: 70px; text-align: left ">
            <category-items :sub-category-id="$route.params.id"></category-items>
        </div>
    </div>
</template>

<script>
    import navBar from '../components/navbar'
    import bg from '../components/background'
    import mixinMenu from '../components/mixinMenu'
    import categoryItems from '../components/categoryItems'

    export default {
        name: "v-categoryItems",
        components: {
            'nav-bar': navBar,
            'bg': bg,
             categoryItems,
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