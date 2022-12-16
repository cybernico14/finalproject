<template>
  <nav class="navbar-big-screen">
    <!-- <PersonalRouter :route="route" :buttonText="buttonText" class="logo-link"/> -->
    <router-link to="/"> Home </router-link>

    <ul>
      <li>
        <router-link to="/">Task Manager</router-link>
      </li>

      <li>
        <router-link to="/account"> Your Account</router-link>
      </li>
    </ul>

    <div>
      <ul>
        <li class="log-out-welcome">
          <p>Welcome, {{ getUser.email }}</p>
        </li>
        <li>
          <button @click="signOut" class="btn-logout">
            <span class="material-symbols-outlined"> logout </span>Log out
          </button>
        </li>
      </ul>
    </div>
  </nav>

  <!-- <PersonalRouter :route="route" :buttonText="buttonText" class="logo-link"/> -->
  <div class="navbar-small-screen">
    <div class="hamburger" @click="showMenu = !showMenu">
      <span class="bar"></span>
      <span class="bar"></span>
      <span class="bar"></span>
    </div>

    <button @click="signOut" class="btn-logout">
      <span class="material-symbols-outlined"> logout </span>Log out
    </button>
    <ul
      id="main-menu"
      :class="showMenu ? 'main-menu-show' : 'main-menu'"
      v-if="showMenu"
    >
      <li class="main-menu-link"><router-link to="/"> Home </router-link></li>
      <li class="main-menu-link">
        <router-link to="/">Task Manager</router-link>
      </li>

      <li class="main-menu-link">
        <router-link to="/account"> Your Account</router-link>
      </li>
    </ul>
  </div>
</template>

<script setup>
// import PersonalRouter from "./PersonalRouter.vue";
import { useUserStore } from "../stores/user";
import { computed } from "vue";
import { useRouter } from "vue-router";
import { ref } from "vue";

//constant to save a variable that will hold the use router method
const route = "/";
const buttonText = "Todo app";
const showMenu = ref(false);
// constant to save a variable that will get the user from store with a computed function imported from vue
// const getUser = computed(() => useUserStore().user);
const getUser = useUserStore().user;

// constant that calls user email from the useUSerStore
const userEmail = getUser.email;

// async function that calls the signOut method from the useUserStore and pushes the user back to the Auth view.
const redirect = useRouter();

const signOut = async () => {
  try {
    useUserStore().signOut();
    redirect.push({ path: "/auth/login" });
    // call the user store and send the users info to backend to signOut
    // then redirect user to the homeView
  } catch (error) {}
};
</script>

<style>
.navbar-img {
  width: 90px;
}

nav {
  margin-left: auto;
  background-color: #fefee3;
  color: #070b30;
  display: flex;
  width: 100%;
  justify-content: space-around;
  align-items: center;
}

nav ul {
  list-style: none;
  padding-inline-start: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.main-menu-show {
  display: none;
}

.navbar-small-screen {
  display: none;
}

.showMenu {
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  width: 90%;
  padding: 2rem;
  margin-left: 5rem;
  margin-bottom: 3rem;
}

.main-menu-link {
  color: rgb(137, 31, 31);
  text-transform: uppercase;
}

@media (max-width: 820px) {
  .navbar-big-screen {
    display: none;
  }
  .navbar-small-screen {
    width: 90vw;
    background-color: inherit;
    height: 8vh;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-end;
  }

  .hamburger {
    position: absolute;
    top: 0.75rem;
    left: 1rem;
    display: flex;
    flex-direction: column-reverse;
    justify-content: space-between;
    background-color: inherit;
    width: 40px;
    height: 30px;
  }

  .hamburger .bar {
    width: 38px;
    height: 3px;
    background-color: black;
    margin: 3px;
    transition: 0.3s;
  }

  .main-menu-show {
    background-color: #fefae0;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-end;
    width: 95vw;
    height: 6vh;
    align-self: flex-start;
  }

  .main-menu-link {
    font-size: small;
    list-style: none;
    width: 20vw;
    height: 50px;
  }

  .showMenu {
    display: none;
  }
  .log-out-welcome {
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }
  .log-out-welcome p {
    display: none;
  }

  .btn-logout {
    width: 35px;
  }
}
</style>
