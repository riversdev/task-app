import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { Task } from '@/interfaces'

interface TasksState {
  tasks: Task[]
  filteredTasks: Task[]
  filterTerm: string
}

const initialState: TasksState = {
  tasks: [],
  filteredTasks: [],
  filterTerm: '',
}

export const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    setTasks: (state, { payload }: PayloadAction<Task[]>) => {
      state.tasks = payload
    },
    setFilterTerm: (state, { payload }: PayloadAction<string>) => {
      state.filterTerm = payload.trim()
    },
    updateFilteredTasks: state => {
      if (state.filterTerm === '') {
        state.filteredTasks = state.tasks
        return
      }

      const sections = state.filterTerm.split(' ')

      const specificFilters: Record<'priority' | 'assignedTo' | 'dueDate', string | null> = {
        priority: null,
        assignedTo: null,
        dueDate: null,
      }
      const otherTexts: string[] = []

      sections.forEach(section => {
        if (section.startsWith('priority:') && specificFilters.priority === null) {
          specificFilters.priority = section.split(':')[1]
        } else if (section.startsWith('assigned-to:') && specificFilters.assignedTo === null) {
          specificFilters.assignedTo = section.split(':')[1]
        } else if (section.startsWith('due-date:') && specificFilters.dueDate === null) {
          specificFilters.dueDate = section.split(':')[1]
        } else {
          otherTexts.push(section.toLowerCase())
        }
      })

      state.filteredTasks = state.tasks.filter(task => {
        const searchableText = `${task.title} ${task.description}`.toLowerCase()

        const matchesOtherTexts: boolean = otherTexts.every(x => searchableText.includes(x))

        if (!matchesOtherTexts) return false

        const matchesPriority: boolean = specificFilters.priority ? task.priority === specificFilters.priority : true
        const matchesAssignedTo: boolean = specificFilters.assignedTo
          ? task.assignedTo === specificFilters.assignedTo
          : true
        const matchesDueDate: boolean = specificFilters.dueDate
          ? String(task.dueDate).split('T')[0] === specificFilters.dueDate
          : true

        return matchesPriority && matchesAssignedTo && matchesDueDate
      })
    },
  },
})

export const { setTasks, setFilterTerm, updateFilteredTasks } = tasksSlice.actions
