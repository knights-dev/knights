#!/usr/bin/env bash

# ファイルの末尾が改行になっていなければ異常終了する

set -x
set -e

files=`find . \( -type d -name node_modules -o -name .git -o -name target -o -name dist -o -name interp-wasm \) -prune -o -type f`

for file in ${files}; do
    test -z "$(tail -c 1 ${file})"
done
