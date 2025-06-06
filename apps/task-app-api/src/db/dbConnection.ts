import mongoose from 'mongoose'
import { getEnvVariables } from '@/helpers'

const { MONGODB_CNN } = getEnvVariables()

export const dbConnection = async () => {
  try {
    await mongoose.connect(MONGODB_CNN)

    console.log('DB online')
  } catch (error) {
    throw new Error('Imposible conectar con la bd')
  }
}
