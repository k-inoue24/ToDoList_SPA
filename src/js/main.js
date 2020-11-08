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
                tasdDay: this.todayString,
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
            return today;
        },
        todayString: function() {
            var dayArray = new Array("日","月","火","水","木","金","土");
            var todayString = this.today.getFullYear() + '年' + (this.today.getMonth() + 1) + '月' + this.today.getDate() + '日' + '（' + dayArray[this.today.getDay()] + '）';
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
        dateSelect: function() {
          var dateSelect = [];
          var dateSelectString = [];
          var dayArray = new Array("日","月","火","水","木","金","土");
          for(var i = 0; i < 9; i++) {
            dateSelect[i] = this.today.setDate(this.today.getDate() - i);
            dateSelectString[i] = dateSelect[i].getFullYear() + '年' + (dateSelect[i].getMonth() + 1) + '月' + dateSelect[i].getDate() + '日' + '（' + dayArray[dateSelect[i].getDay()] + '）';

          }
          return dateSelect;
        }
    }
});
