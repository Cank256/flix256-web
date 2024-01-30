<template>
    <div>
        <NavBar v-if="!$device.isMobileOrTablet" />
        <MobileNav v-else />
        <slot />
        <Footer />
    </div>
</template>

<script>
    import NavBar from '~/components/global/NavBar';
    import MobileNav from '~/components/global/MobileNav';
    import Footer from '~/components/global/Footer';
    
    export default {
        components: {
            NavBar,
            MobileNav,
            Footer,
        },
    };
</script>
