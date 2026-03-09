<template>
  <div class="space-y-4">
    <InputField
      v-model="cardNumber"
      :label="$t('form.cardNumber')"
      placeholder="1234 5678 9012 3456"
      :error="errors.cardNumber"
      @update:modelValue="formatCardNumber"
    />

    <div class="grid grid-cols-2 gap-4">
      <InputField
        v-model="expiryDate"
        :label="$t('form.expiryDate')"
        placeholder="MM/YY"
        :error="errors.expiryDate"
        @update:modelValue="formatExpiryDate"
      />

      <InputField
        v-model="cvv"
        :label="$t('form.cvv')"
        type="password"
        placeholder="123"
        maxlength="3"
        :error="errors.cvv"
      />
    </div>

    <InputField
      v-model="cardholderName"
      :label="$t('form.cardholderName')"
      placeholder="John Doe"
      :error="errors.cardholderName"
    />
  </div>
</template>

<script>
import InputField from "./InputField.vue";

export default {
  name: "CreditCardInput",
  components: {
    InputField,
  },
  props: {
    modelValue: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      cardNumber: this.modelValue.cardNumber || "",
      expiryDate: this.modelValue.expiryDate || "",
      cvv: this.modelValue.cvv || "",
      cardholderName: this.modelValue.cardholderName || "",
      errors: {},
    };
  },
  watch: {
    cardNumber(val) {
      this.updateValue("cardNumber", val);
    },
    expiryDate(val) {
      this.updateValue("expiryDate", val);
    },
    cvv(val) {
      this.updateValue("cvv", val);
    },
    cardholderName(val) {
      this.updateValue("cardholderName", val);
    },
  },
  methods: {
    formatCardNumber(value) {
      // Remove all non-digits
      let cleaned = value.replace(/\D/g, "");
      // Add space every 4 digits
      let formatted = cleaned.replace(/(.{4})/g, "$1 ").trim();
      this.cardNumber = formatted;
    },
    formatExpiryDate(value) {
      // Remove all non-digits
      let cleaned = value.replace(/\D/g, "");
      // Format as MM/YY
      if (cleaned.length >= 2) {
        cleaned = cleaned.slice(0, 2) + "/" + cleaned.slice(2, 4);
      }
      this.expiryDate = cleaned;
    },
    updateValue(field, value) {
      this.$emit("update:modelValue", {
        ...this.modelValue,
        [field]: value,
      });
    },
  },
};
</script>
