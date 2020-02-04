# CONTRIBUTING

## 要するに

- 現状としては「技術的に実現可能か」を確認するためのプロトタイプを雑に作っている段階です
- ほとんど何も仕様が決まってないため、アイデアを共有するだけもいいので貢献してもらえると嬉しいです
- 重複した Issue は立てないでください (すでにクローズされたものも確認してください)
- とにかく何かリポジトリに手を加える前にまず Gitter で相談してください

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

### プルリクエスト (以下、PR) について

すべての PR は、マージ前にメンテナーである [0918nobita](https://github.com/0918nobita) の承認 (Approval) を必要とします。

### PR のラベル管理に関して

レビューを求めているか、まだ作業中なのかを判別するために、  
ステータス系ラベルは必ずどれか一つ追加するようにお願いします。

- **ステータス系ラベル**
    - `S-waiting-for-review` : レビュー待ち
    - `S-work-in-progress` : 作業中
- 種別系ラベル (任意)
    - `T-bugfix` : バグ修正
    - `T-enhancement` : 既存機能の改善
    - `T-new-feature` : 新機能の追加
    - `T-refactoring` : リファクタリング
    - `T-RFC` : RFC (Request for Comments) の追加
- エリア系ラベル (任意)
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
