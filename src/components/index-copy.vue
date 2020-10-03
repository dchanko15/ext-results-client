<template>
    <div>
        <div class="row center-xs">
            <div class="col-xs-12 col-sm-12 col-md-11 ">
                <section>
                    <div v-if="!currentSubCategoryId">
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
                    <div v-if="currentSubCategoryId">
                        <div class="float-right" >
                            <ui-icon-button button-type="button" type="primary" color="primary" icon="arrow_back"
                                            tooltip="დაბრუნება" @click="back2Categories()">

                            </ui-icon-button>

                        </div>

                        <h4>{{currentSubCategoryName}} </h4>
                        <hr>
                        <div v-for="item in items" :key="item.Id" style="padding: 1em">
                            <div>{{item.PublishDate}}</div>
                            <a :href="item.Url">
                                {{item.Name}}


                            </a>
                        </div>

                    </div>
                </section>
            </div>
        </div>
    </div>
</template>

<script>
    import UiIconButton from "keen-ui/src/UiIconButton";

    export default {
        name: "index",
        components: {UiIconButton},
        data: function () {
            return {
                categories: [],
                currentSubCategoryId: "",
                currentSubCategoryName: "",
                items: []
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
              /*  this.currentSubCategoryId = id;
                let subCat = this.$globalState.subCategories.find(sc => sc.Id === id);
                this.currentSubCategoryName = subCat.SubCategory + " " + subCat.Name;
                this.items = this.$globalState.items.filter(item => item.SubCategoryId === id).sort((a, b) => a.Id - b.Id)*/
              this.$router.push('/item/'+id);

            },
            back2Categories() {
                this.currentSubCategoryId = 0;

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
