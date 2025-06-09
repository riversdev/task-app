interface EnvVariables {
  API_URL: string
}

export const getEnvVariables = (): EnvVariables => {
  const env = { ...import.meta.env }

  return {
    API_URL: env.VITE_API_URL || '',
  }
}
