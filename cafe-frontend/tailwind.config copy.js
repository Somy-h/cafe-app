const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
//module.exports ={
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      keyframes: {
        // to-right: {
        //   from: { transform: 'translateX(-200%) rotate(40deg)'},
        //   to: { transform: 'translateX(0) rotate(0)'}
        // },
        // to-left: {
        //   from: { transform: 'translateX(200%) rotate(-40deg)'}
        //   to: { transform: 'translateX(0)'}
        // },
      },
      animation: {
        // √to-right: 'to-right 1s linear',
        //to-left: 'to-left 1s linear'
      }
    },
  },
  plugins: [],
});
