<script setup lang="ts">
const tabs = [
  { id: "tables", title: "Tables" },
  { id: "dashboard", title: "Dashboard" },
  { id: "settings", title: "Settings" },
];
</script>

<template>
  <div>
    <Tabs :tabs="tabs">
      <template #tables>
        <div>
          <TablesContainer />
        </div>
      </template>
      <template #dashboard>
        <div>
          <Dashboard />
        </div>
      </template>
      <template #settings>
        <div>
          <h3>Settings</h3>
        </div>
      </template>
    </Tabs>
  </div>
</template>
