export const API_METHODS = {
  get: "GET",
  post: "POST",
  put: "PUT",
  delete: "DELETE",
};

export const API_ERRORS = {
  badRequest: {
    status: 400,
    message: "Bad request"
  },
  unauthorized: {
    status: 401,
    message: "Unauthorized"
  },
  forbidden: {
    status: 403,
    message: "Forbidden"
  },
  notFound: {
    status: 404,
    message: "Not found"
  },
  conflict: {
    status: 409,
    message: "Conflict"
  },
  unprocessableEntity: {
    status: 422,
    message: "Unprocessable entity"
  },
  internalServerError: {
    status: 500,
    message: "Internal server error"
  },
}