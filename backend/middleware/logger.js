// Request logging middleware

const logger = (req, res, next) => {
  const start = Date.now();
  
  res.on('finish', () => {
    const duration = Date.now() - start;
    const log = {
      method: req.method,
      url: req.originalUrl,
      status: res.statusCode,
      duration: `${duration}ms`,
      ip: req.ip || req.connection.remoteAddress,
    };
    
    if (process.env.NODE_ENV === 'development') {
      console.log(`${log.method} ${log.url} - ${log.status} - ${log.duration}`);
    }
  });
  
  next();
};

export default logger;

