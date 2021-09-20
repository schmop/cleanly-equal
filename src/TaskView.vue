<template>
    <div class="task" :style="'border: 1px solid ' + task.color">
        <div class="row pull-left">
            <it-icon
                box
                :box-color="task.color"
                color="white"
                :name="task.icon"
            />
            <span class="name">{{ task.name }}</span>
        </div>
        <div class="row">
            <Progressbar
                :height="28"
                :show-tooltip="false"
                :progress="progress"
                :text="timeLeft"
            />
        </div>
    </div>
</template>

<script lang="ts">
import {Options, Vue} from 'vue-class-component';
import Progressbar from '@/Progressbar.vue';
import {Task} from "@/Models/Task";
import {PropType} from "vue";

@Options({
    components: {Progressbar},
    data: () => ({}),
    props: {
        task: Object as PropType<Task>
    }
})

export default class TaskView extends Vue {
    task: Task | null = null;

    get progress() {
        if (null == this.task!.lastComplete) {
            return 0;
        }
        const durationInMs = this.task!.duration * 60 * 1000;
        const percentage = this.timeSinceLastCompleted / durationInMs * 100;

        return Math.max(0, percentage);
    }

    get timeLeft() {
        if (null == this.task!.lastComplete) {
            return "Noch nie gemacht"
        }
        const minutesSinceLastCompleted = this.timeSinceLastCompleted / 1000 / 60;
        if (minutesSinceLastCompleted > this.task!.duration) {
            const timeBehindInDays = Math.floor((minutesSinceLastCompleted - this.task!.duration) / 60 / 24);

            return `${timeBehindInDays} Tage hinterher`
        }
        const daysLeft = Math.floor((this.task!.duration - minutesSinceLastCompleted) / 60 / 24);

        return `${daysLeft} Tage Zeit`;
    }

    get timeSinceLastCompleted() {
        return (new Date()).getTime() - this.task!.lastComplete!.getTime();
    }

}
</script>

<style scoped>
.pull-left {
    display: flex;
    align-self: flex-start;
}
.task {
    border-radius: 4px;
    padding: 4px;
    margin: 4px;
}
.name {
    display: inline-flex;
    flex-direction: column;
    justify-content: center;
    margin-left: 8px;
}
</style>