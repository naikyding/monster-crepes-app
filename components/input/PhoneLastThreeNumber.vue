<script lang="ts" setup>
const props = defineProps({
  modelValue: String,
  type: String,
  errorMessage: String,
});

const emits = defineEmits(["update:modelValue"]);

const dynamicErrorStyle = computed(() => {
  if (props.errorMessage) return "input-error";
  return "input-info mb-6";
});
</script>

<template>
  <div>
    <input
      :type="type || 'text'"
      placeholder="請輸入手機末三碼"
      class="input input-bordered w-full"
      :class="[dynamicErrorStyle]"
      maxlength="3"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
    />

    <p class="text-error text-left">{{ errorMessage }}</p>
  </div>
</template>

<style scoped></style>
