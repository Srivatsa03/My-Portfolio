---
title: MTProto 2.0 Chat
tagline: A chat app with MTProto 2.0-style message encryption on the server and an end-to-end encrypted secret chat in the browser.
category: Coursework
context: CS588 Security and Privacy in Networked and Distributed Systems
role: Solo
dates: Apr 2025
status: Complete
order: 12
featured: false
cover: /projects/mtproto.png
stack: [Python, Flask, Socket.IO, SQLAlchemy, PyCryptodome, WebCrypto]
links:
  - label: View the code
    href: https://github.com/Srivatsa03/Telegram-MTproto2.0
flow:
  - name: Accounts
    detail: Sign-up and login with one-time codes by SMS or email, stored through SQLAlchemy with migrations.
  - name: Keys and message metadata
    detail: Each user gets a 256-byte auth key, and every message carries a random salt, session ID, message ID and sequence number.
  - name: Message key and KDF
    detail: The message key is taken from a SHA-256 hash of the auth key and the payload, and the AES key and IV come from MTProto 2.0's SHA-256 derivation.
  - name: Encryption
    detail: AES-256 encrypts each message on the server before it's stored or relayed.
  - name: Transport
    detail: HTTP routes plus Socket.IO for live messages.
  - name: Secret chat
    detail: The two browsers run a Diffie-Hellman exchange with a fresh key per chat and encrypt with AES-GCM through WebCrypto. The server only relays public keys.
results: []
---

## The problem

The goal was to build the message-protection pieces of Telegram's MTProto 2.0 by hand inside a working chat app, instead of calling a library that hides them: message keys, key derivation, per-message metadata and an end-to-end encrypted secret chat.

## How it works

<!-- flow -->

## Decisions and tradeoffs

- **MTProto 2.0's SHA-256 key derivation instead of 1.0's SHA-1.**
- **Secret-chat keys never reach the server.** The server relays public values and nothing else, so it can't read secret chats.

## Where it departs from the spec

Writing this up honestly means listing what a real implementation would do differently:

- It uses AES-256 in CBC mode where MTProto specifies IGE, and the padding and message-key offset don't follow the spec exactly.
- The per-user auth key is generated randomly rather than through the server-side Diffie-Hellman exchange.
- Cloud-chat keys are static per user, so forward secrecy only covers secret chats.
- The secret-chat key exchange isn't authenticated, so it's open to a man-in-the-middle.
- Debug logging writes plaintext messages to the server log.

Each of these is a known gap from building it as a course project, and each is where I'd start if I took it further.
