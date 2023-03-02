const app = require('./app');

console.log(app.get('env'));

// Start server
const port = process.env.PORT;
app.listen(port, () => {
  console.log(`server listening on port ${port}`);
});
