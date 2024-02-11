import { defineStore } from "pinia";

export const useSearchStore = defineStore("searchStore", {
    state: () => ({
        searchOpen: false,
        fromPage: '/',
    }),

    actions: {
        toggleSearch() {
            this.searchOpen = !this.searchOpen;
        },

        openSearch() {
            this.searchOpen = true;
        },

        closeSearch() {
            this.searchOpen = false;
        },

        setFromPage(page: string) {
            this.fromPage = page;
        },
    },
});