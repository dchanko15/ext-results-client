<template>

    <div>
        <div class="row center-xs">
            <div class="col-xs-12 col-sm-12 col-lg-11 ">
                <section>
                    <!--<div class="row">
                        <div class="col-xs">
                            <div class="float-left">
                                <ui-icon-button button-type="button" type="primary" color="primary"
                                                icon="arrow_back"
                                                tooltip="დაბრუნება" @click="$router.back();">

                                </ui-icon-button>

                            </div>
                        </div>
                    </div>-->
                    <div class="row">
                        <div class="col-xs-1 col-sm-1 end-xs">
                            <h4>{{subCategory}} </h4>
                        </div>
                        <div class="col-xs">
                            <h4>{{subCategoryName}} </h4>
                        </div>

                    </div>

                    <div class="row middle-xs" style="border: 1px solid silver; margin-bottom: 0.2em">
                        <div class="col-xs-1 end-xs padding-v">
                            <ui-icon-button icon="add" class="cursor-pointer"></ui-icon-button>
                        </div>

                        <div class="col-xs" style="padding: 1em">
                            ახალი ინფორმაციის დამატება
                        </div>
                    </div>

                    <div v-for="item in items" :key="item.Id"
                         style="border: 1px solid silver; margin-bottom: 0.2em">
                        <div v-if="editingId!==item.Id" style="padding: 0.3em 0">
                            <div class="row middle-xs">
                                <div class="col-xs-1 end-xs">
                                    <ui-icon-button button-type="button" @click="editRecord(item.Id)" type="secondary"
                                                    class="cursor-pointer"
                                                    icon="edit">
                                    </ui-icon-button>
                                    <br>
                                    <ui-icon-button button-type="button" @click="deleteRecord(item.Id)" type="secondary"
                                                    class="cursor-pointer"
                                                    icon="delete">
                                    </ui-icon-button>


                                </div>

                                <div class="col-xs" style="padding: 1em">

                                    <div>{{item.PublishDate}}</div>
                                    <a :href="item.Url">
                                        {{item.Name}}
                                    </a>

                                </div>
                            </div>
                        </div>
                        <div v-else style="padding: 0.5em 0">
                            <form @submit.prevent="saveRecord(1)">
                                <div class="row ">
                                    <div class="col-xs-1 end-xs">
                                        <ui-icon-button class="cursor-pointer" type="secondary"
                                                        icon="save"></ui-icon-button>
                                        <br>
                                        <ui-icon-button class="cursor-pointer" type="secondary"
                                                        icon="undo"></ui-icon-button>
                                    </div>
                                    <div class="col-xs-6">
                                        <ui-textbox
                                                ref="publishDate"
                                                v-model="publishDate"
                                                label="გამოქვეყნების თარიღი"
                                                :name="'publishDate'"
                                                data-vv-as="გამოქვეყნების თარიღი"
                                                v-validate="{required: true, date_format:'YYYY-MM-DD'} "
                                                :invalid="errors.has('publishDate')"
                                                :error="errors.first('publishDate')"
                                                autofocus
                                                autocomplete="off" >
                                        </ui-textbox>


                                    </div>
                                    <div class="col-xs-11 col-xs-offset-1">
                                        <ui-textbox
                                                ref="linkTitle"
                                                multi-line
                                                rows = 4
                                                v-model="linkTitle"
                                                label="სათაური"
                                                :name="'linkTitle'"
                                                data-vv-as="სათაური"

                                                v-validate="{required: true}"
                                                :invalid="errors.has('linkTitle')"
                                                :error="errors.first('linkTitle')"

                                                autocomplete="off"


                                        >
                                        </ui-textbox>
                                    </div>

                                </div>
                                <div class="row">
                                    <div class="col-xs col-xs-offset-1">
                                        <ui-fileupload color="primary" name="file2">
                                            ასატვირთი დოკუმენტი
                                        </ui-fileupload>
                                    </div>
                                </div>
                            </form>
                        </div>

                    </div>


                </section>
            </div>
        </div>
    </div>

</template>

<script>


    export default {
        name: "categoryItems",

        props: ['subCategoryId'],
        data: function () {
            return {
                subCategory: "",
                subCategoryName: "",
                items: [],
                editingId: 0,
                publishDate: "",
                linkTitle: ""
            }
        },
        created() {
            let id = this.subCategoryId;
            let subCat = this.$globalState.subCategories.find(sc => sc.Id.toString() === id);
            this.subCategory = subCat.SubCategory;
            this.subCategoryName = subCat.Name;
            this.items = this.$globalState.items.filter(item => item.SubCategoryId.toString() === id).sort((a, b) => a.Id - b.Id)
        },
        methods: {
            editRecord(id) {
                if (this.$refs.publishDate) {
                    this.$refs.publishDate[0].reset();
                    this.$refs.publishDate[0].invalid = false;
                }

                this.$nextTick(() => {
                    this.editingId = id;
                    let item = this.items.find(i => i.Id === id);
                    this.publishDate = item.PublishDate;
                    this.linkTitle = item.Name;
                })

            },
            async saveRecord(id) {
                let errs = this.$validator.validateAll();
                if (!errs)
                    this.editingId = 0;
            },

        }

    }
</script>

<style scoped>

</style>