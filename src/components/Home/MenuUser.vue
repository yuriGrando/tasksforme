<script>
import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/vue'
import {ChevronDownIcon} from "@heroicons/vue/24/outline/index.js";
export default {
    name: "MenuUser",
    components: {ChevronDownIcon, Menu, MenuButton, MenuItems, MenuItem},
    computed: {
        userName() {
            return localStorage.getItem('username');
        }
    },
    methods: {
        logout() {
            localStorage.removeItem('token');
            localStorage.removeItem('user-id');
            localStorage.removeItem('username');
            this.$router.push({name: 'Login'})
        }
    }
}
</script>

<template>
    <Menu as="div" class="relative inline-block text-left">
        <div>
            <MenuButton
                class="px-3 py-1 rounded-md transition-all hover:bg-gray-50/20"
            >
                <div class="flex gap-2 items-center cursor-pointer">
                    <div class="h-10 w-10 bg-gray-500 rounded-full flex items-center justify-center">
                        <span>{{ userName.substring(0,1).toUpperCase() }}</span>
                    </div>
                    <chevron-down-icon class="w-4" />
                </div>
            </MenuButton>
        </div>

        <transition
            enter-active-class="transition duration-100 ease-out"
            enter-from-class="transform scale-95 opacity-0"
            enter-to-class="transform scale-100 opacity-100"
            leave-active-class="transition duration-75 ease-in"
            leave-from-class="transform scale-100 opacity-100"
            leave-to-class="transform scale-95 opacity-0"
        >
            <MenuItems
                class="absolute right-0 mt-2 w-44 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none"
            >
                <div class="px-1 py-1">
                    <MenuItem v-slot="{ active }">
                        <button
                            :class="[
                              active ? 'bg-blue-500 text-white' : 'text-gray-900',
                              'group flex gap-2 w-full items-center rounded-md px-2 py-2 text-sm',
                            ]"
                            @click="logout"
                        >
                            Logout
                        </button>
                    </MenuItem>
                </div>
            </MenuItems>
        </transition>
    </Menu>
</template>

<style scoped>

</style>
