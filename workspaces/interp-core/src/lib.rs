pub mod error;
pub mod reduction;
pub mod syntax;
pub mod typing;

pub fn add(lhs: i32, rhs: i32) -> i32 {
    lhs + rhs
}

#[cfg(test)]
mod tests {
    use super::add;

    #[test]
    fn it_works() {
        assert_eq!(add(2, 3), 5);
    }
}
