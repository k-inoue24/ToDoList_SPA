'use strict';

var vm = new Vue({
    el: '#app',
    data: {
        newTask: '',
        newHour: '',
        id: 1,
        todos: [],
        mode: 'single',
        formats: {
          input: ['YYYY-MM-DD'],
          data: ["YYYY/MM/DD"],
        },
        modelConfig: {
          type: 'string',
          mask: 'YYYY'+'年'+'MM'+'月'+'D'+'日' + '（' + 'W' + '）', // Uses 'iso' if missing
        },
        selectedDate: null,
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
                taskDay: this.todayString,
                taskId: this.lastId,
                taskTitle: this.newTask,
                taskHour: this.newHour,
                taskDone: false
            }
            if(this.newTask != '' && this.newHour != '') {
                this.todos.push(taskItem);
                this.newTask = '';
                this.newHour = '';
            } else {
              alert('タスク名と予定工数をそれぞれ入力してください')
            }
        },
        deleteItem: function(item) {
          if (confirm('タスク名「' + item.taskTitle + '」を削除してよろしいですか？')) {
            this.todos = this.todos.filter(function(todo){
              return todo.taskId != item.taskId;
            },this)
          }
        },
        addFutureItem: function(){
          var taskItem = {
            taskDay: this.selectedDate,
            taskId: this.lastId,
            taskTitle: this.newTask,
            taskHour: this.newHour,
            taskDone: false
        }
        if(this.newTask != '' && this.newHour != '') {
            this.todos.push(taskItem);
            this.newTask = '';
            this.newHour = '';
        } else {
          alert('タスク名と予定工数をそれぞれ入力してください')
        }
      },
      checkConfirm: function(status,taskTitle){
        var alertMessage;
        if(status == "remaining") alertMessage = 'タスク名「' + taskTitle + '」を完了にしてよろしいですか？';
        else alertMessage = 'タスク「' + taskTitle + '」を未完了に戻してよろしいですか？'
        if(alert(alertMessage)) return;
      },
      downloadCSV: function(){
        var csv = '\ufeff' + '日付,タスク名,工数（h）\n'
        this.todos.forEach(el => {
          var line = el['taskDay'] + ',' + el['taskTitle']+ ',' + el['taskHour'] + '\n';
          csv += line;
        })
        var blob = new Blob([csv], { type: 'text/csv' });
        var link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.download = 'all_task.csv';
        link.click();
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
                return todo.taskDone == false && todo.taskDay == this.todayString;
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
                return todo.taskDone == true && todo.taskDay == this.todayString
            },this);
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
        },
        futureDayString: function(){
          if(this.selectedDate != null) console.log(this.selectedDate);
        },
        futureTask: function(){
          return this.todos.filter(function(todo){
            return todo.taskDone == false && todo.taskDay == this.selectedDate
          },this);
        },
        futureDoneTask: function(){
          return this.todos.filter(function(todo){
            return todo.taskDone == true && todo.taskDay == this.selectedDate
          },this);
        },
        futureTaskHour: function(){
          var futureTaskHour = 0;
          this.futureTask.forEach(function(el){
            futureTaskHour += parseInt(el.taskHour, 10);
          });
          return futureTaskHour;
        },
        futureDoneTaskHour: function(){
          var futureDoneTaskHour = 0;
          this.futureDoneTask.forEach(function(el){
            futureDoneTaskHour += parseInt(el.taskHour, 10);
          });
          return futureDoneTaskHour;
        },
        archiveTask: function(){
          return this.todos.filter(function(todo){
            return todo.taskDone == false && todo.taskDay == this.selectedDate
          },this);
        },
    }
});
