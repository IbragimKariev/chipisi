export function validateHrWebResponse(response: any) {
    if (response && response.success == false) {
      switch (response.message) {
        case "already exists":
          throw "Запись с таким названием уже существует";
        default:
          throw response.message;
      }
    }
  }
  