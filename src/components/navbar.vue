<template>
    <div style="position: fixed; top:0; left:5px;  right:0px; z-index:1;  ">
        <div class="topnav" :class="{responsive: isCollapsed, shrinked: isShrinked   }">
            <div class="fullWidthContainer">
                <a class="menuIcon" @click="showMenu()">
                    <svg width="20px" height="20px" fill="#0d6d8e">
                        <use xlink:href="svgIcon(icon-menu)"/>
                    </svg>
                </a>
                <div class="logo">
                    <div style="text-align: center">
                        <span style="font-weight: bold">საგარეო საქმეთა სამინისტროს თანამშრომელთა<br/> შესარჩევი კონკურსი</span>
                    </div>

                </div>

                <!--  <div class="mobile"></div>-->
                <div class="menuItemContainer">
                    <div v-for="menuItem in navmenu" :key="menuItem[0]">
                        <router-link v-if="menuItem[0][0]!=='#'" :to="menuItem[0]">
                            <svg v-if="menuItem[2]==='svg'" width="24px" height="24px" fill="rgba(255,255,255,0.8)">
                                <use :xlink:href="svgIcon(menuItem[3])"/>
                            </svg>
                            <i v-if="menuItem[2] && menuItem[2]!=='svg'" :class="menuItem[2]"
                               style="font-size: 1.2em"></i>
                            <div style="display: inline-block; vertical-align: super; padding-left: 5px">
                                {{menuItem[1]}}
                            </div>
                        </router-link>
                        <a v-else :href="menuItem[0]">
                            <svg v-if="menuItem[2]==='svg'" width="24px" height="24px" fill="rgba(255,255,255,0.8)">
                                <use :xlink:href="svgIcon(menuItem[3])"/>
                            </svg>

                            <i v-if="menuItem[2] && menuItem[2]!=='svg'" :class="menuItem[2]"
                               style="font-size: 1.2em"></i>
                            <div style="display: inline-block; vertical-align: super">{{menuItem[1]}}</div>
                        </a>
                    </div>
                </div>
            </div>
        </div>
        <span v-show="userName"> {{userName}}</span>
    </div>
</template>

<script >
    export default {
        name: 'navbar',
        props: ['shrinked', 'menu'],
        data: function () {
            return {
                isCollapsed: 0,
                isScrolled: 0
            }
        },
        computed: {
            isShrinked: function () {
                return this.isScrolled || this.shrinked
            },
            navmenu: function () {
                return this.menu
            },
            userName: function () {
                return this.$globalState.user.lastName + " " + this.$globalState.user.firstName;
            }

        },
        methods: {
            showMenu: function () {
                this.isCollapsed = this.isCollapsed ? 0 : 1
            },
            handleScroll: function () {
                if (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
                    this.isScrolled = 1
                } else {
                    this.isScrolled = 0
                }
            },
            svgIcon(iconName) {
                return  this.$globalState.baseUrl+'svgicons1.svg#' + iconName
            }
        },
        // bind event handlers to the `handleResize` method (defined below)
        mounted: function () {
            window.addEventListener('scroll', this.handleScroll)
        },
        beforeDestroy: function () {
            window.removeEventListener('scroll', this.handleScroll)
        }

    }
</script>

<style scoped>
    .topnav {
        overflow: hidden;
        transition: 0.4s;
        padding-top: 12px;
        width: 100%;
        font-family: bpg_web_001_caps, sans-serif;
        font-size: 1.1em;
        color: #364c8c;
        background-color: rgba(240, 240, 240, 0.7);
    }


    .topnav .logo {
        display: flex;

        -float: left;
        transition: 0.4s;
        justify-content: center;
        font-size: 2em;
        line-height: 1.1;



    }

    .topnav .logo img {
        height: 120px;

    }

    a.logo:hover {
        border: none
    }

    .topnav .companyName {
        font-family: bpg_web_001_caps, sans-serif;
        padding-left: 0.1em;
        text-align: left;

        font-size: 4em;
        -color: #23589a;
        color: rgba(255, 255, 255, 0.8);
        display: inline-block;
        max-width: 290px;
        top: 5px;
    }

    .topnav .fullWidthContainer {

        max-width: 1200px;
        width: 100%;
        height: 100%;
        margin: 0 auto;
        padding: 0 15px;

    }

    .topnav .menuItemContainer {
        display: flex;
        justify-content: flex-end;
        padding-top: 10px;

    }

    .topnav .mobile {
        display: none;
    }

    .topnav a {
        border: 2px solid transparent;
        padding: 0.5em 0.7em 0.5em 0.7em;
        text-decoration: none;

        -color: #0d6d8e;
        color: rgba(255, 255, 255, 0.8);
        transition: 0.3s;
        display: inline-block;
        align-items: center;

    }

    .topnav a.logo {
        border: none;

    }

    .topnav a:hover {
        --border-bottom: 2px solid #149dcc;
        -border-bottom: 2px solid #0d6d8e;
        border-bottom: 2px solid rgba(255, 255, 255, 0.8);

    }

    .topnav a.logo:hover {
        border: none;

    }

    .topnav.shrinked {
        padding: 7px 0 7px;
        background-color: white;
        -opacity: 0.95;
        border-bottom: 1px solid rgba(255, 255, 255, 0.8);
        -height: 65px;

    }

    .topnav.shrinked .logo {
        padding-top: 7px;
        height: 100%;
    }

    .topnav.shrinked .logo img {
        height: 65px;
    }

    .topnav.shrinked .companyName {
        -font-size: 2em;
    }

    .topnav .menuIcon {
        display: none;
    }

    @media screen and (max-width: 700px) {
        .topnav {
            padding: 0;
        }

        .topnav .logo {
            padding-top: 7px;
            font-size: 1.2em;
        }

        .topnav .companyName {

            font-size: 1.1em;
            max-width: 250px;

        }

        .topnav .menuItemContainer {
            flex-direction: column;
            -background-color: white;
            opacity: 1;
            clear: both;
        }

        /* .topnav .mobile {
             display: block;
             -height: 55px;
         }*/
        .topnav a {
            display: none;
        }

        .topnav .menuIcon {
            float: right;
            display: block;
            cursor: pointer;
            border: none;
        }

        .topnav .menuIcon:hover {
            border: none;

        }

        .topnav.responsive {
            width: 100%;
            z-index: 10;
            -overflow: hidden;

        }

        .topnav.responsive .menuIcon {
            float: right;
            display: block;
            cursor: pointer;
            border: none;
        }


        .topnav.responsive .menuIcon:hover {

            border: none;
        }

        .topnav.responsive a {
            float: none;
            display: block;
            transition: 0s;
            text-align: center;
            color: white;
        }

        .topnav.responsive a:hover {
            --background-color: white;
            border-bottom: 2px solid white;

        }

        .topnave.responsive .menuIcon:hover {
            background-color: rgba(3, 3, 3, 0.5);
            border-bottom: none;
            color: white;
        }
    }
</style>
