<!-- COMPONENTE BOILERPLATE -->

<template>
  <div class="container-flex">
    <div class="header">
      <div class="header-description">
        <h3 class="header-title">Log In to ToDo App</h3>
        <p class="header-subtitle">Start organizing your tasks!</p>
      </div>
    </div>

    <form @submit.prevent="signIn" class="form-sign-in">
      <div class="form">
        <div class="form-input">
          <label class="input-field-label">E-mail</label>
          <input
            type="email"
            class="input-field"
            placeholder="example@gmail.com"
            id="email"
            v-model="email"
            required
          />
          <label class="input-field-label">Password</label>
          <input
            type="password"
            class="input-field"
            placeholder="**********"
            id="password"
            v-model="password"
            required
          />
          <button class="button" type="submit">Sign In</button>
        </div>
        <div class="form-input"></div>

        <p>
          Dont have an account?
          <PersonalRouter
            :route="route"
            :buttonText="buttonText"
            class="sign-up-link"
          />
        </p>
      </div>
    </form>

    <div v-show="errorMsg">{{ errorMsg }}</div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useUserStore } from "../stores/user";
import PersonalRouter from "./PersonalRouter.vue";
import { useRouter } from "vue-router";

// Route Variables
const route = "/auth/signup";
const buttonText = "Sign Up";

const email = ref("");
const password = ref("");
const errorMsg = ref("");
const redirect = useRouter();

// Arrow function to Signin user to supaBase
const signIn = async () => {
  try {
    await useUserStore().signIn(email.value, password.value);
    redirect.push({ path: "/home" });
  } catch (error) {
    errorMsg.value = error.message;
    setTimeout(() => {
      errorMsg.value = null;
    }, 4000);
  }
  return;
  errorMsg.value = "error";
};

// async function signIn() {
//   await useUserStore().signIn(email.value, password.value);
//   redirect.push({ path: "/home" });
// }
</script>

<style></style>
