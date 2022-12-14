import { defineStore } from "pinia";
import { supabase } from "../supabase";
import { useUserStore } from "./user";

export const useTaskStore = defineStore("tasks", {
  // aca puedo definir tipos de daots primitivos o no primitivos
  state: () => ({
    tasks: null,
    //myName: "Nico" 
  }),
  // aca puedo pasar funciones trasversales en mi codgio
  actions: {
    async fetchTasks() {
      const { data: tasks } = await supabase
        .from("tasks")
        .select("*")
        .order("id", { ascending: false });
      this.tasks = tasks;
      return this.tasks;
    },
    
    async addTask(title, description) {
      console.log(useUserStore().user.id);
      const { data, error } = await supabase.from("tasks").insert([
        {
          user_id: useUserStore().user.id,
          title: title,
          is_complete: false,
          description: description,
        },
      ]);
    },
    async updateTask(title, description, id
    ) {
      const { data, error } = await supabase.from("tasks").update([{
        // user_id: useUserStore().user.id,
        title: title,
        // is_complete: false,
      description: description}]).match({id:id})
} ,
    async deleteTask(id){
      const { data, error } = await supabase.from("tasks").delete().match({
        id: id,
      });
    },
    async markAsCompleted(id, taskCompleted) {
      const {data, error} = await supabase.from("tasks").update({is_complete: taskCompleted}).match({id:id})
    }
  }
});
