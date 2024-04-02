<script>
import Logotipo from "../Logotipo.vue";
import {ChevronDownIcon, DocumentPlusIcon, FunnelIcon, Cog6ToothIcon} from "@heroicons/vue/24/outline/index.js";

export default {
    name: "Toolbar",
    emits: ['create-task'],
    components: {ChevronDownIcon, FunnelIcon, DocumentPlusIcon, Cog6ToothIcon, Logotipo},
    computed: {
        userName() {
            return localStorage.getItem('username');
        }
    }
}
</script>

<template>
    <div class="w-full h-20 bg-gray-950/90 flex p-4 items-center justify-between">
        <logotipo size="sm" horizontal />
        <div class="flex gap-4 items-center">
            <button
                @click="$emit('create-task')"
                class="flex w-full justify-center items-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
                <document-plus-icon class="w-5 mr-1" />
                <span>Criar Tarefa</span>
            </button>
            <div class="flex gap-2 items-center cursor-pointer">
                <div class="h-10 w-10 bg-gray-500 rounded-full flex items-center justify-center">
                    <span>{{ userName.substring(0,1).toUpperCase() }}</span>
                </div>
                <chevron-down-icon class="w-4" />
            </div>
        </div>
    </div>
    <div class="w-full h-10 bg-gray-800/60 flex p-4 items-center justify-between shadow">
        <h1>
            Bem vindo de volta, <span class="font-bold">{{ userName }}</span>!
        </h1>
        <div class="flex items-center gap-2">
            <button class="flex gap-1 py-1 items-center px-3 rounded-md transition-all hover:bg-gray-50/20">
                <FunnelIcon class="h-4 w-4"/>
                <span class="font-semibold">filtros</span>
            </button>
            <button class="px-3 py-1 rounded-md transition-all hover:bg-gray-50/20">
                <cog6-tooth-icon class="h-5 w-5" />
            </button>
        </div>
    </div>
</template>

<style scoped>

</style>
