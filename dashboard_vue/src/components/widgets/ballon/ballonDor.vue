<template>
    <div class="containerBallons">
        <p>Year: {{ ballonDor.year }}</p>
        <p>PLayer: {{ ballonDor.player }}</p>
        <p>Country: {{ ballonDor.nationality }}</p>
        <p>Club: {{ ballonDor.club }}</p>
    </div>
    
</template>

<script>
export default{
    props: ["ballonDor"]
}
</script>

<style>
.containerBallons{
    background-color: rgb(83, 183, 222);
    border-radius: 20px;
    display:grid;
    grid-template-columns: repeat(2, 40%);
    margin: 5px;
    padding: 9px;
}
</style>
