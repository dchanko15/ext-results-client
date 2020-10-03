<template>

    <div>
        <div class="row center-xs">
            <div class="col-xs-12 col-sm-12 col-lg-11 ">
                <section>
                    <div class="row">
                        <div class="col-xs-12 ">
                            <h3>მოთხოვნილი ინფორმაციის ჩამონათვალი</h3>
                        </div>

                    </div>

                    <div class="col-xs" style="margin-right: 15px; overflow-x:hidden;">

                    </div>
                    <div class="col-xs " style="overflow-y: scroll; overflow-x:hidden; height: 60vh; ">
                        <div class="row center-xs hidden-md hidden-lg hidden-xl bordered-all padding-all position-sticky bg-gray">
                            <ui-button button-type="button" @click="showHeader = !showHeader"  color="primary">
                                <span v-show="showHeader" >სათაურების დამალვა</span>
                                <span v-show="!showHeader" >სათაურების გამოჩენა</span>
                            </ui-button>
                        </div>
                        <div class="row  bordered-all position-sticky bg-gray" v-show="showHeader">
                            <div class="col-xs-12 col-md-3 position-relative tableCol">
                                <column-header caption="გვარი" field-name="LastName"
                                               :sorted-by="sortedBy" @sort="colSort" @filter="colFilter">
                                </column-header>

                            </div>
                            <div class="col-xs-12 col-md-3 position-relative tableCol">
                                <column-header caption="თარიღი" field-name="CreatedDate"
                                               :sorted-by="sortedBy" @sort="colSort" @filter="colFilter">
                                </column-header>

                            </div>
                            <div class="col-xs-12 col-md-3 position-relative tableCol">
                                <column-header caption="ელ.ფოსტა" field-name="Mail"
                                               :sorted-by="sortedBy" @sort="colSort" @filter="colFilter">
                                </column-header>
                            </div>
                            <div class="col-xs-12 col-md-2 position-relative tableCol ">
                                <column-header caption="ტელეფონი" field-name="MobilePhone"
                                               :sorted-by="sortedBy" @sort="colSort" @filter="colFilter">
                                </column-header>
                            </div>
                        </div>
                        <div v-for="(req,ind) in filteredData" :key="req.Id">
                            <div class="row  tableRow" :class="{altRow: ind % 2 ===0 }">
                                <div class="col-xs-12 col-md-3 tableCol">
                                    {{req.LastName}} {{req.FirstName}}, {{req.IDNum}}
                                </div>
                                <div class="col-xs-12 col-md-3 tableCol center-md">
                                    {{req.CreatedDate}}
                                </div>
                                <div class="col-xs-12 col-md-3 tableCol">
                                    {{req.Mail}}
                                </div>
                                <div class="col-xs-12 col-md-2 tableCol center-md">
                                    {{req.MobilePhone}}
                                </div>

                                <div class="col-xs-12" style="border-top: 1px solid silver; padding: 0.5em ">
                                    {{req.MailBody}}
                                    <div v-if="req.AttachmentUrl!==null">
                                        <a :href="req.AttachmentUrl" target="_blank">მიმაგრებული ფაილი</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </section>
            </div>
        </div>
        <modal-message ref="errors-modal" :error-messages="errorMessages"
                       info="გადაამოწმეთ შეტანილი ინფორმაცია"></modal-message>
    </div>

</template>

<script>
    import mixinErrors from './mixinErrors'
    import modalMessage from './modalMessage'
    import columnHeader from './columnHeader'
    import UiButton from "keen-ui/src/UiButton";

    export default {

        name: "infoRequests",
        components: {
            UiButton,
            'modal-message': modalMessage,
            'column-header': columnHeader,

        },
        mixins: [mixinErrors],
        data: function () {
            return {
                tableData: [],
                filteredData: [],
                sortedBy: '',
                sortOrder: 1,
                filter: {},

                showHeader: true,
                filterColumns: {
                    fullName: "",
                    dateCreated: ""

                },
                sortColumns: {
                    fullName: 1,
                    dateCreated: 0
                },
                /*
                    "Id": Number,
                    "LastName": String,
                    "FirstName": String,
                    "IDNum": String,
                    "Mail": String,
                    "MailBody": String,
                    "MobilePhone": String,
                    "AttachmentUrl": String,
                    "CreatedDate": String,
                    "AttachmentFile": String,
                    "StreetAddress": String,
                    "FileMediaType": String,
                    "Status": Number
                 */

            }
        },
        computed: {
            infoRequestList: function () {
                this.filteredData = (this.filteredData.filter((r) => {
                    let selected = true;
                    let filterStr = "";


                    if (this.filterColumns.dateCreated) {
                        filterStr = r.CreatedDate.substr(0, 10);
                        selected = (this.filterColumns.dateCreated === filterStr);
                    }

                    if (selected && this.filterColumns.fullName) {
                        filterStr = r.LastName + r.FirstName + r.IDNum;
                        selected = (filterStr.indexOf(this.filterColumns.fullName) !== -1);
                    }
                    return selected;

                })).sort((a, b) => {
                    let sortA, sortB;
                    if (this.sortColumns.fullName) {
                        sortA = a.LastName + a.FirstName + a.IDNum;
                        sortB = b.LastName + b.FirstName + b.IDNum;

                        if (this.sortColumns.fullName === -1) {
                            let tmp = sortA;
                            sortA = sortB;
                            sortB = tmp;
                        }
                        let res = 0;
                        if (sortA > sortB)
                            res = 1;
                        else if (sortA < sortB) this.tableData
                        res = -1;
                        return res;
                    }

                    if (this.sortColumns.dateCreated) {
                        sortA = a.CreatedDate;
                        sortB = b.CreatedDate;

                        if (this.sortColumns.dateCreated === -1) {
                            let tmp = sortA;
                            sortA = sortB;
                            sortB = tmp;
                        }

                        let res = 0;
                        if (sortA > sortB)
                            res = 1;
                        else if (sortA < sortB)
                            res = -1;
                        return res;
                    }

                });
                return this.filteredData;

            }
        },
        async created() {

            let response = await this.$getData("/GetVisitors");
            if (Math.floor(response.status / 100) !== 2)
                this.showErrors('შეცდომაა');
            else
                this.tableData = response.data;
            this.filteredData = this.tableData.slice(0);

        },
        methods: {
            sort() {
                let sortedBy = this.sortedBy;
                let sortOrder = this.sortOrder;

                this.filteredData.sort((a, b) => {
                    let sortA = a[sortedBy];
                    let sortB = b[sortedBy];

                    if (sortOrder === -1) {
                        let tmp = sortA;
                        sortA = sortB;
                        sortB = tmp;
                    }

                    let res = 0;
                    if (sortA > sortB)
                        res = 1;
                    else if (sortA < sortB)
                        res = -1;
                    return res;
                })

            },

            colSort(e) {
                if (this.sortedBy === e.fieldName) {
                    if (this.sortOrder === -1)
                        this.sortOrder = 1;
                    else
                        this.sortOrder = -1;
                } else {
                    this.sortedBy = e.fieldName;
                    this.sortOrder = 1;
                }
                this.sort();

            },
            colFilter(e) {
                let filter = this.filter;
                this.filter[e.fieldName] = e.value;
                let filtered = this.tableData.filter((r) => {
                    let t = !Object.keys(r).find(k => {
                        let res = false;
                        if (filter[k])
                            res = !r[k].includes(filter[k]);
                        return res;
                    });
                    return t;
                });
                this.filteredData = filtered;
                this.sort();


            }
        }


    }
</script>

<style scoped>
    .tableHeader {


    }

    .tableRow {
        border: 1px solid silver;
        margin-top: 0.3rem;
        align-items: stretch;
    }

    .tableCol {
        border-right: 1px solid silver;
        padding: 0.5em 1rem;
    }

    .altRow {
        background-color: rgb(240, 240, 240);
    }

    @media screen and (max-width: 700px) {
        .tableHeader {
            display: none;

        }
    }


</style>