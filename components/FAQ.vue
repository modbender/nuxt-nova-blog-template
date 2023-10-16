<template>
  <div class="my-5" v-if="!!post.attributes.faq.length > 0">
    <div class="h4">FAQ</div>
    <div id="FAQAccordian" class="accordion accordion-flush">
      <div
        class="accordion-item"
        v-for="faq in post.attributes.faq"
        :key="faq.id"
      >
        <h2 class="accordion-header">
          <button
            class="accordion-button collapsed"
            type="button"
            data-bs-toggle="collapse"
            :data-bs-target="`#flush-collapse-${faq.id}`"
            aria-expanded="false"
            :aria-controls="`flush-collapse-${faq.id}`"
          >
            {{ faq.question }}
          </button>
        </h2>
        <div
          :id="`flush-collapse-${faq.id}`"
          class="accordion-collapse collapse"
          data-bs-parent="#FAQAccordian"
        >
          <div class="accordion-body">
            {{ faq.answer }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  post: {
    required: true,
  },
});
</script>
