<div id="top"></div>

> HTTPFY curently in beta so you may see problems. Please open a Issue on GitHub and report them!

<br />
<div align="center">
  <a href="https://github.com/devxprite/httpfy">
    <img src="_includes/httpFy_logo.png" alt="Logo" width="280">
  </a>

  <p align="center">
    A Incredible fast and Powerful HTTP toolkit
    <br>
    <br>
    <img alt="NPM" src="https://img.shields.io/npm/l/httpfy">
    <img alt="GitHub Repo stars" src="https://img.shields.io/github/stars/devxprite/httpfy">
    <img alt="GitHub contributors" src="https://img.shields.io/github/contributors-anon/devxprite/httpfy">
    <br>
    <img alt="npm" src="https://img.shields.io/npm/dw/httpfy">
    <img alt="Libraries.io SourceRank" src="https://img.shields.io/librariesio/sourcerank/npm/httpfy">
    <img alt="npms.io (quality)" src="https://img.shields.io/npms-io/quality-score/httpfy">
    <img alt="npms.io (maintenance)" src="https://img.shields.io/npms-io/maintenance-score/httpfy">    
    <!--
    <a href="https://github.com/devxprite/httpfy"><strong>Explore the docs »</strong></a> -->
    <br />
    <a href="https://github.com/devxprite/httpfy">View Demo</a>
    ·
    <a href="https://github.com/devxprite/httpfy/issues">Report Bug</a>
    ·
    <a href="https://github.com/devxprite/httpfy/issues">Request Feature</a>
  </p>
</div>

<!-- GETTING STARTED -->

## Getting Started

  ![Basic](_includes/preview.gif)

### Prerequisites

You need to install Node.js first, then install the tool globally.
- NodeJs 10.24.1 or later
- NPM 6.14.12 or later

## Installation

### Global

#### npm

```bash
npm install -g -s httpfy
```

#### npx

```bash
npx httpfy -f <file>
```

### Local

```bash
git clone https://github.com/devXprite/httpfy.git
cd httpfy
npm install
node index.js -h
```

### Uninstall

```bash
npm remove httpfy -g
```

## Usage


```bash
httpfy -f <filename containing urls>
```

### Options

| Short  | Options             | Type      | Description                                                   |
| ------ | ------------------- | --------- | ------------------------------------------------------------- |
| -v     | --version           | probe     | output the current version                                    |
| -f     | --file              | string    | input file containing list of URLs                            |
| -sc    | --status-code       | probe     | display response status-code                                  |
| -cl    | --content-length    | probe     | display response content-length                               |
| -ct    | --content-type      | probe     | display response content-type                                 |
| -rt    | --response-time     | probe     | display response time                                         |
| -lc    | --line-count        | probe     | display response body line count                              |
| -wc    | --word-count        | probe     | display response body word count                              |
| -ws    | --web-serve         | probe     | display web server name                                       |
| -rl    | --redirect-location | probe     | display redirect location                                     |
| -m     | --method            | probe     | display http request method                                   |
| -nc    | --no-color          | probe     | disable colors in cli output                                  |
| -ttl   | --title             | probe     | display page title                                            |
| -fl    | --failed            | probe     | display failed request's                                      |
| -nr    | --no-redirect       | probe     | don't follow redirects                                        |
| -mr    | --max-redirect      | number    | maximum redirects to follow                                   |
| -t     | --threads           | number    | maximum cocurrent requests send (default: 100)                |
| -i     | --interval          | number    | interval between each thread in seconds                       |
| -c     | --cookie            | string    | send cookies (--cookie 'login=Yes')                           |
| -H     | --header            | string    | custom http headers to send (--header 'X-MyHeader: XYZ')      |
| -x     | --request-methods   | string    | set request methods use 'all' to probe all HTTP methods       |
| -pc    | --protocol          | string    | set request Protocol (default: "https")                       |
| -path  | --request-path      | string    | path or list of paths  (-path admin,login)                    |
| -param | --request-param     | string    | set request parameters  (-param id=5)                         |
| -ua    | --user-agent        | string    | set custom useragent                                          |
| -time  | --timeout           | number    | set request timeout in seconds                                |
| -mc    | --match-code        | numbers[] | match response with specified status code  (-mc 200,404)      |
| -ml    | --match-length      | numbers[] | match response with specified content length  (-ml 800,900)   |
| -mlc   | --match-line-count  | numbers[] | match response body with specified line count  (-mlc 100,102) |
| -ms    | --match-string      | strings[] | match response with specified strings  (-ms admin)            |
| -o     | --output-file       | string    | save results in a single file  (-o result.txt)                |
| -of    | --output-folder     | string    | save response of url in multiple files  (-of result)          |
| -h     | --help              | probe     | display help for command                                      |

## Examples

### Basic

- ```bash
  httpfy -f urls.txt -sc -ttl -fl
  ```
  ![Basic](_includes/example_basic.gif)
### Try all Http Methods

- ```bash
  httpfy -f urls.txt -sc -m -x all
  ```
  ![All](_includes/example_all.gif)

### File/Path Bruteforce

- ```bash
  httpfy -f urls.txt -path admin,login -sc
  ```
  ![Brute](_includes/example_brute.gif)