<template>
    <div>
        <section class="margin_top">
            <div class="row ">
                <div class="col-xs">
                    <h3 class="header"> ტესტირების შედეგები</h3>
                </div>
            </div>
            <div style="background-color:rgba(255, 255, 255, 0.7); padding:15px">
                <div style="padding-top:10px;font-size: 1.33333333em;" v-if="scripts.length === 0">
                    მონაცემები არ მოიძებნა.
                </div>
                <div v-else style="width:100%">
                    <div class="row">
                        <div class="col-md-3 text-primary"
                             style="padding:6px;   text-align:left; font-family: bpg_web_001_caps, sans-serif">
                            საგანი
                        </div>
                        <div class="col-md-2 hidden-xs hidden-sm text-primary"
                             style="padding:6px;  text-align:center; font-family: bpg_web_001_caps,sans-serif ">
                            ქულა
                        </div>

                        <div class="col-md-2 hidden-xs hidden-sm text-primary"
                             style="padding:6px;">
                        </div>
                        <div class="col-md-2 hidden-xs hidden-sm text-primary"
                             style="padding:6px; ">
                        </div>
                    </div>
                    <div class="row" v-for="oneScript in scripts" :key="oneScript.SubjectID"
                         style="border-top: 1px solid silver;">
                        <div class="col-md-3 col-xs-12 col-sm-12" style="padding: 6px;  ">
                           <span>
                               {{ oneScript.SubjectName }}
                           </span>
                        </div>

                        <div class="col-sm-offset-1 col-xs-offset-1 col-xs-6 col-sm-6 hidden-md hidden-lg hidden-xl"
                             style="padding:  6px;  ">
                            ქულა
                        </div>
                        <div class="col-md-2 col-xs-5 col-sm-5" style="padding: 6px; text-align: center;  ">
                            <span class="">
                                 {{(oneScript.AppealRawpoint === -1 ? oneScript.Rawpoint : oneScript.AppealRawpoint)}}
                            </span>
                            <span v-if="oneScript.AppealRawpoint !== -1">
                                ({{oneScript.Rawpoint }})
                            </span>
                        </div>

                            <div class="col-md-3 col-xs-12 col-sm-12"
                                 style="padding: 0; text-align:right;">
                                <ui-button type="secondary" button-type="button"
                                           @click='oneScript.showDetails = oneScript.showDetails===1?0:1'
                                           icon-position="right">

                                    <span v-show="oneScript.showDetails===0">დეტალურად</span>
                                    <span v-show="oneScript.showDetails===1">დახურვა</span>


                                    <div slot="icon" v-show="oneScript.showDetails===0">
                                        <svg height="20px" width="20px" style="transform:translateY(2px)">
                                            <use :xlink:href="$globalState.baseUrl+'svgicons1.svg#icon-chevron-down'"/>
                                        </svg>
                                    </div>
                                    <div slot="icon" v-show="oneScript.showDetails===1">
                                        <svg height="20px" width="20px" style="transform:translateY(2px)">
                                            <use :xlink:href="$globalState.baseUrl+'svgicons1.svg#icon-chevron-up'"/>
                                        </svg>
                                    </div>


                                </ui-button>
                            </div>
                            <div class="" v-show="oneScript.showDetails">
                                <div class="col-md-12">
                                    <!-- <div class="row hidden-sm hidden-xs">
                                       <div class="col-md-4 ">
                                         გამოყენებული ტესტის ჩამოტვირთვა:
                                       </div>
                                       <div>
                                         <a class="btn text-info" target="_blank"
                                            :href="globalState.apiUrl+ '/testimages/'+oneScript.SubjectID">
                                           ბუკლეტი
                                           <i class="fa fa-lg fa-download"></i>
                                         </a>
                                       </div>
                                     </div>-->
                                    <div class="row hidden-sm hidden-xs">
                                        <div class="col-md-4">პასუხების ფურცლის ჩამოტვირთვა:</div>
                                        <div v-for="page in  oneScript.ScriptPages">
                                            <a class="btn text-info" target="_blank"
                                               :href="$globalState.apiUrl+ '/scriptimage?s='+oneScript.SubjectID+'&p='+(page-1)">
                                                <span class="">გვერდი-{{(page)}}</span>

                                            </a>&nbsp;&nbsp;
                                        </div>
                                        <hr style="margin: 0 0 15px 0"/>
                                    </div>
                                    <!--item points-->
                                    <div style="margin-top: 15px">
                                        <p>შეფასებები დავალებების მიხედვით:</p>
                                        <div v-for="itemPoints in oneScript.ItemPoints" :key="itemPoints.ID"
                                             style="display:inline-block; padding: 3px 3px; margin:2px">
                                            <div style="display:inline-block; width:55px; text-align:right;">
                                                {{ itemPoints.DisplayName }}:
                                            </div>
                                            <div
                                                    style="display:inline-block; width:50px;background-color:silver; text-align:right; padding:0 2px; vertical-align: top; opacity: 0.7">
                                                {{(itemPoints.AppealPoints === -1 ? itemPoints.Points :
                                                itemPoints.AppealPoints) }}
                                                <span v-if="itemPoints.AppealPoints !== -1">({{itemPoints.Points}})</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>


                    </div>
                </div>
            </div>
        </section>
        <modal-message ref="errors-modal" :error-messages="errorMessages"
                       info=""></modal-message>
    </div>
</template>

<script>
    import errorsMixin from './mixinErrors'
    import modalMessage from './modalMessage'


    export default {
        name: 'results',
        mixins: [errorsMixin],
        components: {
            'modal-message': modalMessage
        },
        data: () => {
            return {
                scripts: [],
            }
        },
        async mounted() {
            try {
                let response = await this.$axios.post(this.$globalState.apiUrl + '/scripts', {candidateId: this.$globalState.user.userId});

                if (this.ServerErrors(response)) {
                    this.showErrors()
                } else {
                    let scripts = response.data.scripts || [];

                    this.scripts = scripts.map((sc) => {
                        sc.showDetails = 0;
                        return sc
                    })

                }
            } catch (err) {
                this.showErrors(err.message)
            } finally {
                this.$globalState.user.userId = -1;
            }
        },
        methods: {}
    }
</script>

<style scoped>
    .btn {
        cursor: pointer;
    }

    .text-primary {
        color: #444;
    }

    .text-info {
        color: #444;
    }

    .text-bold {
        font-weight: bold;
    }

    .fade-enter-active, .fade-leave-active {
        transition: opacity .5s;
    }

    .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */
    {
        opacity: 0;
    }
</style>
