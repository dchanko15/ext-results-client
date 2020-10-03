import moment from 'moment'

const Roles = {
    guest: -1,
    user1: 1,
    user2: 2,
    user3: 4,
    admin: 99
};

const globalState = {
    apiUrl: process.env.VUE_APP_API_URL,
    baseUrl: process.env.BASE_URL,
    activityId: process.env.VUE_APP_ACTIVITYID,
    showDetails: process.env.VUE_APP_SHOWDETAILS,


    user: {
        userId: 0,
        role: -1,
        lastName: '',
        firstName: ''

    },

    scheduleTable: [
        /*{startDate: '2018-01-01 00:00', endDate: '2018-02-08 10:00', scheduleStage: 0},*/
    ],
    navMenu: [
            /*{
                "role": -1,
                "scheduleStage": 1,
                "options": {"readonly": 1},
                "menuItems": [
                    ["/","ავტორიზაცია","svg","icon-log-in"]
                ]
            }*/
    ],
    subjects:[],
    programs:[],
    getCurrentStage: function () {
        return this.scheduleTable
            .find((el) => {
                let now = moment();
                return (now >= moment(el.startDate) && now < moment(el.endDate));
            })
    }
};

export  {
    globalState,
    Roles,
}
