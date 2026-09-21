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
  rollupOptions: {
    output: {
      entryFileNames: 'assets/main-DusVq9nQ.js',
      assetFileNames: 'assets/main-1sxEUpAq.css',
    }
  }
}
