<template>
    <div class="row">

    </div>
</template>

<script lang="ts">
import {Options, Vue} from 'vue-class-component';
import {Household} from "@/models/Household";

@Options({
    data: () => ({
        households: [] as Household[],
    }),
    props: {}
})

export default class Dashboard extends Vue {
    households: Household[] = [];

    async mounted() {
        this.households = await window.client.dashboardInfo();
    }
}
</script>

<style scoped>
    .row {
        display: flex;
    }
</style>