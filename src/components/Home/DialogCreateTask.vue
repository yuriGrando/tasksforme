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
                                <button :disabled="loading" class="px-4 py-2 hover:text-gray-400 transition-all" @click="closeModal">Cancelar</button>
                                <button
                                    :disabled="loading"
                                    type="button"
                                    class="inline-flex justify-center rounded-md border border-transparent bg-green-600 px-4 py-2 text-sm font-medium text-green-50 hover:bg-green-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                    @click="createTask"
                                >
                                    <span v-if="!loading">Criar, Tarefa!</span>
                                    <svg v-else aria-hidden="true" class="inline w-6 h-6 text-gray-200 animate-spin dark:text-gray-600 fill-gray-600 dark:fill-gray-300" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                                    </svg>
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
    emits: ['add-task'],
    props: {
        statusCreate: {
            type: String,
            required: false,
            default: 'OPENED'
        },
    },
    data() {
        return {
            loading: false,
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
                others: ['Ideias', 'Inspiração', 'Referências', 'Importante', 'Pessoal', 'Profissional']
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
                this.taskData.label.splice(idx, 1);
            } else {
                this.taskData.label.push(label);
            }
        },
        createTask() {
            requests.post('/tasks', this.taskData)
                .then((res) => {
                    this.$emit('add-task', res.content);
                    this.$notify({ type: "success", title: "Sucesso!", text: 'A tarefa foi criada com sucesso!' });
                    this.closeModal();
                })
                .catch((err) => {
                    console.log(err);
                })
        }
    }
}
</script>
