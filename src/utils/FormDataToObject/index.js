export default async function formDataToObject(formData) {
  const object = {};
  const promises = [];

  formData.forEach(async (value, key) => {
    if (!value || value.name === '') {
      // Skip empty or undefined values
      return;
    }

    if (formData.get(key) instanceof File) {
      // Check if the value is a File object
      const file = formData.get(key);

      // Create a FileReader to read and convert the file to a data URL
      const reader = new FileReader();

      const promise = new Promise((resolve) => {
        reader.onload = function (event) {
          object[key] = event.target.result;
          resolve();
        };
      });

      reader.readAsDataURL(file);
      promises.push(promise);
    } else if (!object.hasOwnProperty(key)) {
      object[key] = value;
    } else {
      if (!Array.isArray(object[key])) {
        object[key] = [object[key]];
      }
      object[key].push(value);
    }
  });

  await Promise.all(promises);

  return object;
}
