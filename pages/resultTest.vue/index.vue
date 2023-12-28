<template>
    <div class="result">
        <ToNewTest/>
    </div>
</template>
<script> 
import ToNewTest from '~/components/Commons/ToNewTest.vue';

export default {
    data() {
        return {};
    },
    comments: {
        ToNewTest,
    },
    components: { ToNewTest }
}
</script>

<style scoped lang="scss">

</style>