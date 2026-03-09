<template>
  <div class="w-full">
    <label
      v-if="label"
      :for="id"
      class="block text-body-14 text-text-primary mb-2"
    >
      {{ label }}
    </label>
    <input
      :id="id"
      :type="type"
      :value="modelValue"
      :placeholder="placeholder"
      :disabled="disabled"
      @input="$emit('update:modelValue', $event.target.value)"
      @focus="focused = true"
      @blur="focused = false"
      class="w-full px-4 py-3 border rounded-lg transition-all duration-300 outline-none"
      :class="[
        error
          ? 'border-warning ring-1 ring-warning'
          : focused
            ? 'border-primary-2 ring-1 ring-primary-2'
            : 'border-border-light hover:border-primary-1',
        disabled && 'bg-gray-100 cursor-not-allowed',
      ]"
    />
    <p v-if="error" class="mt-1 text-body-12 text-warning">{{ error }}</p>
  </div>
</template>

<script>
export default {
  name: "InputField",
  props: {
    id: {
      type: String,
      default: () => `input-${Math.random().toString(36).substr(2, 9)}`,
    },
    label: {
      type: String,
      default: "",
    },
    type: {
      type: String,
      default: "text",
    },
    modelValue: {
      type: [String, Number],
      default: "",
    },
    placeholder: {
      type: String,
      default: "",
    },
    error: {
      type: String,
      default: "",
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      focused: false,
    };
  },
  emits: ["update:modelValue"],
};
</script>
