<script setup>
    import { useRoute } from 'vue-router';
    import {onMounted, ref} from 'vue'
    import axios from 'axios'
    import {useAuthStore} from "@/stores/auth"

    const authStore = useAuthStore();

    const id = ref('')
    const title = ref('')
    const article = ref('')
    const route = useRoute();
    onMounted(() => {
        const blog_post = route.params.blog_post
        axios.get(`blogs/${blog_post}`)
        .then(response => {
            id.value = response.data.data.id
            title.value = response.data.data.attributes.title
            article.value = response.data.data.attributes.article
            console.log(response.data.data)
            document.title = 'Blog | ' + title.value
        })
        .catch(error => {
            console.log(error)
        })
    })

    function updateBlog(blog_id) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${authStore.token}`;
        axios.put(`blogs/${blog_id}`, {
            data: {
                title: title.value,
                article: article.value
            }
        })
        .then(response => {
            window.alert("Blog Updated");
            console.log(response.data.data)
        })
        .catch(error => {
            console.log(error)
        })
    }
</script>

<template>

    <div class="mx-auto mx-3 mt-3 border rounded p-4" style="max-width: 1000px;">
        <h2 class="text-center">Update {{title}}</h2>

        <form v-on:submit.prevent="updateBlog(id)">
            <div class="form-floating mb-3">
                <input v-model="title" type="text" class="form-control" id="floatingInput" placeholder="name@example.com">
                <label for="floatingInput">Title</label>
            </div>
            <div class="form-floating">
                <textarea v-model="article" class="form-control" placeholder="Leave a comment here" id="floatingTextarea2" style="height: 100px"></textarea>
                <label for="floatingTextarea2">Article</label>
            </div>
            <button class="btn btn-outline-primary mt-2">Update</button>
        </form>
    </div>

    <div class="mx-auto px-3 mb-5" style="max-width: 1000px;">
        <h1 class="title mt-2 text-center">{{title}}</h1>
        <img src="@/assets/images/neon-street.jpg" class="img-fluid mb-2">
        <div v-html="article"></div>
    </div>
    
</template>