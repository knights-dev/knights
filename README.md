# Knights

[![Join the chat at https://gitter.im/knights-dev/community](https://badges.gitter.im/knights-dev/community.svg)](https://gitter.im/knights-dev/community?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

Functional visual programming environment

## Requirements

- yarn
- Rust
- wasm-bindgen-cli

## Install dependencies

```bash
yarn
```

## Build `interp-rs`

```bash
cd workspaces/interp-rs
cargo build
```

## Build `editor`

```bash
cd workspaces/editor
yarn build:rs
yarn build:js
```

## Serve `editor`

```bash
cd workspaces/editor
yarn serve
```
