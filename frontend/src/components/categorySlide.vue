<script setup>

</script>

<template>
<marquee direction="left">
    <div class="categoryList">
        <div class="categoryItem">
            <img src="../images/horror.jpg" alt="">
            <p>Horror</p>
        </div>
        <div class="categoryItem">
            <img src="../images/download.jfif" alt="">
            <p>Actions</p>
        </div>
        <div class="categoryItem">
            <img src="../images/romcom.jfif" alt="">
            <p>Romcom</p>
        </div>
        <div class="categoryItem">
            <img src="../images/comedy.jfif" alt="">
            <p>Comedy</p>
        </div>
        <div class="categoryItem">
            <img src="../images/sci-fi.jpg" alt="">
            <p>Thriller</p>
        </div>
        <div class="categoryItem">
            <img src="../images/animation.jfif" alt="">
            <p>Animation</p>
        </div>
        <div class="categoryItem">
            <img src="../images/Kdrama.jfif" alt="">
            <p>Korean Drama</p>
        </div>
        <div class="categoryItem">
            <img src="../images/fantasy.jfif" alt="">
            <p>Fantasy</p>
        </div>
        <div class="categoryItem">
            <img src="../images/adventure.jfif" alt="">
            <p>Adventure</p>
        </div>
    </div>
 </marquee>
</template>

<style scoped>
    .categoryList {
        display: flex;
        padding: 10px;
        margin-top: 10px;
    }
    .categoryItem {
        min-width: 150px;
        height: 150px;
        background-color: #000000;
        margin-right: 10px;
        border-radius: 8px;
    }
    .categoryItem p {
        color: white;
        text-align: center;
        margin-top: 5px;
    }
    .categoryItem img {
        width: 100%;
        height: 70%;
        border-radius: 8px;
        object-fit: cover;
    }
</style>    