<template>
    <div
        class="row"
        v-if="null == households"
    >
        <it-loading/>
    </div>
    <p v-else-if="households.length === 0">
        No households yet. Create one or join an existing household!
    </p>
    <template v-else>
        <div
            class="row"
            v-for="household in households"
            :key="household.id"
        >
            <HouseholdView
                :household="household"
                @change-color="changeColor(household.id, $event)"
                @delete="deleteHousehold(household.id)"
            />
        </div>
    </template>
    <div class="row">
        <it-button
            name="submit"
            type="primary"
            icon="add_circle"
            @click="openNewHouseholdModal"
        >
            Create Household
        </it-button>
    </div>
    <it-modal v-model="newHouseholdModal">
        <template #header>
            New Household
        </template>
        <template #body>
            <it-input
                labelTop="Name"
                prefix-icon="create"
                type="text"
                placeholder="My Household"
                @keypress.enter="createNewHousehold"
                :disabled="householdLoading"
                v-model="newHouseholdName"
            />
        </template>
        <template #actions>
            <it-button
                type="primary"
                icon="add_circle"
                @click="createNewHousehold"
                :loading="householdLoading"
            >
                Create
            </it-button>
            <it-button
                icon="cancel"
                @click="newHouseholdModal = false"
                :loading="householdLoading"
            >
                Cancel
            </it-button>
        </template>
    </it-modal>
</template>

<script lang="ts">
import {Options, Vue} from 'vue-class-component';
import {Household} from "@/models/Household";
import HouseholdView from "@/HouseholdView.vue";
import {Message} from 'equal-vue';

@Options({
    components: {HouseholdView},
    data: () => ({
        households: [] as Household[],
        newHouseholdModal: false as boolean,
        householdLoading: false as boolean,
        newHouseholdName: "" as string,
    }),
    props: {}
})

export default class Dashboard extends Vue {
    households: Household[]|null = null;
    newHouseholdModal: boolean = false;
    householdLoading: boolean = false;
    newHouseholdName: string = "";

    async mounted() {
        await this.fetchDashboardInfo();
    }

    async changeColor(householdId: number, color: string) {
        if (await window.client.setHouseholdColor(householdId, color)) {
            Message.success({text: 'Color change successful!'});
            if (null != this.households) {
                const houseHold = this.households.find(household => household.id === householdId);
                if (houseHold) {
                    houseHold.color = color;
                }
            }
        } else {
            Message.danger({text: 'There was a problem changing the color!'});
        }
    }

    async deleteHousehold(householdId: number) {
        if (await window.client.removeHousehold(householdId)) {
            Message.success({text: 'Household successfully removed!'});
            if (null != this.households) {
                this.households = this.households.filter(household => household.id !== householdId);
            }
        } else {
            Message.danger({text: 'Could not delete household!'});
        }
    }

    async fetchDashboardInfo() {
        this.households = await window.client.dashboardInfo();
    }

    async createNewHousehold() {
        this.householdLoading = true;
        if (await window.client.createHousehold(this.newHouseholdName)) {
            Message.success({text: 'Household created successfully!'});
            this.newHouseholdModal = false;
            await this.fetchDashboardInfo();
        } else {
            Message.danger({text: 'Household could not be created!'});
        }
        this.householdLoading = false;
    }

    openNewHouseholdModal() {
        this.newHouseholdModal = true;
    }
}
</script>

<style scoped>
    .row {
        display: flex;
        justify-content: center;
    }
</style>