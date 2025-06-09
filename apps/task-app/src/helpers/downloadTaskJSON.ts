import type { Task } from '@/interfaces'

export const downloadTaskFilter = (tasks: Task[], filename = `filtered-tasks-${new Date().toISOString()}.json`) => {
  const jsonString = JSON.stringify(tasks, null, 2)

  const blob = new Blob([jsonString], { type: 'application/json' })

  const url = URL.createObjectURL(blob)

  const a = document.createElement('a')
  a.href = url
  a.download = filename

  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)

  URL.revokeObjectURL(url)
}
