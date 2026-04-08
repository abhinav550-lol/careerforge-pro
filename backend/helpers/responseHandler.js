
export const successResponse = (res, data, message = "Success") =>
  res.status(200).json({ success: true, message, data });

export const errorResponse = (res, message, status = 500) =>
  res.status(status).json({ success: false, message });