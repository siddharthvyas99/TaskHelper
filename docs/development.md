## Installing Xcode command line tools
```bash
xcode-select --install
```

## Installing Node.js
  - Installing nvm
  ```bash
  curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash
  ```

  - Installing a Node.js version using nvm

  ```bash
  nvm install 18.12
  nvm alias default 18.12
  ```

## Installing Yarn
```bash
brew install yarn
```

## Installing Ruby on Rails

  ### Install system packages

  ```bash
  brew install ruby-build openssl readline libyaml zlib
  ```

  ### Installing Ruby on Rails on macOS
  ```bash
  gem install rails --no-document -v 7.0.5
  ```

  ```bash
  gem install bundler
  ```



  ### Install rbenv
    ```bash
    brew update
    brew install rbenv
    ```

    Replace `bashrc` with `zshrc` and `bash_profile` with `zshrc`
    if using ZSH

    ```bash
    echo 'eval "$(rbenv init -)"' >> ~/.bashrc
    ```

    ```bash
    rbenv install 3.2.2
    rbenv rehash
    ```

    ```bash
    echo 'export PATH="$HOME/.rbenv/bin:$PATH"' >> ~/.bash_profile
    ```

    Set global version
    ```bash
    rbenv global 3.2.2
    ```

    Checking installation correctness
    ```bash
    rbenv version # version should be 3.2.2
    ruby -v # version should be 3.2.2
    ```

    For M1 mac
    ```bash
    brew install shared-mime-info
    ```


  ### Install ruby-build
    ```bash
    brew install ruby-build
    ```

## Installing and using Redis
  ```bash
  brew install redis
  ```

  Starting the process
  ```bash
  brew services start redis
  ```

## Installing and using PostgreSQL

  ```bash
  brew install postgresql
  ```

  ```bash
  brew services start postgresql
  ```

  Checking postgres running successfully

  ```bash
  pg_isready

  # /tmp:5432 - accepting connections is returned
  ```


