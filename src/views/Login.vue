<script setup>
    import {useRouter} from 'vue-router'
    import {ref} from 'vue'
    import axios from 'axios'
    import {useAuthStore} from "@/stores/auth"

    const authStore = useAuthStore();
    const {setToken} = authStore
    
    const router = useRouter()
    const identifier = ref('')
    const password = ref('')
    function Login() {
        if (identifier.value && password.value) {
            axios.post('auth/local/', {
                identifier: identifier.value,
                password: password.value
            })
            .then(response => {
                const token = response.data.jwt
                setToken(token)
                console.log('User profile', response.data.user);
                console.log('User token', token);
                router.push('profile')
            })
            .catch(error => {
                console.log(error)
            })
        }
    }

</script>

<template>
    <div class="login mx-3">

        <h1 class="text-center mb-3" style="margin-top: 20vh">Login</h1>

        <form @submit.prevent="Login">
            <div class="mx-auto" style="max-width: 350px;">
                <div class="form-floating mb-3">
                    <input type="username" name="username" class="form-control" id="floatingInput" placeholder="Username" v-model="identifier" required>
                    <label for="floatingInput">Username</label>
                </div>
                <div class="form-floating">
                    <input type="password" name="password" class="form-control" id="floatingPassword" placeholder="Password" v-model="password" required>
                    <label for="floatingPassword">Password</label>
                </div>

                <div class="d-grid gap-2 mt-3">
                    <button class="btn btn-primary" type="submit">Login</button>
                </div>
            </div>
        </form>

    </div>
</template>