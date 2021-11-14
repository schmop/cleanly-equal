<template>
    <div class="row">
        <it-number-input
            ref="test"
            type="number"
            resize-on-write
            :label-top="labelTop"
            :name="name"
            :model-value="lastValue"
            :disabled="disabled"
            @update:modelValue="lastValue = $event"
        />
        <it-select
            :options="intervalSizes"
            v-model="modifier"
            class="max-content"
        />
    </div>
</template>

<script lang="ts">
import {defineComponent, PropType, watch} from "vue";

export default defineComponent({
    name: "IntervalPicker",
    emits: [
        'update:modelValue',
    ],
    props: {
        modelValue: Number as PropType<number>,
        modifierValue: Number as PropType<number>,
        name: String as PropType<string>,
        labelTop: String as PropType<string>,
        disabled: Boolean as PropType<boolean>,
    },
    data: () => ({
        lastValue: 0,
        modifier: {name: 'Tage', value: 1},
        intervalSizes: [
            ['Tage', 1],
            ['Wochen', 7],
            ['Monate', 30],
            ['Jahre', 365],
        ].map(array => ({name: array[0], value: array[1]})),
    }),
    async mounted() {
        this.lastValue = this.modelValue ?? 0;
        watch(() => [this.lastValue, this.modifier], this.sendUpdate);
        // arbitrary value that happens to prevents resizes
        await this.$nextTick();
        (this.$refs.test as any).width += 13;
    },
    methods: {
        sendUpdate() {
            this.$emit('update:modelValue', this.lastValue * this.modifier.value);
        }
    }
});
</script>

<style scoped>
    .row {
        display: flex;
        flex-direction: row;
        align-items: end;
        justify-content: space-between;
        padding: 8px 0;
    }
    .max-content {
        margin-left: 16px;
        width: 100%;
        width: -moz-available;
        width: -webkit-fill-available;
        width: fill-available;
    }
</style>