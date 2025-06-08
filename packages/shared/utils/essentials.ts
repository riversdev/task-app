export const isValidMongoId = (id: string): boolean => {
  const mongoIdRegex = /^[a-fA-F0-9]{24}$/

  return mongoIdRegex.test(id)
}
