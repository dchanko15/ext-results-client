<template>
    <div>
        <div class="row center-xs">
            <div class="col-xs-12 col-sm-12 col-md-9 col-lg-7">
                <section>
                    <div class="row ">

                        <div class="col-xs-12  col-md-4  center-xs bordered-right">
                            <img src="../assets/img/login_07.png"  style="max-width: 130px; width: 100%">

                        </div>
                        <div class="col-xs-12  col-md-8 ">
                            <form @submit.prevent="loginSubmit">
                                <div class="row ">
                                    <div class="col-xs-12 ">
                                        <h3 class="header" style="color: #364c8c;"> ავტორიზაცია</h3>
                                    </div>
                                </div>

                                <div class="row ">
                                    <div class="col-xs">
                                        <ui-textbox
                                                help="პირადი ნომერი"
                                                :invalid="errors.has('userName')"
                                                :error="errors.first('userName')"
                                                v-validate="{required: true}"
                                                data-vv-as="პირადი ნომერი"
                                                name="userName"
                                                autocomplete="off"
                                                :autofocus="true"
                                                v-model="userName">
                                        </ui-textbox>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-xs">
                                        <ui-textbox type="password"
                                                    help="პაროლი"
                                                    v-model="password"
                                                    name="password"
                                                    ref="password"
                                                    v-validate="{required:true}"
                                                    data-vv-as="პაროლი"
                                                    :invalid="errors.has('password')"
                                                    :error="errors.first('password')">
                                            <!--     <i slot="icon" class="fa fa-key"></i>-->

                                        </ui-textbox>
                                    </div>
                                </div>
                                <div class="row ">
                                    <div class="col-xs" style="text-align: right">
                                        <ui-button color="primary" icon-position="right">
                                            <!-- <div slot="icon">
                                               <i class="fas fa-2x fa-sign-in-alt"></i>
                                             </div>
                                             -->
                                            ავტორიზაცია
                                            <div slot="icon">
                                                <svg height="20px" width="20px" fill="white">
                                                    <use xlink:href="svgicons1.svg#icon-log-in"/>
                                                </svg>
                                            </div>
                                        </ui-button>
                                    </div>
                                </div>
                            </form>
                            <hr>
                        </div>
                    </div>
                    <br>
                    <ui-alert type="error" v-show="displayErrors_" @dismiss="closeAlert">{{errorText}}</ui-alert>
                </section>
            </div>


        </div>
        <modal-message ref="errors-modal" :error-messages="errorMessages"
                       info="">შეცდომაა</modal-message>
    </div>
</template>

<script>
    import errorMixin from './mixinErrors'
    import modalMessage from './modalMessage'
    import UiAlert from "keen-ui/src/UiAlert";


    export default {
        name: 'serLogin',
        mixins: [errorMixin],
        components: {
            UiAlert,
            'modal-message': modalMessage,
        },
        data: function () {
            return {
                userName: '',
                password: '',
                userId: 0,
                role: 0,
                displayErrors_: false,
                errorText:"",
                timer:undefined
            }
        },
        mounted() {
            // this.$validator.localize('ka')

        },
        methods: {
            closeAlert(){
                 this.displayErrors_=false;
                 clearTimeout(this.timer)
            },
            async loginSubmit() {
                try {
                    let validationResult = await this.$validator.validateAll();
                    if (validationResult) {

                         let postData = {idNum: this.userName, password: this.password, orgId: this.$globalState.activityId};
                         let postRes = await this.$axios.post(this.$globalState.apiUrl + '/login', postData);

                         if (this.ServerErrors(postRes)) {
                             //this.showErrors()
                             this.displayErros("აპლიკანტი ვერ მოიძებნა");
                         } else {
                             let results = postRes.data;
                             this.userId = +results.candidateId;
                             this.loginSuccess();
                         }

                    } else {
                        this.displayErros("გადაამოწმეთ შეტანილი ინფორმაცია");
                    }
                } catch (err) {
                    this.showErrors(err.message)
                }
            },
            displayErros(errorText){
                this.displayErrors_=true;
                this.errorText = errorText;
                this.timer = setTimeout(()=>{this.displayErrors_=false},3000)
            },

            loginSuccess() {
                this.$globalState.user.userId = this.userId;
                this.$globalState.user.role = 1;
                this.userName= '';
                this.password='';
                this.$router.push('/results');
            },
        }

    }
</script>

<style scoped>

</style>
