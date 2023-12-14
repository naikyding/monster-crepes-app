<script setup>
const route = useRoute();
// const searchMobile = route.query.mobile;

const searchMobile = ref(null);
const dialogModelRef = ref(null);

onMounted(() => {
  // console.log(dialogModelRef.value.showModal());
});

function reSearch() {
  searchMobile.value = null;
  dialogModelRef.value.showModal();
}
</script>

<template>
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
        <div v-if="!searchMobile">目前訂單份數:</div>
        <div v-else>您前面等候份數:</div>
        <div class="waiting-quantity text-5xl font-bold">006</div>
        <div>
          預計等候
          <span>30</span>
          分鐘
        </div>
      </div>
      {{ searchMobile }}
      <button
        v-show="!searchMobile"
        onclick="my_modal_1.showModal()"
        class="btn btn-outline btn-info"
      >
        查詢我的進度
      </button>

      <button @click="reSearch" class="btn btn-outline btn-info">
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
      <div class="modal-box">
        <h3 class="font-bold text-lg">手機未三碼</h3>
        <p class="py-4">
          <input
            ref="inputRef"
            v-model="searchMobile"
            type="tel"
            placeholder="請輸入手機未三碼"
            class="input input-bordered input-info w-full max-w-xs"
            maxlength="3"
          />
        </p>
        <div class="modal-action">
          <form method="dialog">
            <button class="btn btn-error mr-4">取消</button>
            <button class="btn btn-success">查詢</button>
          </form>
        </div>
      </div>
    </dialog>
  </div>
</template>

<style scoped></style>
