<template>
    <div class="w-screen h-screen flex justify-center items-center">
      <el-form
        ref="formRef"
        :model="numberValidateForm"
        label-width="100px"
        class="about demo-ruleForm bg-sky-300 p-10 rounded-2xl w-1/3 mb-20"
      >
      <!-- FuLL NAME -->
        <el-form-item
          label="Full Name : "
          prop="name"
          :rules="[
            { required: true, message: 'name is required' },
            { type: 'string', message: 'name must be a string' },
          ]"
        >
          <el-input
            v-model.number="numberValidateForm.name"
            type="text"
            autocomplete="off"
          />
        </el-form-item>
  
        <!-- Birth Place -->
        <el-form-item
          label="Birth Place : "
          prop="birthPlace"
          :rules="[
            { required: true, message: 'Birth Place is required' },
            { type: 'string', message: 'Birth Place must be a string' },
          ]"
        >
          <el-input
            v-model.number="numberValidateForm.birthPlace"
            type="text"
            autocomplete="off"
          />
        </el-form-item>
  
        <!-- Date -->
        <el-form-item 
          label="Birth Date : "
          prop="date"
          :rules="[
            { required: true, message: 'Date of Birth is required' },
          ]"
        >
          <el-date-picker
            v-model="numberValidateForm.date"
            type="date"
            placeholder="Pick a date"
            clearable
          />
        </el-form-item>
  
        <!-- gender -->
        <el-form-item 
        label="Gender : " 
        prop="gender"
          :rules="[
            { required: true, message: 'Gender is required' },
          ]"
        >
          <el-radio-group v-model="numberValidateForm.gender">
            <el-radio label="Male" />
            <el-radio label="Female" />
          </el-radio-group>
        </el-form-item>
  
        <!-- Address -->
        <el-form-item
          label="Address : "
          prop="address"
        >
          <el-input
            v-model="numberValidateForm.address"
            type="textarea"
          />
        </el-form-item>
        
        <!-- email -->
        <el-form-item
          prop="email"
          label="Email : "
          :rules="[
            {
              required: true,
              message: 'Please input email address',
              trigger: 'blur',
            },
            {
              type: 'email',
              message: 'Please input correct email address',
              trigger: ['blur', 'change'],
            },
          ]"
        >
          <el-input v-model="numberValidateForm.email" />
        </el-form-item>
  
        <!-- phone -->
        <el-form-item
          label="Phone : "
          prop="phone"
          :rules="[
            { required: true, message: 'Phone is required' },
            { type: 'number', message: 'Phone must be a number' },
          ]"
        >
          <div class="flex gap-3">
            <p>+62</p>
            <el-input
              v-model.number="numberValidateForm.phone"
              type="text"
              autocomplete="off"
              class="bg-slate-300"
            />
          </div>
        </el-form-item>
  
  
        <el-form-item>
          <el-button type="primary" @click="submitForm(formRef)">Submit</el-button>
          <el-button @click="resetForm(formRef)">Reset</el-button>
        </el-form-item>
      </el-form>
  
  
      <ol class="mb-7 mt-5">
        <li v-for="(form, index) in paginatedForms" :key="index" class="flex gap-5">
          <span>{{ form.output }}</span>
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
  
  <script setup lang="ts">
  import { reactive, ref, computed, watch } from 'vue'
  import type { FormInstance } from 'element-plus'
  
  const disabled = ref(false)
  const forms = ref([]);
  const currentPage = ref(1);
  const pageSize = ref(10);

  const formRef = ref<FormInstance>()
  
  const numberValidateForm = ref({
    name: '',
    birthPlace: '',
    date: '',
    gender: '',
    address: '',
    email: '',
    phone: '',
  })
  
  const paginatedForms = computed(() => {
    const startIndex = (currentPage.value - 1) * pageSize.value;
    const endIndex = startIndex + pageSize.value;
    return forms.value.slice(startIndex, endIndex);
  });
  
  watch(numberValidateForm, () => {
    currentPage.value = 1;
  });
  
  
  const removeTodo = (index) => {
    forms.value.splice(index, 1)
  };
  
  const handlePageChange = (page) => {
    currentPage.value = page;
  };
  
  const submitForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.validate((valid) => {
      if (valid) {
        console.log('submit!')
        console.log(numberValidateForm.value)
        // const output = numberValidateForm.value.trim()
        // if (output) {
        //     todos.value.push({ output: output })
        //     numberValidateForm.value = ''
        // } 
      } else {
        console.log('error submit!')
        return false
      } 
    })
    // const values = Object.values(numberValidateForm);
    //   console.log(values);
  }
  
  const resetForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.resetFields()
  }
  
  </script>
  
  <style scoped>
  </style>