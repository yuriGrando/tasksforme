<template>
    <div class="min-w-72 shadow p-3 bg-gray-900/80 rounded-md w-72">
        <div class="w-full rounded-md p-1" :class="setColorFrame(value)">
            <h3 class="text-left font-semibold ml-1 text-1xl">{{ title }}</h3>
        </div>
        <draggable
            class="list-group max-h-96 overflow-hidden hover:overflow-auto transition-all"
            style="max-height: calc(100vh - 17.3rem)"
            :class="list.length <= 0 ? 'mt-3' : 'mt-3 mb-1'"
            :list="list"
            group="tasks"
            @change="log"
            itemKey="value"
        >
            <template #item="{ element, index }">
                <card-task :task="element" @open-task="openTask" />
            </template>
        </draggable>
        <div class="w-full">
            <DialogCreateTask :status-create="value" @add-task="addTask" />
        </div>
    </div>
    <dialog-task :show-dialog="dialog" @close="dialog = false" :task="taskOpen" @change-status="changeStatus"/>
</template>

<script>
import draggable from "vuedraggable";
import {PlusIcon} from '@heroicons/vue/24/outline'
import CardTask from "./CardTask.vue";
import DialogCreateTask from "./DialogCreateTask.vue";
import DialogTask from "./DialogTask.vue";
export default {
    name: "DragDrops",
    components: {DialogTask, DialogCreateTask, CardTask, draggable, PlusIcon },
    emits: ['add-task', 'change', 'change-index'],
    props: {
        title: String,
        list: Array,
        value: String,
    },
    data() {
        return {
            dialog: false,
            taskOpen: {},
            taskList: this.list
        }
    },
    methods: {
        openTask(payload) {
            console.log(payload)
            this.taskOpen = payload;
            this.dialog = true;

        },
        log: function(evt) {
            if (evt.moved) {
                this.movedTask({
                    id: evt.moved.element.id,
                    index: evt.moved.newIndex,
                })
            }
            if (evt.added) {
                this.changeStatus({
                    task: evt.added.element,
                    state: this.value,
                })
                this.$emit('change',{
                    task: evt.added.element,
                    value: this.value,
                });
            }
        },
        setColorFrame(value) {
            switch (value) {
                case "OPENED":
                    return 'bg-blue-600'

                case "DOING":
                    return 'bg-orange-600'

                case "COMPLETED":
                    return 'bg-green-600'

                case "CANCELED":
                    return 'bg-red-600'
            }
        },
        addTask(task) {
            this.$emit('add-task', task)
        },
        changeStatus(value) {
            console.log(value);
            this.$emit('change',{
                task: value.task,
                value: value.state,
            });
        },
        movedTask(payload) {
            this.$emit('change-index', payload);
        }
    }
}
</script>

<style scoped>

</style>
