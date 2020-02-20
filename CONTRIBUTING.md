# CONTRIBUTING

## 開発状況

「技術的に実現可能か」を確認するためのプロトタイプを作りながら、  
Gitter 上で仕様について議論している段階です。

## Gitter での議論に参加する

プログラミング初心者に視覚的にわかりやすい形で関数型プログラミングに入門してもらうために、  
追加したほうが良い機能、修正したほうがいい機能を提案してほしいです。

[こちら](https://gitter.im/knights-dev)から参加できます。4つのルームに分かれています。

- community : 全体用
- editor : ノードエディタについて
- env : 開発環境について
- interpreter : インタプリタについて

## Issue を立てる

Issue はバグ報告・機能提案等の目的で用いられます。

立てる際には、すでに重複した Issue が立てられていないか確認してください。  
Close されているものも含めて確認するようにしてください。

以下の3つのテンプレートを用意しているので、内容にあわせて選択し、必要事項を記入してください。

- バグ報告
- design doc (機能実装のまえに記述するドキュメント)
- 提案・要望など (機能改善やロジック修正の提案、問題提起など)

## プルリクエスト(以下、PR)を投げる

PR は、同意を得られた機能の実装やバグ修正、依存パッケージ更新等の目的で用いられます。  
マージには、メンテナー ([0918nobita](https://github.com/0918nobita)) による Approve (承認) が必要です。

対応する Issue がなく、Gitter での同意も得られていない状態で投げられた PR は承認されない場合があります。

## 補足事項

### 現状のアーキテクチャ

monorepo を採用しており、npm プロジェクトと Cargo プロジェクトがそれぞれ `/workspaces` ディレクトリ以下で管理されています。

#### (1) ノードエディタ

`editor` ワークスペース内で開発しています。

##### 技術スタック

| 役割 | 使用技術 |
| --- | ---- |
| AltJS | TypeScript |
| 仮想DOM ライブラリ | React |
| 静的 CSS | Sass(SCSS記法) |
| CSS in JS | Emotion |
| Flux フレームワーク | Fleur |

#### (2) インタプリタ

`interp-core`, `interp-if` ワークスペースが該当します。

どちらも `wasm32-unknown-unknown` をターゲットとする Cargo プロジェクトですが、  
`interp-core` については Windows, macOS, Linux ネイティブもターゲットとしてビルドできるライブラリとして開発しています。

`interp-core` はインタプリタの心臓部であり、与えられた AST (抽象構文木) を静的解析した後、  
解釈実行して結果を出力する役割を担っています。

`interp-if` (if は interface の略) は、先述のノードエディタと `interp-core` が  
AST ・実行状態を通信する仲立ちとなる役割を担っています。

### PR のラベルに関して

`core-team` チームのメンバーが以下のラベルを追加することがあります。  
関連 PR を探すときの参考にしてください。

- ステータス系ラベル
    - `S-waiting-for-review` : レビュー待ち
    - `S-work-in-progress` : 作業中
- 種別系ラベル
    - `T-bugfix` : バグ修正
    - `T-enhancement` : 既存機能の改善
    - `T-new-feature` : 新機能の追加
    - `T-refactoring` : リファクタリング
    - `T-RFC` : RFC (Request for Comments) の追加
- エリア系ラベル
    - `A-node-editor` : ノードエディタに関する変更
    - `A-interpreter` : インタプリタに関する変更

ちなみに、PR がクローズ / マージされる際には自動で `S-waiting-for-review` ラベルが  
GitHub Actions のワークフローによって剥がされるので、手動でそれを剥がす必要はありません。

### 依存パッケージの更新に関して

依存している npm パッケージについては、Renovate を用いて更新を自動化しています。  
更新が発生するたびに PR が Renovate Bot から投げられます。

この類の PR は原則 `knights-dev` オーガナイゼーションの `core-team` チームのメンバーが対応してください。

それぞれ ChangeLog を確認して既存のプログラムへの影響がないことが分かった場合はそのままマージします。

### CI (継続的インテグレーション) に関して

GitHub Actions を用いて CI を実現しています。

具体的には、以下のような CI が行われています。

- ソースコードのフォーマット確認
    - TypeScript (`.ts`, `.tsx`) : ESLint + Prettier
    - SCSS : Stylelint
    - その他 `.js` 系設定ファイル: Prettier
