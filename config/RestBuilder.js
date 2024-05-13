export const RestManager = (req, res, next) => {
  res.sendData = (data, size, totalElements, page) => {
    let renderPage = {
      data: data,
      page: {
        size: !size ? data.length : size,
        totalElements: !totalElements ? data.length : totalElements,
        totalPage: totalElements <= 0 ? 0 : Math.ceil(totalElements / size),
        page: !page ? 0 : page,
      },
    };
    return res.send(renderPage);
  };

  res.sendMessage = message => {
    return res.send({ message });
  };

  res.sendError = message => {
    let errMessage;
    if (message instanceof Error) {
      errMessage = message.message;
    }
    return res.json({
      message: !errMessage ? message : errMessage,
      url: req.url,
      method: req.method,
      code: res.statusCode,
    });
  };

  res.unauthorized = message => {
    return res.json({
      message: message || 'Missing or Invalid token',
      url: req.url,
      method: req.method,
      status: 'UnAuthorized',
      code: 401,
    });
  };
  next();
};
