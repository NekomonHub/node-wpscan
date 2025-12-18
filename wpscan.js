#!/usr/bin/env node
import fs from "fs";
import axios from "axios";
import pLimit from "p-limit";
import chalk from "chalk";

(async () => {
const args = process.argv.slice(2);
const opts = {
  target: null,
  turbo: false,
  basic: false,
  threads: 10,
  delay: 50,
  timeout: 8000,
  verbose: false,
  silent: false,
  jsonOnly: false,
  consoleOnly: false,
  followRedirect: false,
  maxSize: 100,
  auth: null,
  proxy: null,
  method: "HEAD",
  resume: false,
  uaRandom: true,
  save404: false,
  statusFilter: [],
  extFilter: null,
  dirOnly: false,
  fileOnly: false
};
if (args.length === 0) {
  await showHelp();
  return;
} for (const a of args) {
  if (a === "-t") opts.turbo = true;
  else if (a === "--bc") opts.basic = true;
  else if (a.startsWith("--th=")) opts.threads = parseInt(a.split("=")[1]);
  else if (a.startsWith("--delay=")) opts.delay = parseInt(a.split("=")[1]);
  else if (a.startsWith("--timeout=")) opts.timeout = parseInt(a.split("=")[1]);
  else if (a === "-v") opts.verbose = true;
  else if (a === "--silent") opts.silent = true;
  else if (a === "--json-only") opts.jsonOnly = true;
  else if (a === "--console-only") opts.consoleOnly = true;
  else if (a === "--follow") opts.followRedirect = true;
  else if (a.startsWith("--min-size=")) opts.maxSize = parseInt(a.split("=")[1]);
  else if (a.startsWith("--auth=")) opts.auth = a.split("=")[1];
  else if (a.startsWith("--proxy=")) opts.proxy = a.split("=")[1];
  else if (a.startsWith("--method=")) opts.method = a.split("=")[1].toUpperCase();
  else if (a === "--resume") opts.resume = true;
  else if (a === "--no-random-ua") opts.uaRandom = false;
  else if (a === "--save-404") opts.save404 = true;
  else if (a.startsWith("--status=")) opts.statusFilter = a.split("=")[1].split(",");
  else if (a.startsWith("--ext=")) opts.extFilter = a.split("=")[1];
  else if (a === "--dir-only") opts.dirOnly = true;
  else if (a === "--file-only") opts.fileOnly = true;
  else if (a.startsWith("http")) opts.target = a;
} if (!opts.target) {
  console.log(chalk.red.bold("\n[!] No target URL provided.\n"));
  await showHelp();
  return;
} if (opts.basic) {
  opts.threads = 5;
  opts.delay = 150;
} if (opts.turbo) {
  opts.threads = 40;
  opts.delay = 0;
}
const dirs = fs.readFileSync("dirs.txt", "utf8").split("\n").filter(Boolean);
const files = fs.readFileSync("files.txt", "utf8").split("\n").filter(Boolean);
const uas = fs.readFileSync("ua.txt", "utf8").split("\n").filter(Boolean);
const RESULT_FILE = "result.json";
if (!fs.existsSync(RESULT_FILE)) fs.writeFileSync(RESULT_FILE, "[]");

function saveResult(obj) {
  if (opts.consoleOnly) return;
  const data = JSON.parse(fs.readFileSync(RESULT_FILE, "utf8"));
  data.push(obj);
  fs.writeFileSync(RESULT_FILE, JSON.stringify(data, null, 2));
}
const client = axios.create({
  timeout: opts.timeout,
  maxRedirects: opts.followRedirect ? 5 : 0,
  validateStatus: () => true
});

const limit = pLimit(opts.threads);
const randomUA = () => uas[Math.floor(Math.random() * uas.length)];

const joinUrl = (b, p) => {
  if (!b) return null;
  return b.replace(/\/+$/, "") + "/" + p.replace(/^\/+/, "");
};

async function check(url) {
  try {
    const res = await client.request({
      url,
      method: opts.method,
      headers: {
        "User-Agent": opts.uaRandom ? randomUA() : "WPScan-Node"
      }
    });

    return {
      status: res.status,
      size: parseInt(res.headers["content-length"] || 0),
      location: res.headers["location"] || null
    };
  } catch {
    return { status: "ERR", size: 0 };
  }
}
  if (!opts.silent) {
    console.log(chalk.bold.red("\nWpScan Information"));
    console.log(`Target  : ${opts.target}`);
    console.log(`Threads : ${opts.threads}`);
    console.log(`Delay   : ${opts.delay}ms\n`);
  }

  const urls = [];
  for (const d of dirs) {
    if (opts.fileOnly) continue;
    const dirUrl = joinUrl(opts.target, d);
    if (dirUrl) urls.push(dirUrl); // FIX

    for (const f of files) {
      if (opts.dirOnly) continue;
      if (opts.extFilter && !f.endsWith(opts.extFilter)) continue;
      const fileUrl = joinUrl(opts.target, d + f);
      if (fileUrl) urls.push(fileUrl); // FIX
    }
  }

  await Promise.all(
    urls.map(url =>
      limit(async () => {
        const r = await check(url);

        const found =
          (r.status === 200 && r.size > opts.maxSize) ||
          [401, 403, 301, 302].includes(r.status);

        if (!opts.jsonOnly) {
          if (found) {
            console.log(chalk.cyan.bold(`[FOUND ${r.status}] ${url}`));
          } else {
            console.log(chalk.red.bold(`[NOT FOUND ${r.status}] ${url}`));
          }
        }

        if (found || (opts.save404 && r.status === 404)) {
          saveResult({
            url,
            status: r.status,
            size: r.size,
            redirect: r.location,
            time: new Date().toISOString()
          });
        }

        if (opts.delay) await new Promise(r => setTimeout(r, opts.delay));
      })
    )
  );

  if (!opts.silent) {
    console.log(chalk.green.bold("\nScan completed."));
  }

})();
async function showHelp() {
function wait(ms){return new Promise(resolve => setTimeout(resolve,ms));}
const log = console.log;

log(chalk.hex('#ffd700').bold(fs.readFileSync("./logo.txt", "utf8")));
await wait(500);

const welcome = `Welcome to WpScan - Nodejs Tools
USE ONLY FOR AUTHORIZED TARGETS, DO NOT USE INACCURATELY
THIS TOOL IS MADE FOR LEGAL PENTESTERS
DON'T FORGET TO FOLLOW MY GITHUB!

https://github.com/NekomonHub`;
log(chalk.bold.gray(welcome));
await wait(500);

const logo = `
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
`;
log(chalk.bold(logo));
process.exit(0);
}
