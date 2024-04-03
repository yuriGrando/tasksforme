<template>
    <div class="page bg-gradient-to-r from-indigo-800 from-10% via-sky-800 via-30% to-emerald-500 to-90% flex items-center justify-center">
        <div class="w-96 p-6 rounded-lg flex-col items-center justify-center bg-gray-800/70 shadow-2xl">
            <div class="sm:mx-auto sm:w-full sm:max-w-sm">
                <div class="w-full flex justify-center">
                    <img src="../assets/logotipo-light.png" alt="logotipo" class="w-64"/>
                </div>
                <h2 class="text-center text-2xl font-bold leading-9 tracking-tight">Acesse a sua conta</h2>
            </div>

            <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <div class="space-y-6">
                    <div>
                        <label for="username" class="block text-sm font-medium leading-6">Usuário</label>
                        <div class="mt-2">
                            <input v-model="loginData.name" id="username" name="username" type="text" autocomplete="username" required class="block w-full rounded-md border-0 py-1.5 shadow-sm pl-1.5 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                        </div>
                    </div>

                    <div>
                        <div class="flex items-center justify-between">
                            <label for="password" class="block text-sm font-medium leading-6 ">Senha</label>
                            <div class="text-sm">
                                <a href="#" class="font-semibold text-blue-300 hover:text-blue-100">Esqueceu a sua senha?</a>
                            </div>
                        </div>
                        <div class="mt-2">
                            <input v-model="loginData.password" id="password" name="password" type="password" autocomplete="current-password" required class="block w-full rounded-md border-0 py-1.5 pl-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            :disabled="loading"
                            @click="signIn()"
                        >
                            <span v-if="!loading">Entrar</span>
                            <svg v-else aria-hidden="true" class="inline w-6 h-6 text-gray-200 animate-spin dark:text-gray-600 fill-gray-600 dark:fill-gray-300" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                            </svg>
                        </button>
                    </div>
                </div>

                <p class="mt-10 flex gap-1 items-center justify-center text-center text-sm">
                    Não possui uma conta?
                    <dialog-create-user />
                </p>
            </div>
        </div>
    </div>
</template>

<script>
import {ClipboardDocumentCheckIcon} from "@heroicons/vue/24/outline/index.js";
import axios from "axios";
import {requests} from "../api/api.js";
import DialogCreateUser from "../components/Login/DialogCreateUser.vue";
export default {
    name: 'Login',
    components: {DialogCreateUser, ClipboardDocumentCheckIcon},
    data() {
        return {
            loading: false,
            loginData: {
                name: '',
                password: '',
            }
        }
    },
    methods: {
        signIn() {
            this.loading = true;
            axios.post('http://ec2-44-199-92-143.compute-1.amazonaws.com/api/login', this.loginData)
                .then((res) => {
                    console.log(res.data);
                    localStorage.setItem('username', res.data.content.name);
                    localStorage.setItem('token', res.data.content.token);
                    localStorage.setItem('user-id', res.data.content.userId);
                    this.loading = false;
                    this.$router.push({name: 'Home'});
                    this.$notify({ type: "success", title: `Bem vindo, ${res.data.content.name}`, text: 'É um grande prazer receber você aqui!' });
                })
                .catch((err) => {
                    this.$notify({ type: "error", title: "Usuário não encontrado" });
                    console.log(err.response);
                    this.loading = false;
                })
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
