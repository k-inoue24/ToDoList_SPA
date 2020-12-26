<template>
  <div id="app">
      <nav>
        <ul>
          <li><router-link to="/">本日のタスク</li>
          <li><router-link to="/add">タスク一覧・新規登録</li>
          <li><router-link to="/download">データダウンロード</li>
        </ul>
    </nav>
   <router-view></router-view>
  </div>
</template>