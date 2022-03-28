# Knights

[![Join the chat at https://gitter.im/knights-dev/](https://badges.gitter.im/knights-dev.svg)](https://gitter.im/knights-dev?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

Functional visual programming environment

## Requirements

- pnpm
- Rust (1.41 or later)
- (If you use Windows, install [wasm-pack](https://rustwasm.github.io/wasm-pack/installer/#) manually)

## Install dependencies

```bash
pnpm i
```

## Build

### Development mode

```bash
pnpm run build
```

### Production mode

```bash
NODE_ENV=production pnpm run build
```

### Serve pre-built assets

```bash
pnpm i -g serve
serve editor/dist
```

## Launch dev server

```bash
pnpm run dev
```
