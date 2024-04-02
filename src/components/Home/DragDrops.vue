<template>
    <div class="shadow p-3 bg-gray-900/80 rounded-md w-72 max-h-full">
        <div class="w-full rounded-md p-1" :class="setColorFrame(value)">
            <h3 class="text-left font-semibold ml-1 text-1xl">{{ title }}</h3>
        </div>
        <draggable
            class="list-group max-h-96 overflow-hidden hover:overflow-auto transition-all"
            :class="list.length <= 0 ? 'mt-3' : 'my-3'"
            :list="list"
            group="people"
            @change="log"
            itemKey="name"
        >
            <template #item="{ element, index }">
                <card-task :task="element" />
            </template>
        </draggable>
        <div class="w-full rounded-md bg-blue-900 h-9 flex items-center justify-start gap-2 p-3 cursor-pointer hover:bg-blue-800 transition-all">
            <PlusIcon class="h-4 w-4 mt-1" />
            <p class="text-sm font-light">
                adicionar
            </p>
        </div>
    </div>
</template>

<script>
import draggable from "vuedraggable";
import {PlusIcon} from '@heroicons/vue/24/outline'
import CardTask from "./CardTask.vue";
export default {
    name: "DragDrops",
    components: {CardTask, draggable, PlusIcon },
    props: {
        title: String,
        list: Array,
        value: String,
    },
    methods: {
        log: function(evt) {
            window.console.log(evt);
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
        }
    }
}
</script>

<style scoped>

</style>
