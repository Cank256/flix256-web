<template>
    <nav class="nav-bar">
        <!-- Logo -->
        <div class="logo">
            <img src="~/assets/img/icons/flix256-512.png" alt="Flix256" />
        </div>
    
        <!-- Navigation Links -->
        <ul class="nav-links">
            <li><nuxt-link exact :to="{ name: 'index' }" aria-label="Home">Home</nuxt-link></li>
            <li><nuxt-link :to="{ name: 'movies' }" aria-label="Movies">Movies</nuxt-link></li>
            <li><nuxt-link :to="{ name: 'tv' }" aria-label="TvV Shows">TV Shows</nuxt-link></li>
            <li><nuxt-link :to="{ name: 'favorites' }" aria-label="Favorites">Favorites</nuxt-link></li>
        </ul>
    
        <div class="search-user">
            <!-- Search Bar -->
            <div class="search-bar" @click="goToSearch">
                <input type="text" placeholder="Search for Movies and TV Shows" />
            </div>
        
            <!-- User Icon -->
            <div class="user-icon" @click="toggleDropdown">
                <svg
                    width="40"
                    height="40"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <g fill="none" stroke="#fff" stroke-width="1.5" stroke-linecap="round" stroke-miterlimit="10" stroke-linejoin="round">
                    <path d="M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7Z"/>
                    <path d="M12 14C8.13401 14 5 17.134 5 21H19C19 17.134 15.866 14 12 14Z"/>
                    </g>
                </svg>

                <!-- Dropdown -->
                <div v-show="showDropdown" class="dropdown">
                    <button @click="handleDropdownItem('Profile')">Profile</button>
                    <button @click="handleDropdownItem('Logout')">Logout</button>
                </div>
            </div>
        </div>
    </nav>
    <nuxt />
</template>

<script>
    export default {
        data() {
            return {
                showDropdown: false,
            };
        },
        methods: {
            toggleDropdown() {
                this.showDropdown = !this.showDropdown;
            },
            handleDropdownItem(item) {
                if (item === 'Profile') {
                    this.$router.push('/user');
                } else {
                    console.log(`Clicked on ${item}`);
                }
            },
            goToSearch() {
            // Navigate to the search route when the search input is clicked
            this.$router.push('/search');
            },
        },
    };
</script>

<style scoped>
    .nav-bar {
        display: flex;
        align-items: center;
        padding: 1rem;
        background-color: rgba(0, 0, 0, 0);
        color: #fff;
    }
    
    .logo img {
        height: 40px;
    }
    
    .nav-links {
        margin-left: 60px;
        list-style: none;
        display: flex;
        gap: 6rem;
    }
    
    .nav-links li {
        font-size: 2rem;
    }
    
    .search-user {
        display: flex;
        align-items: center;
        margin-left: auto;
        margin-right: 100px;
    }

    .search-bar {
        margin-right: 8rem;
    }

    .search-bar input {
        padding: 1.5rem;
        border: none;
        border-radius: 30px;
        outline: none;
        width: 50vh;
        background: #fff1;
        color: white;
        font-size: 1.4rem;
    }

    .user-icon {
        display: flex;
        align-items: center;
        cursor: pointer;
    }

    .user-icon svg {
        margin-right: 0.5rem;
    }

    .dropdown {
        display: flex;
        flex-direction: column;
        position: absolute;
        background-color: #000;
        padding: 1rem;
        margin-top: 4rem;
        margin-right: 8rem;
        border-radius: 5px;
        top: 2rem;
        right: 0;
        width: 6%;
    }

    .dropdown button {
        background: none;
        color: #fff;
        border: none;
        cursor: pointer;
        padding: 0.5rem;
        text-align: left;
        font-size: 1.5rem;
        letter-spacing: .1rem;
        line-height: 2.5rem;
    }

    .dropdown button:hover {
        background-color: rgba(255, 255, 255, 0.1);
    }
</style>
