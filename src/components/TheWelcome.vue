<template>
  <el-container class="main-contain w-full h-screen flex justify-center items-center">
    <div class="flex flex-col min-w-[300px] text-white">
      <div class="mb-5 bg-input w-full rounded-md text-end p-5 text-4xl">{{ output || 0 }}</div>
      <div class="num flex gap-2">
        <el-input v-model="user_input.input" placeholder="0" class="custom-input h-20" size="large" />
        <el-input v-model="user_input.input2" placeholder="0" class="custom-input h-20" size="large" />
      </div>
      <div class="operator flex mt-3">
        <el-button type="primary" size="large" class="el-button" @click="getOperator('-')">-</el-button>
        <el-button type="primary" size="large" @click="getOperator('+')">+</el-button>
        <el-button type="primary" size="large" @click="getOperator('/')">/</el-button>
        <el-button type="primary" size="large" @click="getOperator('*')">*</el-button>
      </div>
      <el-button type="success" class="success mt-3" @click="equal">Equal</el-button>

      <!-- printout pagination -->
      <ol class="mb-7 mt-5 text-primary">
        <li v-for="(todo, index) in paginatedTodos" :key="index" class="flex gap-5">
          <span>{{ todo.operation }} = {{ todo.result }}</span>
          <button @click="removeTodo(index)">X</button>
        </li>
      </ol>
      <el-pagination
        class="mt-5"
        background
        layout="prev, pager, next"
        :disabled="!todos.length"
        :current-page="currentPage"
        :page-size="pageSize"
        @current-change="handlePageChange"
        :total="todos.length"
      ></el-pagination>
    </div>
  </el-container>
</template>

<script setup lang="js">
import { ref, computed, watch } from 'vue'


const user_input = ref({
  input: '',
  input2: '',
  operator: '',
})

const output = computed(() => {
  let text = '';
  const val1 = user_input.value.input;
  const val2 = user_input.value.input2;
  const op = user_input.value.operator;

  if (val1 && val2 && op) {
    text = `${val1}${op}${val2}`;
  }

  return text
});

const getOperator = (op) => {
  user_input.value.operator = op;
}

const equal = () => {
  addTodo();
}

const addTodo = () => {
  if (output.value) {
    const result = eval(output.value);
    todos.value.push({
      operation: output.value,
      result
    })
  }
};

// Pagination
const disabled = ref(false)
const newTodo = ref('');
const todos = ref([]); // Your original todos array
const currentPage = ref(1);
const pageSize = ref(5);

const paginatedTodos = computed(() => {
  const startIndex = (currentPage.value - 1) * pageSize.value;
  const endIndex = startIndex + pageSize.value;
  return todos.value.slice(startIndex, endIndex);
});

const removeTodo = (index) => {
  todos.value.splice(index, 1)
};

const handlePageChange = (page) => {
  currentPage.value = page;
};
</script>
<style scoped>
.num .custom-input ::placeholder {
  color: #1991FF;
  font-size: large;
}
.num .custom-input{
  color: #1991FF;
  font-size: large;
}
.operator .el-button {
  /* background-color: white; */
  border: none;
  padding: 50px;
  font-size: 30px;
}
.main-contain .success {
  border: none;
  padding: 30px;
  font-size: 15px;
  background-color: #005DB2;
}
.main-contain .success:hover {
    background-color: #1991FF;
}
.el-button {
  background-color: #005DB2;
}
</style>













  