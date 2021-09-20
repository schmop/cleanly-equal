<template>
    <div class="household-view">
        <div class="heading">
            <it-avatar
                :src="household.picture"
            />
            <p class="household-name">{{ household.name }}</p>
        </div>
        <TaskView
            v-for="task in household.tasks"
            :key="task.uuid"
            :task="task"
        />
    </div>
</template>

<script lang="ts">
import {Options, Vue} from 'vue-class-component';
import TaskView from '@/TaskView.vue';
import {Household} from "@/Models/Household";
import {PropType} from "vue";

@Options({
    components: {TaskView},
    data: () => ({}),
    props: {
        household: Object as PropType<Household>
    }
})

export default class HouseholdView extends Vue {

}
</script>

<style scoped>
.household-view {
    border: 1px solid rgb(211, 218, 230);
    border-radius: 4px;
    padding: 4px;
}

.heading {
    display: flex;
    flex-direction: row;
    justify-content: center;
    font-size: 2em;
    margin-bottom: 20px;
}

.household-name {
    display: flex;
    flex-direction: column;
    margin-left: 8px;
    justify-content: center;
}
</style>