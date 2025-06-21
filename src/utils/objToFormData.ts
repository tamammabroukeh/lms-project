export const objToFormData = (
  object: Record<string, unknown>,
  form?: FormData,
  namespace?: string
): FormData => {
  const formData = form || new FormData();

  for (const property in object) {
    if (
      !object.hasOwnProperty(property) ||
      typeof object[property] === "undefined"
    ) {
      continue;
    }

    const formKey = namespace ? `${namespace}[${property}]` : property;
    const value = object[property];

    if (value instanceof Date) {
      formData.append(formKey, value.toISOString());
    } else if (
      typeof value === "object" &&
      value !== null &&
      !(value instanceof File) &&
      !(value instanceof Blob)
    ) {
      objToFormData(value as Record<string, unknown>, formData, formKey);
    } else if (value !== null && value !== undefined) {
      formData.append(formKey, String(value));
    }
  }

  return formData;
};
