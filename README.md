



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
  Usage:
  node wpscan.js [options] <target>

Main options:
  -t                  Turbo mode (maximum speed)
  --bc                Basic / stealth mode
  --th=N              Thread count
  --delay=N           Delay between requests (ms)
  --timeout=N         Request timeout (ms)

Output control:
  -v                  Verbose output
  --silent            No banner
  --json-only         Save result.json only
  --console-only      Console output only

Scan behavior:
  --follow            Follow redirects
  --min-size=N        Minimum content size to mark as valid
  --method=HEAD|GET   HTTP method
  --status=200,403    Only care about specific status
  --save-404          Save 404 results too

Filtering:
  --ext=.php          Scan only specific extension
  --dir-only          Scan directories only
  --file-only         Scan files only

Advanced:
  --auth=user:pass    Basic auth
  --proxy=http://ip   Use proxy
  --resume            Resume previous scan
  --no-random-ua      Disable UA rotation

Example:
  node wpscan.js -t --th=9 https://target.com
  node wpscan.js --bc --ext=.php https://target.com
  
</p>
