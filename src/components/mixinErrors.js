export default {
    data: function () {
        return {
            errorMessages: [],
            displayErrors: 0,
        }
    },

    methods: {
        /**
         * @return {boolean}
         */
        ServerErrors(postRes) {
            let errs = false;

            let result = postRes && postRes.data;
            this.errorMessages.length = 0;
            if (result && result.errors) {
                this.errorMessages = result.errors.reduce(function (errStr, curr, ind) {
                    errStr.push({fieldNo: ind, message: curr});
                    return errStr;
                }, []);
                errs = true;
            }
            return errs;
        },
        showErrors(errMessage) {
            if (errMessage) {
                this.errorMessages.length = 0;
                this.errorMessages.push({fieldNo: -1, message: errMessage});
            }
            this.$refs['errors-modal'].open();
        }
    }
}
