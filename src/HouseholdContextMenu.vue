<template>
    <it-dropdown
        :clickable="true"
        placement="bottom-right"
        class="icon-button"
    >
        <it-icon
            outlined
            name="more_vert"
        />
        <template v-slot:menu>
            <it-dropdown-menu>
                <template v-if="isAdmin">
                    <it-dropdown-item
                        icon="link"
                        @click="generateAndCopyInvite"
                    >
                        Copy invite token
                    </it-dropdown-item>
                    <it-popover
                        borderless
                        class="w-100 it-dropdown-item"
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
                </template>
            </it-dropdown-menu>
        </template>
    </it-dropdown>
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
</template>
<script lang="ts">
import {defineComponent, PropType} from "vue";
import {Message} from "equal-vue";
import {Household} from "@/models/Household";
import {TColorData} from "equal-vue/src/components/colorpicker/types";

export default defineComponent({
    name: 'HouseholdContextMenu',
    emits: [
        'change-color',
        'delete',
    ],
    props: {
        household: Object as PropType<Household>,
        isAdmin: Boolean as PropType<Boolean>,
    },
    data: () => ({
        confirmModal: false,
        color: ''
    }),
    created() {
        this.color = this.household?.color ?? '#233662';
    },
    mounted() {
        if (this.$refs.colorPicker) {
            this.$watch(() => (this.$refs.colorPicker as any).show, (show: boolean) => {
                if (!show && this.color !== this.household?.color) {
                    this.$emit('change-color', this.color);
                }
            });
        }
    },
    methods: {
        async generateAndCopyInvite() {
            try {
                if (null != this.household?.id) {
                    const url = await window.client.fetchInviteLink(this.household.id);
                    await navigator.clipboard.writeText(url);
                    Message.success({text: 'Invite token copied successfully!'});
                    console.log(url);
                }
            } catch (e) {
                Message.danger({text: 'Error copying invite token: ' + e.toString()});
            }
        },
        deleteHousehold() {
            this.confirmModal = false;
            this.$emit('delete');
        },
        setColor(color: TColorData) {
            this.color = color.hex;
        },
    }
});
</script>
<style scoped>

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
<style>
.w-100 {
    overflow: visible !important;
}
</style>