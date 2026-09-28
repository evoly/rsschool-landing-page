import vituum from 'vituum';
import pug from '@vituum/vite-plugin-pug';

process.env.BROWSER = 'google-chrome';

export default {
  plugins: [vituum(), pug({
    root: './src',
  })],
  server: {
    open: true,
  },
  base: '/rsschool-landing-page/',
}
