<template>
    <div class="it-progress-wrapper">
        <div
            class="it-progress-bar"
            :style="{ height: `${height}px` }"
        >
            <span class="overlay">{{ text }}</span>
            <div
                class="it-progress-line"
                :style="[{ width: `${progress ?? 100}%` }, {'background-color': color}]"
            >
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import {Options, Vue} from 'vue-class-component';


@Options({
    props: {
        progress: {
            type: Number,
            default: 0,
            validator: (val: number) => val >= 0 && val <= 100,
        },
        height: { type: Number, default: 7, validator: (val: number) => val > 0 },
        text: {
            type: String,
            default: '',
        }
    }
})

export default class Progressbar extends Vue {
    progress: number|null = 0;

    get color() {
        if (null === this.progress) {
            return 'gray';
        }
        const green = [51, 191, 0] as number[];
        const red = [191, 45, 0] as number[];
        const inverseProgress = 1 - (this.progress / 100);
        const mergedColor = green.map(
            (val, index) => val * (this.progress ?? 0 / 100) + red[index] * inverseProgress
        );

        return `rgb(${mergedColor.join(', ')})`
    }
}
</script>
<style scoped>
.overlay {
    position: absolute;
    left: 50%;
    transform: translate(-50%, 25%);
    z-index: 20;
    font-weight: bold;
}
</style>