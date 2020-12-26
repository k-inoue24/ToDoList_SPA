<template>
  <div>
  <h1 class="title pageTitle">本日のタスク</h1>
  <section class="remainingTask">
      <h2 class="title sectionTitle">{{todayString}}の残タスク</h2>
      <p class="taskMessage" v-if="remainingHour==0">本日の残タスクはありません</p>
      <div class="tableWrap" v-if="remainingHour!=0">
          <table class="taskTable remainingTable">
              <tr>
                  <th class="taskChkHead">完了</th>
                  <th class="taskNameHead">タスク名</th>
                  <th class="taskHourHead">予定工数</th>
                  <th class="taskDeleteHead"></th>
              </tr>
              <tr v-for="(todo,index) in remainingTask" :key="todo.taskId" data-id="">
                  <td class="taskChk"><input type="checkbox" v-model="todo.taskDone" v-on:change='checkConfirm("remaining",todo.taskTitle)'></td>
                  <td class="taskName">{{todo.taskTitle}}</td>
                  <td class="taskHour"><span>{{todo.taskHour}}</span>h</td>
                  <td class="taskDelete"><button class="btn deleteBtn" v-on:click="deleteItem(todo)">削除</button></td>
              </tr>
          </table>
          <div class="hourArea"><span>残工数</span>{{remainingHour}}h</div>
      </div>
  </section>
  <div class="sectionDivide">
      <span></span>
      <span></span>
      <span></span>
  </div>
  <section class="addTask">
      <h2 class="title sectionTitle">{{todayString}}のタスク追加</h2>
      <form @submit.prevent="addItem">
          <div class="tableWrap">
              <table class="taskTable addTable">
                  <tr>
                      <th class="taskNameHead">タスク名</th>
                      <th class="taskHourHead">予定工数</th>
                  </tr>
                  <tr>
                      <td class="taskName"><input class="taskNameInput" type="text" v-model="newTask"></td>
                      <td class="taskHour"><input class="taskHourInput" type="number" min=0 v-model="newHour">h</td>
                  </tr>
              </table>
              <button class="btn submitBtn" type="submit">タスク登録</button>
          </div>
      </form>
  </section>
  <div class="sectionDivide">
      <span></span>
      <span></span>
      <span></span>
  </div>
  <section class="completedTask">
      <h2 class="title sectionTitle">{{todayString}}の完了タスク</h2>
      <p class="taskMessage" v-if="completedHour==0">本日の完了タスクはありません</p>
      <div class="tableWrap" v-if="completedHour!=0">
          <table class="taskTable doneTable">
              <tr>
                  <th class="taskChkHead">完了</th>
                  <th class="taskNameHead">完了タスク名</th>
                  <th class="taskHourHead">工数</th>
              </tr>
              <tr v-for="(todo,index) in completedTask" :key="todo.taskId">
                  <td class="taskChk"><input type="checkbox" v-model="todo.taskDone" v-on:change='checkConfirm("complete",todo.taskTitle)'></td>
                  <td class="taskName">{{todo.taskTitle}}</td>
                  <td class="taskHour"><span>{{todo.taskHour}}</span>h</td>
              </tr>
          </table>
          <div class="hourArea"><span>総工数</span>{{completedHour}}h</div>
      </div>
  </section>
  </div>
</template>