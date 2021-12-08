console.log("Starting the server...");

// The SSR config is based on https://javascript.plainenglish.io/a-hands-on-guide-for-a-server-side-rendering-react-app-dd1efa3ec0d8
require("@babel/register")({
  presets: [
    "@babel/preset-env",
    ["@babel/preset-react", { runtime: "automatic" }],
  ],
  plugins: [
    [
      "transform-assets",
      {
        extensions: ["css", "svg"],
        name: "static/media/[name].[hash:8].[ext]",
      },
    ],
  ],
  ignore: [
    (filepath) =>
      filepath.includes("node_modules") && !filepath.includes("date-fns"),
  ],
});
