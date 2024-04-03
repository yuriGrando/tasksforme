<template>
    <div class="p-2.5 bg-gray-700 rounded-md shadow flex-col flex gap-1 cursor-pointer mb-2">
        <div class="flex-wrap flex gap-1">
            <span v-for="label in JSON.parse(task.label)" class="text-xs rounded-md px-1.5" :class="setLabelColor(label)">
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
            labels: {
                priority: ['Alta', 'Média', 'Baixa', 'Urgente'],
                category: ['Casa', 'Trabalho', 'Estudo', 'Compras', 'Feriado', 'Saúde', 'Academia'],
                type: ['Desenvolvimento', 'Design', 'Reunião', 'Ligação', 'E-mail', 'Pesquisa', 'Leitura', 'Escrita', 'Criação', 'Revisão'],
                others: ['Ideias', 'Inspiração', 'Referências', 'Importante', 'Pessoal', 'Profissional']
            }
        }
    },
    methods: {
        setLabelColor(label) {
            for (const key in this.labels) {
                if (this.labels.hasOwnProperty(key)) {
                    if (this.labels[key].includes(label)) {
                        switch (key) {
                            case 'priority':
                                return 'bg-purple-600'
                            case 'category':
                                return 'bg-yellow-600'
                            case 'type':
                                return 'bg-teal-600'
                            case 'others':
                                return 'bg-lime-600'
                        }
                    }
                }
            }
        }
    }
}
</script>

<style scoped>

</style>
