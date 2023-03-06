<template>
    <p>Name: {{ location.EnglishName }}</p>
    <p>Type: {{ location.Type }}</p>
    <p>Respective Country: 
        {{ location.Country.ID }}, 
        {{ location.Country.EnglishName }}, 
        {{ location.AdministrativeArea.LocalizedName }}</p>
    <p>Timezone: 
        {{ location.TimeZone.Code }} 
        (GMT{{ location.TimeZone.GmtOffset }})</p>
    
    <p>----------------</p>
</template>

<script>
export default{
    props: ['location']
}
</script>