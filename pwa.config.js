module.exports = {
  name: 'Poll', // The name of your app
  short_name: 'Poll', // The short name of your app
  theme_color: '#fff', // The theme color of your app
  background_color: '#fff', // The background color of your app
  display: 'standalone', // The display mode of your app
  scope: '/poll/', // The scope of your app
  start_url: '/poll/', // The start URL of your app
  icons: [
    {
      src: './icon.png', // The path to your app icon
      sizes: [96, 128, 192, 256, 384, 512], // The sizes of your app icon
    },
  ],
};
