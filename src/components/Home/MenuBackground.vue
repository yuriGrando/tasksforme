<script>
import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/vue'
import {SwatchIcon} from "@heroicons/vue/24/outline/index.js";
export default {
    name: "MenuBackground",
    components: {SwatchIcon, Menu, MenuButton, MenuItems, MenuItem},
    methods: {
        setBackground(type) {
            localStorage.setItem('background', type);
            this.$router.go();
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
                <swatch-icon class="h-5 w-5" />
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
                <div class="px-3 py-2 text-gray-900">
                    Cor do quadro
                </div>
                <div class="px-1 py-1">
                    <MenuItem v-slot="{ active }">
                        <button
                            :class="[
                              active ? 'bg-blue-500 text-white' : 'text-gray-900',
                              'group flex gap-2 w-full items-center rounded-md px-2 py-2 text-sm',
                            ]"
                            @click="setBackground('dark')"
                        >
                            <div class="rounded-full w-6 h-6 bg-gray-900"/>
                            Dark
                        </button>
                    </MenuItem>
                    <MenuItem v-slot="{ active }">
                        <button
                            :class="[
                              active ? 'bg-blue-500 text-white' : 'text-gray-900',
                              'group flex gap-2 w-full items-center rounded-md px-2 py-2 text-sm',
                            ]"
                            @click="setBackground('light')"
                        >
                            <div class="rounded-full w-6 h-6 bg-gray-300"/>
                            Light
                        </button>
                    </MenuItem>
                </div>
                <div class="px-1 py-1">
                    <MenuItem v-slot="{ active }">
                        <button
                            :class="[
                              active ? 'bg-blue-500 text-white' : 'text-gray-900',
                              'group flex gap-2 w-full items-center rounded-md px-2 py-2 text-sm',
                            ]"
                            @click="setBackground('degrade1')"
                        >
                            <div class="rounded-full w-6 h-6 bg-gradient-to-r from-indigo-800 from-10% via-sky-800 via-30% to-emerald-500 to-90%"/>
                            Degrade 1
                        </button>
                    </MenuItem>
                    <MenuItem v-slot="{ active }">
                        <button
                            :class="[
                              active ? 'bg-blue-500 text-white' : 'text-gray-900',
                              'group flex gap-2 w-full items-center rounded-md px-2 py-2 text-sm',
                            ]"
                            @click="setBackground('degrade2')"
                        >
                            <div class="rounded-full w-6 h-6 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"/>
                            Degrade 2
                        </button>
                    </MenuItem>
                </div>
            </MenuItems>
        </transition>
    </Menu>
</template>

<style scoped>

</style>
