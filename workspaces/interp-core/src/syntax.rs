//! Definitions AST, values, and types used by interp-if and interp-core

/// Aliases
pub type VarId = u64;
pub type TyVarId = u64;
pub type TyConId = String;

/// Literal expression
#[derive(Clone, Debug)]
pub enum Lit {
    Int(i64),
}

/// AST
#[derive(Clone, Debug)]
pub enum Expr {
    App(Box<Expr>, Box<Expr>),
    Lam(VarId, Option<Type>, Box<Expr>),
    Var(VarId),
    Lit(Lit),
}

/// Typed AST.
/// This AST is used by the node editor for
/// telling users informations abount types.
#[derive(Clone, Debug)]
pub enum TypedExpr {
    TENode(Type, Box<TypedExpr>),
    TELeaf(Type, Expr),
}

/// Types
#[derive(Clone, Debug)]
pub enum Type {
    TyVar(TyVarId),
    TyCon(TyConId),
    TyFun(Box<Type>, Box<Type>),
}
