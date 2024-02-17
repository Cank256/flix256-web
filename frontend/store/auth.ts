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

                const userData = response.data;
                const favorites = await axios.get(`/favorite/${userData.user._id}`);
                this.setUserData(userData, favorites.data.results);
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

                const userData = response.data;
                const favorites = await axios.get(`/favorite/${userData.user._id}`);
                this.setUserData(userData, favorites.data.results);
            } catch (error) {
                console.error("Login error:", error);
            }
        },
        async delete(user_id: string) {
            try {
                const response = await axios.delete(`/users/${user_id}`);

                if (response.status >= 300) {
                    throw new Error(`Account deletion failed: ${response.data}`);
                }

                this.resetState();
            } catch (error) {
                console.error("Login error:", error);
            }
        },
        async logout() {
            this.resetState();
        },
        setUserData(user: User, favorites: any) {
            this.userId = user.userId;
            this.username = user.username;
            this.email = user.email;
            this.lang = user.lang;
            this.isLoggedInState = true;
            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('user', JSON.stringify(user));
            localStorage.setItem('favorites', JSON.stringify(favorites));
        },
        resetState() {
            this.userId = null;
            this.username = null;
            this.email = null;
            this.lang = null;
            this.isLoggedInState = false;
            localStorage.setItem('isLoggedIn', 'false');
            localStorage.removeItem('user');
            localStorage.removeItem('favorites');
        },
    },
});
