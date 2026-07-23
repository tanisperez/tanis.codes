---
title: "Seqix: Memory Game"
date: 2026-07-23T08:30:00+02:00
draft: false
toc: false
image: "/images/seqix-memory-game/logo.png"
description: "Seqix is a space-themed 'Simon says' memory game for iOS and Android, built with Expo and React Native."
tags:
  - expo
  - react-native
  - gamedev
  - indie
---

Seqix started as a weekend itch: I wanted a small, self-contained side project I could take from idea to the App Store and Google Play without it turning into a second job. The result is a space-themed memory sequence game, the classic "Simon says" formula, dressed up with planets, rockets and pulsars, built with Expo and React Native.

This is the home screen, with the leaderboard for the current board size:

![Seqix home screen with the leaderboard](/images/seqix-memory-game/home-full.png#phone)

## The game

The rules are the ones you already know if you ever played with an electronic Simon toy: the game lights up a sequence of tiles, you tap them back in the exact same order, and every successful round appends one more tile to the sequence. Flash speed and your reaction timeout both scale with how long the sequence is, so a run that starts almost lazily turns genuinely tense by round fifteen.

The free version ships a 3×3 board with 9 space tiles: Planet, Atom, Rocket, Star, Satellite, Pulsar, Telescope, Moon and Infinity. A single non-consumable in-app purchase, **Seqix Pro** ($1.99), unlocks a bigger 4×4 board, letters/icons tile modes, two extra game modes (Reverse and Blitz), extra visual themes and sound packs. Everything else, including the whole free game and the language you play in, stays free forever. The app is translated into 9 languages (English, Spanish, French, German, Portuguese, Japanese, Chinese, Korean and Russian).

First, watch the sequence and memorize it:

![Memorize the sequence](/images/seqix-memory-game/showing.png#phone)

Then it's your turn to repeat it back, tile by tile, in the same order:

![Your turn, repeat the sequence](/images/seqix-memory-game/playing.png#phone)

Here's a short video of it in action:

{{< youtube WuVMadYp1tE >}}

Seqix is free to play, with the one Pro unlock as the only monetization, and it's live now:

[![Download on the App Store](/images/common/app-store-badge.png#badge)](https://apps.apple.com/us/app/seqix/id6785265402) [![Get it on Google Play](/images/common/google-play-badge.png#badge)](https://play.google.com/store/apps/details?id=codes.tanis.seqix)
{.store-badges}

If you try it, I'd genuinely love to know how far you get on 4×4 Blitz.
