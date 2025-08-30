export const errorResponces = {
    400: (msg) => ({
      status: "fail",
      code: 400,
      message: msg || "Bad Request"
    }),
  
    401: (msg) => ({
      status: "fail",
      code: 401,
      message: msg || "Unauthorized"
    }),
  
    403: (msg) => ({
      status: "fail",
      code: 403,
      message: msg || "Forbidden"
    }),
  
    404: (msg) => ({
      status: "fail",
      code: 404,
      message: msg || "Not Found"
    }),
  
    500: (msg) => ({
      status: "error",
      code: 500,
      message: msg || "Internal Server Error"
    })
  };
  