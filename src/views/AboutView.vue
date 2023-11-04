<template>
  <div class="about">
    <h1>This is an about page</h1>
    <div class="mb-5 bg-input w-full rounded-md text-end p-5 text-4xl" >{{ operator|| 0}}</div>
    <form @submit.prevent="CreateResult">
      <input 
      type="text"
      placeholder="Hasil 1"
      v-model="result_input.hasil1"
      >

      <input 
      type="text"
      placeholder="Hasil 2"
      v-model="result_input.haisl2"
      >

      <el-input 
      type="submit"
      value="+"
      @click="plus"
      />
      <el-input 
      type="submit"
      value="-"
      @click="minus"
      />
      <el-input 
      type="submit"
      value="/"
      @click="bagi"
      />
      <el-input 
      type="submit"
      value="*"
      @click="kali"
      />
    </form>
    <div class="results">
      <div class="result" v-for="result in resultStore.results" :key="result.id">
        <p>Hasil 1 : {{ result.hasil1 }} </p>
        <p>Hasil 2 : {{ result.haisl2 }}</p>
        <p>Hasil : {{ operator(result.hasil1, result.haisl2) }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useResultStore } from './handlePagination';  
import { ref } from 'vue';

const resultStore = useResultStore();
const result_input = ref({
  hasil1: '',
  haisl2: ''
})

const CreateResult = () => {
  if (
    result_input.value.hasil1.trim() === '' ||
    result_input.value.haisl2.trim() === ''
  ) { 
    return alert('Input Tidak Boleh Kosong'); 
  };
 
  resultStore.create(
    result_input.value
  )

  result_input.value = {
    hasil1: '',
    haisl2: ''
  }
}

const operator = ref('');

const plus = () => {
  operator.value = (a, b) => {
    return parseFloat(a) + parseFloat(b)
  }
}
const minus = () => {
  operator.value = (a, b) => {
    return parseFloat(a) - parseFloat(b)
  }
}
const kali = () => {
  operator.value = (a, b) => {
    return parseFloat(a) * parseFloat(b)
  }
}
const bagi = () => {
  operator.value = (a, b) => {
    return parseFloat(a) / parseFloat(b)
  }
}

</script>

<style lang="scss" scoped>

</style>