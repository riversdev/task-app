import { useEffect, useRef, useState } from 'react'
import { Button, Form, InputGroup, OverlayTrigger, Popover } from 'react-bootstrap'
import { useAppDispatch, useAppSelector } from '@/hooks'
import { setFilterTerm as setGlobalFilterTerm, updateFilteredTasks } from '@/store/tasks'

export const SearchBar = () => {
  const { filterTerm: globalFilterTerm } = useAppSelector(state => state.tasks)
  const dispatch = useAppDispatch()
  const [filterTerm, setFilterTerm] = useState(globalFilterTerm)
  const [debouncedFilterTerm, setDebouncedFilterTerm] = useState('')
  const debounceTimeout = useRef<NodeJS.Timeout>(null)

  useEffect(() => {
    if (debounceTimeout.current) clearTimeout(debounceTimeout.current)

    debounceTimeout.current = setTimeout(() => {
      setDebouncedFilterTerm(filterTerm)
    }, 500)
  }, [filterTerm])

  useEffect(() => {
    dispatch(setGlobalFilterTerm(debouncedFilterTerm))
    dispatch(updateFilteredTasks())
  }, [debouncedFilterTerm, dispatch])

  return (
    <div className="mb-3">
      <InputGroup>
        <Form.Control
          type="search"
          size="lg"
          placeholder="what are you looking for..."
          value={filterTerm}
          onChange={({ target: { value } }) => setFilterTerm(value)}
        />
        <SearchBarHelpInfo />
      </InputGroup>
    </div>
  )
}

const SearchBarHelpInfo = () => (
  <OverlayTrigger
    trigger="click"
    placement="auto"
    overlay={
      <Popover className="border-info" style={{ maxWidth: '25rem' }}>
        <Popover.Body>
          <h6 className="fw-bold">Build a filter</h6>
          <p>
            Use specific filters like{' '}
            <i>
              priority <span className="text-info">low, medium, high</span>
            </i>
            , <i>assigned-to</i> and <i>due-date</i>
            <br />
            Example: <code>priority:medium</code>
          </p>
          <p>
            Include other filter if you want
            <br />
            Example: <code>hola</code>
          </p>
          <p className="mb-0">
            A complete filter should be:
            <br />
            <code>priority:high asigned-by:Alejandro due-date:2025-05-01 title description</code>
          </p>
        </Popover.Body>
      </Popover>
    }
  >
    <Button variant="outline-info" title="how to use the search bar ?">
      <i className="fa-solid fa-question"></i>
    </Button>
  </OverlayTrigger>
)
