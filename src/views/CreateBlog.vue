<script setup>
    import {onMounted, ref} from 'vue'
    import axios from 'axios'
    import { RouterLink } from 'vue-router'
    import {useAuthStore} from "@/stores/auth"

    const authStore = useAuthStore();

    const blogs = ref([])
    onMounted(() => {
        axios.get('blogs/')
        .then(response => {
            blogs.value = (response.data.data)
            console.log(response.data.data)
        })
        .catch(error => {
            console.log(error)
        })
    })

    const title = ref('')
    const article = ref('')
    function addBlog() {
        if (title.value) {
            axios.defaults.headers.post['Authorization'] = `Bearer ${authStore.token}`;
            axios.post('blogs/', {
                data: {
                    title: title.value,
                    article: article.value
                }
            })
            .then(response => {
                title.value = ''
                article.value = ''
                blogs.value.push(response.data.data)
                console.log(response)
            })
            .catch(error => {
                console.log(error)
            })
        }
    }

    function deleteBlog(blog_id) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${authStore.token}`;
        axios.delete(`blogs/${blog_id}`)
        .then(response => {
            let i = blogs.value.map(data => data.id).indexOf(blog_id);
            blogs.value.splice(i, 1);
            console.log(response.data.data)
        })
        .catch(error => {
            console.log(error)
        })
    }
</script>

<template>

    <div class="mx-auto mx-3 mt-3 border rounded p-4" style="max-width: 1000px;">
        <form v-on:submit.prevent="addBlog">
            <div class="form-floating mb-3">
                <input v-model="title" type="text" class="form-control" id="floatingInput" placeholder="name@example.com">
                <label for="floatingInput">Title</label>
            </div>
            <div class="form-floating">
                <textarea v-model="article" class="form-control" placeholder="Leave a comment here" id="floatingTextarea2" style="height: 100px"></textarea>
                <label for="floatingTextarea2">Article</label>
            </div>
            <button class="btn btn-outline-primary mt-2">Submit</button>
        </form>
    </div>

    <div v-for="blog in blogs" v-bind:key="blog.id" class="mx-3">
        <div class="card mb-3 mt-3 mx-auto" style="max-width: 1000px;">
            <div class="row g-0">
                <div class="col-md-4">
                    <img src="@/assets/images/neon-street.jpg" class="img-fluid">
                </div>
                <div class="col-md-8">
                    <div class="card-body">
                        <h5 class="card-title">{{ blog.attributes.title }}</h5>
                        <div class="card-text text-truncate" style="height: 75px" v-html="blog.attributes.article"></div>
                    </div>
                    <div class="card-body">
                        <div>
                            <button @click="deleteBlog(blog.id)" class="btn btn-outline-danger float-end mb-3">Delete</button>
                            <button class="btn btn-outline-primary float-end me-3 mb-3"><RouterLink :to="`/update_blog/${blog.id}`" class="text-decoration-none">Update</RouterLink></button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>