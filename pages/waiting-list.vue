<script setup>
const dialogModelRef = ref(null);
const config = useRuntimeConfig();
const mobileNumber = ref(null);

const {
  value: mobileLastNumber,
  errorMessage,

  validate,
  resetField,
} = checkLastThreeDigits();

const searchPendingList = (mobileNumber) =>
  useFetch(`${config.public.apiUrl}/v1/orders/waiting`, {
    query: { mobile: mobileNumber },
    lazy: true,
    headers: {
      "mc-agent-id": "64741f07778d6a978ef85f10",
    },
  });

const { pending, data, refresh } = await searchPendingList();

const itemQuantity = computed(() =>
  data.value?.data?.itemQuantity >= 0 ? data.value?.data?.itemQuantity : "--"
);

const range = computed(() => {
  const time = data.value?.data?.range;
  if (!time) return "--";
  if (time.min === time.max) return time.min;
  return `${time.min}~${time.max}`;
});

async function searchMobile(mobileLastNumber) {
  await validate();
  if (errorMessage.value) return;

  dialogModelRef.value.close();

  await reFetch(mobileLastNumber);

  mobileNumber.value = mobileLastNumber.value;
  resetField();
}

async function reFetch(mobileLastNumber) {
  pending.value = true;

  const {
    pending: { value: newPending },
    data: { value: newData },
    refresh: { value: newRefresh },
  } = await searchPendingList(mobileLastNumber.value);

  data.value = newData;
  pending.value = newPending;
  refresh.value = newRefresh;
}

// 刷新頁面
function reSearchData(mobileNumber) {
  mobileNumber.value ? reFetch(mobileNumber) : refresh();
}

function resetSearch() {
  mobileNumber.value = null;
  refresh();
}

onMounted(() => {
  refresh();
});
</script>

<template>
  <Title>怪獸可麗餅 | 候餐時間</Title>
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

      <div class="wait-info py-4 w-full">
        <!-- loading 骨架 -->
        <div v-if="pending || !data" class="flex flex-col gap-4 items-center">
          <div class="skeleton h-4 w-28"></div>
          <div class="skeleton h-10 w-10"></div>
          <div class="skeleton h-4 w-28"></div>
        </div>

        <!-- loading DONE -->
        <div v-else>
          <div v-if="mobileNumber">
            <h3>未三碼</h3>
            <p class="waiting-quantity text-5xl font-bold text-info my-4">
              <span
                class="border rounded-lg px-3 mx-1"
                v-for="item in mobileNumber.split('')"
              >
                {{ item }}
              </span>
            </p>
          </div>

          <div v-if="typeof data.data === 'string'">
            {{ data.data }}
          </div>

          <div v-else>
            目前候餐數量
            <!-- 候餐數量 -->
            <div class="waiting-quantity text-5xl font-bold text-info">
              {{ itemQuantity }}
            </div>

            <!-- 等候時間 -->
            <div v-if="range === 0 || itemQuantity === 1" class="mt-2">
              <span v-if="mobileNumber">製作中</span>
              <span v-else>不用等候</span>
            </div>
            <div v-else class="mt-2">
              預計等候約
              <span>{{ range }}</span>
              分鐘
            </div>
          </div>
        </div>
      </div>

      <!-- 查詢我的進度 -->
      <button
        v-show="!mobileNumber"
        onclick="my_modal_1.showModal()"
        class="btn btn-info btn-block h-14"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          data-slot="icon"
          class="w-6 h-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
          />
        </svg>
        查詢我的進度
      </button>

      <!-- 重新查詢 -->
      <button
        v-show="mobileNumber"
        :disabled="pending"
        @click="resetSearch"
        class="btn btn-info btn-block h-14"
      >
        <template v-if="!pending">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            data-slot="icon"
            class="w-6 h-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
            />
          </svg>
          查詢現場候餐
        </template>

        <template v-else>
          <div class="loading loading-spinner" />
        </template>
      </button>

      <!-- 刷新頁面 -->
      <div class="my-4">
        <!-- 刷新 -->
        <button
          @click="reSearchData(ref(mobileNumber))"
          class="btn btn-outline btn-info btn-block h-14"
          :disabled="pending"
        >
          <template v-if="!pending">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              data-slot="icon"
              class="w-6 h-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
              />
            </svg>
            刷新頁面
          </template>

          <template v-else>
            <div class="loading loading-spinner" />
          </template>
        </button>
      </div>

      <!-- 說明標語 -->
      <div role="alert" class="alert py-2 gap-2 w-full mt-4">
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
        <span class="text-xs">頁面非即時更新，請刷新頁面</span>
      </div>
    </div>

    <!-- Dialog -->
    <dialog ref="dialogModelRef" id="my_modal_1" class="modal">
      <div class="modal-box w-11/12 sm:w-96">
        <h3 class="font-bold text-lg">手機未三碼</h3>

        <inputPhoneLastThreeNumber
          class="py-4"
          type="tel"
          inputmode="numeric"
          v-model="mobileLastNumber"
          :errorMessage="errorMessage"
        />

        <div class="modal-action">
          <form method="dialog">
            <button @click="resetField" class="btn btn-error">取消</button>
          </form>
          <button
            @click="searchMobile(ref(mobileLastNumber))"
            class="btn btn-success"
          >
            查詢
          </button>
        </div>
      </div>
    </dialog>
  </div>
</template>

<style scoped></style>
