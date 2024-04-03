<script>
import {ChevronDownIcon, FunnelIcon, Cog6ToothIcon} from "@heroicons/vue/24/outline/index.js";
import MenuBackground from "./MenuBackground.vue";
import DialogCreateTask from "./DialogCreateTask.vue";

export default {
    name: "Toolbar",
    emits: ['create-task'],
    components: {DialogCreateTask, MenuBackground, ChevronDownIcon, FunnelIcon, Cog6ToothIcon },
    computed: {
        userName() {
            return localStorage.getItem('username');
        }
    }
}
</script>

<template>
    <div class="w-full h-20 bg-gray-950/90 flex py-4 pr-4 items-center justify-between">
        <img src="../../assets/logotipo-light.png" alt="logotipo" class="w-48"/>
        <div class="flex gap-4 items-center">
            <dialog-create-task />
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
            <menu-background />
        </div>
    </div>
</template>

<style scoped>

</style>
