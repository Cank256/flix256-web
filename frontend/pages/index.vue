<template>
    <div>
        <NavBar v-if="!$device.isMobileOrTablet" />
        <MobileNav v-else />
    </div>
</template>

<script>
    import NavBar from '~/components/global/NavBar';
    import MobileNav from '~/components/global/MobileNav';
    
    export default {
        components: {
            NavBar,
            MobileNav,
        },
    };
</script>