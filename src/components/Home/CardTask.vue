<template>
    <div class="mb-2 p-2.5 bg-gray-700 rounded-md shadow-2xl flex-col flex gap-1 cursor-pointer">
        <div class="flex-wrap flex gap-1">
            <span v-for="label in JSON.parse(task.label)" class="text-xs rounded-md px-1.5 bg-green-600">
                {{ label }}
            </span>
        </div>
        <div class="w-full">
            {{ task.title }}
        </div>
        <div class="w-full text-xs font-light">
            {{ task.description.substring(0,40)}}{{ task.description.length > 40 ? '...' : ''}}
        </div>
    </div>
</template>

<script>
export default {
    name: "CardTask",
    props: {
        task: Object,
    },
    data() {
        return {
            etiquetas: ['trabalho', 'desenvolvimento', 'escola', 'alta', 'baixa'],
            text: 'aqui tem um texto de descrição grande para ser usado de teste para desenvolvimeotn jdjsadjsajj jdskaj jdka'
        }
    }
}
</script>

<style scoped>

</style>
