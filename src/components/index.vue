<template>
    <div>
        <div class="row center-xs">
            <div class="col-xs-12 col-sm-12 col-md-11 ">
                <section>
                    <div class="row end-xs" style="margin-bottom: 0.5em">
                        <div class="col-xs start-xs" >
                            <h4>გამოქვეყნებული ინფორმაცია</h4>
                        </div>
                        <div class="col-xs">

                            <ui-button button-type="button" type="primary" color="primary" @click="$router.push('/request-info')">
                                ინფორმაციის მოთხვნა
                            </ui-button>
                        </div>
                    </div>

                    <div>
                        <ui-collapsible v-for="category in categories" :key="category.Id" :open="category.opened"
                                        @open="openCategory(category)" @close="category.opened=false">
                            <div slot="header">
                                <div style="display: flex">
                                    <div style="padding-right: 1em">{{category.Category}}</div>
                                    <div>{{category.Name}}</div>
                                </div>
                            </div>
                            <ul class="sub-cat">
                                <li v-for="subCat in category.subCategories" :key="subCat.Id">
                                    <div  @click="selectCurrent(subCat.Id)"
                                       class="sub-cat-item">
                                        <div style="padding-right: 1em ">{{subCat.SubCategory}}</div>
                                        <div>{{subCat.Name}}</div>
                                    </div>
                                </li>
                            </ul>
                        </ui-collapsible>
                    </div>

                </section>
            </div>
        </div>
    </div>
</template>

<script>

    import UiButton from "keen-ui/src/UiButton";
    export default {
        name: "index",
        components: {UiButton},
        data: function () {
            return {
                categories: [],
/*                currentSubCategoryId: "",
                currentSubCategoryName: "",
                items: []*/
            }
        },
        created() {
            this.categories = this.$globalState.categories.map(c => {
                c.subCategories = this.$globalState.subCategories.filter(sc => sc.CategoryId === c.Id);
                c.opened = false;
                return c;
            })
        },
        methods: {
            selectCurrent(id) {
              this.$router.push('/item/'+id);
            },

            openCategory(category) {
                this.categories.forEach(c => {
                    c.opened = false;
                });
                this.categories.push({});
                this.categories.pop();

                category.opened = true;
            }

        }


    }
</script>

<style scoped>
    .sub-cat {
        list-style: none;
        padding-left: 1em;
    }

    .sub-cat li {
        padding: 0.5em 0;
        margin-left: 0;


    }

    .sub-cat-item {
        display: flex;
        text-decoration: none;
        cursor: pointer;
        color: #23589a;
    }
    .sub-cat-item:hover {
        cursor: pointer;
        color: #8e4847;
    }

    .fade-enter-active, .fade-leave-active {
        transition: all .2s;
        opacity: 1;
    }

    .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */
    {
        opacity: 0;
    }
</style>
