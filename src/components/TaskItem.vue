<template>
  <div class="container-task">
    <!-- <div
      v-bind:class="
        task.is_complete
          ? `container-task-text-completed`
          : `container-task-text-not-completed`
      "
    > -->

    <div class="tarea">
      <h4 class="titolo">{{ task.title }}</h4>
      <p class="paragrafo">{{ task.description }}</p>
    </div>

    <!-- </div> -->

    <!-- <div v-show="editTask" class="input-field-task">
      <input
        class="input-field-task-text"
        type="text"
        :placeholder="task.title"
        v-model="name"
      />
      <input
        class="input-field-task-text"
        type="text"
        placeholder="Edit Description"
        v-model="description"
      /> -->
    <div class="btn-container">
      <button class="btn-edit" @click="editModeOn">
        <span class="material-symbols-outlined"> edit_note </span> <b>Edit</b>
      </button>

      <!-- <button @click="emitComplete" class="btn-completed">
        <span class="material-symbols-outlined"> check_circle </span>
        {{ isDone ? "Completed" : "Complete Task" }}
      </button> -->
      <button
        @click="emitComplete"
        :class="
          task.is_complete ? 'button btn-completed' : 'button btn-complete'
        "
      >
        <span class="material-symbols-outlined"> check </span>
        <b>{{ task.is_complete ? "Completed!" : "Complete Task" }}</b>
      </button>

      <button @click="deleteTask" class="btn-delete button">
        <span class="material-symbols-outlined"> delete </span> <b>Delete</b>
      </button>
    </div>
    <div id="editmode" v-show="editMode" class="input-field-task">
      <textarea
        class="input-field-task-title"
        type="text"
        placeholder="Edit title"
        v-model="title"
        cols="15"
        rows="2"
      ></textarea>

      <textarea
        class="input-field-task-description"
        type="text"
        placeholder="Edit description"
        v-model="description"
        cols="15"
        rows="2"
      ></textarea>
      <button @click="updateTask" class="btn-save">
        <span class="material-symbols-outlined"> save </span> <b>Save</b>
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, onUpdated } from "vue";
import { useTaskStore } from "../stores/task";
import { supabase } from "../supabase";

const emit = defineEmits([
  "addTaskChild",
  "deleteTaskChild",
  "markAsCompleted",
  "updateTask",
]);

const taskStore = useTaskStore();
const editMode = ref(false);

let title = ref(props.task.title);
console.log(title);
console.log(props.task.title);
let description = ref(props.task.description);
// let isDone = ref(task.is_complete);
let taskId = ref(props.task.id);

const props = defineProps({
  task: Object,
});

// Función para borrar la tarea a través de la store. El problema que tendremos aquí (y en NewTask.vue) es que cuando modifiquemos la base de datos los cambios no se verán reflejados en el v-for de Home.vue porque no estamos modificando la variable tasks guardada en Home. Usad el emit para cambiar esto y evitar ningún page refresh.
const deleteTask = () => {
  //await taskStore.deleteTask(props.task.id);
  emit("deleteTaskChild", props.task.id);
};
const editModeOn = () => {
  editMode.value = !editMode.value;
};

const updateTask = async () => {
  await taskStore.updateTask(title.value, description.value, props.task.id);
  emit("updateTask");
  editMode.value = !editMode.value;
};

const emitComplete = async () => {
  await taskStore.markAsCompleted(props.task.id, !props.task.is_complete);
  console.log(props.task.id, !props.task.is_complete);
  taskStore.fetchTasks();
  emit("markAsCompleted", props.task);
};
</script>

<style></style>

<!--
**Hints**
1. ref() or reactive() can be used here to store the following, think if you want to store them either individually or
like an object, up to you.

2. Data properties need here are the following: a boolean to store a false**Important variable, a string to store an error,
a string to store the value of the task that the user can edit, an initial false boolean to hide the inputFIeld used to edit
the new task detail or details[this is in reference of the task title and the task description].

3. Store the custom emit events that will be used to call the functions of the homeView for editing, deleting and toggling the
status[completed, not complted] of the taskItem.

4. Function to handle the error with the data properties used to control the error and the the boolean controlling the boolean
empty variable.

5. Function to handle the edit dialogue where the inputField is displayed and the string used to store the value of the
inputField will be used here to save the value as a prop on this function.

6. Function to emmit a custom event emit() that takes 2 parameters a name for the custom event and the value that will be
send via the prop to the parent component. This function can control the toggle completion of the task on the homeview.

7. Function to edit the task information that you decided that the user can edit. This function's body takes in a conditional
that first checks if the value of the task [either title and description or just title] is empty which if true it runs the
function used to handle the error on hint4. Else, the conditional sets the first mentioned boolean data property on hint2
back to its inital boolean value to hide the error message and repeat the same for the data property mentioned 4th on hint2;
a constant that stores an object that holds the oldValue from the prop item and the value of the task coming from the data
property mentioned 3rd on hint2; a custom event emit() that takes 2 parameters a name for the custom event and the value
from the object used on this part of the conditional and lastly this part of the conditional sets the value of input field
to an empty string to clear it from the ui.

8. Function to emmit a custom event emit() that takes 2 parameters a name for the custom event and the value that will be
send via the prop to the parent component. This function can control the removal of  the task on the homeview.
-->
