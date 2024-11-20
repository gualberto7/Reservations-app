<script lang="ts" setup></script>

<template>
  <div class="grid grid-cols-1 md:grid-cols-3 h-screen gap-3">
    <div class="border-r-2 border-gray-400 h-4/5">
      <h2 class="text-lg tracking-wider">Reservation Requests</h2>
      <div></div>
    </div>
    <div class="col-span-2 h-4/5">
      <h2 class="text-lg tracking-wider">Tables Status</h2>
      <Tables />
    </div>
  </div>
</template>
