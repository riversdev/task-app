import type { ApiResponse } from '@/interfaces'

export interface ErrorResponse {
  status: number | 'FETCH_ERROR' | 'PARSING_ERROR' | 'TIMEOUT_ERROR' | 'CUSTOM_ERROR'
  data: ApiResponse<null>
}
