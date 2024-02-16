<template>
  <nav :class="$style.mobile_nav">
    <ul class="nolist">
      <li>
        <nuxt-link
          exact
          :to="{ name: 'index' }"
          active-class="active-link"
          aria-label="Home">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g fill="none" stroke="#fff" stroke-width="1.5" stroke-linecap="round" stroke-miterlimit="10" stroke-linejoin="round" ><path d="M5 9.77746V16.2C5 17.8802 5 18.7203 5.32698 19.362C5.6146 19.9265 6.07354 20.3854 6.63803 20.673C7.27976 21 8.11984 21 9.8 21H14.2C15.8802 21 16.7202 21 17.362 20.673C17.9265 20.3854 18.3854 19.9265 18.673 19.362C19 18.7203 19 17.8802 19 16.2V5.00002M21 12L15.5668 5.96399C14.3311 4.59122 13.7133 3.90484 12.9856 3.65144C12.3466 3.42888 11.651 3.42893 11.0119 3.65159C10.2843 3.90509 9.66661 4.59157 8.43114 5.96452L3 12M14 21V15H10V21"/></g></svg>
        </nuxt-link>
      </li>
      <li>
        <nuxt-link
          :to="{ name: 'movie' }"
          active-class="active-link"
          aria-label="Movies">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g fill="none" stroke="#fff" stroke-width="1.5" stroke-linecap="round" stroke-miterlimit="10" stroke-linejoin="round" ><path d="M16 10L18.5768 8.45392C19.3699 7.97803 19.7665 7.74009 20.0928 7.77051C20.3773 7.79703 20.6369 7.944 20.806 8.17433C21 8.43848 21 8.90095 21 9.8259V14.1741C21 15.099 21 15.5615 20.806 15.8257C20.6369 16.056 20.3773 16.203 20.0928 16.2295C19.7665 16.2599 19.3699 16.022 18.5768 15.5461L16 14M6.2 18H12.8C13.9201 18 14.4802 18 14.908 17.782C15.2843 17.5903 15.5903 17.2843 15.782 16.908C16 16.4802 16 15.9201 16 14.8V9.2C16 8.0799 16 7.51984 15.782 7.09202C15.5903 6.71569 15.2843 6.40973 14.908 6.21799C14.4802 6 13.9201 6 12.8 6H6.2C5.0799 6 4.51984 6 4.09202 6.21799C3.71569 6.40973 3.40973 6.71569 3.21799 7.09202C3 7.51984 3 8.07989 3 9.2V14.8C3 15.9201 3 16.4802 3.21799 16.908C3.40973 17.2843 3.71569 17.5903 4.09202 17.782C4.51984 18 5.07989 18 6.2 18Z"/></g></svg>
        </nuxt-link>
      </li>
      <li>
        <nuxt-link
          :to="{ name: 'tv' }"
          active-class="active-link"
          aria-label="TV Shows">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g fill="none" stroke="#fff" stroke-width="1.5" stroke-linecap="round" stroke-miterlimit="10" stroke-linejoin="round" ><path d="M15 7V21M18 11H18.01M18 14H18.01M18 17H18.01M17 3L12 7L7 3M7.8 21H16.2C17.8802 21 18.7202 21 19.362 20.673C19.9265 20.3854 20.3854 19.9265 20.673 19.362C21 18.7202 21 17.8802 21 16.2V11.8C21 10.1198 21 9.27976 20.673 8.63803C20.3854 8.07354 19.9265 7.6146 19.362 7.32698C18.7202 7 17.8802 7 16.2 7H7.8C6.11984 7 5.27976 7 4.63803 7.32698C4.07354 7.6146 3.6146 8.07354 3.32698 8.63803C3 9.27976 3 10.1198 3 11.8V16.2C3 17.8802 3 18.7202 3.32698 19.362C3.6146 19.9265 4.07354 20.3854 4.63803 20.673C5.27976 21 6.11984 21 7.8 21Z"/></g></svg>
        </nuxt-link>
      </li>
      <li>
        <nuxt-link
          :to="{ name: 'favorites' }"
          active-class="active-link"
          aria-label="favorites">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g fill="none" stroke="#fff" stroke-width="1.5" stroke-linecap="round" stroke-miterlimit="10" stroke-linejoin="round" ><path d="M4.45067 13.9082L11.4033 20.4395C11.6428 20.6644 11.7625 20.7769 11.9037 20.8046C11.9673 20.8171 12.0327 20.8171 12.0963 20.8046C12.2375 20.7769 12.3572 20.6644 12.5967 20.4395L19.5493 13.9082C21.5055 12.0706 21.743 9.0466 20.0978 6.92607L19.7885 6.52734C17.8203 3.99058 13.8696 4.41601 12.4867 7.31365C12.2913 7.72296 11.7087 7.72296 11.5133 7.31365C10.1304 4.41601 6.17972 3.99058 4.21154 6.52735L3.90219 6.92607C2.25695 9.0466 2.4945 12.0706 4.45067 13.9082Z"/></g></svg>
        </nuxt-link>
      </li>
      <li>
        <nuxt-link
          :to="{ }"
          active-class="active-link"
          aria-label="user">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g fill="none" stroke="#fff" stroke-width="1.5" stroke-linecap="round" stroke-miterlimit="10" stroke-linejoin="round" ><path d="M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7Z"/><path d="M12 14C8.13401 14 5 17.134 5 21H19C19 17.134 15.866 14 12 14Z"/></g></svg>
        </nuxt-link>
      </li>
    </ul>
  </nav>
</template>

<script>
  import MobileTopNav  from '~/components/global/MobileTopNav';
</script>

<style lang="scss" module>
@import '~/assets/css/utilities/_variables.scss';

.mobile_nav {
  position: fixed;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 5;
  height: 4.5rem;
  background-color: #000;

  ul {
    display: flex;
    height: 100%;

    @media (min-width: $breakpoint-large) {
      flex-direction: column;
    }

    li {
      flex: 1 1 auto;
      height: 100%;

      @media (min-width: $breakpoint-large) {
        flex: 0 1 auto;
        height: 10rem;
      }
    }
  }

  button {
    padding: 0;
    margin: 0;
    background: none;
  }

  a,
  button {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    outline: 0;
    transition: all 0.2s;

    &:hover,
    &:focus {
      opacity: 0.8;
    }
  }
}
</style>

<style lang="scss" scoped>
  @import '~/assets/css/utilities/_variables.scss';

  a.nuxt-link-active {
    &:hover,
    &:focus {
      opacity: 1;
    }

    nuxt-icon {
      stroke: $primary-color;
    }
  }

  a.active-link svg g {
    stroke: $primary-color;
  }
</style>
