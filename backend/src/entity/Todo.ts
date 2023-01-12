import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { TodoList } from './TodoList'


@Entity()
export class Todo {

  @PrimaryGeneratedColumn()
  id: number

  @Column({ default: 'First todo' })
  name: string

  @Column({ default: false })
  isComplete: boolean


  @ManyToOne(() => TodoList, (todoList) => todoList.todos, { cascade: true, eager: true })
  todoList: TodoList

}
