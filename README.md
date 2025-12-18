



<p align="center">
  <img src="https://files.catbox.moe/48ssfw.jpg" alt="node-wpscan banner" width="100%">
</p>

<h1 align="center">node-wpscan</h1>

<p align="center">
  Fast WordPress Scanner built with Node.js
</p>

<p align="center">
  <img src="https://img.shields.io/badge/JavaScript-ES6-yellow?logo=javascript&logoColor=black" />
  <img src="https://img.shields.io/badge/Node.js-v20-green?logo=node.js" />
  <img src="https://img.shields.io/badge/GitHub-Repo-black?logo=github" />
  <img src="https://img.shields.io/badge/Termux-Android-black?logo=android" />
  <img src="https://img.shields.io/badge/Linux-Supported-blue?logo=linux" />
  <img src="https://img.shields.io/badge/Windows-Supported-blue?logo=windows" />
  <img src="https://img.shields.io/badge/npm-Package-red?logo=npm" />
</p>

<p>
  Usage:<br>
  node wpscan.js [options] <target><br>
<br>
Main options:<br>
  -t                  Turbo mode (maximum speed)<br>
  --bc                Basic / stealth mode<br>
  --th=N              Thread count<br>
  --delay=N           Delay between requests (ms)<br>
  --timeout=N         Request timeout (ms)<br>
<br>
Output control:<br>
  -v                  Verbose output<br>
  --silent            No banner<br>
  --json-only         Save result.json only<br>
  --console-only      Console output only<br>
<br>
Scan behavior:<br>
  --follow            Follow redirects<br>
  --min-size=N        Minimum content size to mark as valid<br>
  --method=HEAD|GET   HTTP method<br>
  --status=200,403    Only care about specific status<br>
  --save-404          Save 404 results too<br>
<br>
Filtering:
  --ext=.php          Scan only specific extension<br>
  --dir-only          Scan directories only<br>
  --file-only         Scan files only<br>
<br>
Advanced:<br>
  --auth=user:pass    Basic auth<br>
  --proxy=http://ip   Use proxy<br>
  --resume            Resume previous scan<br>
  --no-random-ua      Disable UA rotation<br>
<br>
Example:<br>
  node wpscan.js -t --th=9 https://target.com<br>
  node wpscan.js --bc --ext=.php https://target.com<br>
  <br>
</p>
