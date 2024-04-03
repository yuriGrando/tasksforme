<template>
    <div class="page" :class="background">
        <toolbar @add-task="mountTasks"/>
        <div class="overflow-auto items-start xl:justify-center p-4 gap-4 flex" style="height: calc(100vh - 7.5rem); width: 100vw">
            <drag-drops
                v-for="frame in tasksData"
                :title="frame.title"
                :value="frame.value"
                :list="frame.tasks"
                @add-task="mountTasks"
                @change="changeTaskStatus"
            />
        </div>
    </div>
</template>

<script>
import Toolbar from "../components/Home/Toolbar.vue";
import DragDrops from "../components/Home/DragDrops.vue";
import {requests} from "../api/api.js";

export default {
    name: 'Home',
    components: {DragDrops, Toolbar},
    data() {
        return {
            tasksData: [
                {
                    title: 'Aberto',
                    value: 'OPENED',
                    color: 'blue',
                    tasks: [
                    ]
                },
                {
                    title: 'Fazendo',
                    value: 'DOING',
                    color: 'orange',
                    tasks: [
                    ]
                },
                {
                    title: 'Completo',
                    value: 'COMPLETED',
                    color: 'green',
                    tasks: [
                    ]
                },
                {
                    title: 'Cancelado',
                    value: 'CANCELED',
                    color: 'red',
                    tasks: [
                    ]
                }
            ]
        }
    },
    computed: {
        background() {
            switch (localStorage.getItem('background')) {
                case 'dark':
                    return 'bg-gray-700'
                case 'light':
                    return 'bg-gray-400'
                case 'degrade1':
                    return 'bg-gradient-to-r from-indigo-800 from-10% via-sky-800 via-30% to-emerald-500 to-90%'
                case 'degrade2':
                    return 'bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500'
                default:
                    return 'bg-gradient-to-r from-indigo-800 from-10% via-sky-800 via-30% to-emerald-500 to-90%'

            }
        }
    },
    mounted() {
        this.getTasks();
    },
    methods: {
        getTasks() {
            requests.get('/tasks')
                .then((res) => {
                    this.breakTasks(res.content);
                })
                .catch((err) => {
                    console.log(err);
                })
        },
        changeTaskStatus(payload) {
            requests.put(`/tasks/${payload.task.id}/status`, {status: payload.value})
                .then((res) => {
                })
                .catch((err) => {
                    console.log(err.response);
                })
        },
        breakTasks(tasks) {
            tasks.forEach((task) => {
                this.mountTasks(task);
            })
        },
        mountTasks(task) {
            switch (task.status) {
                case "OPENED":
                    this.tasksData[0].tasks.push(task);
                    break
                case "DOING":
                    this.tasksData[1].tasks.push(task);
                    break
                case "COMPLETED":
                    this.tasksData[2].tasks.push(task);
                    break
                case "CANCELED":
                    this.tasksData[3].tasks.push(task);
                    break
            }
        }

    },
}
</script>
<style scoped>
.page {
    min-width: 100vw;
    min-height: 100vh;
}
</style>
