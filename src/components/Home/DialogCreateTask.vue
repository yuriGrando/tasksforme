<template>
    <div class="flex items-center justify-center">
        <button
            type="button"
            @click="openModal"
            class="w-full rounded-md bg-blue-900 h-9 flex items-center justify-start gap-2 p-3 cursor-pointer hover:bg-blue-800 transition-all"
        >
            <PlusIcon class="h-4 w-4 mt-1" />
            <span class="text-sm font-light">
                adicionar
            </span>
        </button>
    </div>
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
                                as="h3"
                                class="text-lg font-medium leading-6 text-gray-100"
                            >
                                Nova Tarefa
                            </DialogTitle>
                            <div class="mt-2 flex-col flex gap-3">
                                <div>
                                    <label for="title" class="block text-sm font-medium leading-6">Título da tarefa</label>
                                    <div class="mt-2">
                                        <input v-model="taskData.title" id="title" name="title" type="text" autocomplete="title" required class="block w-full rounded-md border-0 py-1.5 shadow-sm pl-1.5 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                                    </div>
                                </div>
                                <div>
                                    <label for="description" class="block text-sm font-medium leading-6">Descrição da tarefa</label>
                                    <div class="mt-2">
                                        <textarea v-model="taskData.description"  id="description" rows="3" class="block w-full rounded-md border-0 py-1.5 shadow-sm pl-1.5 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                                    </div>
                                </div>
                                <div>
                                    <label for="description" class="block text-sm font-medium leading-6">Status</label>
                                    <div class="mt-2 flex gap-2">
                                        <button class="rounded-md p-1 transition-all" @click="taskData.status = 'OPENED'" :class="taskData.status === 'OPENED' ? 'bg-blue-600' : 'bg-blue-600/10'">Aberto</button>
                                        <button class="rounded-md p-1 transition-all" @click="taskData.status = 'DOING'" :class="taskData.status === 'DOING' ? 'bg-orange-600' : 'bg-orange-600/10'">Fazendo</button>
                                        <button class="rounded-md p-1 transition-all" @click="taskData.status = 'COMPLETED'" :class="taskData.status === 'COMPLETED' ? 'bg-green-600' : 'bg-green-600/10'">Completo</button>
                                        <button class="rounded-md p-1 transition-all" @click="taskData.status = 'CANCELED'" :class="taskData.status === 'CANCELED' ? 'bg-red-600' : 'bg-red-600/10'">Cancelado</button>
                                    </div>
                                </div>
                                <div>
                                    <label for="description" class="block text-sm font-medium leading-6">Label</label>
                                    <p class="font-light text-sm mt-2 mb-1">Prioridade</p>
                                    <div class="mt-2 flex gap-1 flex-wrap">
                                        <button
                                            v-for="label in labels.priority"
                                            class="rounded-md p-1 transition-all text-xs"
                                            :class="taskData.label.includes(label) ? 'bg-purple-600' : 'bg-gray-400'"
                                            @click="setLabel(label)"
                                        >
                                            {{ label }}
                                        </button>
                                    </div>
                                    <p class="font-light text-sm mt-2 mb-1">Categoria</p>
                                    <div class="mt-2 flex gap-1 flex-wrap">
                                        <button
                                            v-for="label in labels.category"
                                            class="rounded-md p-1 transition-all text-xs"
                                            :class="taskData.label.includes(label) ? 'bg-yellow-600' : 'bg-gray-400'"
                                            @click="setLabel(label)"
                                        >
                                            {{ label }}
                                        </button>
                                    </div>
                                    <p class="font-light text-sm mt-2 mb-1">Tipo</p>
                                    <div class="flex gap-1 flex-wrap">
                                        <button
                                            v-for="label in labels.type"
                                            class="rounded-md p-1 transition-all text-xs"
                                            :class="taskData.label.includes(label) ? 'bg-teal-600' : 'bg-gray-400'"
                                            @click="setLabel(label)"
                                        >
                                            {{ label }}
                                        </button>
                                    </div>
                                    <p class="font-light text-sm mt-2 mb-1">Outras</p>
                                    <div class="mt-2 flex gap-1 flex-wrap">
                                        <button
                                            v-for="label in labels.others"
                                            class="rounded-md p-1 transition-all text-xs"
                                            :class="taskData.label.includes(label) ? 'bg-lime-600' : 'bg-gray-400'"
                                            @click="setLabel(label)"
                                        >
                                            {{ label }}
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div class="mt-6 w-full justify-end flex gap-2">
                                <button class="px-4 py-2 hover:text-gray-400 transition-all" @click="closeModal">Cancelar</button>
                                <button
                                    type="button"
                                    class="inline-flex justify-center rounded-md border border-transparent bg-green-600 px-4 py-2 text-sm font-medium text-green-50 hover:bg-green-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                    @click="createTask"
                                >
                                    Criar, Tarefa!
                                </button>
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
} from '@headlessui/vue'
import {DocumentPlusIcon, PlusIcon} from "@heroicons/vue/24/outline/index.js";
import {requests} from "../../api/api.js";

export default {
    name: 'DialogCreateTask',
    components: {PlusIcon, TransitionRoot, TransitionChild, Dialog, DialogPanel, DialogTitle, DocumentPlusIcon },
    props: {
        statusCreate: {
            type: String,
            required: false,
            default: 'OPENED'
        },
    },
    data() {
        return {
            isOpen: false,
            taskData: {
                title: '',
                description: '',
                date: '',
                status: this.statusCreate,
                label: [],
                userId: localStorage.getItem('user-id')
            },
            labels: {
                priority: ['Alta', 'Média', 'Baixa', 'Urgente'],
                category: ['Casa', 'Trabalho', 'Estudo', 'Compras', 'Feriado', 'Saúde', 'Academia'],
                type: ['Desenvolvimento', 'Design', 'Reunião', 'Ligação', 'E-mail', 'Pesquisa', 'Leitura', 'Escrita', 'Criação', 'Revisão'],
                others: ['Ideias', 'Insipiração', 'Referências', 'Importante', 'Pessoal', 'Profissional']
            }
        }
    },
    methods: {
        closeModal() {
            this.isOpen = false
        },
        openModal() {
            this.isOpen = true
        },
        setLabel(label) {
            const idx = this.taskData.label.indexOf(label);
            if (idx !== -1) {
                console.log('oi', idx);
                this.taskData.label.splice(idx, 1);
            } else {
                this.taskData.label.push(label);
            }
            console.log(this.taskData.label)
        },
        createTask() {
            requests.post('/tasks', this.taskData)
                .then((res) => {
                    this.$emit('add-task', res.content);
                    this.closeModal();
                })
                .catch((err) => {
                    console.log(err);
                })
        }
    }
}
</script>
