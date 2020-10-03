import {schedule, navMenu} from './globalstate'

export default {
    data: () => {
        return {
            menuOptions: {},
        }
    },
    created() {
        this.validateStage(this.allowedStages);
    },
    methods: {
        currentStage() {
            return this.$globalState.getCurrentStage();
        },
        getMenu() {
            let stage = this.currentStage();
            let navMenu = this.$globalState.navMenu;

            let user = this.$globalState.user;
            let menu = navMenu.find(menuItem => {
                return menuItem.role === user.role && menuItem.scheduleStage === stage.scheduleStage;
            });
            if (menu) {
                if (menu.options) {
                    this.menuOptions = menu.options;
                }
                let route = this.$route.path;
                let menuItems = menu.menuItems.slice(0);
                let ind = menuItems.findIndex(el => {
                    return el[0] === route;
                });
                if (ind >= 0) {
                    menuItems.splice(ind, 1);
                }
                return menuItems;
            }
        },

        validateStage(allowedStages) {
            {
                if (allowedStages && Array.isArray(allowedStages) && allowedStages.length > 0) {
                    let stage = this.currentStage();
                    if (!allowedStages.includes(stage.scheduleStage)) {
                        this.$router.replace('/404')
                    }
                }
            }
        }
    }

}


