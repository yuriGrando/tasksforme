<template>
    <TransitionRoot appear :show="isOpen" as="template">
        <Dialog as="div" @close="closeModal" class="relative z-10">
            <TransitionChild
                as="template"
                enter="duration-300 ease-out"
                enter-from="opacity-0"
                enter-to="opacity-100"
                leave="duration-200 ease-in"
                leave-from="opacity-100"
                leave-to="opacity-0"
            >
                <div class="fixed inset-0 bg-black/25" />
            </TransitionChild>

            <div class="fixed inset-0 overflow-y-auto">
                <div
                    class="flex min-h-full items-center justify-center p-4 text-center"
                >
                    <TransitionChild
                        as="template"
                        enter="duration-300 ease-out"
                        enter-from="opacity-0 scale-95"
                        enter-to="opacity-100 scale-100"
                        leave="duration-200 ease-in"
                        leave-from="opacity-100 scale-100"
                        leave-to="opacity-0 scale-95"
                    >
                        <DialogPanel
                            class="w-full max-w-md transform overflow-hidden rounded-2xl bg-gray-800 p-6 text-left align-middle shadow-xl transition-all"
                        >
                            <DialogTitle
                                as="h2"
                                class="text-2xl mt-2 font-medium flex items-center gap-2 leading-6 text-gray-100"
                            >
                                <chat-bubble-bottom-center-text-icon class="h-6 w-6" />
                                {{ task.title }}
                            </DialogTitle>
                            <div class="flex-wrap flex gap-1 my-2">
                                <span v-for="label in JSON.parse(task.label)" class="text-xs rounded-md px-1.5" :class="setLabelColor(label)">
                                    {{ label }}
                                </span>
                                <span class="text-xs rounded-md px-1.5 bg-gray-300 text-gray-900 cursor-pointer">+ Adicionar</span>
                            </div>
                            <div class="text-lg font-semibold flex gap-2 items-center mt-4">
                                <bars3-bottom-left-icon class="h-6 w-6" />
                                Descrição
                            </div>
                            <DialogDescription class="font-light">
                                {{ task.description }}
                            </DialogDescription>
                            <div class="mt-8">
                                <div class="mt-2 flex gap-2">
                                    <button class="rounded-md p-1 transition-all" @click="$emit('change-status', 'OPENED')" :class="task.status === 'OPENED' ? 'bg-blue-600' : 'bg-blue-600/10'">Aberto</button>
                                    <button class="rounded-md p-1 transition-all" @click="$emit('change-status', 'DOING')" :class="task.status === 'DOING' ? 'bg-orange-600' : 'bg-orange-600/10'">Fazendo</button>
                                    <button class="rounded-md p-1 transition-all" @click="$emit('change-status', 'COMPLETED')" :class="task.status === 'COMPLETED' ? 'bg-green-600' : 'bg-green-600/10'">Completo</button>
                                    <button class="rounded-md p-1 transition-all" @click="$emit('change-status', 'CANCELED')" :class="task.status === 'CANCELED' ? 'bg-red-600' : 'bg-red-600/10'">Cancelado</button>
                                </div>
                            </div>
                        </DialogPanel>
                    </TransitionChild>
                </div>
            </div>
        </Dialog>
    </TransitionRoot>
</template>

<script>
import {
    TransitionRoot,
    TransitionChild,
    Dialog,
    DialogPanel,
    DialogTitle,
    DialogDescription
} from '@headlessui/vue'
import {ChatBubbleBottomCenterTextIcon, Bars3BottomLeftIcon} from "@heroicons/vue/24/outline/index.js"

export default {
    name: "DialogTask",
    components: { TransitionRoot, TransitionChild, Dialog, DialogPanel, DialogTitle, DialogDescription, ChatBubbleBottomCenterTextIcon, Bars3BottomLeftIcon },
    emits: ['close', 'change-status'],
    props: {
        showDialog: Boolean,
        task: Object
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
    computed: {
        isOpen: {
            get() {
                return this.showDialog
            }
        }
    },
    methods: {
        closeModal() {
            this.$emit('close');
        },
        setColorStatus(value) {
            switch (value) {
                case "OPENED":
                    return { color: 'bg-blue-600', label: 'Aberto'}

                case "DOING":
                    return { color: 'bg-orange-600', label: 'Fazendo'}

                case "COMPLETED":
                    return { color: 'bg-green-600', label: 'Completo'}

                case "CANCELED":
                    return { color: 'bg-red-600', label: 'Cancelado'}
            }
        },
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
        },
    }
}
</script>


<style scoped>

</style>
