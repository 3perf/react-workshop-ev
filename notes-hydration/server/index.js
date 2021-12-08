import { renderToString } from "react-dom/server";
import AppWrapper from "../src/app-wrapper";
import express from "express";
import { resolve } from "path";
import { readFileSync } from "fs";
import { ServerStyleSheets } from "@material-ui/core/styles";

const app = express();

if (process.env.ENABLE_SSR === "true") {
  const indexFile = readFileSync(resolve("build/index.html"), "utf-8");

  app.get("/*", (req, res, next) => {
    if (req.url !== "/") {
      return next();
    }

    // Generate Material UI styles, per https://material-ui.com/guides/server-rendering/
    const sheets = new ServerStyleSheets();
    const reactApp = renderToString(sheets.collect(<AppWrapper />));
    const css = sheets.toString();

    return res.send(
      indexFile
        .replace("</head>", `<style id="jss-server-side">${css}</style></head>`)
        .replace('<div id="root"></div>', `<div id="root">${reactApp}</div>`)
    );
  });
}

app.use(express.static(resolve(__dirname, "../build")));

app.listen(8080, () =>
  console.log("Express server is running on http://localhost:8080")
);
