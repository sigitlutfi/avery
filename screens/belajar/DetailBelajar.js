import { Box } from "native-base";
import React, { useRef } from "react";
import WebView from "react-native-webview";
import Board from "../../components/Board";
import Headering from "../../components/Headering";

const DetailBelajar = () => {
  const webviewRef = useRef(null);
  const handleMessage = (event) => {
    const content = event.nativeEvent.data;
    console.log("Content from TinyMCE:", content);
    // Handle content received from TinyMCE editor here
  };

  const htmlContent = `
  <!DOCTYPE html>
  <html>
  <head>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.7/MathJax.js?config=TeX-MML-AM_CHTML" async></script>
    <style>
      body { font-family: Arial, sans-serif; }
      h2 { color: #333; }
      p { margin: 10px 0; }
      a { color: #0066cc; }
    </style>
  </head>
  <body>
    <h2>Computation of Definite Integrals.</h2>
    <p>In computing definite integrals it is important to observe that when the integral is known to exist the limit can be calculated on any properly chosen subset of the <span id="math_inline">S_\\delta</span>'s. So we have that if <span id="math_inline">S_{\\delta_1}</span>, <span id="math_inline">S_{\\delta_2}</span>, ... is any sequence of sums such that <span id="math_inline">\\displaystyle\\mathop{L}_{n\\doteq\\infty}\\delta_n=0</span>, then</p>
    <div id="math_block">\\mathop{L}_{n\\doteq\\infty} S_{\\delta_n} = \\int_a^b f(x)dx.</div>
    <p>One case of this kind occurs when <span id="math_inline">\\xi_k</span> is taken as an end-point of the interval <span id="math_inline">{x_{k-1}}{x_k}</span> and all the <span id="math_inline">\\Delta_kx</span>'s are equal. Then we have</p>
    <div id="math_block">\\displaystyle \\int_a^b f(x)dx =  \\mathop{L}_{n\\doteq\\infty} \\sum_{k=1}^n f(a+k\\Delta x)\\Delta x,  \\text{ where }  \\Delta x=\\frac{b-a}{n}.</div>
    <p>A simple example of this principle is the proof of the following theorem.</p>
    <p><em>Excerpt from <a href="https://www.gutenberg.org/ebooks/18741">Introduction to Infinitesimal Analysis; Functions of One Real Variable by Veblen et al.</a></em></p>
  </body>
  </html>
  `;
  return (
    <Board>
      <Headering tit="MATERI BELAJAR" />
      <Box flex={1} p={4} pt={0}>
        <WebView
          style={{ padding: 16 }}
          ref={webviewRef}
          originWhitelist={["*"]}
          source={{ html: htmlContent, headers: { Referer: "Origin" } }}
          javaScriptEnabled={true}
          domStorageEnabled={true}
          onMessage={handleMessage}
        />
      </Box>
    </Board>
  );
};
export default DetailBelajar;
