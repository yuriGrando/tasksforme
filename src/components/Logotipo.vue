<script>
import {ClipboardDocumentCheckIcon} from "@heroicons/vue/24/outline/index.js";

export default {
    name: "Logotipo",
    props: {
        horizontal: {
            type: Boolean,
            required: false,
            default: false,
        },
        size: {
            type: String,
            required: false,
            default: 'md',
        }
    },
    components: {ClipboardDocumentCheckIcon},
}
</script>

<template>
    <div :class="horizontal ? 'flex items-center' : 'flex-col text-center'" class="gap-3">
        <div class="items-center justify-center flex">
            <clipboard-document-check-icon :style="size === 'sm' ? 'width: 2.5rem' : 'width: 4rem'" class="text-blue-300"/>
        </div>
        <div class="flex-col" :class="horizontal ? 'text-left' : 'text-center'">
            <h2
                class="font-bold text-blue-200"
                :class="size === 'sm' ? 'text-2xl' : 'text-4xl'"
            >
                Tarefas
            </h2>
            <p class="text-blue-300 font-light">for me.</p>
        </div>
    </div>
</template>

<style scoped>

</style>
