<template>
    <div class="bg-gray-900 page">
        <div class="w-full h-20 bg-gray-950 flex p-4 items-center justify-between">
            <logotipo size="sm" horizontal />
            <div class="flex gap-4 items-center">
                <button class="flex w-full justify-center items-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
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
    </div>
</template>

<script>
import Logotipo from "../components/Logotipo.vue";
import {DocumentPlusIcon, ChevronDownIcon} from "@heroicons/vue/24/outline/index.js";

export default {
    name: 'Home',
    components: {Logotipo, DocumentPlusIcon, ChevronDownIcon},
    data() {
        return {}
    },
    computed: {
        userName() {
            return localStorage.getItem('username');
        }
    }
}
</script>
<style scoped>
.page {
    width: 100vw;
    height: 100vh;
}
</style>
