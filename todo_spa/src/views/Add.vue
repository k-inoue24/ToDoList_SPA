<template>
  <div>
    <h1 class="title pageTitle">タスク一覧・新規登録</h1>
    <section class="remainingTask">
      <h2 class="title sectionTitle dateTitle">日付を選択</h2>
      <div class="calenderWrap">
        <v-date-picker :mode="'single'"
                        :formats="formats"
                        v-model="selectedDate"
                        :model-config="modelConfig"
                        ></v-date-picker>
      </div>
    </section>
    <transition name="fade">
      <div class="sectionDivide" v-if="selectedDate!=null">
        <span></span>
        <span></span>
        <span></span>
      </div>
    </transition>
    <transition name="fade">
      <section class="addTask" v-if="selectedDate!=null">
        <h2 class="title sectionTitle"><span ref="selectedDate">{{selectedDate}}</span>のタスク登録</h2>
        <form @submit.prevent="addFutureItem">
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
    </transition>
    <transition name="fade">
      <div class="sectionDivide" v-if="selectedDate!=null">
        <span></span>
        <span></span>
        <span></span>
      </div>
    </transition>
    <transition name="fade">
      <section class="futureTask" v-if="selectedDate!=null">
        <h2 class="title sectionTitle"><span>{{selectedDate}}</span>のタスク一覧</h2>
        <p class="taskMessage mb20" v-if="futureTaskHour==0 && futureDoneTaskHour==0">タスクが登録されていません</p>
        <h4 class="title borderTitle" v-if="futureTaskHour!=0 || futureDoneTaskHour!=0">未完了タスク</h4>
        <p class="taskMessage mb20" v-if="futureTaskHour==0 && futureDoneTaskHour!=0">未完了のタスクはありません</p>
        <div class="tableWrap mb20" v-if="futureTaskHour!=0">
          <table class="taskTable futureTable">
            <tr>
              <th class="taskChkHead">完了</th>
              <th class="taskNameHead">タスク名</th>
              <th class="taskHourHead">工数</th>
            </tr>
            <tr v-for="(todo,index) in futureTask" :key="todo.taskId">
                <td><input type="checkbox" v-model="todo.taskDone" v-on:change='checkConfirm("remaining",todo.taskTitle)'></td>
                <td>{{todo.taskTitle}}</td>
                <td><span>{{todo.taskHour}}</span>h</td>
            </tr>
          </table>
          <div class="hourArea"><span>総工数</span>{{futureTaskHour}}h</div>
        </div>
        <h4 class="title borderTitle" v-if="futureTaskHour!=0 || futureDoneTaskHour!=0">完了タスク</h4>
        <p  class="taskMessage" v-if="futureTaskHour!=0 && futureDoneTaskHour==0">完了したタスクはありません</p>
        <div class="tableWrap" v-if="futureDoneTaskHour!=0">
          <table class="taskTable futureTable">
            <tr>
              <th class="taskChkHead">完了</th>
              <th class="taskNameHead">タスク名</th>
              <th class="taskHourHead">工数</th>
            </tr>
            <tr v-for="(todo,index) in futureDoneTask" :key="todo.taskId">
                <td><input type="checkbox" v-model="todo.taskDone" v-on:change='checkConfirm("complete",todo.taskTitle)'></td>
                <td>{{todo.taskTitle}}</td>
                <td><span>{{todo.taskHour}}</span>h</td>
            </tr>
          </table>
          <div class="hourArea"><span>総工数</span>{{futureDoneTaskHour}}h</div>
        </div>
      </section>
    </transition>
  </div>
</template>