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
            <HouseholdContextMenu
                :is-admin="isAdmin"
                :household="household"
                @change-color="$emit('change-color', $event)"
                @delete="$emit('delete')"
            />
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
        <div
            class="household-footer"
            v-if="isAdmin"
        >
            <it-button
                class="dark-font"
                icon="add"
                type="default"
                @click="newTaskModal = true"
            >
                Task hinzufügen
            </it-button>
        </div>
    </div>
    <it-modal v-model="newTaskModal">
        <template #header>
            New Task
        </template>
        <template #body>
            <it-input
                labelTop="Name"
                prefix-icon="create"
                type="text"
                placeholder="Task name"
                @keypress.enter="addNewTask"
                :disabled="loading"
                v-model="newTaskName"
            />
            <it-select
                class="max-width"
                v-model="newTaskIcon"
                :options="taskIcons"
                label-top="Icon"
                :disabled="loading"
            >
                <template #selected-option="{props}">
                    <div class="vertical-center">
                        <it-icon
                            :name="props.modelValue.value"
                            outlined
                        />
                        <span class="padding-left">
                            {{ props.modelValue.name }}
                        </span>
                    </div>
                </template>
                <template #option="{option}">
                    <div class="vertical-center">
                        <it-icon
                            :name="option.value"
                            outlined
                        />
                        <span class="padding-left">
                            {{ option.name }}
                        </span>
                    </div>
                </template>
            </it-select>
            <interval-picker
                label-top="Interval"
                v-model="newTaskInterval"
            />
        </template>
        <template #actions>
            <it-button
                type="primary"
                icon="add_circle"
                @click="addNewTask"
                :loading="loading"
            >
                Add
            </it-button>
            <it-button
                icon="cancel"
                @click="newTaskModal = false"
                :loading="loading"
            >
                Cancel
            </it-button>
        </template>
    </it-modal>
</template>

<script lang="ts">
import TaskView from '@/TaskView.vue';
import {Household} from "@/models/Household";
import {User} from "@/models/User";
import {defineComponent, PropType} from "vue";
import HouseholdContextMenu from "@/HouseholdContextMenu.vue";
import IntervalPicker from "@/IntervalPicker.vue";
import {Message} from 'equal-vue';

export default defineComponent({
    name: 'household-view',
    components: {
        HouseholdContextMenu,
        TaskView,
        IntervalPicker,
    },
    emits: [
        'change-color',
        'delete',
    ],
    data: () => ({
        newTaskModal: false,
        newTaskIcon: {name: 'Haus', value: 'home'},
        newTaskName: '',
        newTaskInterval: 1,
        loading: false,
        taskIcons: [
            ['Haus', 'home'],
            ['Einkaufswagen', 'shopping_cart'],
            ['Glühbirne', 'lightbulb'],
            ['Uhr', 'schedule'],
            ['Haustier', 'pets'],
            ['Arbeit', 'work_outline'],
            ['Telefon', 'call'],
            ['Besen', 'cleaning_services'],
            ['Waschmaschine', 'local_laundry_service'],
        ].map(array => ({name: array[0], value: array[1]})),
    }),
    props: {
        household: Object as PropType<Household>,
        user: Object as PropType<User>,
    },
    computed: {
        isAdmin() {
            return this.user?.mail === this.household?.admin && null != this.household?.admin;
        },
        color() {
            return this.household?.color ?? '#233662';
        },
        style() {
            return 'background-color: ' + this.color;
        },
    },
    methods: {
        async addNewTask() {
            if (null == this.household?.id) {
                Message.error({text: 'There was a problem creating this task!'});
                return;
            }
            this.loading = true;
            await window.client.addNewTask(this.household?.id, this.newTaskName, this.newTaskIcon.value, this.newTaskInterval);
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

.household-footer {
    margin-top: 8px;
    padding: 8px;
    display: flex;
    flex-direction: row;
    justify-content: right;
    border-radius: 8px;
}

.vertical-center {
    display: flex;
    flex-direction: row;
    align-items: center;
}

.padding-left {
    margin-left: 8px;
}

.max-width {
    width: 100%;
}

.dark-font {
    color: black;
}
</style>

<style>
.w-100 .it-dropdown-item {
    padding: 0;
}
.it-modal-body {
    overflow: visible !important;
}
.it-modal-content {
    overflow: visible !important;
}
</style>