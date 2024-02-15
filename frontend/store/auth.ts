import { defineStore } from "pinia";
import axios from "~/store/axios";

interface User {
    userId: string;
    username: string;
    email: string;
    lang: string;
}

export const useAuthStore = defineStore("auth", {
    state: () => ({
        userId: null as string | null,
        username: null as string | null,
        email: null as string | null,
        lang: null as string | null,
        isLoggedInState: false,
    }),
    getters: {
        isAuthenticated: (state) => !!state.userId,
        isLoggedIn: (state) => state.isLoggedInState,
    },
    actions: {
        async register(user: User) {
            try {
                const response = await axios.post("/auth/signup", user);

                if (response.status !== 201) {
                    throw new Error(`Registration failed: ${response.data}`);
                }

                const data = response.data;
                this.setUserData(data);
            } catch (error) {
                console.error("Registration error:", error);
            }
        },
        async login(username: string) {
            try {
                const response = await axios.post("/auth/login", { username });

                if (response.status !== 200) {
                    throw new Error(`Login failed: ${response.data}`);
                }

                const data = response.data;
                this.setUserData(data);
            } catch (error) {
                console.error("Login error:", error);
            }
        },
        async logout() {
            this.resetState();
        },
        setUserData(data: User) {
            this.userId = data.userId;
            this.username = data.username;
            this.email = data.email;
            this.lang = data.lang;
            this.isLoggedInState = true;
            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('user', JSON.stringify(data));
        },
        resetState() {
            this.userId = null;
            this.username = null;
            this.email = null;
            this.lang = null;
            this.isLoggedInState = false;
            localStorage.setItem('isLoggedIn', 'false');
            localStorage.removeItem('user');
        },
    },
});
