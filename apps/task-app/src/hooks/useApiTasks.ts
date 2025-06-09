import { useEffect } from 'react'
import { useNavigate } from 'react-router'
import Swal from 'sweetalert2'
import { useAddTaskMutation, useDeleteTaskMutation, useLazyGetTaskQuery, useUpdateTaskMutation } from '@/store/tasks'
import type { ErrorResponse } from '@/interfaces'

export const useApiTasks = (showAlerts = true) => {
  const navigate = useNavigate()
  const [getTask, { data: task, isLoading, isFetching, error: getTaskError }] = useLazyGetTaskQuery()
  const [addTask, { isLoading: isAdding, isSuccess: isAddSuccess, error: addTaskError }] = useAddTaskMutation()
  const [updateTask, { isLoading: isUpdating, isSuccess: isUpdateSuccess, error: updateTaskError }] =
    useUpdateTaskMutation()
  const [deleteTask, { isLoading: isDeleting, isSuccess: isDeleteSuccess, error: deleteTaskError }] =
    useDeleteTaskMutation()

  useEffect(() => {
    if (addTaskError) {
      const { data } = addTaskError as ErrorResponse

      if (showAlerts)
        Swal.fire({
          title: 'Task has not been added',
          text: data.msg,
          icon: 'error',
          confirmButtonText: 'Ok',
          confirmButtonColor: 'var(--bs-danger)',
        })
    }
  }, [addTaskError, showAlerts])

  useEffect(() => {
    if (updateTaskError) {
      const { data } = updateTaskError as ErrorResponse

      if (showAlerts)
        Swal.fire({
          title: 'Task has not been updated',
          text: data.msg,
          icon: 'error',
          confirmButtonText: 'Ok',
          confirmButtonColor: 'var(--bs-danger)',
        })
    }
  }, [updateTaskError, showAlerts])

  useEffect(() => {
    if (deleteTaskError) {
      const { data } = deleteTaskError as ErrorResponse

      if (showAlerts)
        Swal.fire({
          title: 'Task has not been deleted',
          text: data.msg,
          icon: 'error',
          confirmButtonText: 'Ok',
          confirmButtonColor: 'var(--bs-danger)',
        })
    }
  }, [deleteTaskError, showAlerts])

  useEffect(() => {
    if (isAddSuccess) {
      Swal.fire({
        title: 'Added',
        text: 'The task has been added successfuly',
        icon: 'success',
        confirmButtonText: 'Ok',
        confirmButtonColor: 'var(--bs-success)',
      }).then(() => navigate('/tasks'))
    }
  }, [isAddSuccess, navigate])

  useEffect(() => {
    if (isUpdateSuccess) {
      if (showAlerts)
        Swal.fire({
          title: 'Updated',
          text: 'The task has been updated successfuly',
          icon: 'success',
          confirmButtonText: 'Ok',
          confirmButtonColor: 'var(--bs-success)',
        }).then(() => navigate('/tasks'))
    }
  }, [isUpdateSuccess, navigate, showAlerts])

  useEffect(() => {
    if (isDeleteSuccess) {
      if (showAlerts)
        Swal.fire({
          title: 'Deleted',
          text: 'The task has been deleted successfuly',
          icon: 'success',
          confirmButtonText: 'Ok',
          confirmButtonColor: 'var(--bs-success)',
        })
    }
  }, [isDeleteSuccess, navigate, showAlerts])

  return {
    task,
    getTask,
    isLoading,
    isFetching,
    getTaskError,

    addTask,
    isAdding,
    isAddSuccess,
    addTaskError,

    updateTask,
    isUpdating,
    isUpdateSuccess,
    updateTaskError,

    deleteTask,
    isDeleting,
    isDeleteSuccess,
    deleteTaskError,
  }
}
