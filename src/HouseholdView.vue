<template>
    <div
        class="household-view"
        :style="style"
    >
        <div class="heading">
            <it-avatar
                :src="household.picture"
            />
            <p class="household-name">{{ household.name }}</p>
            <it-dropdown
                :clickable="true"
                placement="bottom-right"
            >
                <it-icon
                    outlined
                    name="more_vert"
                    class="icon-button"
                />
                <template v-slot:menu>
                    <it-dropdown-menu>
                        <it-popover
                            borderless
                            placement="left"
                            ref="colorPicker"
                            @click.stop
                        >
                            <it-dropdown-item
                                icon="palette"
                            >
                                Change color
                            </it-dropdown-item>
                            <template #content>
                                <it-colorpicker
                                    :value="color"
                                    @change="setColor"
                                    disableAlpha
                                />
                            </template>
                        </it-popover>
                        <it-dropdown-item
                            icon="delete"
                            @click="confirmModal = true"
                            class="item-danger"
                        >
                            Delete
                        </it-dropdown-item>
                    </it-dropdown-menu>
                </template>
            </it-dropdown>
        </div>
        <template
            v-if="household.tasks && household.tasks.length > 0"
        >
            <TaskView
                v-for="task in household.tasks"
                :key="task.uuid"
                :task="task"
            />
        </template>
        <p v-else>No tasks yet!</p>
        <it-modal v-model="confirmModal">
            <template #header>
                <h3>Household</h3>
            </template>
            <template #body>
                This household will be deleted permanently.<br/>
                All members are being kicked and all data regarding this household will be lost.
            </template>
            <template #actions>
                <it-button @click="confirmModal = false">Cancel</it-button>
                <it-button
                    type="danger"
                    @click="deleteHousehold"
                >
                    Delete
                </it-button>
            </template>
        </it-modal>
    </div>
</template>

<script lang="ts">
import TaskView from '@/TaskView.vue';
import {Household} from "@/models/Household";
import {defineComponent, PropType} from "vue";
import {TColorData} from 'equal-vue/src/components/colorpicker/types';

export default defineComponent({
    components: {
        TaskView,
    },
    emits: [
        'change-color',
        'delete',
    ],
    data: () => ({
        color: '#233662',
        confirmModal: false,
    }),
    props: {
        household: Object as PropType<Household>
    },
    beforeMount() {
        this.color = this.household?.color || this.color;
    },
    mounted() {
        this.$watch(() => (this.$refs.colorPicker as any).show, (show: boolean) => {
            if (!show) {
                this.$emit('change-color', this.color);
            }
        });
    },
    computed: {
        style() {
            return 'background-color: ' + this.color;
        }
    },
    methods: {
        setColor(color: TColorData) {
            this.color = color.hex;
        },
        deleteHousehold() {
            this.confirmModal = false;
            this.$emit('delete');
        }
    }
});

</script>

<style scoped>
.household-view {
    border: 1px solid rgb(211, 218, 230);
    border-radius: 4px;
    padding: 4px;
    width: 100%;
    color: white;
}

.heading {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 4px;
    font-size: 2em;
    margin-bottom: 20px;
    border-bottom: 1px solid rgb(211, 218, 230);
}

.household-name {
    display: flex;
    flex-direction: column;
    margin-left: 8px;
    justify-content: center;
}

.icon-button {
    display: flex;
    flex-direction: column;
    justify-content: center;
    cursor: pointer;
    width: 40px;
}

.item-danger {
    background-color: #f93155;
    color: white;
}
</style>