<script setup>
    import { useRoute } from 'vue-router';
    import {onMounted, ref} from 'vue'
    import axios from 'axios'
    import {useAuthStore} from "@/stores/auth"

    const authStore = useAuthStore();

    const id = ref('')
    const title = ref('')
    const article = ref('')
    const author = ref('')
    const thumbnail = ref('')
    const url = "http://localhost:1337"
    const route = useRoute();
    onMounted(() => {
        const blog_post = route.params.blog_post
        axios.get(`blogs/${blog_post}?populate=*`)
        .then(response => {
            id.value = response.data.data.id
            title.value = response.data.data.attributes.title
            article.value = response.data.data.attributes.article
            author.value = response.data.data.attributes.author.data.attributes.username
            thumbnail.value = response.data.data.attributes.thumbnail.data.attributes.url
            console.log(response.data.data)
            document.title = 'Blog | ' + title.value
        })
        .catch(error => {
            console.log(error)
        })
    })

    // const selectfile = ref('')
    // const image_id = ref('')

    // function onFileUpload(event) {
    //     selectfile.value = event.target.files[0];
    // }

    // function updateBlog(blog_id) {
    //     var formData = new FormData();
    //     formData.append("files", selectfile.value);
    //     axios.put('upload/', formData)
    //     .then(response => {
    //         image_id.value = response.data[0].id
    //         console.log(image_id.value)


    //         axios.put(`blogs/${blog_id}`, {
    //             data: {
    //                 title: title.value,
    //                 article: article.value,
    //                 thumbnail: {
    //                     id: image_id.value
    //                 }
    //             }
    //         })
    //         .then(response => {
    //             title.value = ''
    //             article.value = ''
    //             blogs.value.push(response.data.data)
    //             console.log(response)
    //         })
    //         .catch(error => {
    //             console.log(error)
    //         })
    //         window.alert("Blog Updated");
    //     })
    //     .catch(error => {
    //         console.log(error)
    //     })
    // }
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
            <div class="mb-3">
                <label for="formFile" class="form-label">Thumbnail</label>
                <input class="form-control" type="file" id="formFile" @change="onFileUpload">
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
        <img :src="url + thumbnail" class="img-fluid mb-2">
        <b class="mt-2 text-capitalize">by {{author}}</b>
        <div v-html="article"></div>
    </div>
    
</template>