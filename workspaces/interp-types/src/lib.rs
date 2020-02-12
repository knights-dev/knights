//! Definitions AST, values, and types used by interp-if and interp-core

type Name = String;
type Num = f64;

/// Literal expression
#[derive(Clone, Debug)]
pub enum Lit {
    Num(Num),
}

/// AST
#[derive(Clone, Debug)]
pub enum Expr {
    App(Box<Expr>, Box<Expr>),
    Lam(Name, Box<Expr>),
    Var(Name),
    Lit(Lit),
}

/// Values
#[derive(Clone, Debug)]
pub enum Value {
    VNum(Num),
    VApp(Box<Value>, Box<Value>),
    VLam(fn(Box<Value>) -> Box<Value>),
}

/// Types
#[derive(Clone, Debug)]
pub enum Type {
    TyVar(Name),
    TyCon(Name, Vec<Box<Type>>),
    TyFun(Box<Type>, Box<Type>),
}
