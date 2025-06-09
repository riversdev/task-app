import { Link } from 'react-router'
import { Alert } from 'react-bootstrap'

interface Props {
  type: 'danger' | 'warning' | 'primary'
  icon?: 'fa-bug' | 'fa-exclamation-triangle' | 'fa-spin fa-spinner' | 'fa-circle-info'
  message: string
}

export const StaticAlert = ({ type, icon = 'fa-circle-info', message }: Props) => {
  return (
    <Alert variant={type} className="text-center w-100" style={{ maxWidth: '30rem' }}>
      <div className="mb-2">
        <i className={`fa-solid fa-3x ${icon}`}></i>
      </div>
      <Alert.Heading>{message}</Alert.Heading>
      {type !== 'primary' && (
        <p className="mb-0">
          Dont worry, you can back to
          <Link to="/" className="ms-1 text-info">
            home page
          </Link>
        </p>
      )}
    </Alert>
  )
}
