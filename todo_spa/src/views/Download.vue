<template>
  <div>
    <h1 class="title pageTitle">データダウンロード</h1>
    <p>登録タスクの一覧をCSV形式でダウンロードします。</p>
    <button class="btn csvBtn" v-on:click="downloadCSV">CSVダウンロード</button>
  </div>
</template>
