<template>

    <div class="bg">
      <img src="../assets/img/NaecLogo.png">
        <div class="filter"></div>
    </div>

</template>

<style scoped>
    .bg {
        position: fixed;
        -top: 0;
        left: 0;
        bottom: 0;
        -right: 0;
        -background-image: url('../assets/img/logo.png');
        background-attachment: fixed;
        background-position: center;
        background-repeat: no-repeat;
        background-size: contain;

        z-index: -2;

    }
    .filter {
        position: absolute;
        top: 0;
        left: 0;
       right: 0;
        bottom: 0;
        background-color: rgba(240, 240, 240, 0.4);
        z-index: -1;
    }

</style>
