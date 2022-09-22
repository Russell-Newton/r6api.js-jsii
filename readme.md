<div align="center">
  <h1>R6API.js</h1>
  <h3>🍫 JSII-Compatible Node.js wrapper around Rainbow Six: Siege API</h3>
  <p>
    <a href="https://github.com/danielwerg/r6api.js">Base Project</a>
  </p>
</div>

## Table of Contents

* [Installation](#Installation)
* [Initialization](#Initialization)
* [Python Example](#Python-Example)
* [API](#API)
* [Credit](#Credit)

## Installation

If you just want to use the Node.js version of the library, refer to the [original project](https://github.com/danielwerg/r6api.js).


To use the api in a JSII-compatible language, you will need to build the library with JSII. If you want to build it for a language other than Python, add the build information to the jsii section in `package.json`. Refer to [the JSII documentation](https://aws.github.io/jsii/user-guides/lib-author/configuration/#the-jsii-section).

```sh
$ npm run build && npm run package
```

The created library package for your language will be in `/dist`.

## Initialization

To setup this package, you need to provide Ubisoft account credentials (email and password). Credentials should be handled as you would handle any other secure value, it is recommended to use [dotenv](https://github.com/motdotla/dotenv) package to load environment variables from a `.env`.

**Do not** use your real Ubisoft account. It is highly recommended to create a new account for using this package. Visit [account.ubisoft.com/login](https://account.ubisoft.com/login) to create new account.

## Python Example

<!-- START_SECTION:EXAMPLE -->

```py
import os

from dotenv import load_dotenv
from r6api import R6api

def get_player_stats(username, platform: str = "uplay"):
  try:
    player = r6api.find_by_username(platform, username)[0]
  except IndexError:
    return None

  stats = r6api.get_stats(platform, player["id"])
  if not stats:
    return None

  return stats["pvp"]["general"]

if __name__ == "__main__":
  load_dotenv()
  email = os.environ["UBI_EMAIL"]
  password = os.environ["UBI_PASSWORD"]

  username = "Daniel.Nt"

  r6api = R6api(email, password)

  stats = get_player_stats(username)
  if not stats:
    print("Stats not found")
  else:
    print(f"{username} has played {stats['matches']} matches.")
```

Note that while the Node.js version of the library has async API methods, the Python version doesn't. It could be beneficial to manually wrap the API with asyncio.

<!-- END_SECTION:EXAMPLE -->

<!-- START_SECTION:EXAMPLE_OUTPUT -->
```
Daniel.Nt has played 5648 matches.
```
<!-- END_SECTION:EXAMPLE_OUTPUT -->

## API

Refer to the [original project](https://github.com/danielwerg/r6api.js) for API specs. Some parameters may be different for your language of choice. In Python, js `__object` options parameters should be passed as `dict`.

## Credit

Operator Icons from [r6operators.marcopixel.eu](https://r6operators.marcopixel.eu)
r6api.js created by [Daniel Werg](https://github.com/danielwerg/r6api.js)
