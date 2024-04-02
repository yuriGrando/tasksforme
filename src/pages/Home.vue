<template>
    <div class="bg-gradient-to-r from-indigo-800 from-10% via-sky-800 via-30% to-emerald-500 to-90% page">
        <toolbar />
        <div class="w-full p-4 flex items-start justify-center gap-4">
            <drag-drops
                v-for="frame in tasksData"
                :title="frame.title"
                :value="frame.value"
                :list="frame.tasks"
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
    mounted() {
        this.getTasks();
    },
    methods: {
        getTasks() {
            requests.get('http://ec2-44-199-92-143.compute-1.amazonaws.com/api/tasks')
                .then((res) => {
                    console.log(res);
                    this.mountTasks(res.content);
                })
                .catch((err) => {
                    console.log(err);
                })
        },
        mountTasks(tasks) {
            tasks.forEach((task) => {
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
            })
        }
    },
}
</script>
<style scoped>
.page {
    max-width: 100vw;
    min-height: 100vh;
}
</style>
