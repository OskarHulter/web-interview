import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { Todo } from './Todo'


@Entity()
export class TodoList {

  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ default: 'First list' })
  title: string

  @Column({ default: false })
  isComplete: boolean


  @OneToMany(() => Todo, (todo) => todo.todoList, { cascade: true, eager: true })
  todos: Todo[]

}
