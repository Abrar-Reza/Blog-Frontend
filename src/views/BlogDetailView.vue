<script setup>
    import { useRoute } from 'vue-router';
    import {onMounted, ref} from 'vue'
    import axios from 'axios'

    const blogs = ref([])
    const route = useRoute();
    onMounted(() => {
        const blog_detail = route.params.blog_detail
        axios.get(`blogs/${blog_detail}`)
        .then(response => {
            blogs.value = response.data
            console.log(response.data)
            document.title = 'Blog | ' + blogs.value.title
        })
        .catch(error => {
            console.log(error)
        })
    })
</script>

<template>

    <div class="home mx-auto px-3 mb-5" style="max-width: 1000px;">
        <h1 class="title mt-2 text-center">{{blogs.title}}</h1>
        <img src="@/assets/images/neon-street.jpg" class="img-fluid mb-2" alt="...">
        {{blogs.article}}
    </div>
    
</template>