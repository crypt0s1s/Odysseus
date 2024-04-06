# Selene

Named after the greek titaness of the Moon, Selene is the Odyssey frameworks Swift Vapor back-end.

## Setup

### Git
https://git-scm.com/

### Xcode
Download Xcode from the [Mac App store](https://apps.apple.com/us/app/xcode/id497799835?mt=12)

### Install [HomeBrew](https://brew.sh/)
`/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"`

### Install [Swiftlint](https://realm.github.io/SwiftLint/)
`brew install swiftlint`

## Running
In the base directory execute the `runApp.sh` script
`./runnApp.sh`

## Database (Coeus) setup

### Install Postgres via brew:
`brew install postgresql@16`

### Add postgresql@16 to your path:
`echo 'export PATH="/opt/homebrew/opt/postgresql@16/bin:$PATH"' >> ~/.zshrc`

### Reload terminal configuration (assuming you’re using zsh):
`source ~/.zshrc`

### Start postgresql@16 now and restart at login:
`brew services start postgresql@16`

### Create database names Coeus:
`createdb Coeus`

### Create database names Coeus_test (used for testing purposes):
`createdb Coeus_test`

### Run database migration (in Selene/App):
`swift run App migrate`

### To interact with the database directly run:
`psql Coeus`

