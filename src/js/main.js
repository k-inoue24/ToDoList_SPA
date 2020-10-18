'use strict';

var vm = new Vue({
    el: '#app',
    data: {
        newTask: '',
        newHour: '',
        id: 1,
        todos: [],
    },
    watch: {
      todos: {
          handler: function() {
              localStorage.setItem('todos', JSON.stringify(this.todos));
          },
          deep: true
      }
    },
    mounted: function() {
      this.todos = JSON.parse(localStorage.getItem('todos')) || [];
    },
    methods: {
        addItem: function() {
            var taskItem = {
                tasdDay: this.today,
                taskId: this.lastId,
                taskTitle: this.newTask,
                taskHour: this.newHour,
                taskDone: false
            }
            if(this.newTask != '' && this.newHour != '') {
                this.todos.push(taskItem);
                this.newTask = '';
                this.newHour = '';
            }
        },
        deleteItem: function(item) {
          if (confirm('削除してよろしいでしょうか？')) {
            this.todos = this.todos.filter(function(todo){
              return todo.taskId != item.taskId;
            },this)
          }
        }
    },
    computed: {
        today: function() {
            var today = new Date();
            var dayArray = new Array("日","月","火","水","木","金","土");
            var todayString = today.getFullYear() + '年' + (today.getMonth() + 1) + '月' + today.getDate() + '日' + '（' + dayArray[today.getDay()] + '）'
            return todayString;
        },
        remainingTask: function(){
            return this.todos.filter(function(todo){
                return todo.taskDone == false;
            },this)
        },
        remainingHour: function(){
            var remainingHour = 0;
            this.remainingTask.forEach(function(el){
                remainingHour += parseInt(el.taskHour, 10);
            });
            return remainingHour;
        },
        completedTask: function(){
            return this.todos.filter(function(todo){
                return todo.taskDone == true
            },this)
        },
        completedHour: function(){
            var completedHour = 0;
            this.completedTask.forEach(function(el){
                completedHour += parseInt(el.taskHour, 10);
            });
            return completedHour;
        },
        lastId: function() {
          var lastId = 1;
          this.todos.forEach(function(el){
            if(lastId <= el.taskId) lastId = el.taskId + 1;
          });
          return lastId;
        },
        consoleChk: function(){
            console.log(this.todos)
        },

    }
});
