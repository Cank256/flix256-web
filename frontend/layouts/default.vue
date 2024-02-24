<template>
    <div  class="container">
        <NavBar v-if="!$device.isMobileOrTablet" />
        <MobileTopNav v-if="$device.isMobileOrTablet" />
        <MobileNav v-if="$device.isMobileOrTablet" />
        <slot />
        <Footer />
    </div>
</template>

<script>
    import NavBar from '~/components/global/NavBar';
    import MobileTopNav from '~/components/global/MobileTopNav';
    import MobileNav from '~/components/global/MobileNav';
    import Footer from '~/components/global/Footer';
    
    export default {
        components: {
            NavBar,
            MobileTopNav,
            MobileNav,
            Footer,
        },
    };
</script>
