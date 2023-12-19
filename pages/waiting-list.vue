<script setup>
const dialogModelRef = ref(null);

const { pending, data, error, refresh } = await useFetch(
  "http://localhost:3000/v1/orders/waiting",
  {
    lazy: false,
    server: true,
    headers: {
      "mc-agent-id": "64741f07778d6a978ef85f10",
    },
  }
);

const {
  value: mobileNumber,
  errorMessage,

  validate,
  resetField,
} = checkLastThreeDigits();

const itemQuantity = computed(() =>
  data.value?.data.itemQuantity >= 0 ? data.value?.data.itemQuantity : "--"
);

const range = computed(() => {
  const time = data.value?.data?.range;
  if (!time) return "--";
  if (time.min === time.max) return time.min;
  return `${time.min}~${time.max}`;
});

function reSearch() {
  resetField();
  dialogModelRef.value.showModal();
}

async function searchMobile() {
  await validate();
  if (errorMessage.value) return;

  console.log("OK");
}

onMounted(() => {
  refresh();
});
</script>

<template>
  <Title>怪獸可麗餅 目前等待</Title>
  <div class="w-auto h-[100dvh] flex justify-center items-center">
    <div class="text-center">
      <h1 class="text-2xl font-bold">怪獸可麗餅</h1>
      <p class="flex justify-center">
        竹圍
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-6 h-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
          />
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
          />
        </svg>
      </p>

      <div class="wait-info py-10">
        <div v-if="pending" class="flex flex-col gap-4 w-full">
          <div class="skeleton h-4 w-full"></div>
          <div class="skeleton h-4 w-28"></div>
        </div>

        <div v-else>
          <div v-if="!mobileNumber">目前訂單份數:</div>
          <div v-else>您前面等候份數:</div>
          <div class="waiting-quantity text-5xl font-bold">
            {{ itemQuantity }}
          </div>

          <div class="mt-2">
            預計等候
            <span>{{ range }}</span>
            分鐘
          </div>
        </div>
      </div>
      {{ mobileNumber }}
      <button
        v-if="!mobileNumber"
        onclick="my_modal_1.showModal()"
        class="btn btn-outline btn-info"
      >
        查詢我的進度
      </button>

      <button
        v-else="mobileNumber"
        @click="reSearch"
        class="btn btn-outline btn-info"
      >
        重新查詢
      </button>

      <!-- 標語 -->
      <div role="alert" class="alert py-2 mt-4 gap-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          class="stroke-info shrink-0 w-6 h-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          ></path>
        </svg>
        <span class="text-xs">以上時間僅供參考，以現場狀況為主。</span>
      </div>
    </div>

    <!-- Dialog -->
    <dialog ref="dialogModelRef" id="my_modal_1" class="modal">
      <div class="modal-box w-auto sm:w-96">
        <h3 class="font-bold text-lg">手機未三碼</h3>

        <inputPhoneLastThreeNumber
          class="py-4"
          type="tel"
          v-model="mobileNumber"
          :errorMessage="errorMessage"
        />

        <div class="modal-action">
          <form method="dialog">
            <button @click="resetField" class="btn btn-error">取消</button>
          </form>
          <button @click="searchMobile" class="btn btn-success">查詢</button>
        </div>
      </div>
    </dialog>
  </div>
</template>

<style scoped></style>
