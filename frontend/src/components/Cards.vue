<script setup>
</script>

<template>
    <h1>Experience <span>Magic on Screen</span></h1>
 <div class="main">
    <div class="card">
        <div class="img-container">
            <img src="../images/inception.jfif" alt="Inception">
            <p class="desc">A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.</p>
        </div>
        <h2>Inception</h2>
        <div class="info">
            <div class="info-item">2010</div>
            <div class="info-item">3.5 &#127775;&#127775;&#127775;</div>
        </div>
    </div>
    <div class="card">
        <div class="img-container">
            <img src="../images/interstellar.jfif" alt="Interstellar">
            <p class="desc">A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.</p>
        </div>
        <h2>Interstellar</h2>
        <div class="info">
            <div class="info-item">2000</div>
            <div class="info-item">5.5 &#127775;&#127775;&#127775;&#127775;&#127775;</div>
        </div>
    </div>
    <div class="card">
        <div class="img-container">
            <img src="../images/darkknight.jfif" alt="The Dark Knight">
            <p class="desc">When the menace known as the Joker emerges from his mysterious past, he wreaks havoc and chaos on the people of Gotham.</p>
        </div>
        <h2>The Dark Knight</h2>
        <div class="info">
            <div class="info-item">1995</div>
            <div class="info-item">4.5 &#127775;&#127775;&#127775;&#127775;</div>
        </div>
    </div>
    <div class="card">
        <div class="img-container">
            <img src="../images/avatar.jfif" alt="Avatar">
            <p class="desc">A paraplegic Marine dispatched to the moon Pandora on a unique mission becomes torn between following his orders and protecting the world he feels is his home.</p>
        </div>
        <h2>Avatar</h2>
        <div class="info">
            <div class="info-item">2010</div>
            <div class="info-item">2.5 &#127775;&#127775;</div>
        </div>
    </div>
    <div class="card">
        <div class="img-container">
            <img src="../images/Godfather.jfif" alt="The Godfather">
            <p class="desc">The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.</p>
        </div>
        <h2>The Godfather</h2>
        <div class="info">
            <div class="info-item">1890</div>
            <div class="info-item">5.5 &#127775;&#127775;&#127775;&#127775;&#127775;</div>
        </div>
    </div>
    <div class="card">
        <div class="img-container">
            <img src="../images/Parasite.jfif" alt="Parasite">
            <p class="desc">Greed and class discrimination threaten the newly formed symbiotic relationship between the wealthy Park family and the destitute Kim clan.</p>
        </div>
        <h2>Parasite</h2>
        <div class="info">
            <div class="info-item">2019</div>
            <div class="info-item">5.5 &#127775;&#127775;&#127775;&#127775;&#127775;</div>
        </div>
    </div>
    <div class="card">
        <div class="img-container">
            <img src="../images/forrestgump.jfif" alt="Forrest Gump">
            <p class="desc">The presidencies of Kennedy and Johnson, the Vietnam War, and other history unfold through the perspective of an Alabama man with an IQ of 75.</p>
        </div>
        <h2>Forrest Gump</h2>
        <div class="info">
            <div class="info-item">2015</div>
            <div class="info-item">3.5 &#127775;&#127775;&#127775;</div>
        </div>
    </div>
    <div class="card">
        <div class="img-container">
            <img src="../images/shawshank.jfif" alt="The Shawshank Redemption">
            <p class="desc">Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.</p>
        </div>
        <h2>The Shawshank Redemption</h2>
        <div class="info">
            <div class="info-item">2021</div>
            <div class="info-item">5.5 &#127775;&#127775;&#127775;&#127775;&#127775;</div>
        </div>
    </div>
    <div class="card">
        <div class="img-container">
            <img src="../images/pulpfiction.jfif" alt="Pulp Fiction">
            <p class="desc">The lives of two mob hitmen, a boxer, a gangster's wife, and a pair of diner bandits intertwine in four tales of violence and redemption.</p>
        </div>
        <h2>Pulp Fiction</h2>
        <div class="info">
            <div class="info-item">1990</div>
            <div class="info-item">4.5 &#127775;&#127775;&#127775;&#127775;</div>
        </div>
    </div>
</div>
</template>

<style scoped>
    h1{
        color: white;
        text-align: center;
        margin-top: 20px;
        font-family: 'Arial Black', Gadget, sans-serif;
    }
    h1 span{
        color: #ff5733;
    }
    .main {
        display: flex;
        justify-content: center;
        gap: 25px;
        padding: 20px;
        width: 100%;
        flex-wrap: wrap;
    }

    .card {
        background-color: #1c1c1c;
        border-radius: 8px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
        width: 320px;
        padding: 15px;
        color: white;
        text-align: center;
    }

    .img-container {
        position: relative;
        width: 100%;
        height: 180px;
        border-radius: 8px;
        overflow: hidden;
    }
    .img-container img {
        width: 100%;
        height: 100%;
        border-radius: 8px;
        display: block;
    }
    .desc {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.8);
        color: #fff;
        opacity: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 20px;
        font-size: 14px;
        line-height: 1.5;
        border-radius: 8px;
        transition: opacity 0.3s;
        text-align: center;
        pointer-events: none;
    }
    .img-container:hover .desc {
        opacity: 1;
        pointer-events: auto;
    }

    .card h2 {
        margin: 15px 0 10px 0;
    }

    .card p {
        font-size: 14px;
        line-height: 1.5;
        display: none;
    }
    .card:hover p {
        display: block;
        cursor: pointer;

    }
    .info{
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        margin-top: 10px;
    }
    .info-item{
        font-size: 15px;
        color: #bbb;
    }
</style>