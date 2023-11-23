import { Component, DoCheck } from '@angular/core';
import { TaskList } from '../../model/task-list';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})

export class TodoListComponent implements DoCheck{
  public taskList: Array<TaskList> = JSON.parse(localStorage.getItem("list") || '[]')

  ngDoCheck(){
    this.setLocalStorage()
  }

  public setEmitTaskList(event: string) {
    this.taskList.push({ task: event, checked: false })
  }

  public deleteItemListTask(event: number) {
    this.taskList.splice(event, 1)
  }

  public deleteAllTaskList() {
    const confirm = window.confirm("Deseja mesmo apagar todos os itens?")

    if (confirm) {
      this.taskList = []
    }

  }

  public validationInput(event: string, index:number){
    if (!event.length) {
      const confirm = window.confirm("task está vazia deseja deletar?")

      if (confirm) {
        this.deleteItemListTask(index)
      }
    }
  }

  public setLocalStorage(){
    if (this.taskList) {
      this.taskList.sort((first, last) => Number(first.checked) - Number(last.checked))
      localStorage.setItem("list", JSON.stringify(this.taskList))
    }
  }
}
