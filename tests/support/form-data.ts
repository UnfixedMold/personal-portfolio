export function toFormData(fields: Record<string, string>) {
  const formData = new FormData()

  Object.entries(fields).forEach(([name, value]) => formData.set(name, value))

  return formData
}
