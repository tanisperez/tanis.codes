---
title: "Setup Oh My Zsh"
date: 2022-08-14T13:33:49+02:00
draft: false
toc: false
image: "/images/setup-oh-my-zsh/logo.png"
tags:
  - zsh
  - terminal
---
The Z shell (Zsh) is an Unix shell that can be used as an interactive login shell and as a command interpreter for shell scripting. Zsh is an extended [Bourne shell](https://en.wikipedia.org/wiki/Bourne_shell) with many improvements, including some features of Bash, ksh, and tcsh.

[Oh My Zsh](https://ohmyz.sh/) is an open source, community-driven framework for managing your Zsh configuration. It comes bundled with thousands of helpful functions, helpers, plugins and themes.

![Oh My Zsh setup](/images/setup-oh-my-zsh/my-setup.png)

## Install Zsh

If you are using a debian based Linux or WSL, you can install zsh using the following command:

```bash
sudo apt-get install zsh
```

The latest Mac OS X versions comes with zsh as the default shell. But if you are using bash, you can install it using the command **brew**:

```bash
brew install zsh
```

When the installation is done, you can set zsh as your default shell using the command **chsh**.

![Setup zsh as the default shell](/images/setup-oh-my-zsh/change-to-zsh-on-mac.png#center)

After setting zsh as your default shell, you should log out and then login again to your terminal to use the new zsh shell.

```bash
zsh --version
zsh 5.8.1 (x86_64-apple-darwin21.0)
```

## Install Oh My Zsh

You can follow the instructions from the [Oh My Zsh official page](https://ohmyz.sh/#install).

```bash
sh -c "$(curl -fsSL https://raw.github.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"
```

## Powerlevel10k

We will use [Powerlevel10k](https://github.com/romkatv/powerlevel10k) as our zsh theme.

1. Install git using `brew` or `sudo apt-get install`.
2. [Install the recommended font](https://github.com/romkatv/powerlevel10k#meslo-nerd-font-patched-for-powerlevel10k). *Optional but highly recommended*.
3. Clone the Powerlevel10k repository.
```bash
git clone --depth=1 https://github.com/romkatv/powerlevel10k.git ${ZSH_CUSTOM:-$HOME/.oh-my-zsh/custom}/themes/powerlevel10k
```
4. Set `ZSH_THEME="powerlevel10k/powerlevel10k"` in the `~/.zshrc` file.
5. Restart Zsh with `exec zsh`.
6. Type `p10k configure` if the configuration wizard doesn't start automatically.

![Powerlevel10k theme](/images/setup-oh-my-zsh/powerlevel10k.png#center)

Through the Powerlevel10k configuration wizard you can customize your theme.

## Plugins

Oh My Zsh comes bundled with a lot of plugins. You can check the list of the included plugins [here](https://github.com/ohmyzsh/ohmyzsh/wiki/Plugins).

You can activate the plugins editing the file `~/.zshrc`. In my case, I use the following plugins:

`plugins=(git colored-man-pages sudo zsh-autosuggestions)`

![Zsh plugins](/images/setup-oh-my-zsh/zsh-plugins.png#center)

* [git](https://github.com/ohmyzsh/ohmyzsh/tree/master/plugins/git): The git plugin provides many aliases and a few useful functions.
* [colored-man-pages](https://github.com/ohmyzsh/ohmyzsh/tree/master/plugins/colored-man-pages): This plugins adds colors to man pages.
* [sudo](https://github.com/ohmyzsh/ohmyzsh/tree/master/plugins/sudo): Easily prefix your current or previous commands with `sudo` by pressing `esc` twice.
* [zsh-autosuggestions](https://github.com/zsh-users/zsh-autosuggestions/blob/master/INSTALL.md): It suggests commands as you type based on history and completions. This plugin requires a [manual installation](https://github.com/zsh-users/zsh-autosuggestions/blob/master/INSTALL.md).

After enabling plugins in the `~/.zshrc` you must restart the zsh shell. You can restart your terminal application or using the command `exec zsh`.

## References

* Oh My Zsh official page: https://ohmyz.sh/
* Oh My Zsh github project: https://github.com/ohmyzsh/ohmyzsh
* Powerlevel10k theme: https://github.com/romkatv/powerlevel10k
* List of plugins bundled with Oh My Zsh: https://github.com/ohmyzsh/ohmyzsh/wiki/Plugins
* zsh-autosuggestions installation guide: https://github.com/zsh-users/zsh-autosuggestions/blob/master/INSTALL.md