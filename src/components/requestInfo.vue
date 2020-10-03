<template>
    <div>
        <div class="row center-xs">
            <div class="col-xs-12 col-sm-12 col-md-12  col-lg-11">
                <section>
                    <form @submit.prevent="regSubmit">
                        <div class="row">
                            <div class="col-xs-12">
                                <h2 class="header">ინფორმაციის მოთხოვნა</h2>
                            </div>
                        </div>

                        <div class="row ">
                            <div class="col-xs-12  col-md-6 ">
                                <ui-textbox
                                        help="პირადი ნომერი"
                                        :invalid="errors.has('IDNum')"
                                        :error="errors.first('IDNum')"
                                        v-validate="{required: true,regex:/^[0-9]{11}$/ }"
                                        name="IDNum"
                                        autocomplete="off"
                                        v-model="IDNum">
                                </ui-textbox>
                            </div>
                        </div>
                        <div class="row ">
                            <div class="col-xs-12 col-md-6 ">
                                <ui-textbox
                                        help="გვარი (ქართულად)"
                                        v-validate="{required: true, min:2, regex: /^([\-ა-ჰ]+)$/} "
                                        :invalid="errors.has('lastName')"
                                        :error="errors.first('lastName')"
                                        v-model="lastName"
                                        autocomplete="off"
                                        name="lastName">
                                </ui-textbox>
                            </div>
                            <div class="col-xs-12 col-md-6  ">
                                <ui-textbox
                                        help="სახელი (ქართულად)"
                                        v-validate="{required: true, min:2, regex: /^([\-ა-ჰ]+)$/}"
                                        :invalid="errors.has('firstName')"
                                        :error="errors.first('firstName')"
                                        v-model="firstName"
                                        autocomplete="off"
                                        name="firstName">
                                </ui-textbox>

                            </div>
                        </div>
                        <!--<div class="col-xs-12  col-md-6  ">
                            <ui-textbox
                                    help="დაბადების თარიღი (DD/MM/YYYY)"
                                    :invalid="errors.has('birthDate')"
                                    :error="errors.first('birthDate')"
                                    v-validate="'required|date_format:DD/MM/YYYY'"
                                    name="birthDate"
                                    v-model="birthDate">
                            </ui-textbox>
                        </div>-->

                        <div class="row">
                            <div class="col-xs-12  col-md-6  ">
                                <ui-textbox
                                        :invalid="errors.has('email')"
                                        :error="errors.first('email')"
                                        v-validate="'required|email'"
                                        name="email"
                                        help="ელ. ფოსტა"
                                        autocomplete="off"
                                        v-model="email">
                                </ui-textbox>
                            </div>

                            <div class="col-xs-12  col-md-6  ">
                                <ui-textbox
                                        :invalid="errors.has('mobilePhone')"
                                        :error="errors.first('mobilePhone')"
                                        v-validate="{required:true , regex:/^5[0-9]{8}$/}"
                                        name="mobilePhone"
                                        help="მობილურის ნომერი (5XXYYYYYY)"
                                        autocomplete="off"
                                        v-model="mobilePhone">
                                </ui-textbox>
                            </div>
                        </div>

                        <hr>
                        <div class="row">
                            <div class="col-xs">
                                <ui-textbox
                                        enforce-maxlength
                                        help="მაქსიმუმ 2000 სიმბოლო"
                                        label="აღწერეთ ინფორმაცია, რომლის მიღებაც გსურთ"
                                        data-vv-as = "მოთხოვნილი ინფორმაცია"
                                        :multi-line="true"
                                        :maxlength="2048"
                                        name="requestText"
                                        :invalid="errors.has('requestText')"
                                        :error="errors.first('requestText')"
                                        v-validate="{required:true}"

                                        v-model="requestText">

                                </ui-textbox>
                            </div>
                        </div>


                        <div class="row">

                            <!--   <div class="col-xs-6 " style="text-align: left">
                                   <ui-button color="primary" @click="prevPage" button-type="button"
                                              icon="arrow_back_ios">

                                       დაბრუნება
                                   </ui-button>
                               </div>-->
                            <div class="col-xs end-xs">
                                <ui-button color="primary" icon-position="right" icon="send">

                                    მოთხოვნის გადაგზავნა
                                </ui-button>
                            </div>
                        </div>
                    </form>

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


    export default {
        name: "requestInfo",
        components: {
            'modal-message': modalMessage,
        },
        mixins: [mixinErrors],
        data: function () {
            return {
                lastName: '',
                firstName: '',
                IDNum: '',
                mobilePhone: '',
                birthDate: '',
                email: '',
                requestText: ""
            }
        },
        methods: {
            async regSubmit() {
                try {
                    let validationResult = await this.$validator.validateAll();
                    if (validationResult) {
                        let {email, IDNum, lastName, firstName, mobilePhone, requestText} = this.$data;
                        let postRes = await this.$axios.post(this.$globalState.apiUrl + '/send-request', {
                            email,
                            IDNum,
                            lastName,
                            firstName,
                            mobilePhone,
                            requestText
                        });

                        let results = postRes.data;

                        if (this.ServerErrors(postRes)) {
                            this.showErrors()
                        } else {

                        }
                    } else {
                        this.showErrors('')
                    }
                } catch (err) {
                    this.showErrors(err.message)
                }
            },
        }
    }
</script>

<style scoped>

</style>