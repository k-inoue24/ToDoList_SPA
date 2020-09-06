'use strict';

var vm = new Vue({
    el: '#app',
    data: {
        newTask: '',
        newHour: '',
        totalHour: 0,
        todos: []
    },
    methods: {
        addItem: function() {
            var taskItem = {
                taskTitle: this.newTask,
                taskHour: this.newHour,
                taskDone: false
            }
            this.totalHour += parseInt(this.newHour, 10);
            this.todos.push(taskItem);
            this.newTask = '';
            this.newHour = '';
        }
    },
    computed: {

    }
});