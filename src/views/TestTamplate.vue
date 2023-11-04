<template>
    <div class="test">
      <h1 class="mb-5 mt-5 text-xl">Hallo selamat pagi semua silahkan masukan pesan random dibawah ini : </h1>
      <input class="mb-2 border-2 p-2 rounded-md text-center" type="text" v-model="newTodo" v-on:keyup.enter="addTodo" placeholder="masukan pesan">
      <ol class="mb-7 mt-5">
        <li v-for="(todo, index) in paginatedTodos" :key="index" class="flex gap-5">
          <span>{{ todo.teks }}</span>
          <button @click="removeTodo(index)">X</button>
        </li>
      </ol>
      <el-switch v-model="disabled" />
      <el-pagination 
        class="mt-5"
        background
        layout="prev, pager, next"
        :disabled="disabled"
        :current-page="currentPage"
        :page-size="pageSize"
        @current-change="handlePageChange"
        :total="100"
      ></el-pagination>
    </div>
  </template>
  
  <script setup>
  import { ref, computed, watch } from 'vue';
  
  const disabled = ref(false)
  const newTodo = ref('');
  const todos = ref([]); // Your original todos array
  const currentPage = ref(1);
  const pageSize = ref(10);
  
  const paginatedTodos = computed(() => {
    const startIndex = (currentPage.value - 1) * pageSize.value;
    const endIndex = startIndex + pageSize.value;
    return todos.value.slice(startIndex, endIndex);
  });
  
  watch(newTodo, () => {
    currentPage.value = 1;
  });
  
  const addTodo = () => {
    const teks = newTodo.value.trim()
    if (teks) {
        todos.value.push({ teks: teks })
        newTodo.value = ''
    } 
  };
  
  const removeTodo = (index) => {
    // Your removeTodo logic here
    // Make sure to remove the todo from the todos array based on the index
    todos.value.splice(index, 1)
  };
  
  const handlePageChange = (page) => {
    // Update the current page when the page changes
    currentPage.value = page;
  };

  </script>