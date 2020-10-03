<template>
    <div class="col-xs">
        <div style="position: absolute; top:2px; right: 2px ">
            <div v-show="sortedBy===fieldName">
                <ui-icon  :icon="sortIcon" style="color:#146f96"></ui-icon>
            </div>
        </div>

        <div class="col-header" @click="OnSort">{{caption}}</div>
        <ui-textbox @input="OnFilter" v-model="filter"
                    class="tableHeader"></ui-textbox>
    </div>
</template>

<script>
    export default {
        name: "columnHeader",
        props: ['fieldName', 'caption',  'sortedBy'],
        data: () => {
            return {
                sortIcon: "",
                filter: ""
            }
        },

        methods: {
            OnSort() {
                let fieldName = this.fieldName;
                let sortedBy = this.sortedBy;
                if (fieldName === sortedBy)
                    if (this.sortIcon === "arrow_upward")
                        this.sortIcon = "arrow_downward";
                    else
                        this.sortIcon = "arrow_upward";

                else
                    this.sortIcon = "arrow_downward";


                this.$emit("sort", {fieldName});
            },
            OnFilter(v) {

                let t = {};
                t.fieldName = this.fieldName;
                t.value = v;

                this.$emit("filter", t);
            }

        },

    }
</script>

<style scoped>
    .col-header {
        display: inline-block;
        cursor: pointer;
        font-weight: bold;
        color: #146f96;
    }
</style>