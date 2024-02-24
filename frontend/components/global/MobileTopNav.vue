<template>
    <nav class="mobile_top_nav">
        <div class="top-nav">
            <div class="logo">
                <img src="~/assets/img/icons/flix256-512.png" alt="Flix256" width="30" height="30" />
            </div>
            <div class="search-icon" @click="goToSearch">
                <svg fill="#fff" width="20" height="20" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12.027 9.92L16 13.95 14 16l-4.075-3.976A6.465 6.465 0 0 1 6.5 13C2.91 13 0 10.083 0 6.5 0 2.91 2.917 0 6.5 0 10.09 0 13 2.917 13 6.5a6.463 6.463 0 0 1-.973 3.42zM1.997 6.452c0 2.48 2.014 4.5 4.5 4.5 2.48 0 4.5-2.015 4.5-4.5 0-2.48-2.015-4.5-4.5-4.5-2.48 0-4.5 2.014-4.5 4.5z" fill-rule="evenodd"/>
                </svg>
            </div>
        </div>
    </nav>
</template>

<script>
    export default {
        methods: {
            goToSearch() {
                this.$router.push('/search');
            },
        },
    };
</script>

<style>
    .mobile_top_nav {
        display: flex;
        position: fixed;
        justify-content: space-between;
        align-items: center;
        top: 0;
        left: 23px;
        right: 23px;
        z-index: 5;
        height: 5rem;
        background-color: rgba(0,0,0,0);
    }

    .top-nav {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        height: 100%;
    }

</style>
